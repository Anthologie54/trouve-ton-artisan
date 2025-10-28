import React from 'react';
import { useParams } from 'react-router-dom';

const Artisan = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Fiche de l’artisan n°{id}</h2>
      <p>Détails à venirz..</p>
    </div>
  );
};

export default Artisan;
