import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-dark text-white py-3 mb-4">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="text-white h4 mb-0">Trouve ton artisan</Link>
        <nav>
          <Link to="/categorie/1" className="text-white me-3">Bâtiment</Link>
          <Link to="/categorie/2" className="text-white me-3">Services</Link>
          <Link to="/categorie/3" className="text-white me-3">Fabrication</Link>
          <Link to="/categorie/4" className="text-white">Alimentation</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
