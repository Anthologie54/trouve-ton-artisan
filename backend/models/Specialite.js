const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Categorie = require('./Categorie');

const Specialite = sequelize.define('Specialite', {
  id_specialite: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nom_specialite: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  id_categorie: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Categorie,
      key: 'id_categorie'
    }
  }
}, {
  tableName: 'specialite',
  timestamps: false
});

module.exports = Specialite;
