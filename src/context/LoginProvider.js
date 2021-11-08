import React from 'react';
import PropTypes from 'prop-types';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  // async function fetchPlanets() {
  //   const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  //   const planets = await response.json();
  //   setData(planets.results);
  //   setBackup(planets.results);
  //   setIsFetch(true);
  // }

  // useEffect(() => { fetchPlanets(); }, []);

  return (
    <LoginContext.Provider>
      { children }
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default LoginProvider;
