const router = require('express').Router();
const mondayRoutes = require('./monday');

// Load all monday routes
router.use(mondayRoutes);

// Health check
router.get('/', (req, res) => res.json(getHealth()));
router.get('/health', (req, res) => res.json(getHealth()));

function getHealth() {
  return { ok: true, message: 'Healthy' };
}

module.exports = router;
