import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function SearchBar({ searchText }) {
  const {
    searchType,
    setSearchType,
    searchFoodRequest,
    searchDrinksRequest,
  } = useContext(AppContext);

  const history = useHistory();

  function oneRedirectionResult(result) {
    switch (history.location.pathname) {
    case '/comidas':
      if (result.length === 1) {
        history.push(`/comidas/${result[0].idMeal}`);
      }
      break;
    case '/bebidas':
      if (result.length === 1) {
        history.push(`/bebidas/${result[0].idDrink}`);
      }
      break;
    default:
      break;
    }
  }

  async function handleClickAPI() {
    if (history.location.pathname === '/comidas') {
      const meals = await searchFoodRequest(searchType, searchText);
      if (!meals) {
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
      if (meals) {
        oneRedirectionResult(meals);
      }
    }
    if (history.location.pathname === '/bebidas') {
      const drinks = await searchDrinksRequest(searchType, searchText);
      if (!drinks) {
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
      if (drinks) {
        oneRedirectionResult(drinks);
      }
    }
  }

  return (
    <>
      <label htmlFor="ingredient-search-radio">
        <input
          type="radio"
          name="ingredient-search-radio"
          data-testid="ingredient-search-radio"
          value="ingrediente"
          onChange={ ({ target }) => setSearchType(target.value) }
        />
        Ingredientes
      </label>
      <label htmlFor="name-search-radio">
        <input
          type="radio"
          name="name-search-radio"
          value="nome"
          data-testid="name-search-radio"
          onChange={ ({ target }) => setSearchType(target.value) }
        />
        Nome
      </label>
      <label
        htmlFor="first-letter-search-radio"
      >
        <input
          type="radio"
          name="first-letter-search-radio"
          data-testid="first-letter-search-radio"
          value="primeira letra"
          id="primeira letra"
          onChange={ ({ target }) => setSearchType(target.value) }
        />
      </label>
      Primeira letra
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClickAPI }
      >
        Buscar
      </button>
    </>
  );
}

SearchBar.propTypes = {
  searchText: PropTypes.string.isRequired,
};

export default SearchBar;
