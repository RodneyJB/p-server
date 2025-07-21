module.exports = {
  MODES: {
    ALL_FILES: 'ALL_FILES',
    PDF_ONLY: 'PDF_ONLY',
    COMBINE_PDFS: 'COMBINE_PDFS',
    COUNT_AND_SPLIT: 'COUNT_AND_SPLIT',
  },
  BOOL_OPTIONS: [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ],
  MODE_OPTIONS: [
    { label: 'Load all files', value: 'ALL_FILES' },
    { label: 'Load only PDF files', value: 'PDF_ONLY' },
    { label: 'Combine all PDFs into one', value: 'COMBINE_PDFS' },
    { label: 'Count and split PDF files', value: 'COUNT_AND_SPLIT' },
  ],
};
