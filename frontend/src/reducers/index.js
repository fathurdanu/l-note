import { combineReducers } from "redux";
import customerReducer from "./customerReducer";
import adminReducer from "./adminReducer";
import shoppingReducer from "./shoppingReducer";

export default combineReducers({
    customerReducer,
    adminReducer,
    shoppingReducer
});