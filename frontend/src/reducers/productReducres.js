import { GET_ALL_PRODUCTS_ERROR, GET_ALL_PRODUCTS_REQ, GET_ALL_PRODUCTS_SUCCESS, GET_PRODUCT_ERROR, GET_PRODUCT_REQ, GET_PRODUCT_SUCCESS } from "../constants/productConstants"

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
export const productDetailReducer = (state = { productDetail: {} }, action) => {
    switch (action.type) {

        case GET_PRODUCT_REQ:
            return {

                loading: true,

            }
        case GET_PRODUCT_SUCCESS:
            return {
                loading: false,
                productDetail: action.payload
            }
        case GET_PRODUCT_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}