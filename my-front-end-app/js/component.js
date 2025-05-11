// js/component.js
// PURPOSE: Encapsulates component CRUD UI logic

import { authHeaders } from "./main.js";

export function initComponentSection({ listId, formId, apiBase }) {
	const listEl = document.getElementById(listId);
	const formEl = document.getElementById(formId);

	async function fetchAndRender() {
		try {
			const res = await fetch(apiBase, { headers: authHeaders() });
			const data = await res.json();
			listEl.innerHTML = data
				.map((c) => {
					const suppliers = c.Suppliers.map((s) => s.name).join(
						","
					);
					const products = c.Products.map((p) => p.name).join(
						","
					);
					return (
						`<li data-id="${c.id}">` +
						`<span>${c.name}${
							c.description ? " – " + c.description : ""
						}</span>` +
						`<button class="edit">Edit</button>` +
						`<button class="delete">Delete</button>` +
						`<br/><small>Suppliers: ${suppliers}</small></span>` +
						`<br/><small>Products: ${products}</small></span>` +
						`</li>`
					);
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
		await fetch(apiBase, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...authHeaders(),
			},
			body: JSON.stringify(payload),
		});
		formEl.reset();
		fetchAndRender();
	});

	listEl.addEventListener("click", async (e) => {
		const li = e.target.closest("li");
		if (!li) return;
		const id = li.dataset.id;
		if (e.target.classList.contains("delete")) {
			await fetch(`${apiBase}/${id}`, {
				method: "DELETE",
				headers: authHeaders(),
			});
			return fetchAndRender();
		}
		if (e.target.classList.contains("edit")) {
			const name = prompt(
				"New name:",
				li.querySelector("span").textContent
			);
			if (name == null) return;
			await fetch(`${apiBase}/${id}`, {
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
			fetchAndRender();
		}
	});

	// initial load
	fetchAndRender();
}
