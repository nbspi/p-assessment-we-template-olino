// routes/componentRoutes.js
// PURPOSE: Map URL paths to componentController methods using ES module format

import express from "express";
import {
	list,
	create,
	update,
	remove,
} from "../controllers/componentController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { validateComponent } from "../utils/validation.js";

const router = express.Router();

// GET all components
router.get("/", list);

// POST a new component
router.post("/", authMiddleware, validateComponent, create);

// PUT update an existing component
router.put("/:id", authMiddleware, validateComponent, update);

// DELETE a component
router.delete("/:id", authMiddleware, remove);

export default router;
