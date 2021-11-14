import React from 'react';
import PropTypes from 'prop-types';

function DetailsCard({
  strMealThumb, strMeal, strCategory, filterIngredients, strInstructions }) {
  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ strMealThumb }
        alt="Imagem da receita"
        width="300"
      />
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Fav</button>
      <h5 data-testid="recipe-category">{strCategory}</h5>
      <h5>Ingredients</h5>
      <ul>{filterIngredients}</ul>
      <h5>Instructions</h5>
      <p data-testid="instructions">
        {' '}
        {strInstructions}
      </p>

    </>
  );
}

DetailsCard.propTypes = {
  strMealThumb: PropTypes.string.isRequired,
  strMeal: PropTypes.string.isRequired,
  strCategory: PropTypes.string.isRequired,
  filterIngredients: PropTypes.func.isRequired,
  strInstructions: PropTypes.string.isRequired,
};

export default DetailsCard;
