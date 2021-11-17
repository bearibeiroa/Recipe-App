import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router';
import emptyHeart from '../images/whiteHeartIcon.svg';
import filledHeart from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipeDetails({ data: apiResult }) {
  const history = useHistory();
  const { id } = useParams();
  const [fav, setFav] = useState(false);

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

  useEffect(() => {
    checkFavRecipe();
  }, []);

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

  function copyLink() {
    copy(`http://localhost:3000${history.location.pathname}`);
    global.alert('Link copiado!');
  }

  function createLocalStorage() {
    const favLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(favLS);
    if (history.location.pathname.includes('/comidas')) {
      const favoriteRecipes = [...favLS, {
        id,
        type: 'comida',
        area: apiResult.strArea,
        category: apiResult.strCategory,
        alcoholicOrNot: '',
        name: apiResult.strMeal,
        image: apiResult.strMealThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    } else {
      const favoriteRecipes = [...favLS, {
        id,
        type: 'bebida',
        area: '',
        category: apiResult.strCategory,
        alcoholicOrNot: apiResult.strAlcoholic,
        name: apiResult.strDrink,
        image: apiResult.strDrinkThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
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

RecipeDetails.propTypes = {
  data: PropTypes.shape({
    apiResult: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default RecipeDetails;
