import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Trouvetonartisan.scss"


const Trouvetonartisan = () => {
    return (
        <section className="how-to py-5">
  <div className="container container-section-un text-center">
    <div className="section-title mb-4">
      <h1 className="text-center text-lg-start ms-lg-5">
        Comment trouver mon artisan ?
      </h1>
    </div>

    <div className="row justify-content-center g-4">
      {/* Étape 1 */}
      <div className="col-lg-3 d-flex justify-content-center position-relative">
        <div className="card step-card">
          <div className="card-body">
            <h5 className="card-title">Première étape</h5>
            <p className="card-text">Je choisis la catégorie d’artisan recherché</p>
            <i className="bi bi-arrow-down arrow-down text-primary"></i>
            <Link to="/categories" className="btn btn-primary w-100 rounded-pill">Catégorie  <i className="bi bi-arrow-down-short ms-2"></i></Link>
          </div>
        </div>
         <i className="bi bi-arrow-right arrow-between"></i>
      </div>

      {/* Étape 2 */}
      <div className="col-lg-3 d-flex justify-content-center position-relative">
        <div className="card step-card">
          <div className="card-body">
            <h5 className="card-title">Deuxième étape</h5>
            <p className="card-text">Je sélectionne mon artisan</p>
            <i className="bi bi-arrow-down arrow-down text-primary"></i>
            <Link to="/categorie/1" className="btn btn-primary w-100  rounded-pill">Artisan  <i className="bi bi-arrow-down-short ms-2"></i></Link>
          </div>
        </div>
        <i className="bi bi-arrow-right arrow-between"></i>
      </div>

      {/* Étape 3 */}
      <div className="col-lg-3 d-flex justify-content-center position-relative">
        <div className="card step-card">
          <div className="card-body">
            <h5 className="card-title">Troisième étape</h5>
            <p className="card-text">Je contacte mon artisan via le formulaire</p>
            <i className="bi bi-arrow-down arrow-down text-primary fa-2x"></i>
            <Link to="/artisan/1" className="btn btn-primary w-100  rounded-pill">Compléter  <i className="bi bi-arrow-down-short ms-2"></i></Link>
          </div>
        </div>
        <i className="bi bi-arrow-right arrow-between"></i>
      </div>

      {/* Étape 4 */}
      <div className="col-lg-3 d-flex justify-content-center">
        <div className="card step-card">
          <div className="card-body">
            <h5 className="card-title">Quatrième étape</h5>
            <p className="card-text card-4">J’attends que mon artisan me donne une réponse sous 48 heures</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    );
};
export default Trouvetonartisan;