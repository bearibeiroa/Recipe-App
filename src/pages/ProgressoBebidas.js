import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import DetailsCard from '../components/DetailsCard';
import '../App.css';
import DrinksIngredientList from '../components/DrinksIngredientList';

function ProgressoComidas() {
  const inProgressLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const [apiResult, setApiResult] = useState([]);
  const [doneIng, setDoneIng] = useState(0);
  const [shouldEnable, setShouldEnable] = useState(true);
  const { id } = useParams();
  const history = useHistory();

  async function fecthWithId() {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const result = await response.json();
    setApiResult(result.drinks[0]);
  }

  const inProgressRecipes = () => {
    if (!inProgressLS) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: { [id]: [] },
        meals: {},
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressLS,
      }));
    }
  };
  inProgressRecipes();

  function enableButton() {
    const currentLS = JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails[id];
    if (doneIng === currentLS.length) {
      setShouldEnable(false);
    } else {
      setShouldEnable(true);
    }
  }

  useEffect(() => {
    enableButton();
    fecthWithId();
  }, []);

  useEffect(() => {
    enableButton();
  });

  function filterIngredients() {
    const ingredients = Object.keys(apiResult);
    const ingredientKeys = ingredients.filter((key) => key.includes('strIngredient'));
    const filteredKeys = ingredientKeys.filter((key) => apiResult[key] !== (null));
    const measureKeys = ingredients.filter((key) => key.includes('strMeasure'));
    const filteredMeasure = measureKeys.filter((key) => apiResult[key] !== (null));
    return filteredKeys.map((ingredient, index) => (
      apiResult[ingredient] && (
        <span key={ index }>
          <DrinksIngredientList
            index={ index }
            ingredient={ apiResult[ingredient] }
            measure={ apiResult[filteredMeasure[index]] }
            setDoneIng={ setDoneIng }
            enableButton={ enableButton }
          />
        </span>
      )
    ));
  }

  function createLocalStorage() {
    const favLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteRecipes = [...favLS, {
      id,
      type: 'bebida',
      area: '',
      category: apiResult.strCategory,
      alcoholicOrNot: apiResult.strAlcoholic,
      name: apiResult.strDrink,
      image: apiResult.strDrinkThumb,
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }

  return (
    <main>
      <DetailsCard
        strMealThumb={ apiResult.strDrinkThumb }
        strMeal={ apiResult.strDrink }
        strCategory={ apiResult.strCategory }
        strInstructions={ apiResult.strInstructions }
        filterIngredients={ filterIngredients }
        createLocalStorage={ createLocalStorage }
      />
      <button
        type="button"
        className="start-recipe-btn"
        data-testid="finish-recipe-btn"
        disabled={ shouldEnable }
        onClick={ () => history.push('/receitas-feitas') }
      >
        Finalizar Receita
      </button>
    </main>
  );
}

export default ProgressoComidas;
