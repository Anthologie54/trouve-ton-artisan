const express = require('express');
const router = express.Router();
const Artisan = require('../models/Artisan');

router.get('/:id', async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) return res.status(404).json({ message: 'Artisan non trouvé' });
    res.json(artisan);
  } catch (error) {
    console.error('Erreur /api/artisan/:id :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
