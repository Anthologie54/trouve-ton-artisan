import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Header.scss";

const Header = () => {
  return (
<nav className="navbar navbar-expand-lg navbar-light custom-navbar">
  <div className="container d-flex flex-column justify-content-end">
    <div className="w-100 d-flex justify-content-between align-items-end">
      {/* Logo */}
      <Link to="/" className="navbar-brand logo-wrapper">
        <img src="/images/logo.png" alt="Logo" className="logo-img" />
      </Link>
    {/* Menu*/}
      <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item"><a className="nav-link" href="#">Bâtiment</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Services</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Alimentation</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Fabrication</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Artisan</a></li>
        </ul>
      </div>

      {/* Barre de recherche */}
      <form className="d-flex search-bar">
        <input className="form-control" type="search" placeholder="Rechercher" />
        <button className="btn" type="submit">
          <i className="bi bi-search"></i>
        </button>
      </form>
    </div>
  </div>
</nav>

  );
};

export default Header;

