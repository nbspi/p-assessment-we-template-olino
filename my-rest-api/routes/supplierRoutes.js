// routes/supplierRoutes.js
// PURPOSE: Map URL paths to supplierController methods using ES module format

import express from "express";
import {
	list,
	create,
	update,
	remove,
} from "../controllers/supplierController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { validateSupplier } from "../utils/validation.js";

const router = express.Router();

// GET all suppliers
router.get("/", list);

// POST a new supplier
router.post("/", authMiddleware, validateSupplier, create);

// PUT update an existing supplier
router.put("/:id", authMiddleware, validateSupplier, update);

// DELETE a supplier
router.delete("/:id", authMiddleware, remove);

export default router;
