/**
 * ============================================================================
 * FICHIER : config/database.js
 * DESCRIPTION : Configuration et connexion à la base de données MySQL via Sequelize
 * ============================================================================
 */

const { Sequelize } = require("sequelize");
require("dotenv").config();

// ============================================================================
// INITIALISATION DE LA CONNEXION
// ============================================================================
const sequelize = new Sequelize(
  process.env.DB_NAME,        // Nom de la base de données
  process.env.DB_USER,        // Utilisateur MySQL
  process.env.DB_PASSWORD,    // Mot de passe MySQL
  {
    host: process.env.DB_HOST || "localhost", // Hôte (localhost par défaut)
    dialect: process.env.DB_DIALECT || "mysql", // Type de base (MySQL)
    port: process.env.DB_PORT || 3306, // Port par défaut MySQL
    logging: false, // Désactive l'affichage des requêtes SQL dans la console
  }
);

// ============================================================================
// TEST DE CONNEXION À LA BASE DE DONNÉES
// ============================================================================
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion MySQL réussie !");
  } catch (error) {
    console.error("❌ Erreur de connexion MySQL :", error.message);
  }
})();

// ============================================================================
// EXPORT DU MODULE
// ============================================================================
module.exports = sequelize;
