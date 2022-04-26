import {
    GET_ALL_PRODUCTS_ERROR,
    GET_ALL_PRODUCTS_REQ,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_PRODUCT_ERROR,
    GET_PRODUCT_REQ,
    GET_PRODUCT_SUCCESS
} from '../constants/productConstants'
import axios from 'axios'


// FOR GET ALL PRODUCTS FOR USER
export const getAllProducts = (search) => async (dispatch) => {
    try {

        dispatch({ type: GET_ALL_PRODUCTS_REQ })
        if (search) {
            const { data } = await axios.get(`/api/order/getAllProducts?search=${search}`)
            // http://localhost:4000/api/order/getAllProducts?search=nisu
            if (data.allProducts) {
                // console.log(data.allProducts)
                return dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: data.allProducts })
            }
            dispatch({ type: GET_ALL_PRODUCTS_ERROR, payload: data.error })
        }
        else {

            const { data } = await axios.get('/api/order/getAllProducts')
            if (data.allProducts) {
                // console.log(data.allProducts)
                return dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: data.allProducts })
            }
            dispatch({ type: GET_ALL_PRODUCTS_ERROR, payload: data.error })
        }

    } catch (error) {
        dispatch({ type: GET_ALL_PRODUCTS_ERROR, payload: error })

    }
}

export const getItemDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_PRODUCT_REQ })
        const { data } = await axios.get(`/api/order/${id}`)
        if (data.error) return dispatch({ type: GET_PRODUCT_ERROR, payload: data.error })
        dispatch({ type: GET_PRODUCT_SUCCESS, payload: data.item })
    } catch (error) {
        dispatch({ type: GET_PRODUCT_ERROR, payload: error })
    }
}