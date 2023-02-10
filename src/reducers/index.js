import { combineReducers } from "redux";
import productsReducers from "./productsReducers";
import alertReducers from "./alertReducers";

export default combineReducers({
  products: productsReducers,
  alert: alertReducers,
});
