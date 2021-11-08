import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, haveSearch }) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');

  function handleClick() {
    if (showSearch === false) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  }

  return (
    <header>
      <Link to="/perfil">
        <img src={ profileIcon } data-testid="profile-top-btn" alt="Icone de perfil" />
      </Link>
      <h1 data-testid="page-title">
        { title }
      </h1>
      { haveSearch ? (
        <button
          type="button"
          onClick={ handleClick }
          data-testid="search-top-btn"
          src={ searchIcon }
        >
          <img src={ searchIcon } alt="Icone de busca" />
        </button>
      )
        : null }
      { showSearch ? (
        <input
          data-testid="search-input"
          value={ searchText }
          onChange={ setSearchText }
        />
      )
        : null }
      <label htmlFor="ingredient-search-radio">
        Buscar por Ingredientes
        <input
          type="radio"
          name="ingredient-search-radio"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name-search-radio">
        Nome
        <input
          type="radio"
          name="name-search-radio"
          data-testid="name-search-radio"
        />
      </label>
      <label
        htmlFor="first-letter-search-radio"
      >
        Nome
        <input
          type="radio"
          name="first-letter-search-radio"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  haveSearch: PropTypes.bool.isRequired,
};

export default Header;
