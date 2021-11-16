import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';

function ButtonRecipeDetails({ title }) {
  const { pathname } = useLocation();
  const history = useHistory();

  function handleClick() {
    if (title === 'Iniciar Receita') {
      history.push(`${pathname}/in-progress`);
    }
  }

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="start-recipe-btn"
      onClick={ handleClick }
    >
      {title}
    </button>
  );
}

ButtonRecipeDetails.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ButtonRecipeDetails;
