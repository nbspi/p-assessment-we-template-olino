// models/Component.js
// PURPOSE: Define the Component table structure

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Component = sequelize.define(
  'Component',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT                    // optional description
  }
);

module.exports = Component;
