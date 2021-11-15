import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explorar() {
  const [title] = useState('Explorar');
  const [haveSearch] = useState(false);

  return (
    <>
      <Header title={ title } haveSearch={ haveSearch } />
      <Link to="/explorar/comidas">
        <button data-testid="explore-food" type="button">Explorar Comidas</button>
      </Link>
      <Link to="/explorar/bebidas">
        <button data-testid="explore-drinks" type="button">Explorar Bebidas</button>
      </Link>
      <Footer />
    </>
  );
}

export default Explorar;
