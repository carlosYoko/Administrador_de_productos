import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

// Antigua configuracion?
// import { applyMiddleware, compose } from "redux";
// import { legacy_createStore as createStore } from "redux";
// import thunk from "redux-thunk";
// import reducer from "./reducers";

const store = configureStore({ reducer: rootReducer });

export default store;
