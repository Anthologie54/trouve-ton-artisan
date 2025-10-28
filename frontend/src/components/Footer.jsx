import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-4">
      <div className="container text-center">
        <p className="mb-0">© {new Date().getFullYear()} Trouve ton artisan</p>
        <small>Région Auvergne-Rhône-Alpes</small>
      </div>
    </footer>
  );
};

export default Footer;
