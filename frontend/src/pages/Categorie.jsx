import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArtisansByCategorie } from "../api/api";

const Categorie = () => {
  const { id } = useParams();
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categorieNom, setCategorieNom] = useState("");

  useEffect(() => {
    const fetchArtisans = async () => {
      setLoading(true);
      try {
        const data = await getArtisansByCategorie(id);
        setArtisans(data);

        // Si le tableau n’est pas vide, on récupère le nom de la catégorie
        if (data.length > 0) {
          setCategorieNom(data[0].specialite?.categorie?.nom_categorie || "Catégorie");
        } else {
          setCategorieNom("Aucun artisan trouvé");
        }
      } catch (error) {
        console.error("Erreur lors du chargement des artisans :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArtisans();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-5">Chargement des artisans...</p>;
  }

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">{categorieNom}</h2>

      {artisans.length === 0 ? (
        <p className="text-center">Aucun artisan trouvé dans cette catégorie.</p>
      ) : (
        <div className="row g-4">
          {artisans.map((a) => (
            <div key={a.id_artisan} className="col-md-4">
              <div className="card h-100 shadow-sm p-3">
                <h5 className="card-title">{a.nom_artisan}</h5>
                <p className="card-text">⭐ Note : {a.note}/5</p>
                <p className="card-text">Spécialité : {a.specialite?.nom_specialite}</p>
                <p className="card-text">Ville : {a.localisation}</p>
                <Link
                  to={`/artisan/${a.id_artisan}`}
                  className="btn btn-outline-primary mt-auto w-100"
                >
                  Voir la fiche
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categorie;
