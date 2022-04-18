import { combineReducers, createStore, applyMiddleware } from 'redux'
import { profileReducer, userReducer } from './reducers/userReducers'
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'

const reducers = combineReducers({ user: userReducer, profile: profileReducer })

const middleware = [thunk];
const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)));


export default store