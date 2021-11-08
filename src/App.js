import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import NotFound from './pages/NotFound';
import LoginProvider from './context/LoginProvider';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/comidas">
          <Comidas />
        </Route>
        <Route path="/page-not-found" component={ NotFound } />
        <Route exact path="/">
          <LoginProvider>
            <Login />
          </LoginProvider>
        </Route>
        <Redirect to="/page-not-found" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
