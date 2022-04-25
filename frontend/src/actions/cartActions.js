import axios from 'axios'
import { ADD_TO_CART } from '../constants/cartConstants'
export const addToCart = (id) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/order/${id}`)
    // console.log(data.item)
    dispatch({
        type: ADD_TO_CART,
        payload: {
            name: data.item.name,
            description: data.item.description,
            image: data.item.image,
            price: data.item.price,
            quantity: data.item.quantity
        }
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}