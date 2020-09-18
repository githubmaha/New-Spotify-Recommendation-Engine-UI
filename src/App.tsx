import React from 'react';
import './App.css';
import Home from './Components/Home/Home';
import Notfound from './Components/NotFound/NotFound';
import Grid from '@material-ui/core/Grid';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { animated, useSpring } from "react-spring";

const App = (): JSX.Element => {
  const gradient = useSpring({
    config: {
      mass: 1,
      tension: 40,
      friction: 40
    },
    to: async (next) => {
      while (true) {
        await next({
          background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        });
        await next({
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        });
        await next({
          background: "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
        });
        await next({
          background: "linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)",
        });
      }
    },
    from: {
      background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    },
  });

  const AnimGrid = animated(Grid);

  return (
    <BrowserRouter>
      <AnimGrid container direction="column" spacing={0} className="layout" style={gradient}>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route>
            <Notfound></Notfound>
          </Route>
        </Switch>
      </AnimGrid>
    </BrowserRouter>
  );
};

export default App;
