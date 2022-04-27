import { combineReducers, createStore, applyMiddleware } from 'redux'
import { profileReducer, userReducer } from './reducers/userReducers'
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'
import { productReducer, productDetailReducer } from './reducers/productReducres';
import { cartReducer } from './reducers/cartReducers';

const reducer = combineReducers({
    products: productReducer,
    user: userReducer,
    profile: profileReducer,
    productDetail: productDetailReducer,
    cart: cartReducer
})
const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
    }
}
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));


export default store