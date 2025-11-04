const express = require('express');
const router = express.Router();
const Artisan = require('../models/Artisan');
const Specialite = require('../models/Specialite'); // ✅ AJOUT ICI

// 🔹 Artisans par catégorie
router.get('/categorie/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const artisans = await Artisan.findAll({
      include: {
        model: Specialite,
        where: { id_categorie: id },
      },
    });
    res.json(artisans);
  } catch (error) {
    console.error("Erreur SQL :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des artisans." });
  }
});
// Récupère les 3 artisans avec la meilleure note
router.get("/top", async (req, res) => {
  try {
    const topArtisans = await Artisan.findAll({
      where: { top: true },
      limit: 3,
    });
    res.json(topArtisans);
  } catch (err) {
    console.error("Erreur lors du chargement des artisans du mois :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
