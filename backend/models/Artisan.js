/**
 * ============================================================================
 * FICHIER : models/Artisan.js
 * DESCRIPTION : Modèle Sequelize représentant la table "artisan"
 * RELATIONS : Un artisan appartient à une spécialité
 * ============================================================================
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Specialite = require("./Specialite");

// ============================================================================
// DÉFINITION DU MODÈLE "Artisan"
// ============================================================================
const Artisan = sequelize.define(
  "Artisan",
  {
    id_artisan: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom_artisan: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    note: {
      type: DataTypes.DECIMAL(2, 1), // Exemple : 4.5
      allowNull: false,
    },
    localisation: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    a_propos: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    site_web: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    id_specialite: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Specialite, // Référence vers la table "specialite"
        key: "id_specialite",
      },
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    top: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Permet de marquer un artisan comme "Artisan du mois"
    },
  },
  {
    tableName: "artisan", // Nom exact de la table dans la base MySQL
    timestamps: false, // Pas de colonnes createdAt / updatedAt
  }
);

// ============================================================================
// ASSOCIATION ENTRE LES MODÈLES
// ============================================================================
Artisan.belongsTo(Specialite, {
  foreignKey: "id_specialite",
  as: "Specialite", // Permet d'accéder à artisan.Specialite.nom_specialite
});

// ============================================================================
// EXPORT DU MODÈLE
// ============================================================================
module.exports = Artisan;
