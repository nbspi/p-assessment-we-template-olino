// js/supplier.js
// PURPOSE: Encapsulates supplier CRUD UI logic

import { authHeaders, isAuthenticated } from "./main.js";

export function initSupplierSection({ listId, formId, apiBase }) {
	const listEl = document.getElementById(listId);
	const formEl = document.getElementById(formId);

	if (!isAuthenticated) {
		formEl.style.display = "none";
	}

	async function fetchAndRender() {
		const suppliers = await fetch(apiBase, {
			headers: authHeaders(),
		}).then((r) => r.json());

		if (suppliers.length === 0) {
			// 3. show empty-list message
			listEl.innerHTML =
				'<li class="empty" style="font-size: .875rem">Supplier list is empty</li>';
			return;
		}

		listEl.innerHTML = suppliers
			.map((s) => {
				// Always show the name
				let html = `<li data-id="${s.id}"><span>${s.name}${
					s.contact_info ? " – " + s.contact_info : ""
				}</span>`;
				// Only render edit/delete when authenticated
				if (isAuthenticated) {
					html += `<button class="edit">Edit</button><button class="delete">Delete</button>`;
				}
				return html + `</li>`;
			})
			.join("");
	}

	formEl.addEventListener("submit", async (e) => {
		e.preventDefault();
		const formData = new FormData(formEl);
		const payload = {
			name: formData.get("name").trim(),
			contact_info: formData.get("contact_info").trim(),
		};
		if (!payload.name) return alert("Name required");
		try {
			const res = await fetch(apiBase, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...authHeaders(),
				},
				body: JSON.stringify(payload),
			});
			if (!res.ok) {
				const data = res.json();
				return alert(data.error || "Failed to create supplier.");
			}
			formEl.reset();
			fetchAndRender();
		} catch (err) {
			console.error("Network or unexpected error:", err);
			alert("Network error. Please try again.");
		}
	});

	listEl.addEventListener("click", async (e) => {
		const li = e.target.closest("li");
		if (!li) return;
		const id = li.dataset.id;
		if (e.target.classList.contains("delete")) {
			try {
				const res = await fetch(`${apiBase}/${id}`, {
					method: "DELETE",
					headers: authHeaders(),
				});
				if (!res.ok) {
					const data = res.json();
					return alert(
						data.error || "Failed to delete supplier."
					);
				}
				return fetchAndRender();
			} catch (err) {
				console.error("Network or unexpected error:", err);
				alert("Network error. Please try again.");
			}
		}
		if (e.target.classList.contains("edit")) {
			const name = prompt(
				"New name:",
				li.querySelector("span").textContent
			);
			if (name == null) return;
			try {
				const res = await fetch(`${apiBase}/${id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						...authHeaders(),
					},
					body: JSON.stringify({
						name: name.trim(),
						contact_info: "",
					}),
				});
				if (!res.ok) {
					const data = red.json();
					return alert(
						data.error || "Failed to update supplier."
					);
				}
				fetchAndRender();
			} catch (err) {
				console.error("Network or unexpected error:", err);
				alert("Network error. Please try again.");
			}
		}
	});

	// initial load
	fetchAndRender();
}
