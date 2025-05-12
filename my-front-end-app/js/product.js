// js/product.js
// PURPOSE: Encapsulates product CRUD UI logic

import { authHeaders, isAuthenticated } from "./main.js";

export function initProductSection({ listId, formId, apiBase }) {
	const listEl = document.getElementById(listId);
	const formEl = document.getElementById(formId);
	const selectEl = document.getElementById("product-components");
	const pickedEl = document.getElementById("selected-components-list");

	let allComponents = []; // will hold { id, name, ... }
	let selectedComponentIds = []; // IDs the user has toggled

	if (!isAuthenticated) {
		formEl.style.display = "none";
	}

	// 1) Load all components (once)
	async function loadComponentOptions() {
		const res = await fetch("http://localhost:3000/components", {
			headers: authHeaders(),
		});
		const comps = await res.json();
		allComponents = comps;
		selectedComponentIds.push(allComponents[0].id);
		// build dropdown options
		selectEl.innerHTML = comps
			.map((c) => `<option value="${c.id}">${c.name}</option>`)
			.join("");
	}

	// 2) Render the picked list
	function renderPicked() {
		if (selectedComponentIds.length === 0) {
			pickedEl.innerHTML = "<span>None</span>";
			return;
		}
		pickedEl.innerHTML = selectedComponentIds
			.map((id) => {
				const c = allComponents.find((x) => x.id === id);
				return `<span data-id="${id}">${
					c ? c.name + " " : "Unknown"
				}</span>`;
			})
			.join("");
	}

	// 3) Toggle selection on change
	selectEl.addEventListener("change", (e) => {
		const id = parseInt(e.target.value, 10);
		const idx = selectedComponentIds.indexOf(id);
		if (idx === -1) selectedComponentIds.push(id);
		else selectedComponentIds.splice(idx, 1);

		// clear the UI selection so you can pick again to un-toggle
		selectEl.selectedIndex = -1;

		renderPicked();
	});

	// initialize options & picked display
	loadComponentOptions().then(renderPicked);

	async function fetchAndRender() {
		try {
			const products = await fetch(apiBase, {
				headers: authHeaders(),
			}).then((p) => p.json());

			if (products.length === 0) {
				// 3. show empty-list message
				listEl.innerHTML =
					'<li class="empty" style="font-size: .875rem">Product list is empty</li>';
				return;
			}

			listEl.innerHTML = products
				.map((p) => {
					const comps = p.Components.map((c) => c.name).join(
						","
					);
					let html =
						`<li data-id="${p.id}">` +
						`<span>${p.name} (Code:${p.product_code}) — Qty: ${p.quantity_on_hand}`;
					if (isAuthenticated) {
						html +=
							`<button class="edit">Edit</button>` +
							`<button class="delete">Delete</button>` +
							`<br/><small>Components: ${comps}</small></span>`;
					}
					return html + `</li><br>`;
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
			componentIds: selectedComponentIds.slice(),
		};
		if (
			!payload.name ||
			!payload.product_code ||
			payload.componentIds.length === 0
		) {
			return alert("All fields required.");
		}
		try {
			// 1) Perform the fetch
			const res = await fetch(apiBase, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...authHeaders(),
				},
				body: JSON.stringify(payload),
			});

			// 2) Parse the JSON (API should return { error: "..."} on failures)
			const data = await res.json();

			// 3) If HTTP status is not OK, show the error
			if (!res.ok) {
				// data.error comes from your backend’s JSON
				return alert(data.error || "Failed to create product.");
			}

			// 4) Success! reset form and reload list
			formEl.reset();
			fetchAndRender();
		} catch (err) {
			// 5) Network or unexpected error
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
					const data = await res.json();
					return alert(
						data.error || "Failed to delete product."
					);
				}
				return fetchAndRender();
			} catch (err) {
				console.error("Network or unexpected error:", err);
				alert("Network error. Please try again.");
			}
		}
		if (e.target.classList.contains("edit")) {
			// prompt and update logic similar to create
			const name = prompt("Name:", li.querySelector("span").innerText);
			if (name === null) return;
			try {
				const res = await fetch(`${apiBase}/${id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						...authHeaders(),
					},
					body: JSON.stringify({ name }),
				});
				if (!res.ok) {
					const data = await res.json();
					return alert(
						data.error || "Failed to update product."
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
