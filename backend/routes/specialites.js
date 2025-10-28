const express = require('express');
const router = express.Router();
const Specialite = require('../models/Specialite');

router.get('/', async (req, res) => {
  try {
    const specialites = await Specialite.findAll({ order: [['nom_specialite', 'ASC']] });
    res.json(specialites);
  } catch (error) {
    console.error('Erreur GET /specialites:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
