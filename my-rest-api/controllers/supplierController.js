// controllers/supplierController.js
// PURPOSE: Handle HTTP requests for Supplier resources

import { Supplier, Component } from "../models/index.js";

/**
 * GET /suppliers
 * Lists all suppliers, including the components they supply.
 */
export async function list(req, res) {
	try {
		// fetch all suppliers and eager-load their associated components
		const suppliers = await Supplier.findAll({
			include: Component, // Sequelize will perform the JOIN
		});
		return res.json(suppliers);
	} catch (err) {
		console.error("Error fetching suppliers:", err);
		return res.status(500).json({ error: "Failed to fetch suppliers" });
	}
}

/**
 * POST /suppliers
 * Creates a new supplier record.
 */
export async function create(req, res) {
	try {
		const { name, contact_info } = req.body;
		// simple validation: name is required
		if (!name) {
			return res.status(400).json({ error: "Name is required" });
		}
		// insert into the Supplier table
		const supplier = await Supplier.create({ name, contact_info });
		return res.status(201).json(supplier);
	} catch (err) {
		console.error("Error creating supplier:", err);
		return res.status(500).json({ error: "Failed to create supplier" });
	}
}

/**
 * PUT /suppliers/:id
 * Updates an existing supplier’s name and/or contact info.
 */
export async function update(req, res) {
	try {
		const { id } = req.params; // supplier ID from URL
		const { name, contact_info } = req.body; // updated fields
		// Fetch the supplier; if not found, return 404
		const supplier = await Supplier.findByPk(id);
		if (!supplier) {
			return res.status(404).json({ error: "Supplier not found" });
		}
		// Update the record with new values
		supplier.name = name ?? supplier.name; // only overwrite if provided
		supplier.contact_info = contact_info ?? supplier.contact_info;
		await supplier.save(); // persist changes
		return res.json(supplier);
	} catch (err) {
		console.error("Error updating supplier:", err);
		return res.status(500).json({ error: "Failed to update supplier" });
	}
}

/**
 * DELETE /suppliers/:id
 * Deletes a supplier and its associations.
 */
export async function remove(req, res) {
	try {
		const { id } = req.params; // supplier ID from URL
		// Fetch the supplier; if not found, return 404
		const supplier = await Supplier.findByPk(id);
		if (!supplier) {
			return res.status(404).json({ error: "Supplier not found" });
		}
		// Remove the supplier (Sequelize will clean up the join table entries)
		await supplier.destroy();
		return res.json({ message: "Supplier deleted successfully" });
	} catch (err) {
		console.error("Error deleting supplier:", err);
		return res.status(500).json({ error: "Failed to delete supplier" });
	}
}
