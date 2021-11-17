import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

const copy = require('clipboard-copy');

function RecipeDetails({ data: apiResult }) {
  const history = useHistory();
  function filterIngredients() {
    const ingredients = Object.keys(apiResult);
    const ingredientKeys = ingredients.filter((key) => key.includes('strIngredient'));
    const filteredKeys = ingredientKeys.filter((key) => apiResult[key] !== (null));
    const measure = Object.keys(apiResult);
    const measureKeys = measure.filter((key) => key.includes('strMeasure'));
    const filteredMeasure = measureKeys.filter((key) => apiResult[key] !== (null));

    return filteredKeys.map((ingredient, index) => (
      apiResult[ingredient] === ('' || null || '') ? null : (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${apiResult[ingredient]} - 
          ${apiResult[filteredMeasure[index]] || 'to taste'}`}
        </li>)
    ));
  }

  async function copyLink() {
    const successPromise = await copy(`http://localhost:3000${history.location.pathname}`);
    if (successPromise) global.alert('Link copiado!');
  }

  if (history.location.pathname.includes('/comidas')) {
    return (
      <section>
        <img
          data-testid="recipe-photo"
          src={ `${apiResult.strMealThumb}` }
          alt="Imagem da receita"
          width="300"
        />
        <h1 data-testid="recipe-title">{ `${apiResult.strMeal}`}</h1>
        <button data-testid="share-btn" onClick={ copyLink } type="button">Share</button>
        <button data-testid="favorite-btn" type="button">Fav</button>
        <h5 data-testid="recipe-category">{ `${apiResult.strCategory}`}</h5>
        <h5>Ingredients</h5>
        <ul>{ filterIngredients() }</ul>
        <h5>Instructions</h5>
        <p data-testid="instructions">
          {' '}
          {`${apiResult.strInstructions}`}
        </p>
      </section>
    );
  }
  if (history.location.pathname.includes('/bebidas')) {
    return (
      <section>
        <img
          data-testid="recipe-photo"
          src={ `${apiResult.strDrinkThumb}` }
          alt="Imagem da receita"
          width="300"
        />
        <h1 data-testid="recipe-title">{ `${apiResult.strDrink}`}</h1>
        <button data-testid="share-btn" onClick={ copyLink } type="button">Share</button>
        <button data-testid="favorite-btn" type="button">Fav</button>
        <h5 data-testid="recipe-category">{ `${apiResult.strAlcoholic}`}</h5>
        <h5>Ingredients</h5>
        <ul>{ filterIngredients() }</ul>
        <h5>Instructions</h5>
        <p data-testid="instructions">
          {' '}
          {`${apiResult.strInstructions}`}
        </p>
      </section>
    );
  }
}

RecipeDetails.propTypes = {
  data: PropTypes.shape({
    apiResult: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default RecipeDetails;
