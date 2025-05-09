// routes/productRoutes.js
// PURPOSE: Map URL paths to productController methods using ES module format

import express from "express";
import {
	list,
	create,
	update,
	remove,
} from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { validateProduct } from "../utils/validation.js";

const router = express.Router();

// GET all products
router.get("/", list);

// POST a new product
router.post("/", authMiddleware, validateProduct, create);

// PUT update a product
router.put("/:id", authMiddleware, validateProduct, update);

// DELETE a product
router.delete("/:id", authMiddleware, remove);

export default router;
