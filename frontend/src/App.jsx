import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Accueil from "./pages/Accueil";
import Artisans from "./pages/Artisans";
import FicheArtisan from "./pages/FicheArtisan";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/artisans" element={<Artisans />} /> {/* ✅ ici */}
        <Route path="/artisan/:id" element={<FicheArtisan />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
