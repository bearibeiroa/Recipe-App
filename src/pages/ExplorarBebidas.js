import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorarBebidas() {
  const [title] = useState('Explorar Comidas');
  const [haveSearch] = useState(false);
  const [isFetch, setIsFetch] = useState(false);
  const [drink, setDrink] = useState([]);

  async function requestRandomApi() {
    const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const result = await request.json();
    setDrink(result);
    setIsFetch(true);
  }

  useEffect(() => {
    requestRandomApi();
  }, []);

  return (
    <>
      <Header title={ title } haveSearch={ haveSearch } />
      <Link to="/explorar/bebidas/ingredientes">
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      { isFetch ? (
        <Link to={ `/bebidas/${drink.drinks[0].idDrink}` }>
          <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
        </Link>) : null }
      <Footer />
    </>
  );
}

export default ExplorarBebidas;
