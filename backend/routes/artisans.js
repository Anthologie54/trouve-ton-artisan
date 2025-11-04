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
router.get("/top", async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      order: [["note", "DESC"]],
      limit: 3
    });
    res.json(artisans);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});
module.exports = router;
