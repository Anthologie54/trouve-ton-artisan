// ============================================================================
// Page : FicheArtisan.jsx
// Description : Affiche les informations détaillées d’un artisan et
//               un formulaire de contact pour le joindre.
// Fonctionnalités :
//   - Récupération dynamique des données via l’API
//   - Affichage du profil de l’artisan
//   - Formulaire de contact (nom, email, message, etc.)
// Technologies : React, Axios, Bootstrap, Sass
// ============================================================================
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/FicheArtisan.scss";

const FicheArtisan = () => {
  const { id } = useParams(); // Récupère l’ID artisan depuis l’URL
  const [artisan, setArtisan] = useState(null);

  // === Chargement des données artisan ===
  useEffect(() => {
    axios
      .get(`https://trouve-ton-artisan-9yrd.onrender.com/api/artisans/${id}`)
      .then((res) => setArtisan(res.data))
      .catch((err) => console.error("Erreur chargement artisan :", err));
  }, [id]);

  // Si aucune donnée n’est encore chargée
  if (!artisan) {
    return (
      <p className="loading text-center py-5" aria-live="polite">
        Chargement des informations de l’artisan...
      </p>
    );
  }

  return (
    <div
      className="fiche-artisan"
      role="main"
      aria-labelledby="section-fiche-artisan"
    >
      {/* === SECTION INFO ARTISAN === */}
      <section
        className="artisan-info container text-center py-5"
        aria-label="Informations principales sur l’artisan"
      >
        <div className="card p-4 shadow-sm">
          {/* Photo ou logo */}
          <div className="artisan-photo mb-3">
            <img
              src={artisan.image || "/images/artisan-placeholder.png"}
              alt={`${artisan.nom_artisan}`}
              className="rounded-circle"
            />
          </div>

          {/* Note dynamique avec étoiles */}
          <div
            className="note"
            aria-label={`Note globale : ${artisan.note} sur 5`}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <i
                key={num}
                className={`bi bi-star${
                  artisan.note >= num
                    ? "-fill text-primary"
                    : artisan.note >= num - 0.5
                    ? "-half text-primary"
                    : " text-secondary"
                }`}
                aria-hidden="true"
              ></i>
            ))}
            <span className="note-value ms-2">{artisan.note} / 5</span>
          </div>

          {/* Nom de l’artisan + site web */}
          <h4 id="section-fiche-artisan" className="mt-3 fw-bold">
            {artisan.nom_artisan}
          </h4>

          {artisan.site_web && (
            <a
              href={artisan.site_web}
              target="_blank"
              rel="noopener noreferrer"
              className="website-link"
              aria-label={`Site web de ${artisan.nom_artisan}`}
            >
              {artisan.site_web}
            </a>
          )}

          {/* Métier + localisation */}
          <div
            className="row mt-4 artisan-meta"
            aria-label="Métier et localisation de l’artisan"
          >
            <div className="col-6 text-end fw-bold">
              {artisan.Specialite?.nom_specialite || "Métier inconnu"}
            </div>
            <div className="col-6 text-start fw-bold">
              {artisan.localisation || "Localisation inconnue"}
            </div>
          </div>

          {/* À propos */}
          <div className="about mt-4">
            <h5 className="fw-bold mb-2">À propos</h5>
            <p>{artisan.a_propos || "Aucune information disponible."}</p>
          </div>
        </div>
      </section>

      {/* === FORMULAIRE DE CONTACT === */}
      <section
        className="contact-section py-5 mx-auto"
        aria-labelledby="contact-artisan"
        role="form"
      >
        <div className="container contact-form p-4 rounded-4 shadow-lg">
          <h3 id="contact-artisan" className="text-center mb-4">
            Contacter mon artisan
          </h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message envoyé !");
            }}
          >
            {/* Ligne Nom / Prénom */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="nom" className="visually-hidden">
                  Nom
                </label>
                <input
                  id="nom"
                  type="text"
                  className="form-control"
                  placeholder="Nom"
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="prenom" className="visually-hidden">
                  Prénom
                </label>
                <input
                  id="prenom"
                  type="text"
                  className="form-control"
                  placeholder="Prénom"
                  required
                />
              </div>
            </div>

            {/* Ligne Email / Téléphone */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="email" className="visually-hidden">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="telephone" className="visually-hidden">
                  Numéro de téléphone
                </label>
                <input
                  id="telephone"
                  type="tel"
                  className="form-control"
                  placeholder="Numéro de téléphone"
                />
              </div>
            </div>

            {/* Message */}
            <div className="mb-3">
              <label htmlFor="message" className="visually-hidden">
                Message
              </label>
              <textarea
                id="message"
                className="form-control"
                rows="5"
                placeholder="Pour quelle raison contactez-vous cet artisan ?"
                required
              ></textarea>
            </div>

            {/* Bouton d’envoi */}
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-light fw-semibold"
                aria-label="Envoyer ma demande à l’artisan"
              >
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
