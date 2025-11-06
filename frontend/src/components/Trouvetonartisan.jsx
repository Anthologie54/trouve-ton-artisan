// ============================================================================
// Composant : Trouvetonartisan
// Description : Section pédagogique de la page d’accueil expliquant
//               les étapes pour contacter un artisan de la région.
// ============================================================================
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Trouvetonartisan.scss";

const Trouvetonartisan = () => {
  const [categories, setCategories] = useState([]);
  const [artisans, setArtisans] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState("");
  const [selectedArtisan, setSelectedArtisan] = useState("");
  const navigate = useNavigate();

  // Chargement des catégories et artisans au montage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCat = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories`);
        const resArt = await axios.get(`${process.env.REACT_APP_API_URL}/api/artisans`);
        setCategories(resCat.data);
        setArtisans(resArt.data);
      } catch (error) {
        console.error("Erreur chargement :", error);
      }
    };
    fetchData();
  }, []);

  // Filtrer les artisans selon la catégorie choisie
  const artisansFiltres = selectedCategorie
    ? artisans.filter(
      (a) => a.Specialite?.Categorie?.nom_categorie === selectedCategorie
    )
    : [];

  // Redirige vers la fiche de l’artisan sélectionné
  const handleContactClick = () => {
    if (selectedArtisan) {
      const artisan = artisans.find((a) => a.nom_artisan === selectedArtisan);
      if (artisan) navigate(`/artisan/${artisan.id_artisan}`);
    }
  };

  return (
    <section
      className="how-to py-5"
      aria-labelledby="section-trouve-artisan"
    >
      <div className="container container-section-un text-center">
        {/* Titre principal de la section */}
        <div className="section-title mb-4">
          <h1 id="section-trouve-artisan" className="text-lg-start ms-lg-5">
            Comment trouver mon artisan ?
          </h1>
        </div>

        {/* Grille des 4 étapes */}
        <div className="row justify-content-center g-4">
          {/* Étape 1 */}
          <div className="col-lg-3 d-flex justify-content-center position-relative">
            <div className="card step-card" aria-label="Première étape : choisir une catégorie">
              <div className="card-body">
                <h5 className="card-title">Première étape</h5>
                <p className="card-text">Je choisis la catégorie d’artisan recherché</p>
                <i className="bi bi-arrow-down arrow-down text-primary"></i>

                <label htmlFor="categorieSelect" className="visually-hidden">
                  Choisir une catégorie d’artisan
                </label>
                <select
                  id="categorieSelect"
                  className="form-select rounded-pill mt-2"
                  value={selectedCategorie}
                  onChange={(e) => setSelectedCategorie(e.target.value)}
                >
                  <option value="">Catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat.id_categorie} value={cat.nom_categorie}>
                      {cat.nom_categorie}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <i className="bi bi-arrow-right arrow-between" aria-hidden="true"></i>
          </div>

          {/* Étape 2 */}
          <div className="col-lg-3 d-flex justify-content-center position-relative">
            <div className="card step-card" aria-label="Deuxième étape : sélectionner un artisan">
              <div className="card-body">
                <h5 className="card-title">Deuxième étape</h5>
                <p className="card-text">Je sélectionne mon artisan</p>
                <i className="bi bi-arrow-down arrow-down text-primary"></i>

                {/* Artisan sélectionné (nom visible au-dessus du select) */}
                {selectedArtisan && (
                  <div className="artisan-info-selected mb-2">
                    <p className="text-secondary m-0">{selectedArtisan}</p>
                  </div>
                )}

                <label htmlFor="artisanSelect" className="visually-hidden">
                  Choisir un artisan
                </label>
                <select
                  id="artisanSelect"
                  className="form-select rounded-pill mt-2"
                  value={selectedArtisan}
                  onChange={(e) => setSelectedArtisan(e.target.value)}
                  disabled={!selectedCategorie}
                >
                  <option value="">
                    {selectedCategorie
                      ? "Choisir un artisan"
                      : "Sélectionnez d’abord une catégorie"}
                  </option>
                  {artisansFiltres.map((a) => (
                    <option key={a.id_artisan} value={a.nom_artisan}>
                      {selectedArtisan === a.nom_artisan
                        ? a.nom_artisan
                        : `${a.Specialite?.nom_specialite || ""} — ${a.nom_artisan}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <i className="bi bi-arrow-right arrow-between" aria-hidden="true"></i>
          </div>

          {/* Étape 3 */}
          <div className="col-lg-3 d-flex justify-content-center position-relative">
            <div className="card step-card" aria-label="Troisième étape : contacter l’artisan sélectionné">
              <div className="card-body">
                <h5 className="card-title">Troisième étape</h5>
                <p className="card-text">Je contacte mon artisan via le formulaire</p>
                <i className="bi bi-arrow-down arrow-down text-primary fa-2x"></i>

                <button
                  onClick={handleContactClick}
                  disabled={!selectedArtisan}
                  className="btn btn-primary w-100 rounded-pill mt-2"
                >
                  {selectedArtisan ? "Contacter" : "Compléter"}{" "}
                  <i className="bi bi-arrow-down-short ms-2" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            <i className="bi bi-arrow-right arrow-between" aria-hidden="true"></i>
          </div>

          {/* Étape 4 */}
          <div className="col-lg-3 d-flex justify-content-center">
            <div className="card step-card" aria-label="Quatrième étape : attendre la réponse de l’artisan">
              <div className="card-body">
                <h5 className="card-title">Quatrième étape</h5>
                <p className="card-text card-4">
                  J’attends que mon artisan me donne une réponse sous 48 heures
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trouvetonartisan;
