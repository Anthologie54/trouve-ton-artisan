import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Accueil from "./pages/Accueil";
import Artisans from "./pages/Artisans";
import FicheArtisan from "./pages/FicheArtisan";
import NotFound from "./pages/NotFound";
import PageConstruction from "./pages/PageConstruction";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/artisans" element={<Artisans />} /> {/* ✅ ici */}
        <Route path="/artisan/:id" element={<FicheArtisan />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/mentions-legales" element={<PageConstruction />} />
        <Route path="/donnees-personnelles" element={<PageConstruction />} />
        <Route path="/accessibilite" element={<PageConstruction />} />
        <Route path="/cookies" element={<PageConstruction />} />
        <Route path="/gestion-cookies" element={<PageConstruction />} />
        <Route path="/contact" element={<PageConstruction />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
