import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

function DrinksIngredientList({ measure, index, ingredient, setDoneIng, enableButton }) {
  const [isChecked, setIsChecked] = useState(false);
  const { id } = useParams();

  const saveInProgress = ({ target }) => {
    const inProgressLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const ingredientItem = target.value;
    const mealsIng = inProgressLS.cocktails[id];
    setIsChecked(!isChecked);
    if (target.checked && mealsIng.length > 0) {
      target.setAttribute('checked', true);
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressLS,
        cocktails: {
          ...inProgressLS.cocktails,
          [id]: [...inProgressLS.cocktails[id], ingredientItem],
        },
      }));
    } else if (target.checked) {
      target.setAttribute('checked', true);
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressLS,
        cocktails: {
          ...inProgressLS.cocktails,
          [id]: [ingredientItem],
        },
      }));
    } else if (!target.checked) {
      target.setAttribute('checked', false);
      const filteredMealsIng = mealsIng.filter((ing) => ing !== target.value);
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressLS,
        cocktails: {
          ...inProgressLS.cocktails,
          [id]: [...filteredMealsIng],
        },
      }));
    }
  };

  const checkedItemLS = () => {
    const inProgressLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const checkboxes = document.querySelectorAll('.checkbox');
    if (inProgressLS.cocktails[id] && checkboxes.length > 0) {
      const checkCheckedItem = inProgressLS.cocktails[id];
      console.log(checkCheckedItem);
      const filtered = checkCheckedItem.filter(
        (item) => item === ingredient,
      );
      setDoneIng(checkboxes.length);
      const keys = Object.keys(checkboxes);
      keys.forEach((key) => {
        filtered.forEach((item) => {
          if (checkboxes[key].value === item) {
            setIsChecked(!isChecked);
            checkboxes[key].setAttribute('checked', true);
          }
        });
      });
    }
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
          onChange={ (event) => {
            saveInProgress(event);
            enableButton();
          } }
          checked={ isChecked }
        />
        {`${ingredient} - ${measure || 'to taste'}`}
      </label>

    </div>
  );
}

DrinksIngredientList.defaultProps = {
  measure: '',
};

DrinksIngredientList.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
  measure: PropTypes.string,
  setDoneIng: PropTypes.func.isRequired,
  enableButton: PropTypes.func.isRequired,
};

export default DrinksIngredientList;
