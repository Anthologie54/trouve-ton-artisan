// Header.jsx
// Composant d'en-tête principal : logo, menu de navigation, recherche d'artisans.

import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Header.scss";

const Header = () => {
  // Liste des catégories (Bâtiment, Services, etc.)
  const [categories, setCategories] = useState([]);
  // Texte saisi dans la barre de recherche
  const [search, setSearch] = useState("");
  // Résultats de recherche d'artisans
  const [results, setResults] = useState([]);
  // État d'ouverture du menu burger mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Référence pour détecter les clics en dehors du menu mobile
  const menuRef = useRef(null);

  const navigate = useNavigate();

  // Chargement des catégories depuis l'API au montage du composant
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Erreur catégories :", err));
  }, []);

  // Recherche d'artisans à partir de la saisie dans la barre de recherche
  useEffect(() => {
    const fetchSearch = async () => {
      if (search.length > 1) {
        try {
          const res = await axios.get(
            `http://localhost:3001/api/artisans/search?q=${encodeURIComponent(
              search
            )}`
          );
          setResults(res.data);
        } catch (err) {
          console.error("Erreur de recherche :", err);
        }
      } else {
        // Si moins de 2 caractères, on vide la liste de résultats
        setResults([]);
      }
    };

    fetchSearch();
  }, [search]);

  // Soumission du formulaire de recherche
  // Si des résultats existent, on redirige vers la fiche du premier artisan
  const handleSubmit = (e) => {
    e.preventDefault();
    if (results.length > 0) {
      navigate(`/artisan/${results[0].id_artisan}`);
      setResults([]);
      setSearch("");
    }
  };

  // Fermeture du menu mobile en cliquant en dehors du bloc
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigation vers une fiche artisan depuis un résultat de recherche
  const handleResultSelect = (artisanId) => {
    navigate(`/artisan/${artisanId}`);
    setResults([]);
    setSearch("");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light custom-navbar"
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="container header-row">
        {/* Bouton menu burger (visible sur mobile seulement via CSS) */}
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

        {/* Logo avec lien vers la page d'accueil */}
        <Link to="/" className="navbar-brand logo-wrapper">
          <img src="/images/logo.png" alt="Trouve ton artisan" className="logo-img" />
        </Link>

        {/* Menu principal desktop (centré) */}
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

        {/* Bloc de droite : barre de recherche */}
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

            {/* Liste des résultats de recherche en direct */}
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

        {/* Menu mobile déroulant sous le burger */}
        {isMenuOpen && (
          <div
            id="mobileMenu"
            className="mobile-overlay-mini"
            ref={menuRef}
            role="menu"
            aria-label="Menu principal mobile"
          >
            <img
              src="/images/logo.png"
              alt="Trouve ton artisan"
              className="overlay-logo mb-2"
            />
            <ul className="list-unstyled text-center mb-0">
              <li>
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="overlay-link"
                  role="menuitem"
                >
                  Accueil
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id_categorie}>
                  <Link
                    to={`/artisans?categorie=${encodeURIComponent(
                      cat.nom_categorie
                    )}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="overlay-link"
                    role="menuitem"
                  >
                    {cat.nom_categorie}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/artisans"
                  onClick={() => setIsMenuOpen(false)}
                  className="overlay-link"
                  role="menuitem"
                >
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
