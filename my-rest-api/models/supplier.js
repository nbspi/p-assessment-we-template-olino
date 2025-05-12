// models/Supplier.js
// PURPOSE: Define the Supplier table structure using ES Module syntax

// 1. Import DataTypes so we can specify column types (e.g., STRING, TEXT)
import { DataTypes } from "sequelize";

// 2. Import the preconfigured Sequelize instance (your DB connection)
import sequelize from "../config/db.js";

// 3. Define the Supplier model with its columns and constraints
const Supplier = sequelize.define(
	"Supplier", // model name; Sequelize will use 'Suppliers' as the table name by default
	{
		name: {
			// column: supplier's name
			type: DataTypes.STRING, // VARCHAR equivalent in SQL
			allowNull: false, // NOT NULL constraint ensures a name is always provided
		},
		contact_info: {
			// column: supplier's contact details
			type: DataTypes.TEXT, // TEXT column for longer strings
			allowNull: true, // optional field; suppliers can omit this
		},
	}
);

// 4. Export the Supplier model for use in controllers, services, etc.
export default Supplier;