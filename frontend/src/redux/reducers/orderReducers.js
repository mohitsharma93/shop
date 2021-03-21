import * as orderConstants from '../constants/orderConstants';

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case orderConstants.CREATE_ORDER_REQ:
      return {
        ...state,
        newOrderInProcess: true,
        error: false 
      }      
    case orderConstants.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        newOrderInProcess: false,
        order: action.payload,
      }
    case orderConstants.CREATE_ORDER_ERROR:
      return {
        ...state,
        newOrderInProcess: false,
        error: action.payload,
      }
    case orderConstants.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }     
    default:
      return state;
  }
}

const myOrdersInitialState = {
  orders:[],
  myOrdersInProcess: false,
  error: null
}

export const myOrdersReducer = (state = myOrdersInitialState, action) => {
  switch (action.type) {
    case orderConstants.MY_ORDERS_REQ:
      return {
        ...state,
        myOrdersInProcess: true, 
        error: false 
      }      
    case orderConstants.MY_ORDERS_SUCCESS:
      return {
        ...state,
        myOrdersInProcess: false,
        orders: action.payload.orders,
      }
    case orderConstants.MY_ORDERS_ERROR:
      return {
        ...state,
        myOrdersInProcess: false,
        error: action.payload.message,
      }
    case orderConstants.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }     
    default:
      return state;
  }
}

const orderDetailsInitialState = {
  order: {},
  orderDetailsInProcess: false,
  error: null
}

export const orderDetailsReducer = (state = orderDetailsInitialState, action) => {
  switch (action.type) {
    case orderConstants.ORDER_DETAILS_REQ:
      return {
        ...state,
        orderDetailsInProcess: true, 
        error: false 
      }      
    case orderConstants.ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        orderDetailsInProcess: false,
        order: action.payload.order,
      }
    case orderConstants.ORDER_DETAILS_ERROR:
      return {
        ...state,
        orderDetailsInProcess: false,
        error: action.payload,
      }
    case orderConstants.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }     
    default:
      return state;
  }
}

const allOrdersInitialState = {
  allOrders: [],
  allOrdersInProcess: false,
  error: null,
  totalAmounts: null
}

export const adminAllOrderReducer = (state = allOrdersInitialState, action) => {
  switch (action.type) {
    case orderConstants.ADMIN_ALL_ORDERS_REQ:
      return {
        ...state,
        allOrdersInProcess: true, 
        error: false 
      }      
    case orderConstants.ADMIN_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        allOrdersInProcess: false,
        allOrders: action.payload.orders,
        totalAmounts: action.payload.totalAmount 
      }
    case orderConstants.ADMIN_ALL_ORDERS_ERROR:
      return {
        ...state,
        allOrdersInProcess: false,
        allOrders: [],
        error: action.payload,
      }
    case orderConstants.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }     
    default:
      return state;
  }
}

export const orderInitialState = {
  error: null,
  orderDeleteUpdateInProcess: false,
  isUpdated: false,
  isDeleted: false,
}
export const orderReducer = (state = orderInitialState, action) => {
  switch (action.type) {
    case orderConstants.ADMIN_UPDATE_ORDER_REQ:
    case orderConstants.ADMIN_DELETE_ORDER_REQ:
      return {
        ...state,
        orderDeleteUpdateInProcess: true,
        isUpdated: false
      }
    case orderConstants.ADMIN_UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        orderDeleteUpdateInProcess: false,
        isUpdated: action.payload,
      }
    case orderConstants.ADMIN_DELETE_ORDER_SUCCESS:
      return {
        ...state,
        orderDeleteUpdateInProcess: false,
        isDeleted: action.payload,
      }
    case orderConstants.ADMIN_UPDATE_ORDER_ERROR:
    case orderConstants.ADMIN_DELETE_ORDER_ERROR:
      return {
        ...state,
        orderDeleteUpdateInProcess: false,
        error: action.payload,
      }
    case orderConstants.CLEAR_ERROR:
      return {
        ...state,
        error: null,
        orderDeleteUpdateInProcess: false,
        isUpdated: false, 
        isDeleted: false, 
      }
    default:
      return state;
  }
}