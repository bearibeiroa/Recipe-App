import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory, useLocation } from 'react-router-dom';

function ReceitaComidas() {
  const [apiResult, setApiResult] = useState([]);
  const [foodRecomendation, setFoodRecomendation] = useState([]);
  const [YTVideo, setYTVideo] = useState('');
  const { id } = useParams();
  const history = useHistory();
  const { pathname } = useLocation();

  async function fecthWithId() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const result = await response.json();
    setApiResult(result.meals[0]);
    setYTVideo(result.meals[0].strYoutube);
  }

  function embedVideo(strYTVideo) {
    const embedString = strYTVideo.split('=')[1];
    return `https://www.youtube.com/embed/${embedString}`;
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

  async function recomendationCard() {
    const foodResponse = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const foodResult = await foodResponse.json();
    const foodRec = foodResult.meals;
    const SIX = 6;
    if (foodRec.length > SIX) {
      const limitedArray = foodRec;
      limitedArray.splice(SIX);
      setFoodRecomendation(limitedArray);
    }
  }

  function handleClick() {
    history.push(`${pathname}/in-progress`);
  }

  useEffect(() => {
    fecthWithId();
  }, []);

  useEffect(() => {
    recomendationCard();
  }, []);

  return (
    <main>
      <img
        data-testid="recipe-photo"
        src={ `${apiResult.strMealThumb}` }
        alt="Imagem da receita"
        width="300"
      />
      <h1 data-testid="recipe-title">{ `${apiResult.strMeal}`}</h1>
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Fav</button>
      <h5 data-testid="recipe-category">{ `${apiResult.strCategory}`}</h5>
      <h5>Ingredients</h5>
      <ul>{ filterIngredients() }</ul>
      <h5>Instructions</h5>
      <p data-testid="instructions">
        {' '}
        {`${apiResult.strInstructions}`}
      </p>
      <h5>Video</h5>
      <iframe
        data-testid="video"
        width="420"
        height="315"
        src={ embedVideo(YTVideo) }
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write;
        encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />

      <h5>Recomendadas</h5>
      <div
        data-testid="recomendation-card"
        className="recomendation"
      >
        {foodRecomendation.map((item, index) => (
          <span
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <img src={ `${item.strMealThumb}` } alt="Imagem da receita" width="180" />
            <h5>{item.strCategory}</h5>
            <p>{item.strMeal}</p>
          </span>
        ))}
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        onClick={ () => handleClick() }
      >
        Iniciar Receita
      </button>

    </main>
  );
}

export default ReceitaComidas;
