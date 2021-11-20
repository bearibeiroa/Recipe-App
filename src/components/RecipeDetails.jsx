import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router';
import emptyHeart from '../images/whiteHeartIcon.svg';
import filledHeart from '../images/blackHeartIcon.svg';
import shareSymbol from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function RecipeDetails(
  { strMealThumb, strMeal, strCategory, strInstructions, createLocalStorage, apiResult },
) {
  const history = useHistory();
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const [fav, setFav] = useState(false);

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
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${apiResult[ingredient]} -
          ${apiResult[filteredMeasure[index]] || 'to taste'}`}
        </li>)
    ));
  }

  function checkFavRecipe() {
    const favLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favLS && favLS.some((recipe) => recipe.id === id)) {
      setFav(true);
    }
  }

  useEffect(() => {
    checkFavRecipe();
  }, []);

  function copyLink() {
    copy(`http://localhost:3000${history.location.pathname}`);
    setCopied(true);
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
  return (
    <section>
      <img
        data-testid="recipe-photo"
        src={ `${strMealThumb}` }
        alt="Imagem da receita"
        width="300"
      />
      <h1 data-testid="recipe-title">{ `${strMeal}`}</h1>
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
      <h5 data-testid="recipe-category">{ `${strCategory}`}</h5>
      <h5>Ingredients</h5>
      <ul>{ filterIngredients() }</ul>
      <h5>Instructions</h5>
      <p data-testid="instructions">
        {' '}
        {`${strInstructions}`}
      </p>
    </section>
  );
}

RecipeDetails.defaultProps = {
  strMealThumb: '',
  strMeal: '',
  strCategory: '',
  strInstructions: '',
};

RecipeDetails.propTypes = {
  strMealThumb: PropTypes.string,
  strMeal: PropTypes.string,
  strCategory: PropTypes.string,
  strInstructions: PropTypes.string,
  createLocalStorage: PropTypes.func.isRequired,
  apiResult: PropTypes.shape().isRequired,
};

export default RecipeDetails;
