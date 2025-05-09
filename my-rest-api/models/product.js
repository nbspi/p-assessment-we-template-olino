// models/Product.js
// PURPOSE: Define the Product table structure

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Product = sequelize.define("Product", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	product_code: {
		type: DataTypes.STRING,
		unique: true, // ensure each code is unique
		allowNull: false,
	},
	quantity_on_hand: {
		type: DataTypes.INTEGER,
		defaultValue: 0, // default stock is zero
	},
});

export default Product;
