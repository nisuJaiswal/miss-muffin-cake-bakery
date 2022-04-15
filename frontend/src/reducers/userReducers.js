import { LOGIN_REQUEST, LOGIN_ERROR, LOGIN_SUCCESS, CLEAR_ERRORS, REG_REQUEST, REG_ERROR, REG_SUCCESS, LOAD_REQUEST, LOAD_ERROR, LOAD_SUCCESS, LOGOUT_SUCCESS, LOGOUT_ERROR } from '../constants/userContstants'

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REG_REQUEST:
        case LOAD_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            }

        case LOGIN_SUCCESS:
        case REG_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case LOGIN_ERROR:
        case REG_ERROR:
        case LOAD_ERROR:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: action.payload,
                user: null
            }

        case LOAD_SUCCESS:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false
            }

        case LOGOUT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
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