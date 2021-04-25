import { combineReducers, createStore } from 'redux';
import userReducer from "./user/UserReducer";

const reducer = combineReducers({
    user: userReducer,
});
const store = createStore(reducer);

export default store;
