const Order = require('../models/order');
const Product = require('../models/products');

const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const order = require('../models/order');

// Create a new Order => /api/v1/order/new

exports.newOrder = catchAsyncError(async (req, res, next) => {
	const {
		orderItems,
		shippingAddress,
		itemPrice,
		itemCount,
		taxPrice,
		shippingPrice,
		totalPrice,
		paymentInfo,
	} = req.body;
	const paidAt = Date.now();
	const order = await Order.create({
		orderItems,
		shippingAddress,
		paymentInfo,
		itemPrice,
		itemCount,
		taxPrice,
		shippingPrice,
		totalPrice,
		paidAt,
		user: req.user.id,
	});

	res.status(200).json({
		success: true,
		order,
	});
	res.end();
});

// Get single order => /api/v1/order/:id
exports.getOrder = catchAsyncError(async (req, res, next) => {
	const order = await Order.findById(req.params.orderId).populate('user', 'name email');

	if (!order) {
		return next(new ErrorHandler('No order found with id'), 404);
	}

	res.status(200).json({
		success:true,
		order
	});
})


// Get logged in user order => /api/v1/orders/me
exports.myOrders = catchAsyncError(async (req, res, next) => {
	const orders = await Order.find({ user: req.user._id });
	res.status(200).json({
		success:true,
		orders
	});

	res.end();
})

// Get all orders => /api/v1/admin/orders
exports.allOrders = catchAsyncError(async (req, res, next) => {
	const orders = await Order.find();
	let totalAmount = orders.reduce((acc, v) => acc + v.totalPrice, 0);
	res.status(200).json({
		success:true,
		totalAmount,
		orders
	});
})

// update Order status => /api/vi/admin/order/:id
exports.updateOrder = catchAsyncError(async (req, res, next) => {
	let order = await Order.findById(req.params.orderId);

	if (order.OrderStatus === 'Delivered') {
		return next(new ErrorHandler('you have already delivered order.', 404))
	}

	order.orderItems.forEach(async order => {
		await updateStock(order.product, order.quantity);
	});
	order.OrderStatus = req.body.status;
	order.deliveredDate = Date.now();

	order = await order.save();
	res.status(200).json({
		success:true,
		order
	});
})

async function updateStock(productId, quantity) {
	const product = await Product.findById(productId);
	product.stock = product.stock - quantity;
	await product.save({ validateBeforeSave: false});
}

// delete Order  => /api/vi/admin/order/:id
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
	let order = await Order.findById(req.params.orderId);

	if (!order) {
		return next(new ErrorHandler('No order found with id', 404))
	}

	order = await order.remove();

	res.status(200).json({
		success:true,
		message: 'Order deleted successfully. '
	});
})