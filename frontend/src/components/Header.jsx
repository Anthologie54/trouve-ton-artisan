// Header.jsx
// Composant d'en-tête principal : logo, menu de navigation, recherche d'artisans.

import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Header.scss";

const Header = () => {
  // --- États globaux ---
  const [categories, setCategories] = useState([]); // Liste des catégories dynamiques
  const [search, setSearch] = useState(""); // Texte dans la barre de recherche
  const [results, setResults] = useState([]); // Résultats de la recherche
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menu mobile ouvert ?
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // ======================================================
  // 🟦 1️⃣ Chargement des catégories depuis l'API
  // ======================================================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("🌍 API utilisée :", process.env.REACT_APP_API_URL);
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/categories`
        );
        setCategories(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories :", error);
      }
    };

    fetchCategories();
  }, []);

  // ======================================================
  // 🟨 2️⃣ Recherche dynamique d’artisans
  // ======================================================
  useEffect(() => {
    const fetchSearch = async () => {
      if (search.trim().length > 1) {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/artisans/search?q=${encodeURIComponent(search)}`
          );
          setResults(res.data);
        } catch (error) {
          console.error("Erreur de recherche :", error);
        }
      } else {
        setResults([]);
      }
    };

    fetchSearch();
  }, [search]);

  // ======================================================
  // 🟧 3️⃣ Soumission du formulaire de recherche
  // ======================================================
  const handleSubmit = (e) => {
    e.preventDefault();
    if (results.length > 0) {
      navigate(`/artisan/${results[0].id_artisan}`);
      setResults([]);
      setSearch("");
    }
  };

  // ======================================================
  // 🟥 4️⃣ Fermeture du menu mobile en cliquant à l’extérieur
  // ======================================================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ======================================================
  // 🟩 5️⃣ Sélection d’un artisan depuis les résultats
  // ======================================================
  const handleResultSelect = (artisanId) => {
    navigate(`/artisan/${artisanId}`);
    setResults([]);
    setSearch("");
  };

  // ======================================================
  // 🧩 Rendu principal
  // ======================================================
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light custom-navbar"
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="container header-row">
        {/* === Bouton burger (mobile) === */}
        <button
          className={`navbar-toggler ${isMenuOpen ? "active" : ""}`}
          type="button"
          aria-controls="mobileMenu"
          aria-expanded={isMenuOpen}
          aria-label={
            isMenuOpen
              ? "Fermer le menu de navigation"
              : "Ouvrir le menu de navigation"
          }
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="navbar-toggler-icon" aria-hidden="true"></span>
        </button>

        {/* === Logo principal === */}
        <Link to="/" className="navbar-brand logo-wrapper">
          <img
            src="/images/Logo.png"
            alt="Trouve ton artisan"
            className="logo-img"
          />
        </Link>

        {/* === Menu principal (desktop) === */}
        <div className="collapse navbar-collapse justify-content-center d-none d-lg-block">
          <ul className="navbar-nav">
            {categories.map((cat) => (
              <li key={cat.id_categorie} className="nav-item">
                <Link
                  className="nav-link"
                  to={`/artisans?categorie=${encodeURIComponent(
                    cat.nom_categorie
                  )}`}
                >
                  {cat.nom_categorie}
                </Link>
              </li>
            ))}
            <li className="nav-item">
              <Link className="nav-link" to="/artisans">
                Artisan
              </Link>
            </li>
          </ul>
        </div>

        {/* === Barre de recherche (droite) === */}
        <div className="right-slot">
          <form
            className="d-flex search-bar position-relative"
            onSubmit={handleSubmit}
            role="search"
            aria-label="Recherche d'artisan"
          >
            <input
              className="form-control"
              type="search"
              placeholder="Rechercher un artisan..."
              aria-label="Rechercher un artisan par nom"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn" type="submit">
              <i className="bi bi-search" aria-hidden="true"></i>
            </button>

            {/* === Résultats de recherche === */}
            {results.length > 0 && (
              <ul
                className="search-results"
                role="listbox"
                aria-label="Résultats de recherche"
              >
                {results.map((art) => (
                  <li
                    key={art.id_artisan}
                    role="option"
                    tabIndex={0}
                    onClick={() => handleResultSelect(art.id_artisan)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleResultSelect(art.id_artisan);
                      }
                    }}
                  >
                    {art.nom_artisan}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>

        {/* === Menu mobile déroulant === */}
        {isMenuOpen && (
          <div
            id="mobileMenu"
            className="mobile-overlay-mini"
            ref={menuRef}
            role="menu"
            aria-label="Menu principal mobile"
          >
            <img
              src="/images/Logo.png"
              alt="Trouve ton artisan"
              className="overlay-logo mb-2"
            />
            <ul className="list-unstyled text-center mb-0">
              <li>
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="overlay-link">
                  Accueil
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id_categorie}>
                  <Link to={`/artisans?categorie=${encodeURIComponent(cat.nom_categorie)}`} onClick={() => setIsMenuOpen(false)} className="overlay-link">
                    {cat.nom_categorie}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/artisans" onClick={() => setIsMenuOpen(false)} className="overlay-link">
                  Artisan
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
