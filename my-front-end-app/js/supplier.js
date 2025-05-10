// js/supplier.js
// PURPOSE: Encapsulates supplier CRUD UI logic

export function initSupplierSection({ listId, formId, apiBase }) {
	const listEl = document.getElementById(listId);
	const formEl = document.getElementById(formId);

	async function fetchAndRender() {
		try {
			const res = await fetch(apiBase);
			const data = await res.json();
			listEl.innerHTML = data
				.map(
					(s) =>
						`<li data-id="${s.id}">` +
						`<span>${s.name}${
							s.contact_info ? " – " + s.contact_info : ""
						}</span>` +
						`<button class="edit">Edit</button>` +
						`<button class="delete">Delete</button>` +
						`</li>`
				)
				.join("");
		} catch (err) {
			listEl.textContent = "Error loading suppliers.";
			console.error(err);
		}
	}

	formEl.addEventListener("submit", async (e) => {
		e.preventDefault();
		const formData = new FormData(formEl);
		const payload = {
			name: formData.get("name").trim(),
			contact_info: formData.get("contact_info").trim(),
		};
		if (!payload.name) return alert("Name required");
		await fetch(apiBase, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
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
			await fetch(`${apiBase}/${id}`, { method: "DELETE" });
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
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: name.trim(),
					contact_info: "",
				}),
			});
			fetchAndRender();
		}
	});

	// initial load
	fetchAndRender();
}
