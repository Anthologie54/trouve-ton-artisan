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

          {/* ⭐ Note dynamique */}
          <div className="note">
            {[1, 2, 3, 4, 5].map((num) => (
              <i
                key={num}
                className={`bi bi-star${artisan.note >= num
                  ? "-fill text-primary" // pleine si note supérieure ou égale
                  : artisan.note >= num - 0.5
                    ? "-half text-primary" // demi-étoile si note entre X-0.5 et X
                    : " text-secondary" // grise sinon
                  }`}
              ></i>
            ))}
            <span className="note-value ms-2">{artisan.note} / 5</span>
          </div>


          {/* 🧾 Nom + lien */}
          <h4 className="mt-3 fw-bold">{artisan.nom_artisan}</h4>
          {artisan.site_web && (
            <a href={artisan.site_web} target="_blank" rel="noopener noreferrer" className="website-link">
              {artisan.site_web}
            </a>
          )}

          {/* Métier + localisation (directement les valeurs) */}
          <div className="row mt-4 artisan-meta">
            <div className="col-6 text-end  fw-bold">
              {artisan.Specialite?.nom_specialite || "Métier inconnu"}
            </div>
            <div className="col-6 text-start  fw-bold">
              {artisan.localisation || "Localisation inconnue"}
            </div>
          </div>


          {/* À propos */}
          <div className="about mt-4">
            <p>{artisan.a_propos}</p>
          </div>
        </div>
      </section>

      {/* === FORMULAIRE DE CONTACT === */}
      
      <section className="contact-section py-5 mx-auto">
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
              <button type="submit" className="btn btn-light  fw-semibold">
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
