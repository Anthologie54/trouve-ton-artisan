const express = require("express");
const router = express.Router();
const Artisan = require("../models/Artisan");
const Specialite = require("../models/Specialite");
const Categorie = require("../models/Categorie");


// 🟦 Route 1 : Récupérer tous les artisans (avec leur spécialité + catégorie)
router.get("/", async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      include: {
        model: Specialite,
        include: {
          model: Categorie,
        },
      },
    });
    res.json(artisans);
  } catch (error) {
    console.error("Erreur lors du chargement des artisans :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 🟩 Route 2 : Récupérer les 3 artisans du mois (sélection manuelle)
router.get("/top", async (req, res) => {
  try {
    // 🔹 Liste des artisans à afficher dans le carrousel (manuelle)
    const topNames = ["Au pain chaud", "Chocolaterie Labbé", "Orville Salmons"];

    const artisans = await Artisan.findAll({
      where: {
        nom_artisan: topNames
      },
      include: {
        model: Specialite,
        include: {
          model: Categorie,
        },
      },
    });

    res.json(artisans);
  } catch (error) {
    console.error("Erreur lors du chargement des artisans du mois :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


// 🟨 Route 3 : Recherche d’artisans (barre de recherche)
router.get("/search/:query", async (req, res) => {
  try {
    const query = req.params.query.toLowerCase();
    const artisans = await Artisan.findAll({
      where: {},
      include: {
        model: Specialite,
        include: {
          model: Categorie,
        },
      },
    });

    const results = artisans.filter((a) =>
      a.nom_artisan.toLowerCase().includes(query)
    );

    res.json(results);
  } catch (error) {
    console.error("Erreur lors de la recherche :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 🟧 Route 4 : Récupérer un artisan spécifique (fiche)
router.get("/:id", async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      include: {
        model: Specialite,
        include: {
          model: Categorie,
        },
      },
    });

    if (!artisan) {
      return res.status(404).json({ message: "Artisan non trouvé" });
    }

    res.json(artisan);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'artisan :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
