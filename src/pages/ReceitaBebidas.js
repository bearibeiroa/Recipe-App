/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails';
import RecomendationCard from '../components/RecomendationCard';

function ReceitaBebidas() {
  const [apiResult, setApiResult] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const inProgressLS = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const inProgressRecipes = () => {
    if (!inProgressLS) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {},
        cocktails: {},
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressLS,
      }));
    }
  };

  inProgressRecipes();
  const loadFavRecipes = () => {
    const favLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favLS) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favLS]));
    }
  };
  loadFavRecipes();

  function createLocalStorage() {
    const favLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
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

  async function fecthWithId() {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const result = await response.json();
    setApiResult(result.drinks[0]);
  }

  function hideStartButton() {
    const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipe && doneRecipe.some((recipe) => recipe.id === id)) {
      return false;
    }
    return true;
  }

  function changeStartButton() {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const keys = Object.keys(inProgress.cocktails);
    if (inProgress && keys.some((key) => key === id)) {
      return false;
    }
    return true;
  }

  useEffect(() => {
    fecthWithId();
  }, []);

  function handleClick() {
    const fetchKeys = Object.keys(apiResult);
    const ingredientKeys = fetchKeys.filter((key) => key.includes('strIngredient'));
    const filteredKeys = ingredientKeys.filter((key) => apiResult[key] !== (null));
    console.log(filteredKeys);
    const mapIngredients = filteredKeys.map((ingredient) => apiResult[ingredient]);
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressLS,
      cocktails: {
        ...inProgressLS.cocktails,
        [id]: mapIngredients,
      },
    }));
    history.push(`/bebidas/${id}/in-progress`);
  }

  return (
    <main>
      { apiResult && (
        <RecipeDetails data={ apiResult } createLocalStorage={ createLocalStorage } />)}
      <RecomendationCard />
      { hideStartButton() && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          onClick={ handleClick }
        >
          { changeStartButton() ? 'Iniciar Receita' : 'Continuar Receita' }
        </button>) }

    </main>
  );
}

export default ReceitaBebidas;
