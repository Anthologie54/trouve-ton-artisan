const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Specialite = require('./Specialite');

const Artisan = sequelize.define('Artisan', {
  id_artisan: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nom_artisan: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  note: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: false
  },
  localisation: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  a_propos: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  site_web: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  id_specialite: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Specialite,
      key: 'id_specialite'
    }
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true
  },

  // COLONNE pour gérer les artisans du mois
  top: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }

}, {
  tableName: 'artisan',
  timestamps: false
});

//  Association : un artisan appartient à une spécialité
Artisan.belongsTo(Specialite, { foreignKey: 'id_specialite', as: 'specialite' });

module.exports = Artisan;
