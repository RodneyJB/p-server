const router = require('express').Router();
const { authenticationMiddleware } = require('../middlewares/authentication');
const mondayController = require('../controllers/monday-controller');



const transformController = require('../recipes/transform/controller');
const updatesController = require('../recipes/updates/controller');
const zyxController = require('../recipes/zyx/controller');

router.post('/monday/transform', authenticationMiddleware, transformController.handler);
router.post('/monday/updates', authenticationMiddleware, updatesController.handler);
router.post('/monday/zyx', authenticationMiddleware, zyxController.handler);



module.exports = router;
