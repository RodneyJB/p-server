const mondayService = require('../services/monday-service');
const { MODE_OPTIONS, BOOL_OPTIONS } = require('../recipes/updates/constants');

async function executeAction(req, res) {
  const { shortLivedToken } = req.session;
  const { payload } = req.body;

  try {
    const { inputFields } = payload;
    const { boardId, itemId, text_column_id } = inputFields;

    const fileText = await mondayService.getColumnValue(shortLivedToken, itemId, text_column_id);
    if (!fileText) {
      return res.status(200).send({});
    }

    // Placeholder logic — update with real text/file processing later
    await mondayService.changeColumnValue(
      shortLivedToken,
      boardId,
      itemId,
      text_column_id,
      fileText + ' (processed)'
    );

    return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}

async function getRemoteListOptions(req, res) {
  try {
    const { payload } = req.body;
    const key = payload?.fieldKey;

    if (key === 'processing_mode') {
      return res.json({ options: MODE_OPTIONS });
    }

    if (key === 'skip_pdf' || key === 'skip_xml') {
      return res.json({ options: BOOL_OPTIONS });
    }

    return res.status(400).json({ error: 'Unknown field key' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}

module.exports = {
  executeAction,
  getRemoteListOptions,
};
