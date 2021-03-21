import * as authConstants from '../constants/authConstants';

export const getAllProductInitialState = {
  error: null,
  // logInInProcess: false,
  user: {},
  // isAuthenticated: false,
}

export const authReducer = (state = getAllProductInitialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQ:
    case authConstants.REGISTER_USER_REQ:
    case authConstants.LOAD_USER_REQ:
      return {
        ...state,
        logInInProcess: true,
        user: null,
        isAuthenticated: false 
      }
    case authConstants.LOGIN_SUCCESS:
    case authConstants.REGISTER_USER_SUCCESS:
    case authConstants.LOAD_USER_SUCCESS:
      return {
        ...state,
        logInInProcess: false,
        user: action.payload.user,
        isAuthenticated: true,
      }
    case authConstants.LOGOUT_SUCCESS:
      return {
        ...state,
        logInInProcess: false,
        user: null,
        isAuthenticated: false
      }
    case authConstants.LOGIN_ERROR:
    case authConstants.REGISTER_USER_ERROR :
      return {
        ...state,
        logInInProcess: false,
        error: action.payload,
        isAuthenticated: false,
        user: null
      }
    case authConstants.LOGOUT_ERROR:
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
      }
    case authConstants.LOAD_USER_ERROR:
      return {
        ...state,
        logInInProcess: false,
        error: action.payload,
        isAuthenticated: false,
        user: null,
      }
    case authConstants.CLEAR_ERROR:
      return {
        ...state,
        error: null,
        // isAuthenticated: false,
      }
    default:
      return state;
  }
}

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case authConstants.UPDATE_PROFILE_REQ:
    case authConstants.UPDATE_PASSWORD_REQ:
      return {
        ...state,
        updateProfileInProcess: true,
        isUpdated: false
      }      
    case authConstants.UPDATE_PROFILE_SUCCESS:
    case authConstants.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        updateProfileInProcess: false,
        isUpdated: action.payload,
      }      
    case authConstants.UPDATE_PROFILE_RESET:
    case authConstants.UPDATE_PASSWORD_RESET:
      return {
        ...state,
        updateProfileInProcess: false,
        isUpdated: false,
      }      
    case authConstants.UPDATE_PROFILE_ERROR:
    case authConstants.UPDATE_PASSWORD_ERROR:
      return {
        ...state,
        updateProfileInProcess: false,
        error: action.payload
      }
    case authConstants.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }
    default:
      return state;
  }
}

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case authConstants.FORGOT_PASSWORD_REQ:
    case authConstants.NEW_PASSWORD_REQ:
      return {
        ...state,
        error: false,
        forgotPasswordInProcess: true
      }      
    case authConstants.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordInProcess: false,
        message: action.payload,
      }
    case authConstants.NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordInProcess: false,
        success: action.payload,
      }       
    case authConstants.FORGOT_PASSWORD_ERROR:
    case authConstants.NEW_PASSWORD_ERROR:
      return {
        ...state,
        error: action.payload,
        forgotPasswordInProcess: false
      }
    case authConstants.CLEAR_ERROR:
      return {
        ...state,
        error: null,
        message: null,
        forgotPasswordInProcess: false
      }
    default:
      return state;
  }
}

export const allUsersReducer = (state = { users: []}, action) => {
  switch (action.type) {
    case authConstants.ALL_USERS_REQ:
      return {
        ...state,
        allUsersInProcess: true,
      }      
    case authConstants.ALL_USERS_SUCCESS:
      return {
        ...state,
        allUsersInProcess: false,
        users: action.payload,
      }     
    case authConstants.ALL_USERS_ERROR:
      return {
        ...state,
        allUsersInProcess: false,
        error: action.payload
      }
    case authConstants.CLEAR_ERROR:
      return {
        ...state,
        error: null,
        users: []
      }
    default:
      return state;
  }
}

export const userDetailsReducer = (state = { user: {}}, action) => {
  switch (action.type) {
    case authConstants.GET_USER_DETAILS_REQ:
      return {
        ...state,
        userInProcess: true,
      }      
    case authConstants.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        userInProcess: false,
        user: action.payload,
      }     
    case authConstants.GET_USER_DETAILS_ERROR:
      return {
        ...state,
        userInProcess: false,
        error: action.payload
      }
    case authConstants.CLEAR_ERROR:
      return {
        ...state,
        error: null,
        user: {}
      }
    default:
      return state;
  }
}

export const updateUserReducer = (state = { isUpdated: false}, action) => {
  switch (action.type) {
    case authConstants.UPDATE_USER_REQ:
    case authConstants.DELETE_USER_REQ:
      return {
        ...state,
        updateUserInProcess: true,
        isUpdated: false
      }      
    case authConstants.UPDATE_USER_SUCCESS:
      return {
        ...state,
        updateUserInProcess: false,
        isUpdated: action.payload,
      }
    case authConstants.DELETE_USER_SUCCESS:
      return {
        ...state,
        updateUserInProcess: false,
        isDeleted: action.payload,
      }    
    case authConstants.UPDATE_USER_RESET:
      return {
        ...state,
        updateUserInProcess: false,
        isUpdated: false,
      }      
    case authConstants.UPDATE_USER_ERROR:
    case authConstants.DELETE_USER_ERROR:
      return {
        ...state,
        updateUserInProcess: false,
        error: action.payload
      }
    case authConstants.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }
    default:
      return state;
  }
}