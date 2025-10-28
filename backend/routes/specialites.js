const express = require('express');
const router = express.Router();
const Specialite = require('../models/Specialite');

router.get('/', async (_req, res) => {
  try {
    const specialites = await Specialite.findAll({
      order: [['nom_specialite', 'ASC']]
    });
    res.json(specialites);
  } catch (error) {
    console.error('Erreur /api/specialites :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
