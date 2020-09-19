import React, { useState, useMemo, useEffect, useCallback, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import './styles.css';
import { TextField, Button } from '@material-ui/core';
import useSpotify from './../../Hooks/useSpotify';
import { useLocation } from 'react-router-dom';
import queryString, { ParsedQuery } from 'query-string'
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
  getLoginUrl: (state) => string;
};

const LoginForm: React.FC<LoginFormProps> = (props): JSX.Element => {
  const spotifyAuth = useContext(SpotifyAuthContext);
  
  return (
    <Grid
      container
      item
      justify="center"
      alignItems="center"
      className="height-spacing"
    >
      <Grid item>
        <Button
          variant="outlined"
          size="large"
          color="primary"
          href={props.getLoginUrl(spotifyAuth.state)}
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

type ParsedHashType = ParsedQuery<string> & {
  access_token?: string;
  expires_in?: string;
  state?: string;
}

const Home = (): JSX.Element => {
  const { hash } = useLocation();
  const [formContent, setFormContent] = useState<FormContentType>(FormContentType.HOME);
  const { getLoginUrl } = useSpotify();
  const spotifyAuth = useContext(SpotifyAuthContext);

  const formContentRenderer: ContentRenderer<FormContentType> = useMemo(() => {
    return {
      HOME: () => (
        <>
          <LoginForm getLoginUrl={getLoginUrl} />
          <SongForm />
        </>
      ),
    };
  }, [getLoginUrl]);

  useEffect(() => {
    const parsedHash: ParsedHashType = queryString.parse(hash);
    console.log(parsedHash.state);
    console.log(spotifyAuth.state);
    if (parsedHash.access_token && parsedHash.expires_in && parsedHash.state) {
      spotifyAuth.setToken(parsedHash.access_token);
      spotifyAuth.setExpiresIn(parsedHash.expires_in);
      spotifyAuth.setExpiresIn(parsedHash.state);
    }
  }, [hash]);

  return (
    <>
      <Title />
      {formContentRenderer[formContent]()}
    </>
  );
};

export default Home;
