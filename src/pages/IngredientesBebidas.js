import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function IngredientesBebidas() {
  const [title] = useState('Explorar Ingredientes');
  const [haveSearch] = useState(false);
  return (
    <>
      <Header title={ title } haveSearch={ haveSearch } />
      <h1>Página não encontrada :(</h1>
      <Footer />
    </>
  );
}

export default IngredientesBebidas;
