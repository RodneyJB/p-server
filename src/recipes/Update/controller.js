const { MODE_OPTIONS, BOOL_OPTIONS } = require('./constants');

const handle = async (req, res) => {
  return res.status(200).json({ message: 'Update recipe endpoint works!' });
};

const getRemoteListOptions = async (req, res) => {
  const { payload } = req.body;
  const key = payload?.fieldKey;

  if (key === 'processing_mode') return res.json({ options: MODE_OPTIONS });
  if (key === 'skip_pdf' || key === 'skip_xml') return res.json({ options: BOOL_OPTIONS });

  return res.status(400).json({ error: 'Unknown field key' });
};

module.exports = {
  handle,
  getRemoteListOptions,
};
