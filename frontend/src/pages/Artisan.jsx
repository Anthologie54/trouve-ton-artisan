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
    <div className="container py-4">
      <h2 className="mb-4 text-center">{artisan.nom_artisan}</h2>
      <div className="card p-4 shadow-sm">
        <p>⭐ Note : {artisan.note}/5</p>
        <p>Spécialité : {artisan.specialite?.nom_specialite}</p>
        <p>Localisation : {artisan.localisation}</p>
        <p>À propos : {artisan.a_propos}</p>
        {artisan.site_web && (
          <p>
            <a href={artisan.site_web} target="_blank" rel="noreferrer">
              Voir le site web
            </a>
          </p>
        )}
      </div>

      <h3 className="mt-5">Contacter cet artisan :</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label>Nom</label>
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
          <label>Email</label>
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
          <label>Objet</label>
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
          <label>Message</label>
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
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default Artisan;
