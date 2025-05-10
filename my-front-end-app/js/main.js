// js/main.js
// PURPOSE: Entry point that initializes each feature slice
import { initSupplierSection } from './supplier.js';
import { initComponentSection } from './component.js';
import { initProductSection } from './product.js';

document.addEventListener('DOMContentLoaded', () => {
  initSupplierSection({
    listId: 'supplier-list',
    formId: 'supplier-form',
    apiBase: 'http://localhost:3000/suppliers'
  });

  initComponentSection({
    listId: 'component-list',
    formId: 'component-form',
    apiBase: 'http://localhost:3000/components'
  });

  initProductSection({
    listId: 'product-list',
    formId: 'product-form',
    apiBase: 'http://localhost:3000/products'
  });
});