// app.js
// PURPOSE: Entrypoint of our REST API server, bootstraps Express and connects to MySQL via Sequelize

import express, { json, urlencoded } from "express"; // import Express framework
import { sequelize } from "./models/index.js"; // load Sequelize instance (our DB connector)
import supplierRoutes from "./routes/supplierRoutes.js";
import componentRoutes from "./routes/componentRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express(); // create an Express application instance

app.use(cors());

// parse incoming JSON payloads without needing the body-parser package
app.use(express.json()); // makes JSON data available on req.body

// parse URL-encoded form data (e.g., HTML form submissions)
app.use(urlencoded({ extended: true })); // makes form data available on req.body

// Mount your route modules here, for example:
app.use("/suppliers", supplierRoutes);
app.use("/components", componentRoutes);
app.use("/products", productRoutes);
app.use("/auth", authRoutes);

// ========== START SERVER ==========
const PORT = process.env.PORT || 3000; // define port, default to 3000

// synchronize our Sequelize models with the database
// { alter: true } will adjust tables to match models (adding/removing columns as needed)
sequelize
	.sync()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`🚀 Server running at http://localhost:${PORT}`); // confirm server is listening
		});
	})
	.catch((err) => {
		console.error("❌ DB sync failed:", err); // log any errors during model synchronization
	});
