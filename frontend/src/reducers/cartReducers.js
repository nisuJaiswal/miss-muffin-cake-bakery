import { ADD_TO_CART } from "../constants/cartConstants"

export const cartReducer = (state = { cartItems: [] }, action) => {

    switch (action.type) {
        case ADD_TO_CART:

            // state: [...state, action.payload],
            const item = action.payload;
            // console.log(item)
            // const isItemExist = state.cartItems.find(
            //     (i) => i.product === item.product
            // );
            // if (isItemExist) {
            //     return {
            //         ...state,
            //         cartItems: state.cartItems.map((i) =>
            //             i.product === isItemExist.product ? item : i
            //         ),
            //         added: true
            //     };
            // } else {
            //     return {
            //         ...state,
            //         // cartItems: [...state.cartItems, item],
            //         cartItems: [...state.cartItems, item],
            //         added: true
            //     };
            // }
            const isItemExist = state.cartItems.find((cartItem) => cartItem.name === item.name)
            console.log(isItemExist);
            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((cartItem) =>
                        cartItem.name === isItemExist.name ? item : cartItem
                    ),
                    added: true
                }
            }
            return {
                ...state,
                cartItems: [...state.cartItems, item],
                added: true
            }
        default:
            return state
    }
}