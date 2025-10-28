// backend/routes/categories.js

const express = require('express');
const router = express.Router();
const Categorie = require('../models/Categorie');

// ✅ Route GET /api/categories
router.get('/', async (req, res) => {
  try {
    const categories = await Categorie.findAll({
      order: [['nom_categorie', 'ASC']],
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error('❌ Erreur dans /api/categories :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des catégories' });
  }
});

module.exports = router;
