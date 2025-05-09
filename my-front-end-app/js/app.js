// js/app.js
// PURPOSE: Load products from API and display them

// --- Products ---
// Fetch & render products with Edit/Delete buttons
async function fetchProducts() {
	const list = document.getElementById("product-list");
	try {
		const res = await fetch("http://localhost:3000/products");
		const products = await res.json();
		list.innerHTML = ""; // clear existing items

		products.forEach((p) => {
			const li = document.createElement("li");
			li.dataset.id = p.id; // store id for later

			// build a comma-separated list of component IDs
			const compList = p.Components.map((c) => c.name).join(",");

			li.innerHTML = `
        <span>
          ${p.name} (Code: ${p.product_code}) — Qty: ${p.quantity_on_hand}
          <button class="edit-product">Edit</button>
          <button class="delete-product">Delete</button>
          <br/><small>Components: ${compList || "None"}</small>
        </span>
      `;
			list.appendChild(li);
		});
	} catch (err) {
		list.textContent = "Failed to load products.";
		console.error("Fetch products error:", err);
	}
}

// Handle Create Product form submission
document
	.getElementById("product-form")
	.addEventListener("submit", async (e) => {
		e.preventDefault();
		// grab and trim values
		const name = document.getElementById("product-name").value.trim();
		const code = document.getElementById("product-code").value.trim();
		const qty = parseInt(
			document.getElementById("product-quantity").value,
			10
		);
		const compIdsInput = document
			.getElementById("product-components")
			.value.split(",")
			.map((s) => parseInt(s.trim(), 10))
			.filter((n) => !isNaN(n));

		// basic validation
		if (
			!name ||
			!code ||
			Number.isNaN(qty) ||
			qty < 0 ||
			compIdsInput.length === 0
		) {
			return alert(
				"Please fill out all fields correctly, including at least one component ID."
			);
		}

		try {
			const res = await fetch("http://localhost:3000/products", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name,
					product_code: code,
					quantity_on_hand: qty,
					componentIds: compIdsInput,
				}),
			});
			if (!res.ok) throw new Error("Create failed");
			e.target.reset(); // clear the form
			fetchProducts(); // refresh the list
		} catch (err) {
			alert("Failed to create product.");
			console.error("Create product error:", err);
		}
	});

// Delegate Edit/Delete button clicks for products
document.getElementById("product-list").addEventListener("click", async (e) => {
	const li = e.target.closest("li");
	if (!li) return;
	const id = li.dataset.id;

	// DELETE
	if (e.target.matches(".delete-product")) {
		if (!confirm("Delete this product?")) return;
		await fetch(`http://localhost:3000/products/${id}`, {
			method: "DELETE",
		});
		return fetchProducts();
	}

	// EDIT
	if (e.target.matches(".edit-product")) {
		// parse current values from the displayed text
		const text = li.querySelector("span").innerText;
		const [line1, line2] = text.split("\n");
		const [, namePart, codePart, , qtyPart] = line1.match(
			/^(.+)\s+\(Code:\s*(.+)\)\s+—\s+Qty:\s*(\d+)/
		);
		const compMatch = line2.match(/Components:\s*(.*)$/);
		const currentComps = compMatch && compMatch[1];

		// prompt for new values
		const newName = prompt("Product name:", namePart);
		if (newName === null) return;
		const newCode = prompt("Product code:", codePart);
		if (newCode === null) return;
		const newQty = prompt("Quantity on hand:", qtyPart);
		if (newQty === null || isNaN(parseInt(newQty, 10))) return;
		const newComps = prompt(
			"Component IDs (comma-separated):",
			currentComps
		);
		if (newComps === null) return;
		const newCompIds = newComps
			.split(",")
			.map((s) => parseInt(s.trim(), 10))
			.filter((n) => !isNaN(n));

		// send update
		try {
			await fetch(`http://localhost:3000/products/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: newName.trim(),
					product_code: newCode.trim(),
					quantity_on_hand: parseInt(newQty, 10),
					componentIds: newCompIds,
				}),
			});
			fetchProducts();
		} catch (err) {
			alert("Failed to update product.");
			console.error("Update product error:", err);
		}
	}
});

// Fetch & render suppliers
async function fetchSuppliers() {
	const list = document.getElementById("supplier-list");
	try {
		const res = await fetch("http://localhost:3000/suppliers");
		const suppliers = await res.json();
		list.innerHTML = ""; // clear

		suppliers.forEach((s) => {
			const li = document.createElement("li");
			li.dataset.id = s.id;

			// Supplier text
			li.innerHTML = `
        <span>
          ${s.name}${s.contact_info ? ` – ${s.contact_info}` : ""}
        </span>
        <button class="edit-supplier">Edit</button>
        <button class="delete-supplier">Delete</button>
      `;
			list.appendChild(li);
		});
	} catch {
		list.textContent = "Failed to load suppliers.";
	}
}

// Handle clicks for Edit/Delete on suppliers
document
	.getElementById("supplier-list")
	.addEventListener("click", async (e) => {
		const li = e.target.closest("li");
		if (!li) return;
		const id = li.dataset.id;

		// DELETE
		if (e.target.matches(".delete-supplier")) {
			if (!confirm("Delete this supplier?")) return;
			await fetch(`http://localhost:3000/suppliers/${id}`, {
				method: "DELETE",
			});
			return fetchSuppliers();
		}

		// EDIT
		if (e.target.matches(".edit-supplier")) {
			const currentName = li
				.querySelector("span")
				.textContent.split(" – ")[0]
				.trim();
			const currentContact =
				li.querySelector("span").textContent.split(" – ")[1] || "";
			const name = prompt("New name:", currentName);
			if (name === null) return; // cancelled
			const contact = prompt("New contact info:", currentContact);
			if (contact === null) return;

			await fetch(`http://localhost:3000/suppliers/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: name.trim(),
					contact_info: contact.trim(),
				}),
			});
			return fetchSuppliers();
		}
	});

// Fetch & render components
async function fetchComponents() {
	const list = document.getElementById("component-list");
	try {
		const res = await fetch("http://localhost:3000/components");
		const components = await res.json();
		list.innerHTML = ""; // clear

		components.forEach((c) => {
			const li = document.createElement("li");
			li.dataset.id = c.id;

			li.innerHTML = `
        <span>
          ${c.name}${c.description ? ` – ${c.description}` : ""}
        </span>
        <button class="edit-component">Edit</button>
        <button class="delete-component">Delete</button>
      `;
			list.appendChild(li);
		});
	} catch {
		list.textContent = "Failed to load components.";
	}
}

// Handle clicks for Edit/Delete on components
document
	.getElementById("component-list")
	.addEventListener("click", async (e) => {
		const li = e.target.closest("li");
		if (!li) return;
		const id = li.dataset.id;

		// DELETE
		if (e.target.matches(".delete-component")) {
			if (!confirm("Delete this component?")) return;
			await fetch(`http://localhost:3000/components/${id}`, {
				method: "DELETE",
			});
			return fetchComponents();
		}

		// EDIT
		if (e.target.matches(".edit-component")) {
			const currentName = li
				.querySelector("span")
				.textContent.split(" – ")[0]
				.trim();
			const currentDesc =
				li.querySelector("span").textContent.split(" – ")[1] || "";
			const name = prompt("New name:", currentName);
			if (name === null) return;
			const desc = prompt("New description:", currentDesc);
			if (desc === null) return;

			await fetch(`http://localhost:3000/components/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: name.trim(),
					description: desc.trim(),
				}),
			});
			return fetchComponents();
		}
	});

// Handle Supplier form submission
document
	.getElementById("supplier-form")
	.addEventListener("submit", async (e) => {
		e.preventDefault();
		const name = document.getElementById("supplier-name").value.trim();
		const contact = document
			.getElementById("supplier-contact")
			.value.trim();
		if (!name) {
			return alert("Please enter a supplier name.");
		}
		try {
			const res = await fetch("http://localhost:3000/suppliers", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, contact_info: contact }),
			});
			if (!res.ok) throw new Error();
			document.getElementById("supplier-form").reset();
			fetchSuppliers(); // refresh list
		} catch {
			alert("Failed to create supplier.");
		}
	});

// Handle Component form submission
document
	.getElementById("component-form")
	.addEventListener("submit", async (e) => {
		e.preventDefault();
		const name = document.getElementById("component-name").value.trim();
		const desc = document.getElementById("component-desc").value.trim();
		if (!name) {
			return alert("Please enter a component name.");
		}
		try {
			const res = await fetch("http://localhost:3000/components", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, description: desc }),
			});
			if (!res.ok) throw new Error();
			document.getElementById("component-form").reset();
			fetchComponents(); // refresh list
		} catch {
			alert("Failed to create component.");
		}
	});

// Initial load of all lists
document.addEventListener("DOMContentLoaded", () => {
	fetchProducts();
	fetchSuppliers();
	fetchComponents();
});
