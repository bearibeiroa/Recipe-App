import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import AppContext from '../context/AppContext';

function RecomendationCard() {
  const { resultsFoodApi, resultsDrinkApi } = useContext(AppContext);
  console.log('recomendation food contexto', resultsFoodApi);
  console.log('recomendation drink contexto', resultsDrinkApi);
  const history = useHistory();
  const SIX = 6;

  function recomendations() {
    if (history.location.pathname.includes('/comidas')) {
      return (
        resultsFoodApi.slice(0, SIX).map((item, index) => (
          <span
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <img src={ `${item.strMealThumb}` } alt="Imagem da receita" width="180" />
            <h5>{item.strCategory}</h5>
            <p>{item.strMeal}</p>
          </span>
        ))
      );
    } if (history.location.pathname.includes('/bebidas')) {
      return (
        resultsDrinkApi.slice(0, SIX).map((item, index) => (
          <span
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <img src={ `${item.strDrinkThumb}` } alt="Imagem da receita" width="180" />
            <h5>{item.strCategory}</h5>
            <p>{item.strDrink}</p>
          </span>
        ))
      );
    }
  }

  return (
    <>
      <h5>Recomendadas</h5>
      <div
        data-testid="recomendation-card"
        className="recomendation"
      >
        {recomendations()}
      </div>
    </>
  );
}

export default RecomendationCard;
