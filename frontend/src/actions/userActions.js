import {
    LOGIN_REQUEST,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    CLEAR_ERRORS,
    REG_REQUEST,
    REG_ERROR,
    REG_SUCCESS,
    LOAD_ERROR,
    LOAD_REQUEST,
    LOAD_SUCCESS,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR
} from '../constants/userContstants'
import axios from 'axios'


// FOR LOGIN
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            '/api/user/login',
            { email, password },
            config
        );
        if (data.error) return dispatch({ type: LOGIN_ERROR, payload: data.error })
        dispatch({ type: LOGIN_SUCCESS, payload: data.user })


    } catch (error) {

        dispatch({ type: LOGIN_ERROR, payload: "Wrong Credentials" })
    }
}


// FOR REGISTER
export const register = (formData) => async (dispatch) => {
    try {

        dispatch({ type: REG_REQUEST })
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post('/api/user/register', formData, config)
        // if (data.error !== "") return dispatch({ type: REG_ERROR, payload: error })
        if (data.user)
            return dispatch({ type: REG_SUCCESS, payload: data.user })
        dispatch({ type: REG_ERROR, payload: data.error })
    } catch (error) {


        dispatch({ type: REG_ERROR, payload: error })
    }


}

// FOR GET LOGED IN USER
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_REQUEST })
        const { data } = await axios.get('/api/user/getMe')


        if (data.user) return dispatch({ type: LOAD_SUCCESS, payload: data.user })
        dispatch({ type: LOAD_ERROR, payload: data.error })
    } catch (error) {
        dispatch({ type: LOAD_ERROR, payload: error })
    }
}

// FOR LOGOUT USER
export const logout = () => async (dispatch) => {
    const { data } = await axios.get('/api/user/logout')
    console.log("LOGOUT RESPONSE::: ", data)
    if (data.success) return dispatch({ type: LOGOUT_SUCCESS })
    dispatch({ type: LOGOUT_ERROR })
}


// FOR CLEAR ERRORS
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};