import axios from 'axios';

import * as orderConstants from '../constants/orderConstants';

// clear errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: orderConstants.CLEAR_ERROR });
};

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({ type: orderConstants.CREATE_ORDER_REQ });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.post('/api/v1/order/new', order, config);

		dispatch({ type: orderConstants.CREATE_ORDER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: orderConstants.CREATE_ORDER_ERROR,
			payload: error.response.data.message,
		});
	}
};

// get currently logged in user orders,.
export const myOrders = () => async (dispatch) => {
	try {
		dispatch({ type: orderConstants.MY_ORDERS_REQ });
		const { data } = await axios.get('/api/v1/orders/me');

		dispatch({ type: orderConstants.MY_ORDERS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: orderConstants.MY_ORDERS_ERROR,
			payload: error.response.data.message,
		});
	}
};

// get currently logged in user orders,.
export const getOrderDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: orderConstants.ORDER_DETAILS_REQ });
		const { data } = await axios.get(`/api/v1/order/${id}`);

		dispatch({ type: orderConstants.ORDER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: orderConstants.ORDER_DETAILS_ERROR,
			payload: error.response.data.message,
		});
	}
};

// get all orders for admin,.
export const getAllOrders = () => async (dispatch) => {
	try {
		dispatch({ type: orderConstants.ADMIN_ALL_ORDERS_REQ });
		const { data } = await axios.get('/api/v1/admin/orders');

		dispatch({ type: orderConstants.ADMIN_ALL_ORDERS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: orderConstants.ADMIN_ALL_ORDERS_ERROR,
			payload: error.response.data.message,
		});
	}
};

// update order
export const updateOrder = (id, orderData) => async (dispatch) => {
	try {
		dispatch({ type: orderConstants.ADMIN_UPDATE_ORDER_REQ });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.put(
			`/api/v1/admin/order/${id}`,
			orderData,
			config
		);

		dispatch({
			type: orderConstants.ADMIN_UPDATE_ORDER_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: orderConstants.ADMIN_UPDATE_ORDER_ERROR,
			payload: error.response.data.message,
		});
	}
};

export const deleteOrder = (id) => async (dispatch) => {
	try {
		dispatch({ type: orderConstants.ADMIN_DELETE_ORDER_REQ });
		const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
		dispatch({
			type: orderConstants.ADMIN_DELETE_ORDER_SUCCESS,
			payload: data.success,
		});
	} catch (err) {
		dispatch({
			type: orderConstants.ADMIN_DELETE_ORDER_ERROR,
			payload: err.response.data.message,
		});
	}
};
