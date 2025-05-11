// js/main.js
// PURPOSE: Entry point that initializes each feature slice

import { initSupplierSection } from "./supplier.js";
import { initComponentSection } from "./component.js";
import { initProductSection } from "./product.js";

// 1. Redirect if not authenticated
const token = localStorage.getItem("authToken");
const expiry = parseInt(localStorage.getItem("tokenExpiry"), 10) || 0;

// TODO: Redirect to sign in if user is not logged in
// if (!token || Date.now() > expiry) {
// 	localStorage.removeItem("authToken");
// 	localStorage.removeItem("tokenExpiry");
// 	window.location.href = "signin.html";
// }

// 2. Helper for headers
export function authHeaders() {
	return { Authorization: `Bearer ${localStorage.getItem("authToken")}` };
}

document.addEventListener("DOMContentLoaded", () => {
	initSupplierSection({
		listId: "supplier-list",
		formId: "supplier-form",
		apiBase: "http://localhost:3000/suppliers",
		authHeaders,
	});

	initComponentSection({
		listId: "component-list",
		formId: "component-form",
		apiBase: "http://localhost:3000/components",
		authHeaders,
	});

	initProductSection({
		listId: "product-list",
		formId: "product-form",
		apiBase: "http://localhost:3000/products",
		authHeaders,
	});
});

function parseExpiry(str) {
	const num = parseInt(str, 10);
	if (str.endsWith("h")) return num * 3600000;
	if (str.endsWith("m")) return num * 60000;
	return num * 1000;
}
