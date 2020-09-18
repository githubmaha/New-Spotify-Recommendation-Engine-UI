import React, { useState, useMemo, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import './styles.css';
import { TextField, Button } from '@material-ui/core';
import useSpotify from './../../Hooks/useSpotify';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string'

enum FormContentType {
  LOGINFORM = "LOGINFORM",
  SONGFORM = "SONGFORM",
}

const Title = (): JSX.Element => {
    return (
      <Grid
        container
        item
        justify="center"
        alignItems="flex-end"
        className="title"
      >
        <Grid item className="font">
          The NEW <span style={{fontWeight: 700}}>Spotify</span> Recommendation Engine
        </Grid>
      </Grid>
    );
}

const SongForm = (): JSX.Element => {
    return (
      <Grid
        container
        item
        justify="center"
        alignItems="center"
        className="height-spacing"
      >
        <Grid item>
          <TextField label="Track Url" variant="outlined" />
        </Grid>
        <Grid item className="spacing">
          <Button variant="outlined" size="large" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    );
}

type LoginFormProps = {
  onSubmit: () => string;
};

const LoginForm: React.FC<LoginFormProps> = (props): JSX.Element => {
  return (
    <Grid
      container
      item
      justify="center"
      alignItems="center"
      className="height-spacing"
    >
      <Grid item className="spacing">
        <Button
          variant="outlined"
          size="large"
          color="primary"
          href={props.onSubmit()}
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

const Home = (): JSX.Element => {
  const { search } = useLocation();
  const [formContent, setFormContent] = useState<FormContentType>(FormContentType.LOGINFORM);
  const { loggedIn, getLoginUrl, login } = useSpotify();

  const formContentRenderer: ContentRenderer = useMemo(() => {
    return {
      LOGINFORM: () => <LoginForm onSubmit={getLoginUrl} />,
      SONGFORM: () => <SongForm />,
    };
  }, [getLoginUrl]);

  useEffect(() => {
    if(queryString.parse(search).code) {
      setFormContent(FormContentType.SONGFORM);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      setFormContent(FormContentType.SONGFORM);
    }
  }, [loggedIn]);

  return (
    <>
      <Title />
      {formContentRenderer[formContent]()}
    </>
  );
};

export default Home;
