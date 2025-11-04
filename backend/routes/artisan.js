const express = require("express");
const router = express.Router();
const Artisan = require("../models/Artisan");
const Specialite = require("../models/Specialite");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const artisan = await Artisan.findByPk(id, {
      include: {
        model: Specialite,
      },
    });

    if (!artisan) return res.status(404).json({ error: "Artisan non trouvé" });

    res.json(artisan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération de l’artisan." });
  }
});

module.exports = router;
