import {
    GET_ALL_PRODUCTS_ERROR,
    GET_ALL_PRODUCTS_REQ,
    GET_ALL_PRODUCTS_SUCCESS
} from '../constants/productConstants'
import axios from 'axios'


// FOR GET ALL PRODUCTS FOR USER
export const getAllProducts = () => async (dispatch) => {
    try {

        dispatch({ type: GET_ALL_PRODUCTS_REQ })
        const { data } = await axios.get('/api/order/getAllProducts')
        if (data.allProducts) {
            // console.log(data.allProducts)
            return dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: data.allProducts })
        }
        dispatch({ type: GET_ALL_PRODUCTS_ERROR, payload: data.error })
    } catch (error) {
        dispatch({ type: GET_ALL_PRODUCTS_ERROR, payload: error })

    }

}