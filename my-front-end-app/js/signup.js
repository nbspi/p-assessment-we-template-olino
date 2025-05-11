// js/signup.js
// PURPOSE: Handle sign-up form submission and feedback

// Grab the form element
const form = document.getElementById("signup-form");

form.addEventListener("submit", async (e) => {
	e.preventDefault(); // stop default page reload

	// Collect form values
	const fd = new FormData(form);
	const email = fd.get("email").trim();
	const password = fd.get("password");
	const confirm = fd.get("confirmPassword");

	// 1. Validate password match (KISS)
	if (password !== confirm) {
		return alert("Passwords do not match.");
	}

	// 2. Prepare request payload
	const payload = { email, password };

	try {
		// 3. Send to backend
		const res = await fetch("http://localhost:3000/auth/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});

		// 4. Handle response
		if (res.status === 201) {
			alert("Account created! Please sign in.");
			// window.location.href = "signin.html";
		} else {
			const error = await res.json();
			alert(error.error || "Sign-up failed.");
		}
	} catch (err) {
		console.error("Sign-up error:", err);
		alert("Network error. Please try again later.");
	}
});
