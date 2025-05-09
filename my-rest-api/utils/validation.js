// utils/validation.js
// PURPOSE: Custom request‐body validators for our entities

/**
 * validateSupplier
 * Ensures req.body has a non-empty string `name` and optional `contact_info`.
 */
export function validateSupplier(req, res, next) {
  const { name, contact_info } = req.body;

  // name must be present and a non-empty string
  if (typeof name !== 'string' || name.trim().length === 0) {
    return res
      .status(400)
      .json({ error: 'Validation failed', details: ['`name` is required'] });
  }

  // contact_info, if provided, must be a string
  if (
    contact_info !== undefined &&
    typeof contact_info !== 'string'
  ) {
    return res
      .status(400)
      .json({ error: 'Validation failed', details: ['`contact_info` must be a string'] });
  }

  next(); // data is valid—move to controller
}

/**
 * validateComponent
 * Ensures req.body has a non-empty string `name` and optional `description`.
 */
export function validateComponent(req, res, next) {
  const { name, description } = req.body;

  if (typeof name !== 'string' || name.trim().length === 0) {
    return res
      .status(400)
      .json({ error: 'Validation failed', details: ['`name` is required'] });
  }

  if (
    description !== undefined &&
    typeof description !== 'string'
  ) {
    return res
      .status(400)
      .json({ error: 'Validation failed', details: ['`description` must be a string'] });
  }

  next();
}

/**
 * validateProduct
 * Ensures req.body has required fields and correct types:
 * - name: non-empty string
 * - product_code: non-empty string
 * - quantity_on_hand: integer ≥ 0
 * - componentIds: non-empty array of integers
 */
export function validateProduct(req, res, next) {
  const { name, product_code, quantity_on_hand, componentIds } = req.body;
  const errors = [];

  if (typeof name !== 'string' || name.trim().length === 0) {
    errors.push('`name` is required');
  }
  if (typeof product_code !== 'string' || product_code.trim().length === 0) {
    errors.push('`product_code` is required');
  }
  if (
    typeof quantity_on_hand !== 'number' ||
    !Number.isInteger(quantity_on_hand) ||
    quantity_on_hand < 0
  ) {
    errors.push('`quantity_on_hand` must be an integer ≥ 0');
  }
  if (
    !Array.isArray(componentIds) ||
    componentIds.length === 0 ||
    !componentIds.every(id => Number.isInteger(id))
  ) {
    errors.push('`componentIds` must be a non-empty array of integers');
  }

  if (errors.length) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  next();
}
