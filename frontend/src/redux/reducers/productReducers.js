import * as productConstants from '../constants/productConstants';

export const getAllProductInitialState = {
	error: null,
	productsInProcess: false,
	products: [],
};

export const productReducer = (state = getAllProductInitialState, action) => {
	switch (action.type) {
		case productConstants.GET_ALL_PRODUCT_REQ:
		case productConstants.ADMIN_PRODUCT_REQ:
			return {
				...state,
				productsInProcess: true,
				products: [],
			};
		case productConstants.GET_ALL_PRODUCT_SUCCESS:
			return {
				...state,
				productsInProcess: false,
				products: action.payload.allProducts,
				productsCount: action.payload.productsCount,
				resPerPage: action.payload.resPerPage,
			};
		case productConstants.ADMIN_PRODUCT_SUCCESS:
			return {
				...state,
				productsInProcess: false,
				products: action.payload,
			};
		case productConstants.GET_ALL_PRODUCT_ERROR:
		case productConstants.ADMIN_PRODUCT_ERROR:
			return {
				...state,
				productsInProcess: false,
				error: action.payload,
			};
		case productConstants.CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export const getProductDetailInitialState = {
	error: null,
	productDetails: {},
	productDetailInProcess: false,
};

export const productDetailsReducer = (
	state = { productDetails: {} },
	action
) => {
	switch (action.type) {
		case productConstants.GET_PRODUCT_DETAIL_REQ:
			return {
				...state,
				productDetailInProcess: true,
			};
		case productConstants.GET_PRODUCT_DETAIL_SUCCESS:
			return {
				...state,
				productDetails: action.payload.product,
				productDetailInProcess: false,
			};
		case productConstants.GET_PRODUCT_DETAIL_ERROR:
			return {
				...state,
				error: action.payload,
				productDetailInProcess: false,
			};
		case productConstants.CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export const newReviewInitialState = {
	error: null,
	newReviewInProcess: false,
	success: false,
};

export const newReviewReducer = (state = newReviewInitialState, action) => {
	switch (action.type) {
		case productConstants.NEW_REVIEW_REQ:
			return {
				...state,
				newReviewInProcess: true,
				success: false,
			};
		case productConstants.NEW_REVIEW_SUCCESS:
			return {
				...state,
				newReviewInProcess: false,
				success: action.payload,
			};
		case productConstants.NEW_REVIEW_ERROR:
			return {
				...state,
				newReviewInProcess: false,
				error: action.payload,
			};
		case productConstants.NEW_REVIEW_RESET:
			return {
				...state,
				newReviewInProcess: false,
				success: false,
				error: null,
			};
		default:
			return state;
	}
};

export const newProductByAdmin = {
	error: null,
	createProductInProcess: false,
	success: false,
};
export const createNewProductReducer = (state = newProductByAdmin, action) => {
	switch (action.type) {
		case productConstants.ADMIN_CREATE_PRODUCT_REQ:
			return {
				...state,
				createProductInProcess: true,
				success: false,
			};
		case productConstants.ADMIN_CREATE_PRODUCT_SUCCESS:
			return {
				...state,
				createProductInProcess: false,
				success: action.payload,
			};
		case productConstants.ADMIN_CREATE_PRODUCT_ERROR:
			return {
				...state,
				createProductInProcess: false,
				error: action.payload,
			};
		case productConstants.CLEAR_ERROR:
			return {
				...state,
				error: null,
				createProductInProcess: false,
				success: false,
			};
		default:
			return state;
	}
};

export const productDeleteUpdateInitialState = {
	error: null,
	productDeleteUpdateInProcess: false,
	isDeleted: false,
	success: false,
};
export const productDeleteUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case productConstants.ADMIN_DELETE_PRODUCT_REQ:
		case productConstants.ADMIN_UPDATE_PRODUCT_REQ:
			return {
				...state,
				productDeleteUpdateInProcess: true,
				isDeleted: false,
				isUpdated: false,
			};
		case productConstants.ADMIN_DELETE_PRODUCT_SUCCESS:
			return {
				...state,
				productDeleteUpdateInProcess: false,
				isDeleted: action.payload,
			};
		case productConstants.ADMIN_UPDATE_PRODUCT_SUCCESS:
			return {
				...state,
				productDeleteUpdateInProcess: false,
				isUpdated: action.payload,
			};
		case productConstants.ADMIN_DELETE_PRODUCT_ERROR:
		case productConstants.ADMIN_UPDATE_PRODUCT_ERROR:
			return {
				...state,
				productDeleteUpdateInProcess: false,
				error: action.payload,
			};
		case productConstants.CLEAR_ERROR:
			return {
				...state,
				error: null,
				productDeleteUpdateInProcess: false,
				isDeleted: false,
				isUpdated: false,
			};
		default:
			return state;
	}
};

export const getProductReviews = {
	error: null,
	productReviewsInProcess: false,
	reviews: [],
};
export const getProductReviewsReducer = (state = {reviews: []}, action) => {
	switch (action.type) {
		case productConstants.GET_REVIEWS_PRODUCT_REQ:
			return {
				...state,
				productReviewsInProcess: true,
			};
		case productConstants.GET_REVIEWS_PRODUCT_SUCCESS:
			return {
				productReviewsInProcess: false,
				reviews: action.payload,
			};
		case productConstants.GET_REVIEWS_PRODUCT_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case productConstants.CLEAR_ERROR:
			return {
				error: null,
			};
		default:
			return state;
	}
};

export const deleteReviewReducer = (state = {}, action) => {
	switch (action.type) {
		case productConstants.DELETE_REVIEW_REQ:
			return {
				...state,
				deletedReviewInProcess: true,
			};
		case productConstants.DELETE_REVIEW_SUCCESS:
			return {
				...state,
				deletedReviewInProcess: false,
				isDeleted: action.payload,
			};
		case productConstants.DELETE_REVIEW_ERROR:
			return {
				...state,
				error: action.payload,
        deletedReviewInProcess: false
			};
		case productConstants.DELETE_REVIEW_RESET:
			return {
				...state,
				isDeleted: false
			};
		case productConstants.CLEAR_ERROR:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};
