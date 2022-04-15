import { LOGIN_REQUEST, LOGIN_ERROR, LOGIN_SUCCESS, CLEAR_ERRORS, REG_REQUEST, REG_ERROR, REG_SUCCESS } from '../constants/userContstants'
import axios from 'axios'
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            '/api/user/login',
            { email, password },
            config
        );
        dispatch({ type: LOGIN_SUCCESS, payload: data.user })
        // dispatch({ type: LOGIN_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({ type: LOGIN_ERROR, payload: "CREDENTIALS ARE WRONG" })
    }
}

export const register = (formData) => async (dispatch) => {
    try {

        dispatch({ type: REG_REQUEST })
        console.log(formData.get('userimage'))
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

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};