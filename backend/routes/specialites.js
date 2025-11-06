/**
 * ============================================================================
 * FICHIER : routes/specialites.js
 * DESCRIPTION : Gestion des routes liées aux spécialités d’artisans
 * ============================================================================
 */

const express = require("express");
const router = express.Router();
const Specialite = require("../models/Specialite");

// ============================================================================
// ROUTE 1 : Récupérer toutes les spécialités
// ============================================================================
/**
 * GET /api/specialites
 * Retourne la liste complète des spécialités (triées par ordre alphabétique)
 */
router.get("/", async (_req, res) => {
  try {
    const specialites = await Specialite.findAll({
      order: [["nom_specialite", "ASC"]], // Tri A→Z pour affichage cohérent côté front
    });

    res.json(specialites);
  } catch (error) {
    console.error("❌ Erreur lors du chargement des spécialités :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ============================================================================
// EXPORT DU ROUTEUR
// ============================================================================
module.exports = router;
