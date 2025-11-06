// ============================================================================
// Page : Accueil
// Description : Page d’accueil principale du site "Trouve ton artisan !"
// Composition :
//   - Section 1 : "Comment trouver mon artisan ?" (composant Trouvetonartisan)
//   - Section 2 : "Nos artisans du mois" (composant ArtisansDuMois)
// ============================================================================

import React from "react";
import Trouvetonartisan from "../components/Trouvetonartisan";
import ArtisansDuMois from "../components/ArtisansDuMois";

function Accueil() {
  return (
    <>
      {/* Section de présentation du processus de recherche */}
      <Trouvetonartisan />

      {/* Carrousel dynamique des meilleurs artisans */}
      <ArtisansDuMois />
    </>
  );
}

export default Accueil;
