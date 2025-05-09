// config/database.js
// PURPOSE: Initialize and export a Sequelize instance connected to MySQL

// 1. Load variables from .env into process.env
import "dotenv/config";

import { Sequelize } from "sequelize";

// 2. Create a new Sequelize instance
const sequelize = new Sequelize(
	process.env.DB_NAME, // database name
	process.env.DB_USER, // username
	process.env.DB_PASS, // password
	{
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: "mysql", // tell Sequelize we’re using MySQL
		logging: false, // disable SQL query logging in console
	}
);

export default sequelize;
