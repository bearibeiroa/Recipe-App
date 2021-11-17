import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import DetailsCard from '../components/DetailsCard';

function ProgressoComidas() {
  const [apiResult, setApiResult] = useState([]);
  const { id } = useParams();

  async function fecthWithId() {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const result = await response.json();
    setApiResult(result.drinks[0]);
  }

  useEffect(() => {
    fecthWithId();
  }, []);

  function filterIngredients() {
    const ingredients = Object.keys(apiResult);
    const ingredientKeys = ingredients.filter((key) => key.includes('strIngredient'));
    const filteredKeys = ingredientKeys.filter((key) => apiResult[key] !== (null));
    const measure = Object.keys(apiResult);
    const measureKeys = measure.filter((key) => key.includes('strMeasure'));
    const filteredMeasure = measureKeys.filter((key) => apiResult[key] !== (null));
    return filteredKeys.map((ingredient, index) => (
      apiResult[ingredient] === ('') ? null : (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <input type="checkbox" />
          {`${apiResult[ingredient]} -
          ${apiResult[filteredMeasure[index]] || 'to taste'}`}
        </li>)
    ));
  }

  return (
    <>
      <DetailsCard
        strMealThumb={ apiResult.strDrinkThumb }
        strMeal={ apiResult.strDrink }
        strCategory={ apiResult.strCategory }
        strInstructions={ apiResult.strInstructions }
        filterIngredients={ filterIngredients() }
      />
      <button
        type="button"
        className="start-recipe-btn"
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </>
  );
}

export default ProgressoComidas;
