import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';
import AppContext from '../context/AppContext';

function IngredientesBebidas() {
  const [title] = useState('Explorar Ingredientes');
  const [haveSearch] = useState(false);
  const [isLocalFetch, setIsLocalFetch] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const { setResultsDrinkApi, setIsFetch } = useContext(AppContext);

  async function requestIngredients() {
    const TWELVE = 12;
    const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const result = await request.json();
    setIngredients(result.drinks.slice(0, TWELVE));
    setIsLocalFetch(true);
  }

  useEffect(() => {
    requestIngredients();
  }, []);

  const history = useHistory();

  async function handleClick(name) {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`);
    const result = await request.json();
    setResultsDrinkApi(result.drinks);
    setIsFetch(true);
    history.push('/bebidas');
  }

  return (
    <>
      <Header title={ title } haveSearch={ haveSearch } />
      { isLocalFetch ? ingredients.map(
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
