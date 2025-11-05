import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/FicheArtisan.scss";

const FicheArtisan = () => {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/artisans/${id}`)
      .then((res) => setArtisan(res.data))
      .catch((err) => console.error("Erreur chargement artisan :", err));
  }, [id]);

  if (!artisan) return <p className="loading">Chargement...</p>;

  return (
    <div className="fiche-artisan">
      {/* === SECTION INFO ARTISAN === */}
      <section className="artisan-info container text-center py-5">
        <div className="card p-4 shadow-sm">
          <div className="artisan-photo mb-3">
            <img
              src={artisan.image || "/images/artisan-placeholder.png"}
              alt={artisan.nom_artisan}
              className="rounded-circle"
            />
          </div>

          {/* ⭐ Note */}
          <div className="note">
            {"⭐".repeat(Math.round(artisan.note))}{" "}
            <span className="text-muted">{artisan.note}/5</span>
          </div>

          {/* 🧾 Nom + lien */}
          <h2 className="mt-3 fw-bold text-primary">{artisan.nom_artisan}</h2>
          {artisan.site_web && (
            <a
              href={artisan.site_web}
              target="_blank"
              rel="noopener noreferrer"
              className="website-link"
            >
              {artisan.site_web}
            </a>
          )}

          {/* Métier + localisation */}
          <div className="row mt-4">
            <div className="col-6 fw-bold text-primary">Métier</div>
            <div className="col-6 fw-bold text-primary">Localisation</div>
            <div className="col-6">{artisan.Specialite?.nom_specialite}</div>
            <div className="col-6">{artisan.localisation}</div>
          </div>

          {/* À propos */}
          <div className="about mt-4">
            <p>{artisan.a_propos}</p>
          </div>
        </div>
      </section>

      {/* === FORMULAIRE DE CONTACT === */}
      <section className="contact-section py-5">
        <div className="decor-line mb-2"></div>
        <h3 className="text-center mb-4">Contacter mon artisan</h3>
        <div className="container contact-form p-4 rounded-4 shadow-lg">
          <form>
            <div className="row mb-3">
              <div className="col-md-6">
                <input type="text" className="form-control" placeholder="Nom" />
              </div>
              <div className="col-md-6">
                <input type="text" className="form-control" placeholder="Prénom" />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <input type="email" className="form-control" placeholder="Email" />
              </div>
              <div className="col-md-6">
                <input type="tel" className="form-control" placeholder="Numéro de téléphone" />
              </div>
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="5"
                placeholder="Pour quelle raison contacter vous cet artisan ?"
              ></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-light text-primary fw-semibold">
                Envoyer ma demande
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default FicheArtisan;
