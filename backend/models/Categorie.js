// backend/models/Categorie.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Categorie = sequelize.define('Categorie', {
  id_categorie: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nom_categorie: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'categorie',
  timestamps: false
});

module.exports = Categorie;
