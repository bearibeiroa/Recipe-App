import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

function IngredientCard(props) {
  const { index, info: { strIngredient, strIngredient1 } } = props;
  const history = useHistory();
  if (history.location.pathname.includes('comidas')) {
    return (
      <section data-testid={ `${index}-ingredient-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
          alt="Imagem do ingrediente"
        />
        <p data-testid={ `${index}-card-name` }>{ strIngredient }</p>
      </section>
    );
  }

  if (history.location.pathname.includes('bebidas')) {
    return (
      <section data-testid={ `${index}-ingredient-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
          alt="Imagem do ingrediente"
        />
        <p data-testid={ `${index}-card-name` }>{ strIngredient1 }</p>
      </section>
    );
  }
}

IngredientCard.propTypes = {
  index: PropTypes.number.isRequired,
  info: PropTypes.shape({
    strIngredient: PropTypes.string,
    strIngredient1: PropTypes.string,
  }).isRequired,
};

export default IngredientCard;
