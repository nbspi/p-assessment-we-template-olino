// models/index.js
// PURPOSE: Load all models, define many-to-many relationships, and export them

const sequelize = require('../config/db');  // our DB connection
const Supplier = require('./supplier');            // Supplier model
const Component = require('./component');          // Component model
const Product = require('./product');              // Product model

// A Supplier can supply many Components, and a Component can have many Suppliers
Supplier.belongsToMany(Component, { through: 'SupplierComponent' });
Component.belongsToMany(Supplier, { through: 'SupplierComponent' });

// A Product is made of many Components, and a Component can be in many Products
Product.belongsToMany(Component, { through: 'ProductComponent' });
Component.belongsToMany(Product, { through: 'ProductComponent' });

// Export all so app.js and controllers can import them easily
module.exports = { sequelize, Supplier, Component, Product };
