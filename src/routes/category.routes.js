const express = require('express');
const categoryController = require('../controllers/category.controller');

const router = express.Router();

/**
 * @route GET /categories/with-products
 * @desc Get categories with at least one product, ordered by product count
 * @access Public
 */
router.get('/categories/with-products', categoryController.getCategoriesWithProducts);

module.exports = router;
