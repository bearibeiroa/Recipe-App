import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [searchType, setSearchType] = useState('ingrediente');
  const [inputValueSearch, setInputValueSearch] = useState('');
  const [resultsFoodApi, setResultsFoodApi] = useState([]);
  const [resultsDrinkApi, setResultsDrinkApi] = useState([]);
  const [isFetch, setIsFetch] = useState(false);
  const [categoryFoodButton, setCategoryFoodButton] = useState([]);
  const [categoryDrinkButton, setCategoryDrinkButton] = useState([]);
  const [filterCategoryFood, setFilterCategoryFood] = useState([]);
  const [filterCategoryDrink, setFilterCategoryDrink] = useState([]);

  async function searchFoodRequest(type, inputValue) {
    let response = [];
    if (type === 'ingrediente') {
      response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`);
      const result = await response.json();
      setResultsFoodApi(result.meals);
      setIsFetch(true);
      return result.meals;
    }
    if (type === 'nome') {
      response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`);
      const result = await response.json();
      setResultsFoodApi(result.meals);
      setIsFetch(true);
      return result.meals;
    }
    if (type === 'primeira letra') {
      if (inputValue.length !== 1) {
        return global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`);
      const result = await response.json();
      setResultsFoodApi(result.meals);
      setIsFetch(true);
      return result.meals;
    }
  }

  async function searchDrinksRequest(type, inputValue) {
    let response = [];
    if (type === 'ingrediente') {
      response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`);
      const result = await response.json();
      setResultsDrinkApi(result.drinks);
      setIsFetch(true);
      return result.drinks;
    }
    if (type === 'nome') {
      response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`);
      const result = await response.json();
      setResultsDrinkApi(result.drinks);
      setIsFetch(true);
      return result.drinks;
    }
    if (type === 'primeira letra') {
      if (inputValue.length !== 1) {
        return global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`);
      const result = await response.json();
      setResultsDrinkApi(result.drinks);
      setIsFetch(true);
      return result.drinks;
    }
  }

  async function fetchRequest() {
    const drinkResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const drinkResult = await drinkResponse.json();
    setResultsDrinkApi(drinkResult.drinks);
    const foodResponse = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const foodResult = await foodResponse.json();
    setResultsFoodApi(foodResult.meals);
    setIsFetch(true);
  }

  useEffect(() => {
    fetchRequest();
  }, []);

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

  async function fetchFilterFoodByCategorie(categorie) {
    const filterFoodResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`);
    const jsonFoodResponse = await filterFoodResponse.json();
    const resultFood = jsonFoodResponse.meals;
    const TWELVE = 12;
    const ONE = 1;
    if (resultFood) {
      if (resultFood.length > ONE && resultFood.length >= TWELVE) {
        const finalFoodFilterCategory = resultFood;
        finalFoodFilterCategory.splice(TWELVE);
        setFilterCategoryFood(finalFoodFilterCategory);
      } else {
        setFilterCategoryFood(resultFood);
      }
    }
  }

  useEffect(() => {
    fetchFilterFoodByCategorie();
  }, []);

  async function fetchFilterDrinkByCategorie(categorie) {
    const filterDrinkResponse = await
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categorie}`);
    const jsonDrinkResponse = await filterDrinkResponse.json();
    const resultDrinks = jsonDrinkResponse.drinks;
    const TWELVE = 12;
    const ONE = 1;
    if (resultDrinks) {
      if (resultDrinks.length > ONE && resultDrinks.length >= TWELVE) {
        const finalDrinkFilterCategory = resultDrinks;
        finalDrinkFilterCategory.splice(TWELVE);
        setFilterCategoryDrink();
        setFilterCategoryDrink(finalDrinkFilterCategory);
      } else {
        setFilterCategoryDrink(resultDrinks);
      }
    }
  }

  useEffect(() => {
    fetchFilterDrinkByCategorie();
  }, []);

  const context = {
    searchType,
    setSearchType,
    inputValueSearch,
    setInputValueSearch,
    searchFoodRequest,
    searchDrinksRequest,
    resultsFoodApi,
    setResultsFoodApi,
    resultsDrinkApi,
    setResultsDrinkApi,
    isFetch,
    categoryFoodButton,
    setCategoryFoodButton,
    categoryDrinkButton,
    setCategoryDrinkButton,
    setFilterCategoryFood,
    filterCategoryFood,
    filterCategoryDrink,
    setFilterCategoryDrink,
    fetchFilterFoodByCategorie,
    fetchFilterDrinkByCategorie,
  };

  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
