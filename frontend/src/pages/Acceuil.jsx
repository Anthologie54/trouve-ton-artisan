import React from "react";
import { Link } from "react-router-dom";
import Trouvetonartisan from "../components/Trouvetonartisan"
import ArtisansDuMois from "../components/ArtisansDuMois";

function Accueil() {
  return (
    <>
      <Trouvetonartisan />
      <ArtisansDuMois />
    </>
  )
}

export default Accueil;
