const router = require('express').Router();
const mondayRoutes = require('./monday');

// Load controllers
const updateController = require('../recipes/Update/controller');
const transformNewController = require('../recipes/transformnew/controller');
// const assignController = require('../recipes/AssignPerson/controller');

router.use(mondayRoutes);

router.get('/', (req, res) => res.json(getHealth()));
router.get('/health', (req, res) => res.json(getHealth()));

// Recipe endpoints
router.post('/update', updateController.handle);
router.post('/transform-new', transformNewController.handle);
// router.post('/assign', assignController.handle);

function getHealth() {
  return { ok: true, message: 'Healthy' };
}

module.exports = router;
