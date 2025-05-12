// controllers/authController.js
// PURPOSE: Handle user authentication (sign-up, sign-in)

import bcrypt from "bcrypt"; // for hashing passwords
import jwt from "jsonwebtoken";
import { Sequelize } from "sequelize";
import User from "../models/user.js"; // our User model

/**
 * POST /auth/signup
 * Registers a new user with email & password.
 */
export async function signup(req, res) {
	try {
		const { email, password } = req.body;

		// 1. Basic validation (KISS: just check presence & format)
		if (!email || !password) {
			return res
				.status(400)
				.json({ error: "Email and password are required." });
		}
		// 2. Email format check (simple regex)
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ error: "Invalid email format." });
		}
		// 3. Password length requirement
		if (password.length < 8) {
			return res
				.status(400)
				.json({ error: "Password must be at least 8 characters." });
		}

		// 4. Hash the password
		const hash = await bcrypt.hash(password, 10);
		//    ↑ generate a secure hash with 10 salt rounds

		// 5. Create the user in DB
		const user = await User.create({
			email,
			password_hash: hash,
		});

		// 6. Respond with created user (omit password_hash)
		return res.status(201).json({
			id: user.id,
			email: user.email,
			created_at: user.created_at,
		});
	} catch (err) {
		console.error("Signup error:", err);
		// Handle duplicate-email error
		if (
			err instanceof Sequelize.UniqueConstraintError ||
			err.name === "SequelizeUniqueConstraintError"
		) {
			return res
				.status(409)
				.json({ error: "Email already registered." });
		}
		// Generic server error
		return res.status(500).json({ error: "Internal server error." });
	}
}

/**
 * POST /auth/signin
 * Authenticates a user and returns a JWT.
 */
export async function signin(req, res) {
	try {
		const { email, password } = req.body;

		// 1. Basic validation
		if (!email || !password) {
			return res
				.status(400)
				.json({ error: "Email and password are required." });
		}

		// 2. Find user by email
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res
				.status(401)
				.json({ error: "Invalid email or password." });
		}

		// 3. Compare password with stored hash
		const match = await bcrypt.compare(password, user.password_hash);
		if (!match) {
			return res
				.status(401)
				.json({ error: "Invalid email or password." });
		}

		// 4. Generate JWT
		const payload = { userId: user.id, email: user.email };
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRES_IN,
		});

		// 5. Respond with token
		return res.json({ token, expiresIn: process.env.JWT_EXPIRES_IN });
	} catch (err) {
		console.error("Signin error:", err);
		return res.status(500).json({ error: "Internal server error." });
	}
}
