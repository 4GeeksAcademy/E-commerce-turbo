
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
		{/* <nav className="navbar navbar-light bg-light"> */}
			<div className="container">
				<Link to="/">
				<img
            src={logo}
            alt="Logo de la Tienda"
            className="navbar-brand mb-0 h1"
            style={{ height: "100px" }} 
          />
				</Link>
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
        <div className="collapse navbar-collapse" id="navbarNav">
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
</li>c 
          </ul>
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
      </div>
    </nav>
  );
};

// const handleSearch = (event) => {
// 	event.preventDefault();
// 	// Lógica para manejar la búsqueda
//   };
  
//   const handleInputChange = (event) => {
// 	// Lógica para manejar el cambio en el input de búsqueda
//   };

export default Navbar;