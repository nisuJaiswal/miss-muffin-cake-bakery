import { combineReducers, createStore, applyMiddleware } from 'redux'
import { userReducer } from './reducers/userReducers'
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'

const reducers = combineReducers({ user: userReducer })

const middleware = [thunk];
const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)));


export default store