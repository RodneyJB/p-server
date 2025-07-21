const router = require('express').Router();
const { authenticationMiddleware } = require('../middlewares/authentication');
const mondayController = require('../controllers/monday-controller');



const assignPersonController = require('../recipes/assignperson/controller');
const transformNewController = require('../recipes/transformnew/controller');
const updateController = require('../recipes/update/controller');
const xyzController = require('../recipes/xyz/controller');

router.post('/monday/assignperson', authenticationMiddleware, assignPersonController.handler);
router.post('/monday/transformnew', authenticationMiddleware, transformNewController.handler);
router.post('/monday/update', authenticationMiddleware, updateController.handler);
router.post('/monday/xyz', authenticationMiddleware, xyzController.handler);



module.exports = router;
