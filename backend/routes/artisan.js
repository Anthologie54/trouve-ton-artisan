const express = require('express');
const router = express.Router();
const Artisan = require('../models/Artisan');
const Specialite = require('../models/Specialite');

router.get('/:id', async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      include: { model: Specialite }
    });
    if (!artisan) return res.status(404).json({ message: 'Artisan non trouvé' });
    res.json(artisan);
  } catch (error) {
    console.error('Erreur GET /artisan/:id:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
