import React, { useState, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import AppContext from '../context/AppContext';

function Comidas() {
  const [title] = useState('Comidas');
  const [haveSearch] = useState(true);
  const { resultsFoodApi, isFetch } = useContext(AppContext);

  function mapRecipeCards() {
    const TWELVE = 12;
    if (resultsFoodApi) {
      if (resultsFoodApi.length > 1 && resultsFoodApi.length > TWELVE) {
        const limitedArray = resultsFoodApi;
        limitedArray.splice(TWELVE);
        return limitedArray.map(
          (result, index) => <RecipeCard key={ index } index={ index } info={ result } />,
        );
      }
      if (resultsFoodApi.length > 1 && resultsFoodApi.length <= TWELVE) {
        return resultsFoodApi.map(
          (result, index) => (
            <RecipeCard
              key={ index }
              info={ result }
              index={ index }
            />
          ),
        );
      }
    }
  }

  return (
    <>
      <Header title={ title } haveSearch={ haveSearch } />
      { isFetch ? mapRecipeCards() : null }
      <Footer />
    </>
  );
}

export default Comidas;
