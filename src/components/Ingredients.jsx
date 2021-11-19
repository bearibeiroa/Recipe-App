import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

function Ingredients({ measure, index, ingredient }) {
  const [isChecked, setIsChecked] = useState(false);
  const { id } = useParams();

  const saveInProgress = (event) => {
    const inProgressLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const ingredientItem = event.target.value;
    const mealsKey = inProgressLS.meals[id];
    setIsChecked(!isChecked);
    if (event.target.checked && mealsKey.length > 0) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressLS,
        meals: {
          ...inProgressLS.meals,
          [id]: [...inProgressLS.meals[id], ingredientItem],
        },
      }));
    } else if (event.target.checked) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressLS,
        meals: {
          ...inProgressLS.meals,
          [id]: [ingredientItem],
        },
      }));
    }
  };

  const checkedItemLS = () => {
    const inProgressLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const checkCheckedItem = inProgressLS.meals[id].some((item) => item === ingredient);

    return checkCheckedItem && setIsChecked(true);
  };

  useEffect(() => {
    checkedItemLS();
  }, []);

  return (
    <li
      className={ isChecked ? 'strike' : '' }
      data-testid={ `${index}-ingredient-step` }
    >
      <input
        type="checkbox"
        value={ ingredient }
        onChange={ (event) => saveInProgress(event) }
        // checked={ isChecked }
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
