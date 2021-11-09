import React, { useState, useContext } from 'react';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import AppContext from '../context/AppContext';

function Bebidas() {
  const [title] = useState('Bebidas');
  const [haveSearch] = useState(true);
  const { resultsDrinkApi, isFetch } = useContext(AppContext);

  function mapRecipeCards() {
    const TWELVE = 12;
    if (resultsDrinkApi.length > 1 && resultsDrinkApi.length > TWELVE) {
      const limitedArray = resultsDrinkApi;
      limitedArray.splice(TWELVE);
      return limitedArray.map(
        (result, index) => (
          <RecipeCard
            key={ index }
            info={ result }
            index={ index }
          />),
      );
    }
    if (resultsDrinkApi.length > 1 && resultsDrinkApi.length <= TWELVE) {
      return resultsDrinkApi.map(
        (result, index) => (
          <RecipeCard
            key={ index }
            data-testid={ `${index}-recipe-card` }
            index={ index }
          />
        ),
      );
    }
  }

  return (
    <>
      <Header title={ title } haveSearch={ haveSearch } />
      { isFetch ? mapRecipeCards() : null }
    </>
  );
}

export default Bebidas;
