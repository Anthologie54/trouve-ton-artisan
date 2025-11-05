const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./db');

// === Modèles ===
const Categorie = require('./models/Categorie');
const Specialite = require('./models/Specialite');
const Artisan = require('./models/Artisan');

const app = express();

// === Middlewares ===
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));
app.use(express.json());

// === Associations ===
// Une catégorie possède plusieurs spécialités
Categorie.hasMany(Specialite, { foreignKey: 'id_categorie' });
Specialite.belongsTo(Categorie, { foreignKey: 'id_categorie' });

// Une spécialité possède plusieurs artisans
Specialite.hasMany(Artisan, { foreignKey: 'id_specialite' });
Artisan.belongsTo(Specialite, { foreignKey: 'id_specialite' });

// === Routes principales ===
app.use('/api/categories', require('./routes/categories'));
app.use('/api/specialites', require('./routes/specialites'));
app.use('/api/artisans', require('./routes/artisans')); // ✅ Route unique pour les artisans

// === Route de test (vérification du serveur) ===
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// === Connexion à la base de données ===
sequelize.authenticate()
  .then(() => console.log('✅ Connexion MySQL réussie !'))
  .catch((err) => console.error('❌ Erreur connexion MySQL :', err));

// === Lancement du serveur ===
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 API lancée sur http://localhost:${PORT}`));
