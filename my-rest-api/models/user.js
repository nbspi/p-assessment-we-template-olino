// models/User.js
// PURPOSE: Define the User model for authentication

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
	"User",
	{
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true, // basic format check
			},
		},
		password_hash: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
	},
	{
		tableName: "Users", // match the actual table name
		timestamps: false, // we’re managing created_at manually
	}
);

export default User;
