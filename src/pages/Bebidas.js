import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import FilterButtons from '../components/FilterButtons';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import AppContext from '../context/AppContext';

function Bebidas() {
  const [title] = useState('Bebidas');
  const [haveSearch] = useState(true);
  const { resultsDrinkApi, isFetch } = useContext(AppContext);

  function mapRecipeCards() {
    const TWELVE = 12;
    if (resultsDrinkApi) {
      if (resultsDrinkApi.length > TWELVE) {
        const limitedArray = resultsDrinkApi;
        limitedArray.splice(TWELVE);
        return limitedArray.map(
          (result, index) => (
            <Link to={ `/bebidas/${result.idDrink}` } key={ index }>
              <RecipeCard key={ index } index={ index } info={ result } />
            </Link>),
        );
      }
      if (resultsDrinkApi.length >= 1 && resultsDrinkApi.length <= TWELVE) {
        return resultsDrinkApi.map(
          (result, index) => (
            <Link to={ `/bebidas/${result.idDrink}` } key={ index }>
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
      { isFetch ? mapRecipeCards() : <p>Loading...</p> }
      <Footer />
    </>
  );
}

export default Bebidas;
