import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import DetailsCard from '../components/DetailsCard';
import '../App.css';
import MealsIngredientList from '../components/MealsIngredientList';

function ProgressoComidas() {
  const inProgressLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const [apiResult, setApiResult] = useState([]);
  const [doneIng, setDoneIng] = useState(0);
  const [shouldEnable, setShouldEnable] = useState(true);
  const { id } = useParams();
  const history = useHistory();

  async function fecthWithId() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const result = await response.json();
    setApiResult(result.meals[0]);
  }

  const inProgressRecipes = () => {
    if (!inProgressLS) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: { [id]: [] },
        cocktails: {},
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressLS,
      }));
    }
  };
  inProgressRecipes();

  function enableButton() {
    const currentLS = JSON.parse(localStorage.getItem('inProgressRecipes')).meals[id];
    if (currentLS.length > 0 && doneIng === currentLS.length) {
      setShouldEnable(false);
    } else {
      setShouldEnable(true);
    }
  }

  useEffect(() => {
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
          <MealsIngredientList
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
      type: 'comida',
      area: apiResult.strArea,
      category: apiResult.strCategory,
      alcoholicOrNot: '',
      name: apiResult.strMeal,
      image: apiResult.strMealThumb,
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }

  return (
    <main>
      <DetailsCard
        strMealThumb={ apiResult.strMealThumb }
        strMeal={ apiResult.strMeal }
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
