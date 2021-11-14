import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function RecipeDetails({ data: apiResult }) {
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

  useEffect(() => {
    filterIngredients();
  }, []);

  return (
    <section>
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
    </section>
  );
}

RecipeDetails.propTypes = {
  data: PropTypes.shape({
    apiResult: PropTypes.shape(),
  }).isRequired,
};

export default RecipeDetails;
