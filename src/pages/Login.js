import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import AppContext from '../context/AppContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserEmail } = useContext(AppContext);
  const history = useHistory();

  // código retirado de: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  function isEmailValid() {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regexEmail.test(email);
  }

  function enableButton() {
    const MIN_NUMBER = 7;
    return isEmailValid() && password.length >= MIN_NUMBER;
  }

  function handleClick() {
    const ONE = 1;
    localStorage.setItem('mealsToken', ONE);
    localStorage.setItem('cocktailsToken', ONE);
    const user = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(user));
    setUserEmail(email);

    const inProgressRecipes = {
      cocktails: {},
      meals: {},
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

    const doneRecipes = [{
      id: '',
      type: '',
      area: '',
      category: '',
      alcoholicOrNot: '',
      name: '',
      image: '',
      doneDate: '',
      tags: '',
    }];
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    const favoriteRecipes = [{
      id: '',
      type: '',
      area: '',
      category: '',
      alcoholicOrNot: '',
      name: '',
      image: '',
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    history.push('/comidas');
  }

  return (
    <form>
      <input
        data-testid="email-input"
        type="email"
        value={ email }
        onChange={ (ev) => setEmail(ev.target.value) }
      />
      <input
        data-testid="password-input"
        type="password"
        value={ password }
        onChange={ (ev) => setPassword(ev.target.value) }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !enableButton() }
        onClick={ handleClick }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
