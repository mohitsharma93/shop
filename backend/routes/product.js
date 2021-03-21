const express = require('express');
const router = express.Router();

const {
	getProducts,
	getAdminProducts,
	newProduct,
	getProduct,
	updateProduct,
	deleteProduct,
	createProductReview,
	getProductReview,
	deleteReview
} = require('../controllers/productController');

const { isAuthenticated, authorizeRoles } = require('../middlewares/auth');

router.route('/products').get(getProducts);
router.route('/admin/products').get(getAdminProducts);
router.route('/product/:id').get(getProduct);
router
	.route('/admin/product/new')
	.post(isAuthenticated, authorizeRoles('admin'), newProduct);
router
	.route('/admin/product/:id')
	.put(isAuthenticated, authorizeRoles('admin'), updateProduct)
	.delete(isAuthenticated, authorizeRoles('admin'), deleteProduct);

router.route('/reviews/:productId').get(isAuthenticated, getProductReview);
router.route('/review').put(isAuthenticated, createProductReview).delete(isAuthenticated, deleteReview);

module.exports = router;
