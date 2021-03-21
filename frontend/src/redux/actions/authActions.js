import axios from 'axios';

import * as authConstants from '../constants/authConstants';

// clear errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: authConstants.CLEAR_ERROR });
};

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: authConstants.LOGIN_REQ });
   
    const config = {
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.post(`/api/v1/login`, {email, password}, config);
		dispatch({ type: authConstants.LOGIN_SUCCESS, payload: data});
	} catch (err) {
		dispatch({
			type: authConstants.LOGIN_ERROR,
			payload: err.response.data.message,
		});
	}
};

export const registerUser = (userData) => async (dispatch) => {
	try {
		dispatch({ type: authConstants.REGISTER_USER_REQ });
   
    const config = {
      headers : {
				'Content-type' : 'multipart/form-data'
      }
    }
    const { data } = await axios.post(`/api/v1/register`, userData, config);
		dispatch({ type: authConstants.REGISTER_USER_SUCCESS, payload: data});
	} catch (err) {
		dispatch({
			type: authConstants.REGISTER_USER_ERROR,
			payload: err.response.data.message,
		});
	}
};

export const loadUser = () => async (dispatch) => {
	try {
		dispatch({ type: authConstants.LOAD_USER_REQ });
  
    const config = {
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.get(`/api/v1/me`, config);
	
		dispatch({ type: authConstants.LOAD_USER_SUCCESS, payload: data});
	} catch (err) {
		dispatch({
			type: authConstants.LOAD_USER_ERROR,
			payload: err.response.data.message,
		});
	}
};

export const logout = () => async (dispatch) => {
	try {
    await axios.get(`/api/v1/logout`);
	
		dispatch({ type: authConstants.LOGOUT_SUCCESS});
	} catch (err) {
		console.log(err)
		dispatch({
			type: authConstants.LOGOUT_ERROR,
			payload: err.response.data.message,
		});
	}
};

// update Profile 
export const updateProfile = (userData) => async (dispatch) => {
	try {
		dispatch({ type: authConstants.UPDATE_PROFILE_REQ });
   
    const config = {
      headers : {
				'Content-type' : 'multipart/form-data'
      }
    }
    const { data } = await axios.put(`/api/v1/me/update`, userData, config);
		dispatch({ type: authConstants.UPDATE_PROFILE_SUCCESS, payload: data.success});
	} catch (err) {
		dispatch({
			type: authConstants.UPDATE_PROFILE_ERROR,
			payload: err.response.data.message,
		});
	}
};

// update password
export const updatePassword = (passwords) => async (dispatch) => {
	try {
		dispatch({ type: authConstants.UPDATE_PASSWORD_REQ });
   
    const config = {
      headers : {
				'Content-type' : 'application/json'
      }
    }
    const { data } = await axios.put(`/api/v1/password/update`, passwords, config);
		dispatch({ type: authConstants.UPDATE_PASSWORD_SUCCESS, payload: data.success});
	} catch (err) {
		dispatch({
			type: authConstants.UPDATE_PASSWORD_ERROR,
			payload: err.response.data.message,
		});
	}
};

// forgot password
export const forgotPassword = (email) => async (dispatch) => {
	try {
		dispatch({ type: authConstants.FORGOT_PASSWORD_REQ });
	
		const config = {
      headers : {
				'Content-type' : 'application/json'
      }
    }
    const { data } = await axios.post(`/api/v1/password/forgot`, email, config);
		dispatch({ type: authConstants.FORGOT_PASSWORD_SUCCESS, payload: data.message});
	} catch (err) {
		dispatch({
			type: authConstants.FORGOT_PASSWORD_ERROR,
			payload: err.response.data.message,
		});
	}
};

// forgot password
export const resetPassword = (token, passwords) => async (dispatch) => {
	try {
		dispatch({ type: authConstants.NEW_PASSWORD_REQ });
	
		const config = {
      headers : {
				'Content-type' : 'application/json'
      }
    }
    const { data } = await axios.put(`/api/v1/password/reset${token}`, passwords, config);
		dispatch({ type: authConstants.NEW_PASSWORD_SUCCESS, payload: data.message});
	} catch (err) {
		dispatch({
			type: authConstants.NEW_PASSWORD_ERROR,
			payload: err.response.data.message,
		});
	}
};

// get all users => admin
export const getAllUsers = () => async (dispatch) => {
	try {
		dispatch({ type: authConstants.ALL_USERS_REQ });

    const { data } = await axios.get(`/api/v1/admin/users`);
	
		dispatch({ type: authConstants.ALL_USERS_SUCCESS, payload: data.allUsers});
	} catch (err) {
		dispatch({
			type: authConstants.ALL_USERS_ERROR,
			payload: err.response.data.message,
		});
	}
};

// update user => admin
export const updateUser = (id , userData) => async (dispatch) => { console.log(id)
	try {
		dispatch({ type: authConstants.UPDATE_USER_REQ });
		const config = {
      headers : {
				'Content-type' : 'application/json'
      }
    }
    const { data } = await axios.put(`/api/v1/admin/user/${id}`, userData, config);
	
		dispatch({ type: authConstants.UPDATE_USER_SUCCESS, payload: data.success});
	} catch (err) {
		dispatch({
			type: authConstants.UPDATE_USER_ERROR,
			payload: err.response.data.message,
		});
	}
};

// Get user details - ADMIN
export const getUserDetails = (id) => async (dispatch) => {
	try {
			dispatch({ type: authConstants.GET_USER_DETAILS_REQ })

			const { data } = await axios.get(`/api/v1/admin/user/${id}`)

			dispatch({
					type: authConstants.GET_USER_DETAILS_SUCCESS,
					payload: data.user
			})

	} catch (error) {
			dispatch({
					type: authConstants.GET_USER_DETAILS_ERROR,
					payload: error.response.data.message
			})
	}
}

// Delete user - ADMIN
export const deleteUser = (id) => async (dispatch) => {
	try {
			dispatch({ type: authConstants.DELETE_USER_REQ })

			const { data } = await axios.delete(`/api/v1/admin/user/${id}`)

			dispatch({
					type: authConstants.DELETE_USER_SUCCESS,
					payload: data.success
			})

	} catch (error) {
			dispatch({
					type: authConstants.DELETE_USER_ERROR,
					payload: error.response.data.message
			})
	}
}