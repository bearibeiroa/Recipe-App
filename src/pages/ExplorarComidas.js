import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorarComidas() {
  const [title] = useState('Explorar Comidas');
  const [haveSearch] = useState(false);
  const [isFetch, setIsFetch] = useState(false);
  const [meal, setMeal] = useState([]);

  async function requestRandomApi() {
    const request = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const result = await request.json();
    setMeal(result);
    setIsFetch(true);
  }

  useEffect(() => {
    requestRandomApi();
  }, []);

  return (
    <>
      <Header title={ title } haveSearch={ haveSearch } />
      <Link to="/explorar/comidas/ingredientes">
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button type="button" data-testid="explore-by-area">Por Local de Origem</button>
      </Link>
      { isFetch ? (
        <Link to={ `/comidas/${meal.meals[0].idMeal}` }>
          <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
        </Link>) : null }
      <Footer />
    </>
  );
}

export default ExplorarComidas;
