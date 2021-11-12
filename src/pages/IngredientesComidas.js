import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';

function IngredientesComidas() {
  const [title] = useState('Explorar Ingredientes');
  const [haveSearch] = useState(false);
  const [isFetch, setIsFetch] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  async function requestIngredients() {
    const TWELVE = 12;
    const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const result = await request.json();
    setIngredients(result.meals.slice(0, TWELVE));
    setIsFetch(true);
    console.log(result.meals.slice(0, TWELVE));
  }

  useEffect(() => {
    requestIngredients();
  }, []);

  return (
    <>
      <Header title={ title } haveSearch={ haveSearch } />
      { isFetch ? ingredients.map(
        (ingredient, index) => (
          <IngredientCard
            key={ index }
            index={ index }
            info={ ingredient }
          />
        ),
      ) : null }
      <Footer />
    </>
  );
}

export default IngredientesComidas;
