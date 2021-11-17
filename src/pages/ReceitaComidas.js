import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails';
import RecomendationCard from '../components/RecomendationCard';
import VideoCard from '../components/VideoCard';

function ReceitaComidas() {
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

  async function fecthWithId() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const result = await response.json();
    setApiResult(result.meals[0]);
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
    const keys = Object.keys(inProgress.meals);
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
    const filteredKeys = ingredientKeys.filter((key) => apiResult[key] !== (''));

    const mapIngredients = filteredKeys.map((ingredient) => apiResult[ingredient]);
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressLS,
      meals: {
        ...inProgressLS.meals,
        [id]: mapIngredients,
      },
    }));
    history.push(`/comidas/${id}/in-progress`);
  }

  return (
    <main>
      { apiResult && <RecipeDetails data={ apiResult } />}
      <VideoCard data={ apiResult } />
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

export default ReceitaComidas;
