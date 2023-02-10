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
  START_PRODUCT_EDITION,
  PRODUCT_EDITED_SUCCESSFUL,
  PRODUCT_EDITED_ERROR,
} from "../types";
import clientAxios from "../config/axios";
import Swal from "sweetalert2";

//Crear nuevos productos
export function createNewProductAcion(product) {
  return async (dispatch) => {
    dispatch(addProduct());
    try {
      //Primero se inserta en la API
      await clientAxios.post("/products", product);
      //Si todo sale bien, actualiza el state
      dispatch(addProductSuccessful(product));
      //Alerta
      Swal.fire(`${product.name}`, "Agregado correctamente", "success");
    } catch (error) {
      console.log(error);
      //Si hay un error, cambia el state
      dispatch(addProductError(true));

      //Alerta de error
      Swal.fire({
        icon: "error",
        title: "Hubo un error...",
        text: "Intenta de nuevo",
      });
    }
  };
}

const addProduct = () => ({
  type: ADD_PRODUCT,
  payload: true,
});

//Si el producto se guarda en la base de datos
const addProductSuccessful = (product) => ({
  type: ADD_PRODUCT_SUCCESSFUL,
  payload: product,
});

//Si hubo un error
const addProductError = (state) => ({
  type: ADD_PRODUCT_ERROR,
  payload: state,
});

//Funcion que descarga productos de la DB
export function getProductsAction() {
  return async (dispatch) => {
    dispatch(downloadProducts());
    try {
      const response = await clientAxios.get("/products");
      dispatch(downloadProductsSuccessfull(response.data));
    } catch (error) {
      dispatch(downloadProductsError());
    }
  };
}

const downloadProducts = () => ({
  type: DOWNLOAD_PRODUCTS,
  payload: true,
});

const downloadProductsSuccessfull = (products) => ({
  type: DOWNLOAD_PRODUCTS_SUCCESSFUL,
  payload: products,
});

const downloadProductsError = () => ({
  type: DOWNLOAD_PRODUCTS_ERROR,
  payload: true,
});

export function deleteProductAction(id) {
  return async (dispatch) => {
    dispatch(getProductDelete(id));
    try {
      await clientAxios.delete(`products/${id}`);
      dispatch(deleteProductSuccessful());
      Swal.fire("Eliminado!", "El producto ha sido eliminado.", "success");
    } catch (error) {
      console.log(error);
      dispatch(deleteProductError());
    }
  };
}

const getProductDelete = (id) => ({
  type: GET_PRODUCT_DELETE,
  payload: id,
});

const deleteProductSuccessful = () => ({
  type: PRODUCT_DELETED_SUCCESSFUL,
});

const deleteProductError = () => ({
  type: PRODUCT_DELETED_ERROR,
  payload: true,
});

export function getProductEdit(product) {
  return (dispatch) => {
    dispatch(getProductEditAction(product));
  };
}

const getProductEditAction = (product) => ({
  type: GET_PRODUCT_EDIT,
  payload: product,
});

export function editProductAction(product) {
  return async (dispatch) => {
    dispatch(editProduct(product));
    try {
      await clientAxios.put(`products/${product.id}`, product);
      dispatch(editProductSuccessful(product));
    } catch (error) {
      console.log(error);
      dispatch(editProductError());
    }
  };
}

const editProduct = () => ({
  type: START_PRODUCT_EDITION,
});

const editProductSuccessful = (product) => ({
  type: PRODUCT_EDITED_SUCCESSFUL,
  payload: product,
});

const editProductError = () => ({
  type: PRODUCT_EDITED_ERROR,
  payload: true,
});
