const router = require('express').Router();
const { authenticationMiddleware } = require('../middlewares/authentication');
const mondayController = require('../controllers/monday-controller');

// Handle the action for executing the update (e.g., when a new item is created)
router.post('/monday/execute_action', authenticationMiddleware, mondayController.executeAction);

// Handle the remote options for the Update recipe (e.g., for selecting modes)
router.post('/monday/get_remote_list_options', authenticationMiddleware, mondayController.getRemoteListOptions);


module.exports = router;
