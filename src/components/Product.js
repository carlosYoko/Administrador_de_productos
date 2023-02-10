import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProductAction, getProductEdit } from "../actions/productActions";
import Swal from "sweetalert2";

export default function Product({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const confirmDeleteProduct = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Esta accion no se puede revertir...",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borralo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProductAction(id));
      }
    });
  };

  const redirectEdition = (product) => {
    dispatch(getProductEdit(product));
    navigate(`/products/edit/${product.id}`);
  };
  const { name, price, id } = product;

  return (
    <tr>
      <td>{name}</td>
      <td>
        <span className="font-weight-bold">{price}€</span>
      </td>
      <td className="actions">
        <button
          type="button"
          onClick={() => redirectEdition(product)}
          className="btn btn-primary mr-2"
        >
          Editar
        </button>
        <button
          onClick={() => confirmDeleteProduct(id)}
          type="button"
          className="btn btn-danger"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}
