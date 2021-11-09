import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function FilterButtons() {
  const { categoryFoodButton, categoryDrinkButton, isFetch } = useContext(AppContext);

  function filterCategoryFiveBtn() {
    console.log('outra coisa');
    const FIVE = 5;
    if (categoryFoodButton.length > FIVE) {
      const limitedFoodArray = categoryFoodButton;
      limitedFoodArray.splice(FIVE);
      return limitedFoodArray.map((food, index) => (
        <button
          data-testid={ `${food.strCategory}-category-filter` }
          key={ index }
          type="button"
        >
          {food.strCategory}
        </button>
      ));
    }
    if (categoryDrinkButton.length > FIVE) {
      const limitedDrinkArray = categoryDrinkButton;
      limitedDrinkArray.splice(FIVE);
      return limitedDrinkArray.map((drinks, index) => (
        <button
          data-testid={ `${drinks.strCategory}-category-filter` }
          key={ index }
          type="button"
        >
          {drinks.strCategory}
        </button>
      ));
    }
  }

  return (
    <span>
      {isFetch && filterCategoryFiveBtn()}
    </span>
  );
}

export default FilterButtons;
