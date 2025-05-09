// routes/componentRoutes.js
// PURPOSE: Map URL paths to componentController methods using ES module format

import express from "express";
import {list, create, update, remove} from "../controllers/componentController.js";

const router = express.Router();

// GET all components
router.get("/", list);

// POST a new component
router.post("/", create);

// PUT update an existing component
router.put("/:id", update);

// DELETE a component
router.delete("/:id", remove);

export default router;