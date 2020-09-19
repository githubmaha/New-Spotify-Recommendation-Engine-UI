import React, { useState, useMemo, useEffect, useCallback, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import './styles.css';
import { TextField, Button } from '@material-ui/core';
import useSpotify from './../../Hooks/useSpotify';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string'
import ContentRenderer from '../../Types/ContentRenderer';
import { SpotifyAuthContext } from './../../Contexts/SpotifyAuthContext';

enum FormContentType {
  HOME = "HOME",
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
  const [trackUrl, setTrackUrl] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");

  const trackUrlOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTrackUrl(event.target.value);
    },
    [],
  )

  const playlistUrlOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPlaylistUrl(event.target.value);
    },
    []
  );

  return (
    <Grid
      container
      item
      justify="center"
      alignItems="center"
      className="height-spacing"
    >
      <Grid item>
        <TextField
          label="Track Url"
          variant="outlined"
          onChange={trackUrlOnChange}
        />
      </Grid>
      <Grid item className="spacing">
        <TextField
          label="Playlist Url"
          variant="outlined"
          onChange={playlistUrlOnChange}
        />
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
  const [formContent, setFormContent] = useState<FormContentType>(FormContentType.HOME);
  const { getLoginUrl, login } = useSpotify();
  const spotifyAuth = useContext(SpotifyAuthContext);

  const formContentRenderer: ContentRenderer<FormContentType> = useMemo(() => {
    return {
      HOME: () => (
        <>
          <LoginForm onSubmit={getLoginUrl} />
          <SongForm />
        </>
        )
    };
  }, [getLoginUrl]);

  useEffect(() => {
    if (queryString.parse(search).code) {
      // @ts-ignore
      spotifyAuth.setCode(queryString.parse(search).code);
    }
  }, [search]);

  return (
    <>
      <Title />
      {formContentRenderer[formContent]()}
    </>
  );
};

export default Home;
