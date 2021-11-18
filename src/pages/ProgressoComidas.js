import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import DetailsCard from '../components/DetailsCard';
import '../App.css';
import Ingredients from '../components/Ingredients';

function ProgressoComidas() {
  const [apiResult, setApiResult] = useState([]);
  const { id } = useParams();
  const history = useHistory();

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

  createLocalStorage();

  async function fecthWithId() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const result = await response.json();
    setApiResult(result.meals[0]);
  }

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
      apiResult[ingredient] === ('') ? null : (
        <span key={ index }>
          <Ingredients
            index={ index }
            ingredient={ apiResult[ingredient] }
            measure={ apiResult[filteredMeasure[index]] }
          />
        </span>
      )
    ));
  }

  return (
    <>
      <DetailsCard
        strMealThumb={ apiResult.strMealThumb }
        strMeal={ apiResult.strMeal }
        strCategory={ apiResult.strCategory }
        strInstructions={ apiResult.strInstructions }
        filterIngredients={ filterIngredients() }
      />
      <button
        type="button"
        className="start-recipe-btn"
        data-testid="finish-recipe-btn"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Finalizar Receita
      </button>
    </>
  );
}

export default ProgressoComidas;
