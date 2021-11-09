import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function LocalComidas() {
  const [title] = useState('Explorar Origem');
  const [haveSearch] = useState(true);
  return (
    <>
      <Header title={ title } haveSearch={ haveSearch } />
      <h1>Página não encontrada. :(</h1>
      <Footer />
    </>
  );
}

export default LocalComidas;
