// ============================================================================
// Composant : Footer
// Description : Pied de page global du site "Trouve ton artisan !"
// Fonctionnalités :
//   - Présent et identique sur toutes les pages.
//   - Contient le logo, les coordonnées régionales et les liens légaux.
//   - Compatible mobile-first et conforme à la charte graphique régionale.
// ============================================================================

import React from "react";
import "../styles/Footer.scss";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer mt-5">
      {/* ---------------------------------------------------------------------- */}
      {/* SECTION PRINCIPALE : Logo + Informations de contact                   */}
      {/* ---------------------------------------------------------------------- */}
      <div className="footer-top py-4">
        <div className="container d-flex flex-wrap align-items-center">

          {/* === Logo de la région / site === */}
          <div className="footer-logo text-center mb-3 mb-md-0">
            <div className="logo-circle">
              <img
                src="/images/Logo.png"
                alt="Logo Trouve ton artisan"
                className="footer-logo-img"
              />
            </div>
          </div>

          {/* === Informations de contact (antenne Lyon) === */}
          <div className="footer-info text-white">
            {/* Adresse et ville */}
            <div className="col-md-6 mb-3 mb-md-0">
              <h5 className="fw-bold">Lyon</h5>
              <p className="mb-0">
                101 cours Charlemagne<br />
                CS 20033<br />
                69269 LYON CEDEX 02<br />
                France
              </p>
            </div>

            {/* Horaires + téléphone */}
            <div className="col-md-6">
              <p className="mb-1">
                Ouvert du lundi au vendredi de 8h15 à 17h
              </p>
              <p className="mb-0">
                <i className="bi bi-telephone" aria-hidden="true"></i>{" "}
                <span aria-label="Téléphone">+33 (0)4 26 73 40 00</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* BANDE INFÉRIEURE : Liens légaux (pages à venir)                       */}
      {/* ---------------------------------------------------------------------- */}
      <div className="footer-bottom py-2 text-center">
        <div className="container d-flex flex-wrap justify-content-center">
          <Link to="/mentions-legales" className="footer-link">Mentions légales</Link>
          <Link to="/donnees-personnelles" className="footer-link">Données personnelles</Link>
          <Link to="/accessibilite" className="footer-link">Accessibilité</Link>
          <Link to="/cookies" className="footer-link">Politique des cookies</Link>
          <Link to="/gestion-cookies" className="footer-link">Gestion des cookies</Link>
          <Link to="/contact" className="footer-link">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
