const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./db');

// Importation des modèles
const Categorie = require('./models/Categorie');
const Specialite = require('./models/Specialite');
const Artisan = require('./models/Artisan');

const app = express();
app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
app.use(express.json());

// Assocaitions 
Categorie.hasMany(Specialite,{ foreignKey: 'id_categorie'});
Specialite.belongsTo(Categorie, { foreignKey: 'id_categorie'});

Specialite.hasMany(Artisan, { foreignKey: 'id_specialite'});
Artisan.belongsTo(Specialite, { foreignKey: 'id_specialite'});

//Routes
app.use('/api/categorie', require('./routes/categories'));
app.use('/api/specialites', require('./routes/Specialites'));
app.use('/api/artisans', require('./routes/artisans'));
app.use('/api/artisan', require('./routes/artisan'));

// Ping
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// Test DB
sequelize.authenticate()
  .then(() => console.log('DB connectée'))
  .catch((err) => console.error('DB KO:', err));

// Lancement du serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API sur http://localhost:${PORT}`));