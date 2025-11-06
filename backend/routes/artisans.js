/**
 * ============================================================================
 * FICHIER : routes/artisans.js
 * DESCRIPTION : Gestion des routes liées aux artisans (API REST)
 * ============================================================================
 */

const express = require("express");
const router = express.Router();

// ============================================================================
// IMPORT DES MODÈLES
// ============================================================================
const Artisan = require("../models/Artisan");
const Specialite = require("../models/Specialite");
const Categorie = require("../models/Categorie");

// ============================================================================
// ROUTE 1 : Récupérer tous les artisans
// ============================================================================
/**
 * GET /api/artisans
 * Retourne la liste complète des artisans avec leurs spécialités et catégories associées
 */
router.get("/", async (_req, res) => {
  try {
    const artisans = await Artisan.findAll({
      include: {
        model: Specialite,
        include: { model: Categorie },
      },
    });
    res.json(artisans);
  } catch (error) {
    console.error("❌ Erreur lors du chargement des artisans :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ============================================================================
// ROUTE 2 : Récupérer les artisans du mois (sélection manuelle)
// ============================================================================
/**
 * GET /api/artisans/top
 * Retourne une liste d’artisans mis en avant (sélection manuelle)
 */
router.get("/top", async (_req, res) => {
  try {
    // 🔹 Liste des artisans mis en avant dans le carrousel
    const topNames = ["Au pain chaud", "Chocolaterie Labbé", "Orville Salmons"];

    const artisans = await Artisan.findAll({
      where: { nom_artisan: topNames },
      include: {
        model: Specialite,
        include: { model: Categorie },
      },
    });

    res.json(artisans);
  } catch (error) {
    console.error("❌ Erreur lors du chargement des artisans du mois :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ============================================================================
// ROUTE 3 : Recherche d’artisans (par nom, spécialité ou catégorie)
// ============================================================================
/**
 * GET /api/artisans/search?q=motcle
 * Recherche un artisan selon :
 *  - son nom
 *  - sa spécialité
 *  - sa catégorie
 */
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q ? req.query.q.toLowerCase() : "";
    if (!query) return res.json([]); // Aucun mot-clé → pas de résultat

    const artisans = await Artisan.findAll({
      include: {
        model: Specialite,
        include: { model: Categorie },
      },
    });

    // 🔍 Filtrage côté serveur
    const results = artisans.filter(
      (a) =>
        a.nom_artisan.toLowerCase().includes(query) ||
        a.Specialite?.nom_specialite.toLowerCase().includes(query) ||
        a.Specialite?.Categorie?.nom_categorie.toLowerCase().includes(query)
    );

    res.json(results);
  } catch (error) {
    console.error("❌ Erreur lors de la recherche d’artisans :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ============================================================================
// ROUTE 4 : Récupérer un artisan spécifique
// ============================================================================
/**
 * GET /api/artisans/:id
 * Retourne les informations détaillées d’un artisan via son ID
 */
router.get("/:id", async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      include: {
        model: Specialite,
        include: { model: Categorie },
      },
    });

    if (!artisan) {
      return res.status(404).json({ message: "Artisan non trouvé" });
    }

    res.json(artisan);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération de l’artisan :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ============================================================================
// EXPORT DU ROUTEUR
// ============================================================================
module.exports = router;
