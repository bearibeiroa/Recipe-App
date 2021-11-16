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
        width="360"
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

DetailsCard.defaultProps = {
  strMealThumb: '',
  strMeal: '',
  strCategory: '',
  filterIngredients: [],
  strInstructions: '',
};

DetailsCard.propTypes = {
  strMealThumb: PropTypes.string,
  strMeal: PropTypes.string,
  strCategory: PropTypes.string,
  filterIngredients: PropTypes.arrayOf(PropTypes.any),
  strInstructions: PropTypes.string,
};

export default DetailsCard;
