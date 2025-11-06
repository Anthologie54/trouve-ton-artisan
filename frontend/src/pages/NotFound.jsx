import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFound.scss";

const NotFound = () => {
  return (
    <div className="notfound-page text-center">
      <div className="container py-5">
        {/* Message principal */}
        <h2 className="intro-text">
          Pas de panique ! Retournez à l’accueil pour continuer votre recherche.
        </h2>

        {/* Illustration */}
        <div className="notfound-image my-4">
          <img src="/images/notFound.jpg" alt="Page non trouvée" />
        </div>

        {/* Message d’erreur */}
        <h3 className="error-text">Erreur 404 - Page non trouvée</h3>

        {/* Boutons */}
        <div className="buttons mt-4">
          <Link to="/" className="btn btn-primary mx-2 rounded-pill">
            Retour à l’accueil
          </Link>
          <Link to="/artisans" className="btn btn-outline-primary mx-2 rounded-pill">
            Rechercher un artisan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;