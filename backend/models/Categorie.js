/**
 * ============================================================================
 * FICHIER : models/Categorie.js
 * DESCRIPTION : Modèle Sequelize représentant la table "categorie"
 * ============================================================================
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // Import de la connexion Sequelize

// ============================================================================
// DÉFINITION DU MODÈLE "Categorie"
// ============================================================================
const Categorie = sequelize.define(
  "Categorie",
  {
    id_categorie: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom_categorie: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "categorie", // Nom exact de la table MySQL
    timestamps: false, // Pas de colonnes createdAt / updatedAt
  }
);

// ============================================================================
// EXPORT DU MODÈLE
// ============================================================================
module.exports = Categorie;
