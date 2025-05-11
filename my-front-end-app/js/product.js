// js/product.js
// PURPOSE: Encapsulates product CRUD UI logic

import { authHeaders } from "./main.js";

export function initProductSection({ listId, formId, apiBase }) {
	const listEl = document.getElementById(listId);
	const formEl = document.getElementById(formId);

	async function fetchAndRender() {
		try {
			const res = await fetch(apiBase, { headers: authHeaders() });
			const data = await res.json();
			listEl.innerHTML = data
				.map((p) => {
					const comps = p.Components.map((c) => c.name).join(
						","
					);
					return (
						`<li data-id="${p.id}">` +
						`<span>${p.name} (Code:${p.product_code}) — Qty: ${p.quantity_on_hand}` +
						`<button class="edit">Edit</button>` +
						`<button class="delete">Delete</button>` +
						`<br/><small>Components: ${comps}</small></span>` +
						`</li>`
					);
				})
				.join("");
		} catch (err) {
			listEl.textContent = "Error loading products.";
			console.error(err);
		}
	}

	formEl.addEventListener("submit", async (e) => {
		e.preventDefault();
		const fd = new FormData(formEl);
		const payload = {
			name: fd.get("name").trim(),
			product_code: fd.get("product_code").trim(),
			quantity_on_hand: parseInt(fd.get("quantity_on_hand"), 10),
			componentIds: fd
				.get("component_ids")
				.split(",")
				.map((n) => parseInt(n, 10))
				.filter((n) => !isNaN(n)),
		};
		if (
			!payload.name ||
			!payload.product_code ||
			payload.componentIds.length === 0
		) {
			return alert("All fields required.");
		}
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
			// prompt and update logic similar to create
			const name = prompt("Name:", li.querySelector("span").innerText);
			if (name === null) return;
			await fetch(`${apiBase}/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					...authHeaders(),
				},
				body: JSON.stringify({ name }),
			});
			fetchAndRender();
		}
	});

	// initial load
	fetchAndRender();
}
