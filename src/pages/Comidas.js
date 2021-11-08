import React, { useState } from 'react';
import Header from '../components/Header';

function Comidas() {
  const [title] = useState('Comidas');
  const [haveSearch] = useState(true);
  return (
    <>
      <Header title={ title } haveSearch={ haveSearch } />
      <h1>Comidas</h1>
    </>
  );
}

export default Comidas;
