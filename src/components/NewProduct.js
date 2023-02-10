import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//Actions de Redux
import { createNewProductAcion } from "../actions/productActions";
import { showAlert, hideAlertAcion } from "../actions/alertActions";

function NewProduct({ history }) {
  //State del component
  const [name, nameState] = useState("");
  const [price, priceState] = useState(0);

  //useDispatch crea una nueva funcion
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const alert = useSelector((state) => state.alert.alert);

  const navigate = useNavigate();

  //Manda llamar el action de productAction
  const addNewProduct = (product) => dispatch(createNewProductAcion(product));

  const submitNewProduct = (e) => {
    e.preventDefault();
    //Validar formulario
    if (name === "" || price <= 0) {
      const alert = {
        msg: "Todos los campos son obligatorios!",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(showAlert(alert));
      return;
    }
    //Si no hay errores
    dispatch(hideAlertAcion());
    //Crear el nuevo producto
    addNewProduct({
      name,
      price,
    });

    //Redirecciona al index
    navigate("/");
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Añadir nuevo producto
            </h2>
            {alert ? <p className={alert.classes}>{alert.msg}</p> : null}
            <form onSubmit={submitNewProduct}>
              <div>
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control mb-4"
                  placeholder="Nombre Producto"
                  name="name"
                  value={name}
                  onChange={(e) => nameState(e.target.value)}
                />
              </div>
              <div>
                <label>Precio Producto</label>
                <input
                  type="number"
                  className="form-control mb-4"
                  placeholder="Precio Producto"
                  name="price"
                  value={price}
                  onChange={(e) => priceState(+e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-wight-bold text-uppercase d-block w-100"
              >
                Añadir
              </button>
            </form>
            {loading ? <p>Cargando</p> : null}
            {error ? (
              <p className="alert alert-danger p2 mt-4 text-center">
                Ha habido un error...
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewProduct;
