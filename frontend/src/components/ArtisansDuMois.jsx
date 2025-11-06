import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/ArtisanDuMois.scss";

const ArtisansDuMois = () => {
  const [artisans, setArtisans] = useState([]);

  // récupération des artisans depuis la BDD
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/artisans/top")
      .then((res) => setArtisans(res.data))
      .catch((err) => console.error("Erreur chargement artisans :", err));
  }, []);

  // activation du carrousel Bootstrap une fois les artisans chargés
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
    <section className="artisans-mois py-5">
      <div className="container">
        <h2 className="fw-bold mb-4 text-start">
          Nos artisans du mois
        </h2>

        <div
          id="carouselArtisans"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="8000"
          data-bs-pause="hover"
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
                        alt={art.nom_artisan}
                        className="artisan-img"
                      />
                    </div>

                    {/* INFOS ARTISAN */}
                    <div className="col-md-6 text-col">
                      <h3>{art.nom_artisan}</h3>
                      <h4>{art.Specialite?.nom_specialite || "Métier inconnu"}</h4>
                      <h5>{art.localisation}</h5>

                      {/* Lien vers la fiche artisan */}
                      <Link
                        to={`/artisan/${art.id_artisan}`}
                        className="btn btn-primary rounded-pill"
                      >
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
              </div>
            ))}
          </div>

          {/* Flèches de navigation (facultatives) */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselArtisans"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Précédent</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselArtisans"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Suivant</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ArtisansDuMois;
