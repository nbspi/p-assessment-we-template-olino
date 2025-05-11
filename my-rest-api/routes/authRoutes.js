// routes/authRoutes.js
// PURPOSE: Expose authentication endpoints

import express from "express";
import { signup, signin } from "../controllers/authController.js";

const router = express.Router();

// POST /auth/signup → user registration
router.post("/signup", signup);
router.post("/signin", signin);

export default router;
