// ============================================================================
// Page : Artisans
// Description : Liste complète des artisans avec recherche et filtrage dynamique
// Fonctionnalités :
//   - Chargement des artisans et catégories depuis l’API (backend Node + MySQL).
//   - Filtrage par catégorie et/ou recherche textuelle.
//   - Regroupement automatique par spécialité.
//   - Chaque artisan est cliquable et renvoie vers sa fiche détaillée.
// ============================================================================

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Artisan.scss";
import { Link } from "react-router-dom";

const Artisan = () => {
  // --------------------------------------------------------------------------
  // États internes
  // --------------------------------------------------------------------------
  const [artisans, setArtisans] = useState([]);              // Liste complète des artisans
  const [categories, setCategories] = useState([]);          // Liste complète des catégories
  const [selectedCategorie, setSelectedCategorie] = useState(""); // Catégorie choisie
  const [search, setSearch] = useState("");                  // Texte saisi dans la barre de recherche

  // --------------------------------------------------------------------------
  // Chargement initial : artisans + catégories
  // --------------------------------------------------------------------------
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

  // --------------------------------------------------------------------------
  // Filtrage des artisans selon la recherche et la catégorie sélectionnée
  // --------------------------------------------------------------------------
  const filteredArtisans = artisans.filter((art) => {
    const matchCategorie = selectedCategorie
      ? art.Specialite?.Categorie?.nom_categorie === selectedCategorie
      : true;
    const matchNom = art.nom_artisan.toLowerCase().includes(search.toLowerCase());
    return matchCategorie && matchNom;
  });

  // --------------------------------------------------------------------------
  // Regroupement des artisans par spécialité (affichage clair et hiérarchisé)
  // --------------------------------------------------------------------------
  const artisansParSpecialite = filteredArtisans.reduce((acc, art) => {
    const specialite = art.Specialite?.nom_specialite || "Autres";
    if (!acc[specialite]) acc[specialite] = [];
    acc[specialite].push(art);
    return acc;
  }, {});

  // --------------------------------------------------------------------------
  // Rendu JSX
  // --------------------------------------------------------------------------
  return (
    <section className="artisan-page">
      <h2 className="fw-bold">Rechercher mon artisan</h2>

      {/* === Barre de recherche et filtre par catégorie === */}
      <div className="search-section py-5">
        <div className="container text-center">
          <div className="search-controls my-4">
            {/* Sélecteur de catégorie */}
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

            {/* Champ de recherche par nom */}
            <div className="input-group search-bar">
              <span className="input-group-text">
                <i className="bi bi-search" aria-hidden="true"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher votre artisan"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Recherche d’un artisan"
              />
            </div>
          </div>
        </div>
      </div>

      {/* === Liste principale des artisans regroupés par spécialité === */}
      <div className="artisan-list container">
        <div className="custome-Artisans">
          <h2 className="fw-bold">Les Artisans</h2>
        </div>

        {Object.entries(artisansParSpecialite).map(([specialite, arts]) => (
          <div key={specialite} className="categorie-section my-4">
            {/* Titre de spécialité */}
            <div className="categorie-title text-center text-white fw-bold py-2 px-4 rounded-pill">
              {specialite}
            </div>

            {/* Liste des artisans de cette spécialité */}
            {arts.map((art) => (
              <div key={art.id_artisan} className="artisan-card my-4">
                <div className="row align-items-center justify-content-center">
                  
                  {/* Image artisan + note */}
                  <div className="col-md-4 image-col text-center">
                    <img
                      src={art.image || "/images/artisan-placeholder.png"}
                      alt={art.nom_artisan}
                      className="artisan-img"
                    />

                    {/* Affichage dynamique des étoiles selon la note */}
                    <div className="rating text-center mt-3">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <i
                          key={num}
                          className={`bi bi-star${
                            art.note >= num
                              ? "-fill text-primary"
                              : art.note >= num - 0.5
                              ? "-half text-primary"
                              : " text-secondary"
                          }`}
                        ></i>
                      ))}
                      <span className="note-value ms-2 fw-semibold">
                        {art.note} / 5
                      </span>
                    </div>
                  </div>

                  {/* Informations artisan + lien vers la fiche */}
                  <div className="col-md-6 text-col text-center custom-texte">
                    <h3>{art.nom_artisan}</h3>
                    <h4>{art.Specialite?.nom_specialite || "Métier inconnu"}</h4>
                    <h5>{art.localisation}</h5>

                    <Link
                      to={`/artisan/${art.id_artisan}`}
                      className="btn btn-primary rounded-pill mt-2"
                    >
                      Voir mon artisan
                    </Link>
                  </div>
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
