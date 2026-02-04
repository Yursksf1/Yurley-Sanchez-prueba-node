const express = require('express');
const productoController = require('../controllers/product.controller');

const router = express.Router();

/**
 * @route GET /products/top-sold
 * @desc Get top 10 best-selling products
 * @access Public
 */
router.get('/productos/mas-vendidos', productoController.getTopSoldProducts.bind(productoController));

/**
 * @route GET /products
 * @desc Get all products with stock per store
 * @access Public
 */
router.get('/productos', productoController.getProducts.bind(productoController));

module.exports = router;
