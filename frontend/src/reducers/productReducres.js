import { GET_ALL_PRODUCTS_ERROR, GET_ALL_PRODUCTS_REQ, GET_ALL_PRODUCTS_SUCCESS } from "../constants/productConstants"

export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS_REQ:
            return {
                loading: true,
                products: []
            }
        case GET_ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        case GET_ALL_PRODUCTS_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }

}