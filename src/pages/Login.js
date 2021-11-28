import React, { useContext, useState } from 'react';
import { Container, Form, Image } from 'react-bootstrap';
import { useHistory } from 'react-router';
import logo from '../assets/images/logo.png';
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

    const doneRecipes = [];
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    const favoriteRecipes = [];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    history.push('/comidas');
  }

  return (
    <Container fluid className="d-flex justify-content-center align-items-center mx-auto">
      <Form className=" rounded p-4 p-sm-5">
        <Image src={ logo } className="mx-auto d-block" />
        <h4 className="text-center">Login</h4>
        <div className="form-group">
          <input
            data-testid="email-input"
            type="email"
            value={ email }
            onChange={ (ev) => setEmail(ev.target.value) }
          />
        </div>
        <div className="form-group">
          <input
            data-testid="password-input"
            type="password"
            value={ password }
            onChange={ (ev) => setPassword(ev.target.value) }
          />
        </div>
        <button
          className="btn btn-primary btn-block"
          type="button"
          data-testid="login-submit-btn"
          disabled={ !enableButton() }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </Form>
    </Container>
  );
}

export default Login;
