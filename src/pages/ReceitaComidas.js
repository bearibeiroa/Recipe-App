import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import RecipeDetails from '../components/RecipeDetails';
import VideoCard from '../components/VideoCard';
import AppContext from '../context/AppContext';

function ReceitaComidas() {
  const [apiResult, setApiResult] = useState([]);
  const { resultsFoodApi, isFetch } = useContext(AppContext);
  const { id } = useParams();

  async function fecthWithId() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const result = await response.json();
    setApiResult(result.meals[0]);
  }

  function recomendationCard() {
    const SIX = 6;
    if (resultsFoodApi.length > SIX) {
      const limitedArray = resultsFoodApi;
      limitedArray.splice(SIX);
      return (limitedArray.map((item, index) => (
        <span
          key={ index }
          data-testid={ `${index}-recomendation-card` }
        >
          <img src={ `${item.strMealThumb}` } alt="Imagem da receita" width="200" />
          <h5>{item.strCategory}</h5>
          <p>{item.strMeal}</p>
        </span>
      )));
    }
  }

  useEffect(() => {
    fecthWithId();
  }, []);

  return (
    <main>
      <RecipeDetails data={ apiResult } />
      <VideoCard data={ apiResult } />
      <h5>Recomendadas</h5>
      <div
        data-testid="recomendation-card"
        className="recomendation"
      >
        {isFetch ? recomendationCard() : null}
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </main>
  );
}

export default ReceitaComidas;
