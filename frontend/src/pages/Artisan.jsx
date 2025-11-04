import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtisanById } from "../api/api";

const Artisan = () => {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    objet: "",
    message: "",
  });

  useEffect(() => {
    const fetchArtisan = async () => {
      const data = await getArtisanById(id);
      setArtisan(data);
    };
    fetchArtisan();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message envoyé à ${artisan.nom_artisan} !`);
    setFormData({ nom: "", email: "", objet: "", message: "" });
  };

  if (!artisan) return <p className="text-center mt-5">Chargement...</p>;

  return (
    <div className="container py-5">
      {/* Détails artisan */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm p-4">
            <h2 className="mb-3">{artisan.nom_artisan}</h2>
            <p><strong>⭐ Note :</strong> {artisan.note}/5</p>
            <p><strong>Spécialité :</strong> {artisan.specialite?.nom_specialite}</p>
            <p><strong>Ville :</strong> {artisan.localisation}</p>
            <p><strong>À propos :</strong> {artisan.a_propos}</p>
            {artisan.site_web && (
              <a href={artisan.site_web} target="_blank" rel="noreferrer" className="btn btn-outline-dark mt-3">
                🌐 Voir le site web
              </a>
            )}
          </div>
        </div>

        {/* Formulaire de contact */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h4 className="mb-3 text-center">Contacter {artisan.nom_artisan}</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Votre nom</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Votre email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Objet</label>
                <input
                  type="text"
                  name="objet"
                  value={formData.objet}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-control"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                ✉️ Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artisan;
