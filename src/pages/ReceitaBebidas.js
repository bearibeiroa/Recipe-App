/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

function ReceitaBebidas() {
  const [apiDrinkRecipe, setApiDrinkRecipe] = useState([]);
  const { id } = useParams();

  async function fecthWithId() {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const result = await response.json();
    setApiDrinkRecipe(result.drinks[0]);
  }

  function filterIngredients() {
    const ingredients = Object.keys(apiDrinkRecipe);
    const ingredientKeys = ingredients.filter((key) => key.includes('strIngredient'));
    const measure = Object.keys(apiDrinkRecipe);
    const measureKeys = measure.filter((key) => key.includes('strMeasure'));

    return ingredientKeys.map((ingredient, index) => (
      apiDrinkRecipe[ingredient] === (null) ? null : (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${apiDrinkRecipe[ingredient]} - ${apiDrinkRecipe[measureKeys[index]]}`}
        </li>)
    ));
  }

  useEffect(() => {
    fecthWithId();
  }, []);

  useEffect(() => {
    filterIngredients();
  }, [apiDrinkRecipe]);

  return (
    <main>
      <img
        data-testid="recipe-photo"
        src={ `${apiDrinkRecipe.strDrinkThumb}` }
        alt="Imagem da receita"
        width="300"
      />
      <h1 data-testid="recipe-title">{ `${apiDrinkRecipe.strDrink}`}</h1>
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Fav</button>
      <h5 data-testid="recipe-category">{ `${apiDrinkRecipe.strCategory}/${apiDrinkRecipe.strAlcoholic}` }</h5>
      <h5>Ingredients</h5>
      <ul>{ filterIngredients() }</ul>
      <h5>Instructions</h5>
      <p data-testid="instructions">
        {' '}
        {`${apiDrinkRecipe.strInstructions}`}
      </p>
      <h5>Recomendadas</h5>
      <button
        type="button"
        className="start-recipe-btn"
      >
        Iniciar Receita
      </button>

    </main>
  );
}

export default ReceitaBebidas;
