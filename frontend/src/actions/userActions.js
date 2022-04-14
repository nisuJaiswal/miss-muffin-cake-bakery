import { LOGIN_REQUEST, LOGIN_ERROR, LOGIN_SUCCESS, CLEAR_ERRORS } from '../constants/userContstants'
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

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};