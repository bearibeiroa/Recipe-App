import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import DetailsCard from '../components/DetailsCard';
import '../App.css';
import Ingredients from '../components/Ingredients';

function ProgressoComidas() {
  const inProgressLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const [apiResult, setApiResult] = useState([]);
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

  useEffect(() => {
    fecthWithId();
  }, []);

  function filterIngredients() {
    const ingredients = Object.keys(apiResult);
    const ingredientKeys = ingredients.filter((key) => key.includes('strIngredient'));
    const filteredKeys = ingredientKeys.filter((key) => apiResult[key] !== (null));
    const measureKeys = ingredients.filter((key) => key.includes('strMeasure'));
    const filteredMeasure = measureKeys.filter((key) => apiResult[key] !== (null));
    return filteredKeys.map((ingredient, index) => (
      apiResult[ingredient] && (
        <span key={ index }>
          <Ingredients
            index={ index }
            ingredient={ apiResult[ingredient] }
            measure={ apiResult[filteredMeasure[index]] }
            className="checkedItem"
          />
        </span>
      )
    ));
  }

<<<<<<< HEAD
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
=======
  const enableButton = () => {
    const ingredients = Object.keys(apiResult);
    const ingredientKeys = ingredients.filter((key) => key.includes('strIngredient'));
    const filteredKeys = ingredientKeys.filter((key) => apiResult[key] !== (null));
    const LSData = JSON.parse(localStorage.getItem('inProgressRecipes')).meals[id];
    if (LSData.length === filteredKeys.length) {
      return false;
    }
    return true;
  };
>>>>>>> d1619a280f6291f8a06fa60746168b524d4a12a7

  return (
    <>
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
        disabled={ enableButton() }
        onClick={ () => history.push('/receitas-feitas') }
      >
        Finalizar Receita
      </button>
    </>
  );
}

export default ProgressoComidas;
