import { createStore, combineReducers, applyMiddleware,  } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productReducer, productDetailsReducer, newReviewReducer, createNewProductReducer , productDeleteUpdateReducer, getProductReviewsReducer, deleteReviewReducer } from './redux/reducers/productReducers';
import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer, updateUserReducer , userDetailsReducer} from './redux/reducers/authReducer';
import {  newOrderReducer, myOrdersReducer, orderDetailsReducer, adminAllOrderReducer, orderReducer  } from './redux/reducers/orderReducers';
import { cartReducer  } from './redux/reducers/cartReducers';
import { shippingInfo } from './redux/actions/cartActions';

const reducer = combineReducers({
  product : productReducer,
  productDetails: productDetailsReducer,
  createProduct: createNewProductReducer, // admin
  productDeleteUpdate: productDeleteUpdateReducer,
  productReviews: getProductReviewsReducer,
  deleteReview: deleteReviewReducer,
  auth: authReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  updateUser: updateUserReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  adminAllOrders: adminAllOrderReducer,
  order: orderReducer,
  newReview: newReviewReducer
});

const initialState = {
  cart : {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
  }
};

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;