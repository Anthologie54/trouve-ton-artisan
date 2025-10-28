const express = require('express');
const router = express.Router();
const Categorie = require('../models/Categorie');

router.get('/', async (_req, res) => {
  try {
    const categories = await Categorie.findAll({
      order: [['nom_categorie', 'ASC']]
    });
    res.json(categories);
  } catch (error) {
    console.error('Erreur /api/categories :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
