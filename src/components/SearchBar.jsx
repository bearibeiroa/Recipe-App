import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function SearchBar({ searchText }) {
  const {
    searchType,
    setSearchType,
    searchRequest,
  } = useContext(AppContext);

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
        onClick={ () => searchRequest(searchType, searchText) }
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
