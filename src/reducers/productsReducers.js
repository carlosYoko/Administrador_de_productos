import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESSFUL,
  ADD_PRODUCT_ERROR,
  DOWNLOAD_PRODUCTS,
  DOWNLOAD_PRODUCTS_SUCCESSFUL,
  DOWNLOAD_PRODUCTS_ERROR,
  GET_PRODUCT_DELETE,
  PRODUCT_DELETED_SUCCESSFUL,
  PRODUCT_DELETED_ERROR,
  GET_PRODUCT_EDIT,
  PRODUCT_EDITED_SUCCESSFUL,
  PRODUCT_EDITED_ERROR,
} from "../types";

//Cada reducert tiene su propio state
const initialState = {
  products: [],
  error: null,
  loading: false,
  productdelete: null,
  productedit: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DOWNLOAD_PRODUCTS:
    case ADD_PRODUCT:
      return {
        ...state,
        loading: action.payload,
      };
    case ADD_PRODUCT_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
      };
    case ADD_PRODUCT_ERROR:
    case DOWNLOAD_PRODUCTS_ERROR:
    case PRODUCT_DELETED_ERROR:
    case PRODUCT_EDITED_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DOWNLOAD_PRODUCTS_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };

    case GET_PRODUCT_DELETE:
      return {
        ...state,
        productdelete: action.payload,
      };

    case PRODUCT_DELETED_SUCCESSFUL:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== state.productdelete
        ),
        productdelete: null,
      };
    case GET_PRODUCT_EDIT:
      return {
        ...state,
        productedit: action.payload,
      };
    case PRODUCT_EDITED_SUCCESSFUL:
      return {
        ...state,
        productedit: null,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? (product = action.payload)
            : product
        ),
      };
    default:
      return state;
  }
}
