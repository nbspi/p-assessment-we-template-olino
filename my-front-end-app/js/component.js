// js/component.js
// PURPOSE: Encapsulates component CRUD UI logic

import { authHeaders, isAuthenticated } from "./main.js";

export function initComponentSection({ listId, formId, apiBase }) {
	const listEl = document.getElementById(listId);
	const formEl = document.getElementById(formId);

	if (!isAuthenticated) {
		formEl.style.display = "none";
	}

	async function fetchAndRender() {
		try {
			const components = await fetch(apiBase, {
				headers: authHeaders(),
			}).then((c) => c.json());

			if (components.length === 0) {
				// 3. show empty-list message
				listEl.innerHTML =
					'<li class="empty" style="font-size: .875rem">Component list is empty</li>';
				return;
			}

			listEl.innerHTML = components
				.map((c) => {
					const suppliers = c.Suppliers.map((s) => s.name).join(
						","
					);
					const products = c.Products.map((p) => p.name).join(
						","
					);
					let html =
						`<li data-id="${c.id}">` +
						`<span>${c.name}${
							c.description ? " – " + c.description : ""
						}</span>`;
					if (isAuthenticated) {
						html +=
							`<button class="edit">Edit</button>` +
							`<button class="delete">Delete</button>` +
							`<br/><small>Suppliers: ${suppliers}</small></span>` +
							`<br/><small>Products: ${products}</small></span>`;
					}
					return html + `</li><br>`;
				})
				.join("");
		} catch (err) {
			listEl.textContent = "Error loading components.";
			console.error(err);
		}
	}

	formEl.addEventListener("submit", async (e) => {
		e.preventDefault();
		const formData = new FormData(formEl);
		const payload = {
			name: formData.get("name").trim(),
			description: formData.get("description").trim(),
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
				return alert(data.error || "Failed to create component.");
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
						data.error || "Failed to delete component."
					);
				}
				return fetchAndRender();
			} catch (err) {
				console.error("Network or unexpected error:", err);
				alert("Network error. Please try again.");
			}
		}
		if (e.target.classList.contains("edit")) {
			try {
				const name = prompt(
					"New name:",
					li.querySelector("span").textContent
				);
				if (name == null) return;
				const res = await fetch(`${apiBase}/${id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						...authHeaders(),
					},
					body: JSON.stringify({
						name: name.trim(),
						description: "",
					}),
				});
				if (!res.ok) {
					const data = res.json();
					return alert(
						data.error || "Failed to update component."
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
