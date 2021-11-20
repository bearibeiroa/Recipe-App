import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

function Ingredients({ measure, index, ingredient }) {
  const [isChecked, setIsChecked] = useState(false);
  const { id } = useParams();

  const saveInProgress = ({ target }) => {
    const inProgressLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const ingredientItem = target.value;
    console.log(ingredientItem);
    const mealsIng = inProgressLS.meals[id];
    setIsChecked(!isChecked);
    if (target.checked && mealsIng.length > 0) {
      target.setAttribute('checked', true);
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressLS,
        meals: {
          ...inProgressLS.meals,
          [id]: [...inProgressLS.meals[id], ingredientItem],
        },
      }));
    } else if (target.checked) {
      target.setAttribute('checked', true);
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressLS,
        meals: {
          ...inProgressLS.meals,
          [id]: [ingredientItem],
        },
      }));
    } else if (!target.checked) {
      target.setAttribute('checked', false);
      const filteredMealsIng = mealsIng.filter((ing) => ing !== target.value);
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressLS,
        meals: {
          ...inProgressLS.meals,
          [id]: [...filteredMealsIng],
        },
      }));
    }
  };

  const checkedItemLS = () => {
    const inProgressLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const checkCheckedItem = inProgressLS.meals[id].filter((item) => item === ingredient);
    const checkboxes = document.querySelectorAll('.checkbox');
    const keys = Object.keys(checkboxes);
    keys.forEach((key) => {
      checkCheckedItem.forEach((item) => {
        if (checkboxes[key].value === item) {
          setIsChecked(!isChecked);
          checkboxes[key].setAttribute('checked', true);
        }
      });
    });
  };

  useEffect(() => {
    checkedItemLS();
  }, []);

  return (
    <div>
      <label
        className={ isChecked ? 'strike' : '' }
        data-testid={ `${index}-ingredient-step` }
        htmlFor={ ingredient }
      >
        <input
          type="checkbox"
          className="checkbox"
          name={ ingredient }
          value={ ingredient }
          onChange={ (event) => saveInProgress(event) }
          checked={ isChecked }
        />
        {`${ingredient} - ${measure || 'to taste'}`}
      </label>

    </div>
  );
}

Ingredients.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
  measure: PropTypes.string.isRequired,
};

export default Ingredients;
