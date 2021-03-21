import * as cartConstants from '../constants/cartConstants';

export const cartInitialState = {
  cartItems: []
}

export const cartReducer = (state = cartInitialState, action) => {
  switch (action.type) {
    case cartConstants.ADD_TO_CART_REQ:
      const item = action.payload;
      const isItemExists = state.cartItems.find(i => i.product === item.product);
      if (isItemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map(i => i.product === isItemExists.product ? item : i)
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }
    case cartConstants.REMOVE_ITEM_CART_REQ:
      return {
        ...state,
        cartItems: state.cartItems.filter(i => i.product !== action.payload)
      }
    case cartConstants.SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload
      }
    default:
      return state;
  }
}