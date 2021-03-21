import axios from 'axios';

import * as cartConstants from '../constants/cartConstants';
import makeUrl from '../../redux/convertUrls';

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
	const { data } = await axios.get(makeUrl(`/api/v1/product/${id}`));
	dispatch({
		type: cartConstants.ADD_TO_CART_REQ,
		payload: {
			product: data.product._id,
			name: data.product.name,
			price: data.product.price,
			image: data.product.images[0].url,
			stock: data.product.stock,
			quantity,
		},
	});

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeCartItem = (id) => async (dispatch, getState) => {
	dispatch({
		type: cartConstants.REMOVE_ITEM_CART_REQ,
		payload: id,
	});

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const shippingInfo = (data) => async (dispatch) => {
	dispatch({ type: cartConstants.SHIPPING_INFO, payload: data });
	localStorage.setItem('shippingInfo', JSON.stringify(data));
};
