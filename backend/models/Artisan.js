const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Artisan = sequelize.define('artisan', {
  id_artisan: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nom_artisan: { type: DataTypes.STRING(150), allowNull: false },
  note: { type: DataTypes.DECIMAL(2,1), allowNull: true },
  localisation: { type: DataTypes.STRING(100), allowNull: true },
  a_propos: { type: DataTypes.TEXT, allowNull: true },
  email: { type: DataTypes.STRING(150), allowNull: true },
  site_web: { type: DataTypes.STRING(200), allowNull: true },
  id_specialite: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'artisan', timestamps: false });

module.exports = Artisan;