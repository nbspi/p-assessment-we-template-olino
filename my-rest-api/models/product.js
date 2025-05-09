// models/Product.js
// PURPOSE: Define the Product table structure

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define(
  'Product',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    product_code: {
      type: DataTypes.STRING,
      unique: true,                                // ensure each code is unique
      allowNull: false
    },
    quantity_on_hand: {
      type: DataTypes.INTEGER,
      defaultValue: 0                              // default stock is zero
    }
  }
);

module.exports = Product;
