import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProductAction } from "../actions/productActions";
import { useNavigate } from "react-router-dom";

function EditProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setCount] = useState({
    name: "",
    price,
  });

  const productEdit = useSelector((state) => state.products.productedit);

  useEffect(() => {
    setCount(productEdit);
  }, [productEdit]);

  const handelChange = (e) => {
    setCount({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editProductAction(product));
    navigate("/");
  };
  const { name, price } = product;

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control mb-4"
                  placeholder="Nombre Producto"
                  name="name"
                  value={name}
                  onChange={handelChange}
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
                  onChange={handelChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-wight-bold text-uppercase d-block w-100"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
