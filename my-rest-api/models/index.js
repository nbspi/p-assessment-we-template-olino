// models/index.js
// PURPOSE: Load all models, define many-to-many relationships, and export them

import sequelize from "../config/db.js"; // our DB connection
import Supplier from "./supplier.js"; // Supplier model
import Component from "./component.js"; // Component model
import Product from "./product.js"; // Product model

// A Supplier can supply many Components, and vice versa
Supplier.belongsToMany(Component, { through: "SupplierComponent" });
Component.belongsToMany(Supplier, { through: "SupplierComponent" });

// A Product is made up of many Components, and vice versa
Product.belongsToMany(Component, { through: "ProductComponent" });
Component.belongsToMany(Product, { through: "ProductComponent" });

// Export all so app.js and controllers can import them easily
export { sequelize, Supplier, Component, Product };
