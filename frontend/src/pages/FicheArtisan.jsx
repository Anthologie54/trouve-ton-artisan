// ============================================================================
// Page : FicheArtisan
// Description : Page de détails d’un artisan sélectionné.
// Fonctionnalités :
//   - Récupère un artisan spécifique depuis l’API via son ID (params).
//   - Affiche son image, nom, spécialité, localisation, note et "à propos".
//   - Intègre un formulaire de contact simulé (non relié à un serveur).
// ============================================================================

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/FicheArtisan.scss";

const FicheArtisan = () => {
  const { id } = useParams();          // ID récupéré depuis l’URL
  const [artisan, setArtisan] = useState(null); // Données de l’artisan

  // --------------------------------------------------------------------------
  // Chargement des données d’un artisan à partir de son ID
  // --------------------------------------------------------------------------
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/artisans/${id}`)
      .then((res) => setArtisan(res.data))
      .catch((err) => console.error("Erreur chargement artisan :", err));
  }, [id]);

  // Affichage d’un message temporaire pendant le chargement
  if (!artisan) return <p className="loading">Chargement...</p>;

  // --------------------------------------------------------------------------
  // Rendu JSX
  // --------------------------------------------------------------------------
  return (
    <div className="fiche-artisan">
      {/* === SECTION INFORMATIONS ARTISAN === */}
      <section className="artisan-info container text-center py-5">
        <div className="card p-4 shadow-sm">
          {/* Photo */}
          <div className="artisan-photo mb-3">
            <img
              src={artisan.image || "/images/artisan-placeholder.png"}
              alt={artisan.nom_artisan}
              className="rounded-circle"
            />
          </div>

          {/* Note dynamique */}
          <div className="note">
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
              ></i>
            ))}
            <span className="note-value ms-2">{artisan.note} / 5</span>
          </div>

          {/* Nom et site web */}
          <h4 className="mt-3 fw-bold">{artisan.nom_artisan}</h4>
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
          <div className="row mt-4 artisan-meta">
            <div className="col-6 text-end fw-bold">
              {artisan.Specialite?.nom_specialite || "Métier inconnu"}
            </div>
            <div className="col-6 text-start fw-bold">
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
            {/* Informations de contact */}
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

            {/* Message */}
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="5"
                placeholder="Pour quelle raison contactez-vous cet artisan ?"
              ></textarea>
            </div>

            {/* Bouton d’envoi */}
            <div className="text-center">
              <button type="submit" className="btn btn-light fw-semibold">
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
