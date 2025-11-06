/**
 * ============================================================================
 * FICHIER : routes/categories.js
 * DESCRIPTION : Gestion des routes liées aux catégories d’artisans
 * ============================================================================
 */

const express = require("express");
const router = express.Router();
const Categorie = require("../models/Categorie");

// ============================================================================
// ROUTE 1 : Récupérer toutes les catégories
// ============================================================================
/**
 * GET /api/categories
 * Retourne la liste complète des catégories disponibles (triées par ordre alphabétique)
 */
router.get("/", async (_req, res) => {
  try {
    const categories = await Categorie.findAll({
      order: [["nom_categorie", "ASC"]], // Tri A→Z pour une meilleure lisibilité côté front
    });

    res.json(categories);
  } catch (error) {
    console.error("❌ Erreur lors du chargement des catégories :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ============================================================================
// EXPORT DU ROUTEUR
// ============================================================================
module.exports = router;
