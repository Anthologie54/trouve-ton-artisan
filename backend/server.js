/**
 * ============================================================================
 * FICHIER : server.js
 * DESCRIPTION : Point d’entrée principal du serveur Express (API Trouve ton artisan)
 * TECHNOLOGIES : Node.js, Express, Sequelize, MySQL
 * ============================================================================
 */

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./db"); // Connexion Sequelize

// === Import des modèles ===
const Categorie = require("./models/Categorie");
const Specialite = require("./models/Specialite");
const Artisan = require("./models/Artisan");

// === Initialisation de l’application ===
const app = express();

// === Configuration des middlewares globaux ===
app.use(express.json());
const allowedOrigins = [
  'http://localhost:3000',
  'https://trouve-ton-artisan.vercel.app'
];

//  CORS : autorise Vercel et localhost
app.use(
  cors({
    origin: [
      'https://trouve-ton-artisan-vert.vercel.app', // ton site Vercel
      'http://localhost:3000',                      // pour le dev local
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
// ============================================================================
// ASSOCIATIONS ENTRE LES MODÈLES
// ============================================================================
// Une catégorie possède plusieurs spécialités
Categorie.hasMany(Specialite, { foreignKey: "id_categorie" });
Specialite.belongsTo(Categorie, { foreignKey: "id_categorie" });

// Une spécialité possède plusieurs artisans
Specialite.hasMany(Artisan, { foreignKey: "id_specialite" });
Artisan.belongsTo(Specialite, { foreignKey: "id_specialite" });

// ============================================================================
// ROUTES PRINCIPALES DE L’API
// ============================================================================
app.use("/api/categories", require("./routes/categories"));
app.use("/api/specialites", require("./routes/specialites"));
app.use("/api/artisans", require("./routes/artisans"));

// Route de test pour vérifier le bon fonctionnement de l’API
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// ============================================================================
// CONNEXION À LA BASE DE DONNÉES
// ============================================================================
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion MySQL réussie !");
  } catch (error) {
    console.error("❌ Erreur de connexion MySQL :", error.message);
  }
})();

// ============================================================================
// LANCEMENT DU SERVEUR
// ============================================================================
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 API lancée sur http://localhost:${PORT}`);
});
