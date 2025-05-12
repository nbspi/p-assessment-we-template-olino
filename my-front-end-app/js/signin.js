// js/signin.js
// PURPOSE: Handle sign-in form submission and store JWT

document.getElementById("signin-form").addEventListener("submit", async (e) => {
	e.preventDefault();

	const fd = new FormData(e.target);
	const email = fd.get("email").trim();
	const password = fd.get("password");

	try {
		const res = await fetch("http://localhost:3000/auth/signin", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

		if (res.ok) {
			const { token, expiresIn } = await res.json();
			// Store token in localStorage
			localStorage.setItem("authToken", token);
			localStorage.setItem(
				"tokenExpiry",
				Date.now() + parseExpiry(expiresIn)
			);
			// Redirect to main app
			window.location.href = "index.html";
		} else {
			const err = await res.json();
			alert(err.error || "Sign-in failed.");
		}
	} catch (err) {
		console.error("Sign-in error:", err);
		alert("Network error. Please try again.");
	}
});

/**
 * Convert "1h" or "3600s" into milliseconds
 */
function parseExpiry(str) {
	const num = parseInt(str, 10);
	if (str.endsWith("h")) return num * 3600000;
	if (str.endsWith("m")) return num * 60000;
	return num * 1000; // assume seconds
}
