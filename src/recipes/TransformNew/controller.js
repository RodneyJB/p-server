const { transformText } = require('./service');  // fixed path

const mondayService = require('../../services/monday-service');

exports.handle = async (req, res) => {
  const { shortLivedToken } = req.session;
  const { payload } = req.body;
  const { boardId, itemId, sourceColumnId, targetColumnId, transformationType } = payload.inputFields;

  const text = await mondayService.getColumnValue(shortLivedToken, itemId, sourceColumnId);
  if (!text) return res.status(200).send({});

  const transformed = transformText(text, transformationType?.value || 'TO_UPPER_CASES');
  await mondayService.changeColumnValue(shortLivedToken, boardId, itemId, targetColumnId, transformed);

  res.status(200).send({});
};
