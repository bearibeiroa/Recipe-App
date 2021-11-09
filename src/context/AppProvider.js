import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  // async function fetchPlanets() {
  //   const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  //   const planets = await response.json();
  //   setData(planets.results);
  //   setBackup(planets.results);
  //   setIsFetch(true);
  // }

  // useEffect(() => { fetchPlanets(); }, []);
  const [searchType, setSearchType] = useState('ingrediente');
  const [inputValueSearch, setInputValueSearch] = useState('');

  async function searchFoodRequest(type, inputValue) {
    let response = [];
    if (type === 'ingrediente') {
      response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`);
      const result = await response.json();
      console.log(result);
      return result;
    }
    if (type === 'nome') {
      response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`);
      const result = await response.json();
      console.log(result);
      return result;
    }
    if (type === 'primeira letra') {
      if (inputValue.length !== 1) {
        return global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`);
      const result = await response.json();
      console.log(result);
      return result;
    }
  }

  async function searchDrinksRequest(type, inputValue) {
    let response = [];
    if (type === 'ingrediente') {
      response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`);
      const result = await response.json();
      console.log(result);
      return result;
    }
    if (type === 'nome') {
      response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`);
      const result = await response.json();
      console.log(result);
      return result;
    }
    if (type === 'primeira letra') {
      if (inputValue.length !== 1) {
        return global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`);
      const result = await response.json();
      console.log(result);
      return result;
    }
  }

  const context = {
    searchType,
    setSearchType,
    inputValueSearch,
    setInputValueSearch,
    searchFoodRequest,
    searchDrinksRequest,
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
