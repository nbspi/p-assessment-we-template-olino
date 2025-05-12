// middleware/authMiddleware.js
// PURPOSE: Protect write routes by checking for an Authorization header

import jwt from "jsonwebtoken";
import "dotenv/config";

export default function authMiddleware(req, res, next) {
	const header = req.headers.authorization;
	if (!header || !header.startsWith("Bearer ")) {
		return res.status(401).json({ error: "Unauthorized: missing token" });
	}
	const token = header.split(" ")[1];

	try {
		// Verify token and extract payload
		const payload = jwt.verify(token, process.env.JWT_SECRET);

		// Attach user info to request for downstream handlers
		req.user = {
			id: payload.userId,
			email: payload.email,
		};

		next(); // token is valid, proceed to the next middleware/controller
	} catch (err) {
		console.error("JWT verification error:", err);
		return res
			.status(401)
			.json({ error: "Unauthorized: Invalid or expired token" });
	}
}
