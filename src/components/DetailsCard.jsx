import React, { useState } from 'react';
import PropTypes from 'prop-types';
import emptyHeart from '../images/whiteHeartIcon.svg';
import shareSymbol from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DetailsCard({ strMealThumb, strMeal, strCategory,
  filterIngredients, strInstructions }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyLink = () => {
    const message = window.location.href.replace('/in-progress', '');
    copy(message);
    setIsCopied(!isCopied);
  };

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ strMealThumb }
        alt="Imagem da receita"
        width="360"
      />
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <div>{isCopied ? 'Link copiado!' : null}</div>
      <button data-testid="share-btn" type="button" onClick={ () => copyLink() }>
        <img src={ shareSymbol } alt="Icone de favoritar" />
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
      >
        <img src={ emptyHeart } alt="Icone de favoritar" />
      </button>
      <h5 data-testid="recipe-category">{strCategory}</h5>
      <h5>Ingredients</h5>
      <ul>{filterIngredients()}</ul>
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
  filterIngredients: PropTypes.func,
  strInstructions: PropTypes.string,
};

export default DetailsCard;
