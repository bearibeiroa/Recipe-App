import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import FilterButtons from '../components/FilterButtons';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import AppContext from '../context/AppContext';

function Comidas() {
  const [title] = useState('Comidas');
  const [haveSearch] = useState(true);
  const { resultsFoodApi } = useContext(AppContext);

  function mapRecipeCards() {
    const TWELVE = 12;
    if (resultsFoodApi) {
      if (resultsFoodApi.length > TWELVE) {
        const limitedArray = resultsFoodApi;
        limitedArray.splice(TWELVE);
        return limitedArray.map(
          (result, index) => (
            <Link to={ `/comidas/${result.idMeal}` } key={ index }>
              <RecipeCard key={ index } index={ index } info={ result } />
            </Link>),
        );
      }
      if (resultsFoodApi.length >= 1 && resultsFoodApi.length <= TWELVE) {
        return resultsFoodApi.map(
          (result, index) => (
            <Link to={ `/comidas/${result.idMeal}` } key={ index }>
              <RecipeCard index={ index } key={ index } info={ result } />
            </Link>),
        );
      }
    }
  }

  return (
    <>
      <Header title={ title } haveSearch={ haveSearch } />
      <FilterButtons />
      { resultsFoodApi ? mapRecipeCards() : 'Loading...' }
      <Footer />
    </>
  );
}

export default Comidas;
