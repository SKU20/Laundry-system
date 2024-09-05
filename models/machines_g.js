const { DataTypes } = require('sequelize');
const sequelize = require('../src/database'); 

const Machine_g = sequelize.define('Machine_g', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_used: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'machines_g', 
  timestamps: false,
});

module.exports = Machine_g;
