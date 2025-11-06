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

  // 🔹 Charger catégories + artisans
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCat = await axios.get("http://localhost:3001/api/categories");
        const resArt = await axios.get("http://localhost:3001/api/artisans");
        setCategories(resCat.data);
        setArtisans(resArt.data);
      } catch (error) {
        console.error("Erreur chargement :", error);
      }
    };
    fetchData();
  }, []);

  // 🔹 Filtrage des artisans selon la catégorie sélectionnée
  const artisansFiltres = selectedCategorie
    ? artisans.filter(
      (a) => a.Specialite?.Categorie?.nom_categorie === selectedCategorie
    )
    : [];

  // 🔹 Étape 3 : redirection vers la fiche artisan
  const handleContactClick = () => {
    if (selectedArtisan) {
      const artisan = artisans.find(
        (a) => a.nom_artisan === selectedArtisan
      );
      if (artisan) navigate(`/artisan/${artisan.id_artisan}`);
    }
  };

  return (
    <section className="how-to py-5">
      <div className="container container-section-un text-center">
        <div className="section-title mb-4">
          <h1 className="text-center text-lg-start ms-lg-5">
            Comment trouver mon artisan ?
          </h1>
        </div>

        <div className="row justify-content-center g-4">
          {/* Étape 1 */}
          <div className="col-lg-3 d-flex justify-content-center position-relative">
            <div className="card step-card">
              <div className="card-body">
                <h5 className="card-title">Première étape</h5>
                <p className="card-text">
                  Je choisis la catégorie d’artisan recherché
                </p>
                <i className="bi bi-arrow-down arrow-down text-primary"></i>

                <select
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
            <i className="bi bi-arrow-right arrow-between"></i>
          </div>

          {/* Étape 2 */}
          <div className="col-lg-3 d-flex justify-content-center position-relative">
            <div className="card step-card">
              <div className="card-body">
                <h5 className="card-title">Deuxième étape</h5>
                <p className="card-text">Je sélectionne mon artisan</p>
                <i className="bi bi-arrow-down arrow-down text-primary"></i>

                {/* 🔹 Affiche le métier sélectionné au-dessus du select */}
                {selectedArtisan && (
                  <div className="artisan-info-selected mb-2">
                    <strong>
                      {
                        artisans.find((a) => a.nom_artisan === selectedArtisan)
                          ?.Specialite?.nom_specialite
                      }
                    </strong>
                    <p className="text-secondary m-0">{selectedArtisan}</p>
                  </div>
                )}

                {/* Sélecteur d’artisan (filtré par catégorie) */}
                <select
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
            <i className="bi bi-arrow-right arrow-between"></i>
          </div>

          {/* Étape 3 */}
          <div className="col-lg-3 d-flex justify-content-center position-relative">
            <div className="card step-card">
              <div className="card-body">
                <h5 className="card-title">Troisième étape</h5>
                <p className="card-text">
                  Je contacte mon artisan via le formulaire
                </p>
                <i className="bi bi-arrow-down arrow-down text-primary fa-2x"></i>

                <button
                  onClick={handleContactClick}
                  disabled={!selectedArtisan}
                  className="btn btn-primary w-100 rounded-pill mt-2"
                >
                  {selectedArtisan ? "Contacter" : "Compléter"}{" "}
                  <i className="bi bi-arrow-down-short ms-2"></i>
                </button>
              </div>
            </div>
            <i className="bi bi-arrow-right arrow-between"></i>
          </div>

          {/* Étape 4 */}
          <div className="col-lg-3 d-flex justify-content-center">
            <div className="card step-card">
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
