import axios from 'axios';

import * as productConstants from '../constants/productConstants';

export const getProducts = (
	keyword = '',
	currentPage = 1,
	price,
	categories,
	rating
) => async (dispatch) => {
	try {
		dispatch({ type: productConstants.GET_ALL_PRODUCT_REQ });

		let link = `keywords=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`;
		if (categories) {
			link += `&category=${categories}`;
		}
		link += `&rating[gte]=${rating}`;

		const { data } = await axios.get(`/api/v1/products?${link}`);
		dispatch({ type: productConstants.GET_ALL_PRODUCT_SUCCESS, payload: data });
	} catch (err) {
		dispatch({
			type: productConstants.GET_ALL_PRODUCT_ERROR,
			payload: err.response.data.message,
		});
	}
};

// clear errors

export const clearErrors = () => async (dispatch) => {
	dispatch({ type: productConstants.CLEAR_ERROR});
};

export const getProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: productConstants.GET_PRODUCT_DETAIL_REQ });
		const { data } = await axios.get(`/api/v1/product/${id}`);
		dispatch({
			type: productConstants.GET_PRODUCT_DETAIL_SUCCESS,
			payload: data,
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: productConstants.GET_PRODUCT_DETAIL_ERROR,
			payload: err.response.data.message,
		});
	}
};

export const newReview = (reviewData) => async (dispatch) => {
	try {
		dispatch({ type: productConstants.NEW_REVIEW_REQ });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.put(
			`/api/v1/review`,
			reviewData,
			config
		);
		dispatch({ type: productConstants.NEW_REVIEW_SUCCESS, payload: data.success });
		// dispatch(getProductDetails(reviewData.productId));
	} catch (err) {
		console.log(err);
		dispatch({
			type: productConstants.NEW_REVIEW_ERROR,
			payload: err.response.data.message,
		});
	}
};

// admin
export const getAdminProducts = () => async (dispatch) => {
	try {
		dispatch({ type: productConstants.ADMIN_PRODUCT_REQ });

		const { data } = await axios.get(`/api/v1/admin/products`);
		dispatch({ type: productConstants.ADMIN_PRODUCT_SUCCESS, payload: data.products });
	} catch (err) {
		dispatch({
			type: productConstants.ADMIN_PRODUCT_ERROR,
			payload: err.response.data.message,
		});
	}
};

// create new product.
export const createNewProduct = (productData) => async (dispatch) => {
	try {
		dispatch({ type: productConstants.ADMIN_CREATE_PRODUCT_REQ });
	
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const { data } = await axios.post(`/api/v1/admin/product/new`, productData, config);
	
		dispatch({ type: productConstants.ADMIN_CREATE_PRODUCT_SUCCESS, payload: data.success });
	} catch (err) {
		dispatch({
			type: productConstants.ADMIN_CREATE_PRODUCT_ERROR,
			payload: err.response.data.message,
		});
	}
};

export const deleteProduct = (id) => async (dispatch) => {
	try {
		dispatch({ type: productConstants.ADMIN_DELETE_PRODUCT_REQ });
		const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
		dispatch({
			type: productConstants.ADMIN_DELETE_PRODUCT_SUCCESS,
			payload: data.success,
		});
	} catch (err) {
		dispatch({
			type: productConstants.ADMIN_DELETE_PRODUCT_ERROR,
			payload: err.response.data.message,
		});
	}
};

export const updateProduct = (id, productData  ) => async (dispatch) => {
	try {
		dispatch({ type: productConstants.ADMIN_UPDATE_PRODUCT_REQ });
	
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData, config);
	
		dispatch({ type: productConstants.ADMIN_UPDATE_PRODUCT_SUCCESS, payload: data.success });
	} catch (err) {
		dispatch({
			type: productConstants.ADMIN_UPDATE_PRODUCT_ERROR,
			payload: err.response.data.message,
		});
	}
};


export const getProductReviews = (id) => async (dispatch) => {
	try {
		dispatch({ type: productConstants.GET_REVIEWS_PRODUCT_REQ });

		const { data } = await axios.get(`/api/v1/reviews/${id}`);
	
		dispatch({ type: productConstants.GET_REVIEWS_PRODUCT_SUCCESS, payload: data.reviews });
	} catch (err) {
		dispatch({
			type: productConstants.GET_REVIEWS_PRODUCT_ERROR,
			payload: err.response.data.message,
		});
	}
}

export const deleteProductReviews = (id, productId) => async (dispatch) => {
	try {
		dispatch({ type: productConstants.DELETE_REVIEW_REQ });

		const { data } = await axios.delete(`/api/v1/review?reviewId=${id}&productId=${productId}`);
	
		dispatch({ type: productConstants.DELETE_REVIEW_SUCCESS, payload: data });
	} catch (err) {
		dispatch({
			type: productConstants.DELETE_REVIEW_ERROR,
			payload: err.response.data.message,
		});
	}
}
