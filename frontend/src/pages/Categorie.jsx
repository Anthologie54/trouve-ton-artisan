import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtisansByCategorie } from "../api/api";

const Categorie = () => {
  const { id } = useParams();
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getArtisansByCategorie(id);
      setArtisans(data);
    };
    fetchData();
  }, [id]);

  return (
    <div className="container">
      <h2 className="my-4 text-center">Artisans de la catégorie #{id}</h2>

      {artisans.length === 0 ? (
        <p className="text-center">Aucun artisan trouvé.</p>
      ) : (
        <div className="row justify-content-center">
          {artisans.map((a) => (
            <div
              key={a.id_artisan}
              className="col-10 col-md-4 card m-2 p-3 shadow-sm"
            >
              <h5>{a.nom_artisan}</h5>
              <p>⭐ {a.note} / 5</p>
              <p>{a.specialite?.nom_specialite}</p>
              <p>{a.localisation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categorie;
