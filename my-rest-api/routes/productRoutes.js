// routes/productRoutes.js
// PURPOSE: Map URL paths to productController methods using ES module format

import express from "express";
import {list, create, update, remove} from "../controllers/productController.js";

const router = express.Router();

// GET all products
router.get("/", list);

// POST a new product
router.post("/", create);

// PUT update a product
router.put("/:id", update);

// DELETE a product
router.delete("/:id", remove);

export default router;
