// ============================================================================
// Page : Artisans.jsx
// Description : Page affichant la liste complète des artisans.
// Fonctionnalités :
//   - Filtrage par catégorie (liste déroulante dynamique)
//   - Recherche par nom (champ de recherche dynamique)
//   - Regroupement par spécialité (catégorie métier)
//   - Accès direct à chaque fiche artisan
// Technologies : React, Axios, Bootstrap, Sass
// ============================================================================
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Artisan.scss";

const Artisan = () => {
  // === ÉTATS PRINCIPAUX ===
  const [artisans, setArtisans] = useState([]); // Liste complète d’artisans
  const [categories, setCategories] = useState([]); // Liste des catégories
  const [selectedCategorie, setSelectedCategorie] = useState(""); // Filtre de catégorie
  const [search, setSearch] = useState(""); // Texte de recherche

  // === CHARGEMENT INITIAL DES DONNÉES ===
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

  // === FILTRAGE DES ARTISANS ===
  // Vérifie si un artisan correspond à la catégorie et au texte saisi
  const filteredArtisans = artisans.filter((art) => {
    const matchCategorie = selectedCategorie
      ? art.Specialite?.Categorie?.nom_categorie === selectedCategorie
      : true;
    const matchNom = art.nom_artisan.toLowerCase().includes(search.toLowerCase());
    return matchCategorie && matchNom;
  });

  // === GROUPEMENT PAR SPÉCIALITÉ ===
  // Ex : “Boulanger”, “Électricien”, “Boucher”...
  const artisansParSpecialite = filteredArtisans.reduce((acc, art) => {
    const specialite = art.Specialite?.nom_specialite || "Autres";
    if (!acc[specialite]) acc[specialite] = [];
    acc[specialite].push(art);
    return acc;
  }, {});

  return (
    <section
      className="artisan-page"
      aria-labelledby="section-recherche-artisan"
      role="region"
    >
      {/* === TITRE PRINCIPAL === */}
      <h2 id="section-recherche-artisan" className="fw-bold text-center">
        Rechercher mon artisan
      </h2>

      {/* === BARRE DE RECHERCHE ET FILTRES === */}
      <div className="search-section py-5" role="search" aria-label="Recherche d’artisans">
        <div className="container text-center">
          <div className="search-controls my-4">
            {/* Sélecteur de catégorie */}
            <label htmlFor="categorieSelect" className="visually-hidden">
              Choisir une catégorie d’artisan
            </label>
            <select
              id="categorieSelect"
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

            <p className="ou" aria-hidden="true">
              ou
            </p>

            {/* Recherche par nom */}
            <div className="input-group search-bar">
              <span className="input-group-text" id="search-icon">
                <i className="bi bi-search" aria-hidden="true"></i>
              </span>
              <label htmlFor="searchInput" className="visually-hidden">
                Rechercher un artisan par nom
              </label>
              <input
                id="searchInput"
                type="text"
                className="form-control"
                placeholder="Rechercher votre artisan"
                aria-label="Saisissez le nom d’un artisan"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* === LISTE DES ARTISANS FILTRÉS === */}
      <div className="artisan-list container">
        <div className="custome-Artisans">
          <h2 className="fw-bold text-center">Les Artisans</h2>
        </div>

        {/* Boucle sur chaque groupe de spécialités */}
        {Object.entries(artisansParSpecialite).map(([specialite, arts]) => (
          <div
            key={specialite}
            className="categorie-section my-4"
            aria-label={`Artisans spécialisés en ${specialite}`}
          >
            {/* Titre de la spécialité */}
            <div className="categorie-title text-center text-white fw-bold py-2 px-4 rounded-pill">
              {specialite}
            </div>

            {/* Liste des artisans de cette spécialité */}
            {arts.map((art) => (
              <article
                key={art.id_artisan}
                className="artisan-card my-4"
                aria-label={`Artisan ${art.nom_artisan}`}
              >
                <div className="row align-items-center justify-content-center">
                  
                  {/* === IMAGE + ÉTOILES === */}
                  <div className="col-md-4 image-col text-center">
                    <img
                      src={art.image || "/images/artisan-placeholder.png"}
                      alt={`Photo ou logo de ${art.nom_artisan}`}
                      className="artisan-img"
                    />

                    {/* Note dynamique avec étoiles */}
                    <div className="rating text-center mt-3" aria-label={`Note ${art.note} sur 5`}>
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
                          aria-hidden="true"
                        ></i>
                      ))}
                      <span className="note-value ms-2 fw-semibold">
                        {art.note} / 5
                      </span>
                    </div>
                  </div>

                  {/* === INFOS ARTISAN === */}
                  <div className="col-md-6 text-col text-center custom-texte">
                    <h3 className="text-primary fw-bold">{art.nom_artisan}</h3>
                    <h4 className="text-secondary">
                      {art.Specialite?.nom_specialite || "Métier inconnu"}
                    </h4>
                    <h5>{art.localisation}</h5>

                    <Link
                      to={`/artisan/${art.id_artisan}`}
                      className="btn btn-primary rounded-pill mt-2"
                    >
                      Voir mon artisan
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ))}

        {/* Message si aucun résultat */}
        {filteredArtisans.length === 0 && (
          <p className="text-center text-muted my-5">
            Aucun artisan trouvé pour cette recherche.
          </p>
        )}
      </div>
    </section>
  );
};

export default Artisan;
