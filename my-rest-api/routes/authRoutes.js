// routes/authRoutes.js
// PURPOSE: Expose authentication endpoints

import express from "express";
import { signup } from "../controllers/authController.js";

const router = express.Router();

// POST /auth/signup → user registration
router.post("/signup", signup);

export default router;
