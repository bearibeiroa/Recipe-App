import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import AppContext from '../context/AppContext';

function RecomendationCard() {
  const { resultsFoodApi, resultsDrinkApi } = useContext(AppContext);
  const history = useHistory();
  const SIX = 6;

  const Recomendations = () => {
    if (history.location.pathname.includes('/bebidas')) {
      return (
        resultsFoodApi.slice(0, SIX).map((item, index) => (
          <span
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <img src={ `${item.strMealThumb}` } alt="Imagem da receita" width="180" />
            <h5>{item.strCategory}</h5>
            <p data-testid={ `${index}-recomendation-title` }>{item.strMeal}</p>
          </span>
        ))
      );
    } if (history.location.pathname.includes('/comidas')) {
      return (
        resultsDrinkApi.slice(0, SIX).map((item, index) => (
          <span
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <img src={ `${item.strDrinkThumb}` } alt="Imagem da receita" width="180" />
            <h5>{item.strCategory}</h5>
            <p data-testid={ `${index}-recomendation-title` }>{item.strDrink}</p>
          </span>
        ))
      );
    }
  };

  return (
    <>
      <h5>Recomendadas</h5>
      <div
        className="recomendation"
      >
        <Recomendations />
      </div>
    </>
  );
}

export default RecomendationCard;
