// js/logout.js
// PURPOSE: Clear auth info and redirect to sign-in

export function signout() {
	// 1. Remove token and expiry
	localStorage.removeItem("authToken");
	localStorage.removeItem("tokenExpiry");
	// 2. Redirect to sign-in page
	window.location.href = "signin.html";
}
