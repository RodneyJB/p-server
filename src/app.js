const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
const { MODE_OPTIONS, BOOL_OPTIONS } = require('./recipes/Update/constants');

const { PORT: port } = process.env;
const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// --- Hardcoded fallback for Update recipe remote options ---
app.post('/monday/get_remote_list_options', (req, res) => {
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
    console.error('Remote options error:', err);
    return res.status(500).json({ error: 'Failed to fetch options' });
  }
});

// Serve static files from the "src" folder
app.use('/src', express.static(path.join(__dirname, 'src')));

// Register the routes
app.use(routes);  // This makes sure all routes are handled

// Start the server
app.listen(port, () => {
  console.log(`Transform text integration listening on port ${port}`);
});

module.exports = app;
