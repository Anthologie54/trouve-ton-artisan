import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "bootstrap";
import "../styles/ArtisanDuMois.scss";

const ArtisansDuMois = () => {
  const [artisans, setArtisans] = useState([]);

  // 🔹 Charger les 3 meilleurs artisans depuis la BDD
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/artisans/top")
      .then((res) => {
        console.log("✅ Artisans reçus :", res.data);
        setArtisans(res.data);
      })
      .catch((err) => console.error("❌ Erreur chargement artisans :", err));
  }, []);

  // 🔹 Initialiser le carrousel Bootstrap
  useEffect(() => {
    if (artisans.length > 0) {
      const el = document.querySelector("#carouselArtisans");
      if (el) {
        const carousel = new Carousel(el, {
          interval: 8000,
          ride: "carousel",
          pause: "hover",
          wrap: true,
          touch: true,
        });
        return () => carousel.dispose();
      }
    }
  }, [artisans]);

  return (
    <section className="artisans-mois py-5">
      <div className="container">
        <div className="decor-line mb-2"></div>
        <h2 className="fw-bold mb-4 text-start text-primary">
          Nos artisans du mois
        </h2>

        {/* ✅ Si on a reçu des artisans */}
        {artisans.length > 0 ? (
          <div
            id="carouselArtisans"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {artisans.map((art, index) => (
                <div
                  key={art.id_artisan}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <div className="artisan-card">
                    <div className="row align-items-center justify-content-center">
                      
                      {/* 🖼️ Image */}
                      <div className="col-md-4 image-col text-center">
                        <img
                          src={
                            art.image ||
                            `/images/artisan-placeholder.png`
                          }
                          alt={art.nom_artisan}
                          className="artisan-img"
                        />
                      </div>

                      {/* 🧾 Texte artisan */}
                      <div className="col-md-6 text-col">
                        <h3>{art.nom_artisan}</h3>
                        <h4>{art.localisation}</h4>
                        <button className="btn btn-primary rounded-pill">
                          Voir mon artisan
                        </button>
                      </div>
                    </div>

                    {/* ⭐ Note */}
                    <div className="rating">
                      <span className="stars">
                        {"⭐".repeat(Math.floor(art.note || 0))}
                        {art.note % 1 >= 0.5 ? "⭐" : ""}
                      </span>
                      <span className="note">{art.note} / 5</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 🔹 Contrôles gauche/droite */}
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
        ) : (
          <p className="text-center text-muted">Chargement des artisans...</p>
        )}
      </div>
    </section>
  );
};

export default ArtisansDuMois;
