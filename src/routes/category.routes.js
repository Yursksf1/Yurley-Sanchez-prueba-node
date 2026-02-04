const express = require('express');
const categoriaController = require('../controllers/category.controller');

const router = express.Router();

/**
 * @route GET /categories/with-products
 * @desc Get categories with at least one product, ordered by product count
 * @access Public
 */
router.get('/categorias', categoriaController.getCategoriesWithProducts.bind(categoriaController));

module.exports = router;
