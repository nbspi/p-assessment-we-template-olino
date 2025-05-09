// models/Supplier.js
// PURPOSE: Define the Supplier table structure

const { DataTypes } = require('sequelize');       // import column types
const sequelize = require('../config/db');   // import configured DB connection

const Supplier = sequelize.define(
  'Supplier',                                      // model name
  {
    name: {                                        // column: name
      type: DataTypes.STRING,                      // VARCHAR equivalent
      allowNull: false                             // NOT NULL constraint
    },
    contact_info: DataTypes.TEXT                   // TEXT column, optional
  }
);

module.exports = Supplier;                         // make model usable elsewhere
