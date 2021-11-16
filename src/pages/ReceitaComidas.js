import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import DetailsCard from '../components/DetailsCard';
import RecomendationCard from '../components/RecomendationCard';

function ReceitaComidas() {
  const [apiResult, setApiResult] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  async function fecthWithId() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const result = await response.json();
    setApiResult(result.meals[0]);
  }

  useEffect(() => {
    fecthWithId();
  }, []);

  function embedVideo() {
    if (apiResult.strYoutube) {
      const embedString = apiResult.strYoutube.split('=')[1];
      return `https://www.youtube.com/embed/${embedString}`;
    }
  }

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

  const inProgressLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  function handleClick() {
    if (!inProgressLS) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }
    history.push(`/comidas/${id}/in-progress`);
  }

  // function btnText() {
  //   if (!inProgressLS && !inProgressLS.meals) return false;
  //   const inProgressKey = Object.keys(inProgressLS.meals);
  //   const checkId = inProgressKey.some((idItem) => id === idItem);
  //   return checkId;
  // }

  return (
    <main>
      { apiResult && <DetailsCard
        strMealThumb={ apiResult.strMealThumb }
        strMeal={ apiResult.strMeal }
        strCategory={ apiResult.strCategory }
        strInstructions={ apiResult.strInstructions }
        filterIngredients={ filterIngredients() }
      />}
      <h5>Video</h5>
      <iframe
        data-testid="video"
        width="420"
        height="315"
        src={ embedVideo() }
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write;
        encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />

      <RecomendationCard />

      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        onClick={ handleClick }
      >
        Iniciar Receita
      </button>

    </main>
  );
}

export default ReceitaComidas;
