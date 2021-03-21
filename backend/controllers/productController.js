const cloudinary = require('cloudinary');

const productModel = require('../models/products');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const ApiFeature = require('../utils/ApiFeatures');

// create new product  => api/v1/produ 
exports.getProducts = catchAsyncError(async (req, res, next) => {
	const resPerPage = 8;
	const productsCount = await productModel.countDocuments();
	const apiFeature = new ApiFeature(productModel.find(), req.query)
		.search()
		.filter();
	let allProducts = await apiFeature.query;
  const filteredProductsCount = allProducts.length;

  apiFeature.pagination(resPerPage);
  allProducts = await apiFeature.query; 

	res.status(200).json({
		success: true,
		allProducts,
		resPerPage,
		productsCount,
    filteredProductsCount
	});
	res.end();
});

// Get All Products  /api/v1/admin/products
exports.getAdminProducts  = catchAsyncError(async (req, res, next) => {
  const products = await productModel.find(); 

	res.status(200).json({
		success: true,
		products
	});
	res.end();
});

// create new product  => api/v1/admin/product/new
exports.newProduct = catchAsyncError(async (req, res, next) => {

	let images = [];
	if (typeof req.body.image === 'string') {
		images.push(req.body.images);
	} else {
		images = req.body.images;
	}

	let imagesLinks = [];
	for (let i = 0; i < images.length; i++) {
		const result = await cloudinary.v2.uploader.upload(images[i], {
				folder: 'products'
		});

		imagesLinks.push({
				public_id: result.public_id,
				url: result.secure_url
		})
	}

	req.body.images = imagesLinks;
	req.body.user = req.user.id;
	const product = await productModel.create(req.body);
	res.status(201).json({
		success: true,
		product,
	});
});

// get single product details  => api/v1/product/:id
exports.getProduct = catchAsyncError(async (req, res, next) => {
	const product = await productModel.findById(req.params.id);
	if (!product) {
		return next(new ErrorHandler('Product not found', 404));
	}
	res.status(200).json({
		success: true,
		product,
	});
	res.end();
});

// update product  => api/v1/admin/product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
	let product = await productModel.findById(req.params.id);
	if (!product) {
		return res.status(404).json({
			success: false,
			error: ['Product not found.'],
		});
	}

	product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		product,
	});
	res.end();
});

// delete product  => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
	let product = await productModel.findById(req.params.id);
	if (!product) {
		return res.status(404).json({
			success: false,
			error: ['Product not found.'],
		});
	}

	// deleted image associated with product
	for(let i = 0; i < product.images.length; i++) {
		const result = await cloudinary.v2.uploader.destroy(product.images[i]?.public_id);
	}

	product.remove();

	res.status(200).json({
		success: true,
		message: 'Product deleted successfully.',
	});
	res.end();
});

// Create new review => /api/v1/review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
	const { rating, comment, productId } = req.body;
	const review = {
		user: req.user._id,
		name: req.user.name,
		rating: Number(rating),
		comment,
	};
	let product = await productModel.findById(productId);

	const isReviewed = product.reviews.find(
		(r) => r.user?.toString() === req.user._id.toString()
	);

	if (isReviewed) {
		product.reviews.forEach((r) => {
			if (r.user?.toString() === req.user._id.toString()) {
				r.comment = comment;
				r.rating = rating;
			}
		});
	} else {
		product.reviews.push(review);
		product.numberOfReviews = product.reviews.length;
	}

	product.rating =
		product.reviews.reduce((acc, item) => item.rating + acc, 0) /
		product.reviews.length;
	product.numOfReviews = product.reviews.length;
	product = await product.save({ validateBeforeSave: false });

	res.status(200).json({
		success: true,
		product,
	});
});

// Get all review of product => /api/v1/reviews
exports.getProductReview = catchAsyncError(async (req, res, next) => {
	const product = await productModel.findById(req.params.productId);

	res.status(200).json({
		success: true,
		reviews: product.reviews,
	});
});

// Delete reviews => /api/v1/review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
	let product = await productModel.findById(req.query.productId);
	
	const reviews = product.reviews.filter(
		(r) => r._id.toString() !== req.query.reviewId.toString()
	);
		
	const numOfReviews = reviews.length;

	const ratings =
		product.reviews.reduce((acc, item) => item.rating + acc, 0) /
		reviews.length;

	product = await productModel.findByIdAndUpdate(
		req.query.productId,
		{
			reviews,
			ratings,
			numOfReviews,
		},
		{
			new: true,
			runValidators: true,
			useFindAndModify: false,
		}
	);

	res.status(200).json({
		success: true,
		review: product.reviews,
	});
});
