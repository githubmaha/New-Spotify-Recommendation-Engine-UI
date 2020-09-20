import React from 'react';
import './App.css';
import Home from './Components/Home/Home';
import Notfound from './Components/NotFound/NotFound';
import Grid from '@material-ui/core/Grid';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';
import UserDashboard from './Components/UserDashboard/UserDashboard';
import { useContext } from 'react';
import { SpotifyAuthContext } from './Contexts/SpotifyAuthContext';

const App = (): JSX.Element => {
  const spotifyAuth = useContext(SpotifyAuthContext);

  const gradient = useSpring({
    config: {
      mass: 1,
      tension: 40,
      friction: 40,
    },
    to: [
      { background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
      { background: "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)" },
      { background: "linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)" },
      { background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)" }
    ],
    from: { background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)" },
    loop: true,
  });

  const AnimGrid = animated(Grid);

  return (
    <BrowserRouter>
      <AnimGrid
        container
        direction="column"
        spacing={0}
        className="layout"
        style={gradient}
      >
        <Switch>
          <Route exact path="/">
            {spotifyAuth.userAPIAuth.isLoggedIn ? <Redirect to="/UserDashboard" /> : <Home />}
          </Route>
          <Route exact path="/UserDashboard">
            {spotifyAuth.userAPIAuth.isLoggedIn ? <UserDashboard /> : <Redirect to="/" />}
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
