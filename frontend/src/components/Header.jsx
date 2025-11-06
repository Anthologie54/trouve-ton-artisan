// ============================================================================
// Composant : Header
// Description : Barre de navigation principale du site "Trouve ton artisan !"
// Fonctionnalités :
//   - Affiche le logo et les liens de navigation dynamiques depuis la BDD.
//   - Gère la recherche d’artisans en direct (auto-suggestion).
//   - Comporte un menu burger responsive avec mini overlay sur mobile.
//   - Intègre une gestion de clic extérieur pour fermer le menu.
// ============================================================================

import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Header.scss";

const Header = () => {
  // --------------------------------------------------------------------------
  // États internes du composant
  // --------------------------------------------------------------------------
  const [categories, setCategories] = useState([]);   // Liste des catégories (Bâtiment, Services, etc.)
  const [search, setSearch] = useState("");           // Valeur du champ de recherche
  const [results, setResults] = useState([]);         // Résultats de recherche d’artisans
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État du menu burger mobile
  const menuRef = useRef(null);                       // Référence DOM du menu mobile
  const navigate = useNavigate();                     // Hook de navigation React Router

  // --------------------------------------------------------------------------
  // Chargement initial des catégories (appel à l’API)
  // --------------------------------------------------------------------------
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Erreur catégories :", err));
  }, []);

  // --------------------------------------------------------------------------
  // Recherche d’artisans (mise à jour à chaque frappe)
  // --------------------------------------------------------------------------
  useEffect(() => {
    const fetchSearch = async () => {
      if (search.length > 1) {
        try {
          const res = await axios.get(
            `http://localhost:3001/api/artisans/search?q=${search}`
          );
          setResults(res.data);
        } catch (err) {
          console.error("Erreur de recherche :", err);
        }
      } else {
        setResults([]);
      }
    };
    fetchSearch();
  }, [search]);

  // --------------------------------------------------------------------------
  // Soumission du formulaire de recherche
  // Redirige vers la fiche du premier artisan trouvé
  // --------------------------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (results.length > 0) {
      navigate(`/artisan/${results[0].id_artisan}`);
      setResults([]);
      setSearch("");
    }
  };

  // --------------------------------------------------------------------------
  // Gestion du clic extérieur pour fermer le menu burger
  // --------------------------------------------------------------------------
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --------------------------------------------------------------------------
  // Rendu JSX du composant
  // --------------------------------------------------------------------------
  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <div className="container header-row">

        {/* === Bouton menu burger (mobile) === */}
        <button
          className={`navbar-toggler ${isMenuOpen ? "active" : ""}`}
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Ouvrir le menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* === Logo principal (renvoi vers l’accueil) === */}
        <Link to="/" className="navbar-brand logo-wrapper">
          <img src="/images/logo.png" alt="Logo Trouve ton artisan" className="logo-img" />
        </Link>

        {/* === Menu principal (affiché sur desktop) === */}
        <div className="collapse navbar-collapse justify-content-center d-none d-lg-block">
          <ul className="navbar-nav">
            {categories.map((cat) => (
              <li key={cat.id_categorie} className="nav-item">
                <Link
                  className="nav-link"
                  to={`/artisans?categorie=${encodeURIComponent(cat.nom_categorie)}`}
                >
                  {cat.nom_categorie}
                </Link>
              </li>
            ))}
            <li className="nav-item">
              <Link className="nav-link" to="/artisans">Artisan</Link>
            </li>
          </ul>
        </div>

        {/* === Barre de recherche (côté droit du header) === */}
        <div className="right-slot">
          <form className="d-flex search-bar position-relative" onSubmit={handleSubmit}>
            <input
              className="form-control"
              type="search"
              placeholder="Rechercher un artisan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Recherche artisan"
            />
            <button className="btn" type="submit" aria-label="Valider la recherche">
              <i className="bi bi-search"></i>
            </button>

            {/* === Résultats de recherche en direct === */}
            {results.length > 0 && (
              <ul className="search-results">
                {results.map((art) => (
                  <li
                    key={art.id_artisan}
                    onClick={() => {
                      navigate(`/artisan/${art.id_artisan}`);
                      setResults([]);
                      setSearch("");
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    {art.nom_artisan}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>

        {/* === Menu mobile déroulant (overlay compact) === */}
        {isMenuOpen && (
          <div className="mobile-overlay-mini" ref={menuRef}>
            <img src="/images/logo.png" alt="Logo" className="overlay-logo mb-2" />
            <ul className="list-unstyled text-center mb-0">
              <li>
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="overlay-link"
                >
                  Nos artisans
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id_categorie}>
                  <Link
                    to={`/artisans?categorie=${encodeURIComponent(cat.nom_categorie)}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="overlay-link"
                  >
                    {cat.nom_categorie}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
