const express = require('express');
const router = express.Router();
const Artisan = require('../models/Artisan');
const Specialite = require('../models/Specialite');

router.get('/', async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      include: { model: Specialite },
      order: [['nom_artisan', 'ASC']]
    });
    res.json(artisans);
  } catch (error) {
    console.error('Erreur GET /artisans:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
