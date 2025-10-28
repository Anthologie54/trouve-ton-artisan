// backend/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config({ path: __dirname + '/.env' });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false,
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ Connexion MySQL réussie !'))
  .catch((err) => console.error('❌ Erreur de connexion MySQL :', err.message));

module.exports = sequelize;
