import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Artisan.scss";
import { Link } from "react-router-dom";

const Artisan = () => {
  const [artisans, setArtisans] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState("");
  const [search, setSearch] = useState("");

  // 🟦 Chargement artisans + catégories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resArtisans = await axios.get("http://localhost:3001/api/artisans");
        const resCategories = await axios.get("http://localhost:3001/api/categories");

        setArtisans(resArtisans.data);
        setCategories(resCategories.data);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      }
    };
    fetchData();
  }, []);

  // 🟩 Filtrage selon la catégorie et la recherche
  const filteredArtisans = artisans.filter((art) => {
    const matchCategorie = selectedCategorie
      ? art.Specialite?.Categorie?.nom_categorie === selectedCategorie
      : true;
    const matchNom = art.nom_artisan.toLowerCase().includes(search.toLowerCase());
    return matchCategorie && matchNom;
  });

  // 🟦 Regrouper par spécialité (nom du métier)
  const artisansParSpecialite = filteredArtisans.reduce((acc, art) => {
    const specialite = art.Specialite?.nom_specialite || "Autres";
    if (!acc[specialite]) acc[specialite] = [];
    acc[specialite].push(art);
    return acc;
  }, {});

  return (
    <section className="artisan-page">
      {/* === SECTION RECHERCHE === */}
      <div className="search-section py-5">
        <div className="container text-center">
          <div className="custome-Artisans">
          <div className="decor-line mb-6 line-artisan"></div>
          <h2 className="fw-bold">Rechercher mon artisan</h2>
          </div>
          {/* Sélection de catégorie */}
          <div className="search-controls my-4">
            <select
              className="form-select mb-3"
              value={selectedCategorie}
              onChange={(e) => setSelectedCategorie(e.target.value)}
            >
              <option value="">Sélectionnez votre catégorie</option>
              {categories.map((cat) => (
                <option key={cat.id_categorie} value={cat.nom_categorie}>
                  {cat.nom_categorie}
                </option>
              ))}
            </select>

            <p className="ou">ou</p>

            <div className="input-group search-bar">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher votre artisan"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* === SECTION LISTE DES ARTISANS === */}
      <div className="artisan-list container">
        <div className="custome-Artisans">
          <div className="decor-line mb-6"></div>
          <h2 className="fw-bold custom-title-lesartisans">Les Artisans</h2>
        </div>

        {/* 🧱 Groupe par spécialité */}
        {Object.entries(artisansParSpecialite).map(([specialite, arts]) => (
          <div key={specialite} className="categorie-section my-4">
            <div className="categorie-title text-center text-white fw-bold py-2 px-4 rounded-pill">
              {specialite}
            </div>

            {arts.map((art) => (
              <div key={art.id_artisan} className="artisan-card my-4">
                <div className="row align-items-center justify-content-center">
                  {/* IMAGE */}
                  <div className="col-md-4 image-col text-center">
                    <img
                      src={art.image || "/images/artisan-placeholder.png"}
                      alt={art.nom_artisan}
                      className="artisan-img"
                    />
                  </div>

                  {/* TEXTE */}
                  <div className="col-md-6 text-col text-center custom-texte">
                    <h3>{art.nom_artisan}</h3>
                    <h4>{art.Specialite?.nom_specialite || "Métier inconnu"}</h4>
                    <h5>{art.localisation}</h5>

                    <Link
                      to={`/artisan/${art.id_artisan}`} className="btn btn-primary rounded-pill mt-">
                      Voir mon artisan
                    </Link>
                  </div>
                </div>

                {/* NOTE */}
                <div className="rating">
                  <span className="stars">⭐⭐⭐⭐⭐</span>
                  <span className="note">{art.note} / 5</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Artisan;
