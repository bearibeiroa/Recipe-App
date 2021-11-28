import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from '../../pages/Login';
import Comidas from '../../pages/Comidas';
import Bebidas from '../../pages/Bebidas';
import ReceitasFavoritas from '../../pages/ReceitasFavoritas';
import ReceitaComidas from '../../pages/ReceitaComidas';
import ReceitaBebidas from '../../pages/ReceitaBebidas';
import ReceitasFeitas from '../../pages/ReceitasFeitas';
import Perfil from '../../pages/Perfil';
import LocalComidas from '../../pages/LocalComidas';
import IngredientesBebidas from '../../pages/IngredientesBebidas';
import IngredientesComidas from '../../pages/IngredientesComidas';
import Explorar from '../../pages/Explorar';
import ExplorarComidas from '../../pages/ExplorarComidas';
import ExplorarBebidas from '../../pages/ExplorarBebidas';
import ProgressoBebidas from '../../pages/ProgressoBebidas';
import ProgressoComidas from '../../pages/ProgressoComidas';
import NotFound from '../../pages/NotFound';
import AppProvider from '../../context/AppProvider';

function Routes() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Switch>
          <Route exact path="/comidas" component={ Comidas } />
          <Route exact path="/bebidas" component={ Bebidas } />
          <Route exact path="/comidas/:id" component={ ReceitaComidas } />
          <Route exact path="/bebidas/:id" component={ ReceitaBebidas } />
          <Route exact path="/comidas/:id/in-progress" component={ ProgressoComidas } />
          <Route exact path="/bebidas/:id/in-progress" component={ ProgressoBebidas } />
          <Route exact path="/explorar" component={ Explorar } />
          <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
          <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
          <Route
            path="/explorar/comidas/ingredientes"
            component={ IngredientesComidas }
          />
          <Route
            path="/explorar/bebidas/ingredientes"
            component={ IngredientesBebidas }
          />
          <Route exact path="/explorar/comidas/area" component={ LocalComidas } />
          <Route path="/perfil" component={ Perfil } />
          <Route path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
          <Route path="/page-not-found" component={ NotFound } />
          <Route exact path="/">
            <Login />
          </Route>
          <Redirect to="/page-not-found" />
        </Switch>
      </AppProvider>
    </BrowserRouter>
  );
}

export default Routes;
