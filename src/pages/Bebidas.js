import React, { useState } from 'react';
import Header from '../components/Header';

function Bebidas() {
  const [title] = useState('Bebidas');
  const [haveSearch] = useState(true);
  return (
    <>
      <Header title={ title } haveSearch={ haveSearch } />
      <h1>Página não encontrada :(</h1>
    </>
  );
}

export default Bebidas;
