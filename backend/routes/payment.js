const express = require('express');
const router = express.Router();

const { processPayment, getStripeApiKey } = require('../controllers/paymentController');
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth');

router.route('/payment/process').post(isAuthenticated, processPayment);
router.route('/stripe-api').get(isAuthenticated, getStripeApiKey);

module.exports = router;