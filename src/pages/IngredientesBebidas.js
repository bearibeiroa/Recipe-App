import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';
import AppContext from '../context/AppContext';

function IngredientesBebidas() {
  const [title] = useState('Explorar Ingredientes');
  const [haveSearch] = useState(false);
  const [isFetch, setIsFetch] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const { setResultsDrinkApi } = useContext(AppContext);

  async function requestIngredients() {
    const TWELVE = 12;
    const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const result = await request.json();
    setIngredients(result.drinks.slice(0, TWELVE));
    setIsFetch(true);
  }

  useEffect(() => {
    requestIngredients();
  }, []);

  async function searchByIngredient(name) {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`);
    const result = await request.json();
    console.log(result);
    return result;
  }

  const history = useHistory();

  async function handleClick(name) {
    console.log(name);
    const filteredDrinks = await searchByIngredient(name);
    console.log(filteredDrinks);
    setResultsDrinkApi(filteredDrinks);
    history.push('/bebidas');
  }

  return (
    <>
      <Header title={ title } haveSearch={ haveSearch } />
      { isFetch ? ingredients.map(
        (ingredient, index) => (
          <button
            type="button"
            key={ index }
            onClick={ () => handleClick(ingredient.strIngredient1) }
          >
            <IngredientCard
              index={ index }
              info={ ingredient }
            />
          </button>
        ),
      ) : null }
      <Footer />
    </>
  );
}

export default IngredientesBebidas;
