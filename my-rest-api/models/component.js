// models/Component.js
// PURPOSE: Define the Component table structure

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Component = sequelize.define("Component", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: DataTypes.TEXT, // optional description
});

export default Component;
