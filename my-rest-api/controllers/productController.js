// controllers/productController.js
// PURPOSE: Handle HTTP requests for Product resources using ES module format

import { Product, Component, sequelize } from "../models/index.js";

/**
 * GET /products
 * Lists all products, including their components.
 */
export async function list(req, res) {
	try {
		const products = await Product.findAll({
			include: [
				{
					model: Component,
					required: true,
				},
			], // eager-load associated components
		});
		return res.json(products);
	} catch (err) {
		console.error("Error fetching products:", err);
		return res.status(500).json({ error: "Failed to fetch products" });
	}
}

/**
 * POST /products
 * Creates a new product. Requires at least one component ID.
 */
export async function create(req, res) {
	// start a transaction
	const t = await sequelize.transaction();

	try {
		const { name, product_code, quantity_on_hand, componentIds } =
			req.body;

		// Validation: name, product_code, and components required
		if (
			!name ||
			!product_code ||
			!Array.isArray(componentIds) ||
			componentIds.length === 0
		) {
			// no need to rollback here, nothing yet in DB
			return res.status(400).json({
				error: "Name, product_code, and at least one componentId are required",
			});
		}

		// 1) Create product within this transaction
		const product = await Product.create(
			{ name, product_code, quantity_on_hand },
			{ transaction: t }
		);

		// 2) Associate components—in the same transaction
		await product.addComponents(componentIds, { transaction: t });

		// 3) If we get here, everything succeeded → commit
		await t.commit();

		// 4) Reload with associations (outside the transaction is fine)
		const result = await Product.findByPk(product.id, {
			include: Component,
		});
		return res.status(201).json(result);
	} catch (err) {
		// Something went wrong: rollback the entire transaction
		await t.rollback();
		console.error("Error creating product:", err);
		return res.status(500).json({ error: "Failed to create product" });
	}
}

/**
 * PUT /products/:id
 * Updates product data and its component associations.
 */
export async function update(req, res) {
	try {
		const { id } = req.params;
		const { name, product_code, quantity_on_hand, componentIds } =
			req.body;
		const product = await Product.findByPk(id);
		if (!product) {
			return res.status(404).json({ error: "Product not found" });
		}
		// Update fields
		await product.update({ name, product_code, quantity_on_hand });
		// If componentIds provided, update associations
		if (Array.isArray(componentIds)) {
			await product.setComponents(componentIds);
		}
		const result = await Product.findByPk(id, { include: Component });
		return res.json(result);
	} catch (err) {
		console.error("Error updating product:", err);
		return res.status(500).json({ error: "Failed to update product" });
	}
}

/**
 * DELETE /products/:id
 * Deletes a product by ID.
 */
export async function remove(req, res) {
	try {
		const { id } = req.params;
		const product = await Product.findByPk(id);
		if (!product) {
			return res.status(404).json({ error: "Product not found" });
		}
		await product.destroy();
		return res.status(204).end();
	} catch (err) {
		console.error("Error deleting product:", err);
		return res.status(500).json({ error: "Failed to delete product" });
	}
}
