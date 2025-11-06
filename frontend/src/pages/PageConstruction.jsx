// ============================================================================
// Page : PageConstruction.jsx
// Description : Page temporaire affichée pour les rubriques légales
//               en attente de contenu définitif.
// Fonctionnalités :
//   - Message d’attente clair
//   - Illustration symbolique
//   - Compatible avec le header/footer du site
// Technologies : React, Bootstrap, Sass
// ============================================================================
import React from "react";
import "../styles/PageConstruction.scss";

const PageConstruction = () => {
  return (
    <main
      className="construction-page text-center"
      role="main"
      aria-labelledby="titre-construction"
    >
      <div className="container py-5">
        {/* === Titre principal === */}
        <h1 id="titre-construction" className="fw-bold text-primary mb-4">
          Page en construction
        </h1>

        {/* === Illustration === */}
        <div className="construction-image my-4">
          <img
            src="/images/notFound.jpg"
            alt="Illustration d’une page en construction"
            className="img-fluid rounded shadow-sm"
          />
        </div>

        {/* === Message explicatif === */}
        <p className="text-muted fs-5">
          Cette page est actuellement en cours de réalisation.<br />
          Elle sera prochainement disponible avec toutes les informations légales requises.
        </p>

        {/* === Informations pratiques === */}
        <p className="small text-secondary mt-3">
          Merci de votre compréhension.  
          Pour toute question, veuillez contacter le service régional.
        </p>
      </div>
    </main>
  );
};

export default PageConstruction;
