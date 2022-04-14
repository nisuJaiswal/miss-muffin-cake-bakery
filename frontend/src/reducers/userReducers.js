import { LOGIN_REQUEST, LOGIN_ERROR, LOGIN_SUCCESS, CLEAR_ERRORS } from '../constants/userContstants'

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: action.payload,
                user: null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state
    }
}