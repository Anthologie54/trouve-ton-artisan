// ============================================================================
// Composant : ArtisansDuMois
// Description : Carrousel des 3 artisans du mois, récupérés via l’API backend.
// ============================================================================
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/ArtisanDuMois.scss";

const ArtisansDuMois = () => {
  const [artisans, setArtisans] = useState([]);

  // Chargement des artisans du mois depuis l'API
  useEffect(() => {
    axios
      .get("https://trouve-ton-artisan-9yrd.onrender.com/api/artisans/top")
      .then((res) => setArtisans(res.data))
      .catch((err) => console.error("Erreur chargement artisans :", err));
  }, []);

  // Activation du carrousel Bootstrap une fois les données chargées
  useEffect(() => {
    const el = document.querySelector("#carouselArtisans");
    if (el && window.bootstrap) {
      const carousel = window.bootstrap.Carousel.getOrCreateInstance(el, {
        interval: 8000,
        ride: "carousel",
        pause: "hover",
      });
      carousel.cycle();
    }
  }, [artisans]);

  return (
    <section
      className="artisans-mois py-5"
      aria-labelledby="section-artisans-mois"
    >
      <div className="container">
        <h2 id="section-artisans-mois" className="fw-bold mb-4 text-start">
          Nos artisans du mois
        </h2>

        <div
          id="carouselArtisans"
          className="carousel slide"
          data-bs-ride="carousel"
          aria-label="Carrousel des artisans du mois"
        >
          <div className="carousel-inner">
            {artisans.map((art, index) => (
              <div
                key={art.id_artisan}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <div className="artisan-card">
                  <div className="row align-items-center justify-content-center">
                    {/* IMAGE ARTISAN */}
                    <div className="col-md-4 image-col text-center">
                      <img
                        src={art.image || "/images/artisan-placeholder.png"}
                        alt={`Portrait de ${art.nom_artisan}`}
                        className="artisan-img"
                      />
                    </div>

                    {/* INFOS ARTISAN */}
                    <div className="col-md-6 text-col">
                      <h3>{art.nom_artisan}</h3>
                      <h4>{art.Specialite?.nom_specialite || "Métier inconnu"}</h4>
                      <h5>{art.localisation}</h5>

                      <Link
                        to={`/artisan/${art.id_artisan}`}
                        className="btn btn-primary rounded-pill"
                      >
                        Voir mon artisan
                      </Link>
                    </div>
                  </div>

                  {/* NOTE DYNAMIQUE AVEC ÉTOILES */}
                  <div className="rating" aria-label={`Note ${art.note} sur 5`}>
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
                    <span className="note ms-2">{art.note} / 5</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Flèches de navigation accessibles */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselArtisans"
            data-bs-slide="prev"
            aria-label="Artisan précédent"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselArtisans"
            data-bs-slide="next"
            aria-label="Artisan suivant"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ArtisansDuMois;
