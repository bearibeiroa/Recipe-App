import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [searchType, setSearchType] = useState('ingrediente');
  const [inputValueSearch, setInputValueSearch] = useState('');
  const [resultsFoodApi, setResultsFoodApi] = useState([]);
  const [resultsDrinkApi, setResultsDrinkApi] = useState([]);
  const [isFetch, setIsFetch] = useState(false);
  const [category, setCategory] = useState('');
  const [userEmail, setUserEmail] = useState('');

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

  async function fetchRequestRecipes() {
    const drinkResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const drinkResult = await drinkResponse.json();
    setResultsDrinkApi(drinkResult.drinks);
    const foodResponse = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const foodResult = await foodResponse.json();
    setResultsFoodApi(foodResult.meals);
  }

  useEffect(() => {
    fetchRequestRecipes();
  }, []);

  async function fetchFilterFoodByCategorie(categorie, foodBackup) {
    // setIsFetch(false);
    if (categorie !== category || category === '') {
      const filterFoodResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`);
      const jsonFoodResponse = await filterFoodResponse.json();
      const resultFood = jsonFoodResponse.meals;
      setResultsFoodApi(resultFood);
      // setIsFetch(true);
      setCategory(categorie);
    } else if (categorie === category) {
      setResultsFoodApi(foodBackup);
      // setIsFetch(true);
      setCategory('');
    }
  }

  async function fetchFilterDrinkByCategorie(categorie, drinkBackup) {
    // setIsFetch(false);
    if (categorie !== category || category === '') {
      const filterDrinkResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categorie}`);
      const jsonDrinkResponse = await filterDrinkResponse.json();
      const resultDrinks = jsonDrinkResponse.drinks;
      setResultsDrinkApi(resultDrinks);
      // setIsFetch(true);
      setCategory(categorie);
    } else if (categorie === category) {
      setResultsDrinkApi(drinkBackup);
      // setIsFetch(true);
      setCategory('');
    }
  }

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
    setIsFetch,
    fetchFilterFoodByCategorie,
    fetchFilterDrinkByCategorie,
    userEmail,
    setUserEmail,
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
