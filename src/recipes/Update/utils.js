const filterFilesByExtension = (files, extensions = []) => {
  return files.filter((file) =>
    extensions.some((ext) => file.name.toLowerCase().endsWith(ext.toLowerCase()))
  );
};

const mergePdfs = async (pdfBuffers) => {
  // TODO: Use pdf-lib or similar to merge buffers
  return Buffer.from([]); // return merged PDF buffer
};

const generateItemName = (index, total, originalName) => {
  return `[${index + 1}of${total}] ${originalName}`;
};

module.exports = {
  filterFilesByExtension,
  mergePdfs,
  generateItemName,
};
