import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './pages/Acceuil';
import Categorie from './pages/Categorie';
import Artisan from './pages/Artisan';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/categorie/:id" element={<Categorie />} />
          <Route path="/artisan/:id" element={<Artisan />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
