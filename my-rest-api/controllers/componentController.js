// controllers/componentController.js
// PURPOSE: Handle HTTP requests for Component resources using ES module format

import { Component, Supplier, Product, sequelize } from "../models/index.js";

/**
 * GET /components
 * Lists all components, including associated suppliers and products.
 */
export async function list(req, res) {
	try {
		const components = await Component.findAll({
			include: [Supplier, Product],
		});
		return res.json(components);
	} catch (err) {
		console.error("Error fetching components:", err);
		return res.status(500).json({ error: "Failed to fetch components" });
	}
}

/**
 * POST /components
 * Creates a new component record.
 */
export async function create(req, res) {
	const transac = await sequelize.transaction();
	try {
		const { name, description, supplierIds } = req.body;
		if (!name) {
			return res.status(400).json({ error: "Name is required" });
		}
		const component = await Component.create(
			{ name, description },
			{ transaction: transac }
		);
		if (Array.isArray(supplierIds) && supplierIds.length > 0) {
			await component.addSuppliers(supplierIds, {
				transaction: transac,
			});
		}
		await transac.commit();
		const result = await Component.findByPk(component.id, {
			include: Supplier,
		});
		return res.status(201).json(component);
	} catch (err) {
		await transac.rollback();
		console.error("Error creating component:", err);
		return res.status(500).json({ error: "Failed to create component" });
	}
}

/**
 * PUT /components/:id
 * Updates an existing component by ID.
 */
export async function update(req, res) {
	try {
		const { id } = req.params;
		const { name, description } = req.body;
		const component = await Component.findByPk(id);
		if (!component) {
			return res.status(404).json({ error: "Component not found" });
		}
		await component.update({ name, description });
		return res.json(component);
	} catch (err) {
		console.error("Error updating component:", err);
		return res.status(500).json({ error: "Failed to update component" });
	}
}

/**
 * DELETE /components/:id
 * Deletes a component by ID.
 */
export async function remove(req, res) {
	try {
		const { id } = req.params;
		const component = await Component.findByPk(id);
		if (!component) {
			return res.status(404).json({ error: "Component not found" });
		}
		await component.destroy();
		return res.status(204).end();
	} catch (err) {
		console.error("Error deleting component:", err);
		return res.status(500).json({ error: "Failed to delete component" });
	}
}
