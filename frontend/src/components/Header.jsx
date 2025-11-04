import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.scss";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Fermer le menu mobile si on clique à l’extérieur
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".mobile-menu-box") &&
        !e.target.closest(".navbar-toggler")
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container container-header">
        {/* === Ligne principale === */}
        <div className="header-row w-100 d-flex align-items-center justify-content-between">

          {/* 🍔 Burger (mobile uniquement) */}
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="navbar-toggler-icon">
              <span></span>
            </span>
          </button>



          {/* 🟦 Logo centré */}
          <Link to="/" className="navbar-brand logo-wrapper mx-auto">
            <img src="/images/logo.png" alt="Logo" className="logo-img" />
          </Link>



          {/* === Menu principal (desktop uniquement) === */}
          <div className="collapse navbar-collapse d-none d-lg-flex justify-content-center">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link" href="#">Bâtiment</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Services</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Alimentation</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Fabrication</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Artisan</a></li>
            </ul>
          </div>
          {/* 🔍 Barre de recherche (droite) */}
          <div className="right-slot">
            <form className="d-flex search-bar">
              <input className="form-control" type="search" placeholder="Rechercher" />
              <button className="btn" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>
          </div>
        </div>
        {/* === Petit menu mobile (flottant) === */}
        {menuOpen && (
          <div className="mobile-menu-box d-lg-none">
            <ul className="list-unstyled mb-0">
              <li><a href="#">Bâtiment</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Alimentation</a></li>
              <li><a href="#">Fabrication</a></li>
              <li><a href="#">Artisan</a></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
