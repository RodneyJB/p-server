const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 10000;

// Parse JSON bodies
app.use(express.json());

// Serve static files (optional, dev/debug use)
app.use('/src', express.static(path.join(__dirname, 'src')));

// Register all custom routes
app.use(routes);

// Start server
app.listen(port, () => {
  console.log(`📦 PlusServer backend running on port ${port}`);
});

module.exports = app;
