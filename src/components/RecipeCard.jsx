import React from 'react';
import { useHistory } from 'react-router';

function RecipeCard(props) {
  const history = useHistory();
  if (history.location.pathname.includes('/comidas')) {
    const { info: { strMeal, strMealThumb }, index } = props;
    const imgTestId = `${index}-card-img`;
    const titleTestId = `${index}-card-name`;
    return (
      <section data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ imgTestId }
          src={ strMealThumb }
          alt="Imagem da receita"
          width="200"
        />
        <p data-testid={ titleTestId }>{ strMeal }</p>
      </section>
    );
  }
  if (history.location.pathname.includes('/bebidas')) {
    const { info: { strDrink, strDrinkThumb }, index } = props;
    const imgTestId = `${index}-card-img`;
    const titleTestId = `${index}-card-name`;
    return (
      <section data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ imgTestId }
          src={ strDrinkThumb }
          alt="Imagem da receita"
          width="200"
        />
        <p data-testid={ titleTestId }>{ strDrink }</p>
      </section>
    );
  }
}

export default RecipeCard;
