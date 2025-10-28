const express = require('express');
const router = express.Router();
const Artisan = require('../models/Artisan');

router.get('/', async (_req, res) => {
  try {
    const artisans = await Artisan.findAll({
      order: [['nom_artisan', 'ASC']]
    });
    res.json(artisans);
  } catch (error) {
    console.error('Erreur /api/artisans :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
