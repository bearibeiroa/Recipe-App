/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory, useLocation } from 'react-router-dom';

function ReceitaBebidas() {
  const [apiDrinkRecipe, setApiDrinkRecipe] = useState([]);
  const [drinkRecomendation, setDrinkRecomendation] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const { pathname } = useLocation();

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

  async function recomendationCard() {
    const drinkResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const drinkResult = await drinkResponse.json();
    const drinksRec = drinkResult.drinks;
    const SIX = 6;
    if (drinksRec.length > SIX) {
      const limitedArray = drinksRec;
      limitedArray.splice(SIX);
      setDrinkRecomendation(limitedArray);
    }
  }

  function handleClick() {
    history.push(`${pathname}/in-progress`);
  }

  useEffect(() => {
    fecthWithId();
  }, []);

  useEffect(() => {
    recomendationCard();
  }, []);

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
      <h5
        data-testid="recipe-category"
      >
        {`${apiDrinkRecipe.strCategory}/${apiDrinkRecipe.strAlcoholic}`}
      </h5>
      <h5>Ingredients</h5>
      <ul>{ filterIngredients() }</ul>
      <h5>Instructions</h5>
      <p data-testid="instructions">
        {' '}
        {`${apiDrinkRecipe.strInstructions}`}
      </p>
      <h5>Recomendadas</h5>
      <div
        data-testid="recomendation-card"
        className="recomendation"
      >
        {drinkRecomendation.map((item, index) => (
          <span
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <img src={ `${item.strDrinkThumb}` } alt="Imagem da receita" width="180" />
            <h5>{item.strCategory}</h5>
            <p>{item.strDrink}</p>
          </span>
        ))}
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        onClick={ () => handleClick() }
      >
        Iniciar Receita
      </button>

    </main>
  );
}

export default ReceitaBebidas;
