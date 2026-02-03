const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

/**
 * @route GET /products
 * @desc Get all products with stock per store
 * @access Public
 */
router.get('/products', productController.getProducts.bind(productController));

/**
 * @route GET /products/top-sold
 * @desc Get top 10 best-selling products
 * @access Public
 */
router.get('/products/top-sold', productController.getTopSoldProducts.bind(productController));

module.exports = router;
