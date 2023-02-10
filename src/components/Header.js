import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-color navbar-expand-lg navbar-dark bg-primary justify-content-between">
      <div className="container">
        <h1>
          <Link to={"/"} className="text-light">
            ADMINISTRADOR DE PRODUCTOS
          </Link>
        </h1>
      </div>
      <Link
        to={"/products/new"}
        className="btn btn-danger new-post d-block d-md-inline"
      >
        {" "}
        Agregar producto
      </Link>
    </nav>
  );
}

export default Header;
