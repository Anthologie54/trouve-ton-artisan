import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Header.scss";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Charger les catégories (Bâtiment, etc.)
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Erreur catégories :", err));
  }, []);

  // Recherche d’artisans
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

  // Lorsqu’on valide ou clique sur un résultat
  const handleSubmit = (e) => {
    e.preventDefault();
    if (results.length > 0) {
      navigate(`/artisan/${results[0].id_artisan}`);
      setResults([]);
      setSearch("");
    }
  };

  // Fermer le menu si clic à l’extérieur
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <div className="container header-row">

        {/* 🍔 Bouton menu burger */}
        <button
          className={`navbar-toggler ${isMenuOpen ? "active" : ""}`}
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 🔵 Logo */}
        <Link to="/" className="navbar-brand logo-wrapper">
          <img src="/images/logo.png" alt="Logo" className="logo-img" />
        </Link>

        {/* 🌐 Menu principal desktop */}
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

        {/* 🔍 Barre de recherche à droite */}
        <div className="right-slot">
          <form className="d-flex search-bar position-relative" onSubmit={handleSubmit}>
            <input
              className="form-control"
              type="search"
              placeholder="Rechercher un artisan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn" type="submit">
              <i className="bi bi-search"></i>
            </button>

            {/* Résultats de recherche */}
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
                  >
                    {art.nom_artisan}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>

        {/* 📱 Petit menu déroulant sous le burger */}
        {isMenuOpen && (
          <div className="mobile-overlay-mini" ref={menuRef}>
            <img src="/images/logo.png" alt="Logo" className="overlay-logo mb-2" />
            <ul className="list-unstyled text-center mb-0">
              <li>
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="overlay-link">
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
