import React, { useEffect, useState } from "react";
import { Carousel } from "bootstrap";
import "../styles/ArtisanDuMois.scss";

const ArtisansDuMois = () => {
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    // 🔹 Récupère les artisans du mois depuis le backend
    fetch("http://localhost:3001/api/artisans/top")
      .then((res) => res.json())
      .then((data) => {
        console.log("Artisans reçus :", data);
        setArtisans(data);
      })
      .catch((err) => console.error("Erreur de chargement :", err));

    // 🔹 Active le carrousel Bootstrap
    const el = document.querySelector("#carouselArtisans");
    if (el) {
      const carousel = new Carousel(el, {
        interval: 8000,
        ride: "carousel",
        pause: "hover",
        wrap: true,
      });
      return () => carousel.dispose();
    }
  }, []);

  return (
    <section className="artisans-mois py-5">
      <div className="container">
        <div className="decor-line mb-2"></div>
        <h2 className="fw-bold mb-4 text-start text-primary">
          Nos artisans du mois
        </h2>

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
                    <div className="col-md-4 image-col text-center">
                      <img
                        src={art.image || "/images/artisan-placeholder.png"}
                        alt={art.nom_artisan}
                        className="artisan-img"
                      />
                    </div>
                    <div className="col-md-6 text-col">
                      <h3>{art.nom_artisan}</h3>
                      <h4>{art.specialite?.nom_specialite}</h4>
                      <h5>{art.localisation}</h5>
                      <button className="btn btn-primary rounded-pill">
                        Voir mon artisan
                      </button>
                    </div>
                  </div>
                  <div className="rating">
                    <span className="stars">⭐⭐⭐⭐⭐</span>
                    <span className="note">{art.note} / 5</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtisansDuMois;
