const express = require('express');
const router = express.Router();

const { newOrder, getOrder, myOrders, allOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth');

router.route('/order/new').post(isAuthenticated, newOrder);
router.route('/order/:orderId').get(isAuthenticated, getOrder);
router.route('/orders/me').get(isAuthenticated, myOrders);

router.route('/admin/orders').get(isAuthenticated, authorizeRoles('admin'), allOrders);
router.route('/admin/order/:orderId')
  .put(isAuthenticated, authorizeRoles('admin'), updateOrder)
  .delete(isAuthenticated, authorizeRoles('admin'), deleteOrder);

module.exports = router;