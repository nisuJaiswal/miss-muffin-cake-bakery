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

const middleware = [thunk];
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));


export default store