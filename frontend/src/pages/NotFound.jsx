// ============================================================================
// Page : NotFound.jsx
// Description : Page d’erreur 404 affichée lorsque la route demandée
//               n’existe pas sur le site.
// Fonctionnalités :
//   - Message d’erreur clair
//   - Illustration visuelle
//   - Liens de redirection vers les pages principales
// Technologies : React, Bootstrap, Sass
// ============================================================================
import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFound.scss";

const NotFound = () => {
  return (
    <main
      className="notfound-page text-center"
      role="main"
      aria-labelledby="titre-404"
    >
      <div className="container py-5">
        {/* === Titre principal === */}
        <h1 id="titre-404" className="fw-bold text-primary mb-4">
          Erreur 404 - Page non trouvée
        </h1>

        {/* === Message explicatif === */}
        <p className="intro-text mb-4">
          Pas de panique&nbsp;! La page que vous cherchez n’existe pas ou a été déplacée.
          <br />
          Retournez à l’accueil pour poursuivre votre recherche.
        </p>

        {/* === Illustration === */}
        <div className="notfound-image my-4">
          <img
            src="/images/notFound.jpg"
            alt="Illustration d’une page introuvable"
            className="img-fluid rounded shadow-sm"
          />
        </div>

        {/* === Boutons de navigation === */}
        <div className="buttons mt-4 d-flex justify-content-center flex-wrap gap-3">
          <Link
            to="/"
            className="btn btn-primary rounded-pill px-4"
            aria-label="Retourner à la page d’accueil"
          >
            Retour à l’accueil
          </Link>

          <Link
            to="/artisans"
            className="btn btn-outline-primary rounded-pill px-4"
            aria-label="Rechercher un artisan"
          >
            Rechercher un artisan
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
