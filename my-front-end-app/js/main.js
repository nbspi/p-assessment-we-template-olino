// js/main.js
// PURPOSE: Entry point that initializes each feature slice

import { initSupplierSection } from "./supplier.js";
import { initComponentSection } from "./component.js";
import { initProductSection } from "./product.js";
import { signout } from "./signout.js";

// 1. Redirect if not authenticated
const token = localStorage.getItem("authToken");
const expiry = parseInt(localStorage.getItem("tokenExpiry"), 10) || 0;
export const isAuthenticated = Boolean(token && Date.now() < expiry);

// 2. Render auth controls
const authContainer = document.getElementById("auth-controls");
if (token && Date.now() < expiry) {
	// logged in
	authContainer.innerHTML = `<button id="sign-out">Sign Out</button>`;
	document.getElementById("sign-out").addEventListener("click", signout);
} else {
	// not logged in
	authContainer.innerHTML = `
    <a href="signup.html">Sign Up</a>
    &nbsp;|&nbsp;
    <a href="signin.html">Sign In</a>
  `;
}

// 3. Helper for headers
export function authHeaders() {
	return { Authorization: `Bearer ${localStorage.getItem("authToken")}` };
}

document.addEventListener("DOMContentLoaded", () => {
	initSupplierSection({
		listId: "supplier-list",
		formId: "supplier-form",
		apiBase: "http://localhost:3000/suppliers",
		authHeaders,
		isAuthenticated,
	});

	initComponentSection({
		listId: "component-list",
		formId: "component-form",
		apiBase: "http://localhost:3000/components",
		authHeaders,
		isAuthenticated,
	});

	initProductSection({
		listId: "product-list",
		formId: "product-form",
		apiBase: "http://localhost:3000/products",
		authHeaders,
		isAuthenticated,
	});
});

function parseExpiry(str) {
	const num = parseInt(str, 10);
	if (str.endsWith("h")) return num * 3600000;
	if (str.endsWith("m")) return num * 60000;
	return num * 1000;
}
