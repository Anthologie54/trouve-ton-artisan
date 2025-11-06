/**
 * ============================================================================
 * FICHIER : models/Specialite.js
 * DESCRIPTION : Modèle Sequelize représentant la table "specialite"
 * RELATIONS : Une spécialité appartient à une catégorie
 * ============================================================================
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Categorie = require("./Categorie");

// ============================================================================
// DÉFINITION DU MODÈLE "Specialite"
// ============================================================================
const Specialite = sequelize.define(
  "Specialite",
  {
    id_specialite: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom_specialite: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    id_categorie: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Categorie, // Référence vers la table "categorie"
        key: "id_categorie",
      },
    },
  },
  {
    tableName: "specialite", // Nom exact de la table dans MySQL
    timestamps: false, // Pas de colonnes createdAt / updatedAt
  }
);

// ============================================================================
// EXPORT DU MODÈLE
// ============================================================================
module.exports = Specialite;
