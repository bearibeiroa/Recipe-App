import React from 'react';

function Login() {
  return (
    <form>
      <input
        data-testid="email-input"
        type="email"
      />
      <input
        data-testid="password-input"
        type="password"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </form>
  );
}

export default Login();
