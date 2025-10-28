import React from 'react';
import { useParams } from 'react-router-dom';

const Categorie = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Artisans de la catégorie {id}</h2>
      <p>Liste dynamique à venir...</p>
    </div>
  );
};

export default Categorie;
