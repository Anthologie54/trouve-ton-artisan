import React, { useEffect } from "react";
import { Carousel } from "bootstrap";
import "../styles/ArtisanDuMois.scss"

const ArtisansDuMois = () => {
  const artisans = [
    {
      nom: "Boucherie Dumont",
      specialite: "Boucher",
      ville: "Lyon",
      image: "/images/boucher.png",
      note: 4.8,
    },
    {
      nom: "Au Pain Chaud",
      specialite: "Boulanger",
      ville: "Montélimar",
      image: "/images/boulanger.png",
      note: 4.9,
    },
    {
      nom: "Chocolaterie Labbé",
      specialite: "Chocolatier",
      ville: "Parici",
      image: "/images/chocolatier.png",
      note: 5.0,
    },
  ];

  useEffect(() => {
    const el = document.querySelector("#carouselArtisans");
    if (el) {
      const carousel = new Carousel(el, {
        interval: 8000,
        ride: "carousel",
        pause: false,
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
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <div className="artisan-card">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-md-4 image-col text-center">
                      <img
                        src={art.image}
                        alt={art.nom}
                        className="artisan-img"
                      />
                    </div>
                    <div className="col-md-6 text-col">
                      <h3>{art.nom}</h3>
                      <h4>{art.specialite}</h4>
                      <h5>{art.ville}</h5>
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
