import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router';
import emptyHeart from '../assets/images/icons/whiteHeartIcon.svg';
import filledHeart from '../assets/images/icons/blackHeartIcon.svg';
import shareSymbol from '../assets/images/icons/shareIcon.svg';

const copy = require('clipboard-copy');

function DetailsCard({
  strMealThumb, strMeal, strCategory, filterIngredients, strInstructions,
  createLocalStorage }) {
  const [fav, setFav] = useState(false);
  const [copied, setCopied] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  const loadFavRecipes = () => {
    const favLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favLS) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favLS]));
    }
  };
  loadFavRecipes();

  function checkFavRecipe() {
    const favLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favLS && favLS.some((recipe) => recipe.id === id)) {
      setFav(true);
    }
  }

  function favRecipe() {
    const favLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (fav) {
      const filtered = favLS.filter((recipe) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
      setFav(false);
    } else {
      createLocalStorage();
      setFav(true);
    }
  }

  function copyLink() {
    const url = (`http://localhost:3000${history.location.pathname}`).replace('/in-progress', '');
    copy(url);
    setCopied(true);
  }

  useEffect(() => {
    checkFavRecipe();
  }, []);

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ strMealThumb }
        alt="Imagem da receita"
        width="360"
      />
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <button data-testid="share-btn" onClick={ copyLink } type="button">
        <img src={ shareSymbol } alt="Icone de favoritar" />
      </button>
      <button type="button" onClick={ favRecipe }>
        { fav ? (
          <img
            data-testid="favorite-btn"
            src={ filledHeart }
            alt="Icone de favoritar"
          />)
          : (
            <img
              data-testid="favorite-btn"
              src={ emptyHeart }
              alt="Icone de favoritar"
            />) }
      </button>
      { copied && <p><i>Link copiado!</i></p> }
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
  createLocalStorage: PropTypes.func.isRequired,
};

export default DetailsCard;
