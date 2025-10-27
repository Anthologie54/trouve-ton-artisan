const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./db');

const app = express();
app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
app.use(express.json());

// Ping
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// Test DB
sequelize.authenticate()
  .then(() => console.log('DB connectée'))
  .catch((err) => console.error('DB KO:', err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API sur http://localhost:${PORT}`));