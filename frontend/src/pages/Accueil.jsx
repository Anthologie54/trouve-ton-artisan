// ============================================================================
// Page : Accueil.jsx
// Description : Page d’accueil principale du site Trouve ton artisan !
// Contient les sections explicatives et le carrousel des artisans du mois.
// ============================================================================
import React from "react";
import Trouvetonartisan from "../components/Trouvetonartisan";
import ArtisansDuMois from "../components/ArtisansDuMois";

function Accueil() {
  return (
    <main
      role="main"
      aria-label="Page d'accueil du site Trouve ton artisan"
      className="page-accueil"
    >
      {/* Section : étapes pour trouver un artisan */}
      <Trouvetonartisan />

      {/* Section : artisans mis en avant */}
      <ArtisansDuMois />
    </main>
  );
}

export default Accueil;
