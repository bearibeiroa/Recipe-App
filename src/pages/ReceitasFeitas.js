import React, { useState } from 'react';
import Header from '../components/Header';

function ReceitasFeitas() {
  const [title] = useState('Receitas Feitas');
  const [haveSearch] = useState(false);
  return (
    <>
      <Header title={ title } haveSearch={ haveSearch } />
      <h1>Página não encontrada :(</h1>
    </>
  );
}

export default ReceitasFeitas;
