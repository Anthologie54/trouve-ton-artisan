// Importations
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// --- 🧭 Diagnostic : afficher le dossier courant ---
console.log('📂 Dossier courant (__dirname):', __dirname);
console.log('📂 Contenu du dossier courant:', fs.readdirSync(__dirname));

// --- 🔑 Forcer dotenv à charger le bon fichier ---
const envPath = path.join(__dirname, '.env');
console.log('🧾 Lecture du fichier .env depuis:', envPath);

// Test lecture brute
try {
  const raw = fs.readFileSync(envPath, 'utf8');
  console.log('📜 Contenu brut du .env:\n', raw);
  dotenv.config({ path: envPath });
} catch (err) {
  console.error('❌ Impossible de lire le .env:', err.message);
}

// --- Vérification du chargement ---
console.log('🔍 DEBUG .env =>', process.env.DB_USER, process.env.DB_PASSWORD);

// --- Configuration Sequelize ---
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false,
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ Connexion MySQL réussie !'))
  .catch(err => console.error('❌ Erreur de connexion MySQL :', err.message));

module.exports = sequelize;
