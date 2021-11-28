import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../assets/images/icons/profileIcon.svg';
import searchIcon from '../assets/images/icons/searchIcon.svg';
import SearchBar from './SearchBar';

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
      {showSearch ? (
        <>
          <input
            data-testid="search-input"
            value={ searchText }
            onChange={ ({ target }) => setSearchText(target.value) }
          />
          <SearchBar searchText={ searchText } />
        </>
      )
        : null }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  haveSearch: PropTypes.bool.isRequired,
};

export default Header;
