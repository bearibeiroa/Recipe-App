import PropTypes from 'prop-types';
import React, { useState } from 'react';

function Ingredients({ measure, index, ingredient }) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <li
      data-testid={ `${index}-ingredient-step` }
      className={ isChecked ? 'strike' : '' }
    >
      <input
        type="checkbox"
        checked={ isChecked }
        onChange={ () => setIsChecked(!isChecked) }
      />
      {`${ingredient} - ${measure || 'to taste'}`}
    </li>
  );
}

Ingredients.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
  measure: PropTypes.string.isRequired,
};

export default Ingredients;
