import React from 'react';
import './App.css';
import Home from './Components/Home/Home';
import Notfound from './Components/NotFound/NotFound';
import Grid from '@material-ui/core/Grid';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Grid container direction="column" spacing={0} className="layout">
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route>
            <Notfound></Notfound>
          </Route>
        </Switch>
      </Grid>
    </BrowserRouter>
  );
};

export default App;
