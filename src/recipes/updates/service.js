const { MODES, INPUT_FIELDS } = require('./constants');
const {
  filterFilesByExtension,
  mergePdfs,
  generateItemName,
} = require('./update.utils');
const { getColumnValue, changeColumnValue, createItem } = require('../../services/monday-service');

const handleUpdate = async (payload) => {
  const { inputFields, itemId, boardId, token } = payload;

  const mode = inputFields[INPUT_FIELDS.MODE];
  const fileColumn = inputFields[INPUT_FIELDS.FILE_COLUMN];
  const textColumn = inputFields[INPUT_FIELDS.TEXT_COLUMN];

  // Step 1: Wait for 5 seconds
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Step 2: Get file list from the file column
  const files = await getColumnValue(token, itemId, fileColumn);

  // Step 3: Filter files based on the selected mode
  let filteredFiles = [];
  if (mode === MODES.ALL_FILES) {
    filteredFiles = files;
  } else if (mode === MODES.PDF_ONLY) {
    filteredFiles = filterFilesByExtension(files, ['.pdf', '.PDF']);
  } else if (mode === MODES.COMBINE_PDFS) {
    const pdfFiles = filterFilesByExtension(files, ['.pdf', '.PDF']);
    // Merge PDFs logic
    const mergedPdf = await mergePdfs(pdfFiles);
    // Upload the merged PDF file
    await changeColumnValue(token, boardId, itemId, fileColumn, mergedPdf);
  } else if (mode === MODES.COUNT_AND_SPLIT) {
    const pdfFiles = filterFilesByExtension(files, ['.pdf', '.PDF']);
    const xmlFiles = filterFilesByExtension(files, ['.xml']);
    for (let i = 0; i < pdfFiles.length; i++) {
      const pdfFile = pdfFiles[i];
      const xmlFile = xmlFiles[i]; // Match XML to PDF
      const itemName = generateItemName(i, pdfFiles.length, pdfFile.name);
      const newItem = await createItem(boardId, itemName, { 
        file: pdfFile,
        xml: xmlFile
      });
      // Create a new item for each split PDF
      await changeColumnValue(token, boardId, newItem.id, fileColumn, pdfFile);
      await changeColumnValue(token, boardId, newItem.id, textColumn, `Content for ${itemName}`);
    }
  }

  // Step 4: Handle uploading files (for modes that don't involve PDFs or combining)
  if (mode !== MODES.COMBINE_PDFS && mode !== MODES.COUNT_AND_SPLIT) {
    for (const file of filteredFiles) {
      await changeColumnValue(token, boardId, itemId, fileColumn, file);
    }
  }

  // Step 5: Optionally, write text to the text column
  if (textColumn) {
    const textContent = filteredFiles.map(file => file.name).join("\n");
    await changeColumnValue(token, boardId, itemId, textColumn, textContent);
  }
};

module.exports = {
  handleUpdate,
};
