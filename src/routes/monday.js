const router = require('express').Router();
const { authenticationMiddleware } = require('../middlewares/authentication');
const mondayController = require('../controllers/monday-controller');



const transformNewController = require('../recipes/transform/controller');
const updateController = require('../recipes/updates/controller');
const xyzController = require('../recipes/zyx/controller');

router.post('/monday/transform', authenticationMiddleware, transformNewController.handler);
router.post('/monday/updates', authenticationMiddleware, updateController.handler);
router.post('/monday/zyx', authenticationMiddleware, xyzController.handler);



module.exports = router;
