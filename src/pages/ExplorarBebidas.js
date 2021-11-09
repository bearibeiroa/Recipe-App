import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorarBebidas() {
  const [title] = useState('Explorar Bebidas');
  const [haveSearch] = useState(false);
  return (
    <>
      <Header title={ title } haveSearch={ haveSearch } />
      <h1>Página não encontrada :(</h1>
      <Footer />
    </>
  );
}

export default ExplorarBebidas;
