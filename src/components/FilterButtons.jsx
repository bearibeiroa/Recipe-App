import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import AppContext from '../context/AppContext';

function FilterButtons() {
  const {
    fetchFilterFoodByCategorie,
    fetchFilterDrinkByCategorie,
    setResultsDrinkApi,
    setResultsFoodApi,
  } = useContext(AppContext);

  const [categoryFoodButton, setCategoryFoodButton] = useState([]);
  const [categoryDrinkButton, setCategoryDrinkButton] = useState([]);
  const [foodBackup, setFoodBackup] = useState([]);
  const [drinkBackup, setDrinkBackup] = useState([]);

  const history = useHistory();

  async function fetchRequestRecipes() {
    const drinkResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const drinkResult = await drinkResponse.json();
    setDrinkBackup(drinkResult.drinks);
    const foodResponse = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const foodResult = await foodResponse.json();
    setFoodBackup(foodResult.meals);
  }

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
    fetchRequestRecipes();
  }, []);

  function filterCategoryFiveBtn() {
    const FIVE = 5;
    if (categoryFoodButton.length >= FIVE) {
      return categoryFoodButton.slice(0, FIVE).map((food, index) => (
        <button
          data-testid={ `${food.strCategory}-category-filter` }
          key={ index }
          type="button"
          onClick={ () => fetchFilterFoodByCategorie(food.strCategory, foodBackup) }
        >
          {food.strCategory}
        </button>));
    }
    if (categoryDrinkButton.length >= FIVE) {
      return categoryDrinkButton.slice(0, FIVE).map((drinks, index) => (
        <button
          data-testid={ `${drinks.strCategory}-category-filter` }
          key={ index }
          type="button"
          onClick={ () => fetchFilterDrinkByCategorie(drinks.strCategory, drinkBackup) }
        >
          {drinks.strCategory}
        </button>
      ));
    }
  }

  function handleAllClick() {
    switch (history.location.pathname) {
    case '/comidas':
      setResultsFoodApi(foodBackup);
      break;
    case '/bebidas':
      setResultsDrinkApi(drinkBackup);
      break;
    default:
      break;
    }
  }

  return (
    <nav>
      { filterCategoryFiveBtn() }
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ handleAllClick }
      >
        All
      </button>
    </nav>
  );
}

export default FilterButtons;
