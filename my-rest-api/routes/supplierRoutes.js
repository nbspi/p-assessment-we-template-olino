// routes/supplierRoutes.js
// PURPOSE: Map URL paths to supplierController methods using ES module format

import express from "express";
import {list, create, update, remove} from "../controllers/supplierController.js";

const router = express.Router();

// GET all suppliers
router.get("/", list);

// POST a new supplier
router.post("/", create);

// PUT update an existing supplier
router.put("/:id", update);

// DELETE a supplier
router.delete("/:id", remove);

export default router;