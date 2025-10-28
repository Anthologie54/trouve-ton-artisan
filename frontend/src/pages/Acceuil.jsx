import React, { useEffect, useState } from "react";
import { getCategories } from "../api/api";
import { Link } from "react-router-dom";

const Accueil = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchData();
  }, []);

  return (
    <div className="container text-center">
      <h1 className="my-4">Trouve ton artisan 🧰</h1>
      <h2 className="mb-3">Choisissez une catégorie :</h2>
      <div className="row justify-content-center">
        {categories.map((cat) => (
          <div
            key={cat.id_categorie}
            className="col-10 col-md-3 p-3 m-2 border rounded shadow-sm bg-light"
          >
            <Link
              to={`/categorie/${cat.id_categorie}`}
              className="text-decoration-none text-dark"
            >
              <h5>{cat.nom_categorie}</h5>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accueil;
