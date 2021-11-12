import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import AppContext from '../context/AppContext';

function ReceitaComidas() {
  const [apiResult, setApiResult] = useState([]);
  const { resultsFoodApi, isFetch } = useContext(AppContext);
  const { id } = useParams();

  async function fecthWithId() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const result = await response.json();
    setApiResult(result.meals[0]);
  }

  function filterIngredients() {
    const ingredients = Object.keys(apiResult);
    const ingredientKeys = ingredients.filter((key) => key.includes('strIngredient'));
    const measure = Object.keys(apiResult);
    const measureKeys = measure.filter((key) => key.includes('strMeasure'));

    return ingredientKeys.map((ingredient, index) => (
      apiResult[ingredient] === ('' || null || '') ? null : (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${apiResult[ingredient]} - ${apiResult[measureKeys[index]]}`}
        </li>)
    ));
  }

  function recomendationCard() {
    const SIX = 6;
    if (resultsFoodApi.length > SIX) {
      const limitedArray = resultsFoodApi;
      limitedArray.splice(SIX);
      return (limitedArray.map((item, index) => (
        <span
          key={ index }
          data-testid={ `${index}-recomendation-card` }
        >
          <img src={ `${item.strMealThumb}` } alt="Imagem da receita" width="200" />
          <h5>{item.strCategory}</h5>
          <p>{item.strMeal}</p>
        </span>
      )));
    }
  }

  useEffect(() => {
    fecthWithId();
  }, []);

  useEffect(() => {
    filterIngredients();
  }, []);

  return (
    <main>
      <img
        data-testid="recipe-photo"
        src={ `${apiResult.strMealThumb}` }
        alt="Imagem da receita"
        width="300"
      />
      <h1 data-testid="recipe-title">{ `${apiResult.strMeal}`}</h1>
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Fav</button>
      <h5 data-testid="recipe-category">{ `${apiResult.strCategory}`}</h5>
      <h5>Ingredients</h5>
      <ul>{ filterIngredients() }</ul>
      <h5>Instructions</h5>
      <p data-testid="instructions">
        {' '}
        {`${apiResult.strInstructions}`}
      </p>
      <h5>Video</h5>
      <iframe
        data-testid="video"
        width="420"
        height="315"
        src={ `${apiResult.strYoutube}` }
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write;
        encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />

      <h5>Recomendadas</h5>
      {isFetch ? <div className="recomendation">{recomendationCard()}</div> : null}
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
      >
        Iniciar Receita
      </button>

    </main>
  );
}

export default ReceitaComidas;
