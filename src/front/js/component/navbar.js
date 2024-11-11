
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '/workspaces/E-commerce-turbo/src/front/img/Logo Eureco Aceite.jpg';
import '../../styles/Navbar.css';

export const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* Navbar container */}
      <div className="container">
        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="Logo de la Tienda"
            className="navbar-brand mb-0 h1"
            style={{ height: "100px" }}
          />
        </Link>

        {/* Navbar toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar collapse */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Navbar links */}
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ border: "none", background: "none" }}
              >
                Hombres
              </button>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/hombres/ropa">Ropa</Link>
                <Link className="dropdown-item" to="/hombres/zapatos">Zapatos</Link>
              </div>
            </li>
          </ul>

          {/* Search bar */}
          <form className="form-inline my-2 my-lg-0" onSubmit={handleSearch}>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Buscar productos"
              aria-label="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
              Buscar
            </button>
          </form>
        </div>

        {/* User and Cart icons */}
        <div className="navbar-icons">
          <Link to="/login" className="navbar-icon">
            <i className="fas fa-user"></i>
          </Link>
          <Link to="/carrito" className="navbar-icon">
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-count">0</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
 