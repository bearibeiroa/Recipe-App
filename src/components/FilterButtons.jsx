import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import AppContext from '../context/AppContext';

function FilterButtons() {
  const {
    fetchFilterFoodByCategorie,
    fetchFilterDrinkByCategorie,
  } = useContext(AppContext);

  const [categoryFoodButton, setCategoryFoodButton] = useState([]);
  const [categoryDrinkButton, setCategoryDrinkButton] = useState([]);

  const history = useHistory();

  async function fetchCategoryButton() {
    const buttonFoodResponse = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const buttonFoodResult = await buttonFoodResponse.json();
    const buttonDrinkResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const buttonDrinkResult = await buttonDrinkResponse.json();

    switch (history.location.pathname) {
    case '/comidas':
      setCategoryFoodButton(buttonFoodResult.meals);
      break;
    case '/bebidas':
      setCategoryDrinkButton(buttonDrinkResult.drinks);
      break;
    default:
      break;
    }
  }

  useEffect(() => {
    fetchCategoryButton();
  }, []);

  function filterCategoryFiveBtn() {
    const FIVE = 5;
    if (categoryFoodButton.length >= FIVE) {
      const limitedFoodArray = categoryFoodButton;
      limitedFoodArray.splice(FIVE);
      return limitedFoodArray.map((food, index) => (
        <button
          data-testid={ `${food.strCategory}-category-filter` }
          key={ index }
          type="button"
          onClick={ () => {
            console.log(food.strCategory);
            fetchFilterFoodByCategorie(food.strCategory);
          } }
        >
          {food.strCategory}
        </button>));
    }
    if (categoryDrinkButton.length >= FIVE) {
      const limitedDrinkArray = categoryDrinkButton;
      limitedDrinkArray.splice(FIVE);
      return limitedDrinkArray.map((drinks, index) => (
        <button
          data-testid={ `${drinks.strCategory}-category-filter` }
          key={ index }
          type="button"
          onClick={ () => {
            console.log(drinks.strCategory);
            fetchFilterDrinkByCategorie(drinks.strCategory);
          } }
        >
          {drinks.strCategory}
        </button>
      ));
    }
  }

  return (
    <span>
      { filterCategoryFiveBtn() }
    </span>
  );
}

export default FilterButtons;
