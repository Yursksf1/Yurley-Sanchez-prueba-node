const express = require('express');
const promocionController = require('../controllers/promotion.controller');

const router = express.Router();

/**
 * @route GET /promotions?day={day}
 * @desc Get promotions applicable for a specific day of the week
 * @queryParam {number} day - Day of the week (1=Monday, 2=Tuesday, ..., 7=Sunday)
 * @access Public
 */
router.get('/promociones', promocionController.getPromotionsByDay.bind(promocionController));

module.exports = router;
