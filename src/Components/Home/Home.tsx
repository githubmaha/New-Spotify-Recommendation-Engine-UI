import React, { useState, useMemo, useEffect, useCallback, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import './styles.css';
import { TextField, Button } from '@material-ui/core';
import useSpotify from './../../Hooks/useSpotify';
import { useLocation } from 'react-router-dom';
import queryString, { ParsedQuery } from 'query-string'
import ContentRenderer from '../../Types/ContentRenderer';
import { SpotifyAuthContext } from './../../Contexts/SpotifyAuthContext';
import Track from '../../Types/Spotify/Track';
import { v4 as uuid } from "uuid";
import PublicAPIAuthObject from './../../Types/Spotify/PublicAPIAuthObject.d';
import UserAPIAuthObject from './../../Types/Spotify/UserAPIAuthObject.d';

enum FormContentType {
  HOME = "HOME",
  CLIENT_SECRET = "CLIENT_SECRET"
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

type ClientSecretFormProps = {
  getPublicAPIAuthorization: (clientId) => Promise<PublicAPIAuthObject>;
  setFormContent: (formContentType) => void;
};

const ClientSecretForm = (props): JSX.Element => {
  const spotifyAuth = useContext(SpotifyAuthContext);
  const [clientSecret, setClientSecret] = useState("");
  const [errorText, setErrorText] = useState("");

  const clientSecretOnChance = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setClientSecret(event.target.value);
    },
    []
  );

  const onSubmit = useCallback(() => {
    setErrorText("");

    const tryToAuthorize = async () => {
      try {
        spotifyAuth.publicAPIAuthDispatch({
          type: "modify",
          payload: await props.getPublicAPIAuthorization(clientSecret),
        });
        props.setFormContent(FormContentType.HOME);
      } catch (error) {
        setErrorText(error.message);
        console.dir(error);
      }
    };

    tryToAuthorize();
  }, [props, clientSecret, spotifyAuth]);

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
          label="Client Secret"
          variant="outlined"
          onChange={clientSecretOnChance}
          error={!!errorText}
          helperText={errorText}
        />
      </Grid>
      <Grid item className="spacing">
        <Button
          variant="outlined"
          size="large"
          color="primary"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

type SongFormProps = {
  getTrackInfo: (trackId: string, access_token: string) => Promise<Track>;
};


const SongForm = (props: SongFormProps): JSX.Element => {
  const spotifyAuth = useContext(SpotifyAuthContext);
  const [trackUrl, setTrackUrl] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [errorText, setErrorText] = useState("");

  const trackUrlOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTrackUrl(event.target.value);
    },
    []
  );

  const playlistUrlOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPlaylistUrl(event.target.value);
    },
    []
  );

  const onSubmit = useCallback(() => {
    setErrorText("");

    const tryToParseUrl = async () => {
      try {
        const trackUrlObject = new URL(trackUrl);
        console.dir(
          await props.getTrackInfo(
            trackUrlObject.pathname.split("/")[2].split("?")[0],
            spotifyAuth.publicAPIAuth.access_token
          )
        );
      } catch (error) {
        error.message.includes("URL constructor")
          ? setErrorText("Please enter a valid URL format")
          : setErrorText(error.message);
        console.dir(error);
      }
    };

    tryToParseUrl();
  }, [props, trackUrl, spotifyAuth.publicAPIAuth.access_token]);

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
          error={!!errorText}
          helperText={errorText}
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
        <Button variant="outlined" size="large" color="primary" onClick={onSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

type LoginFormProps = {
  getLoginUrl: (state: string) => string;
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
      <Grid item>
        <Button
          variant="outlined"
          size="large"
          color="primary"
          href={props.getLoginUrl(uuid())}
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
  const [formContent, setFormContent] = useState<FormContentType>(FormContentType.CLIENT_SECRET);
  const { getPublicAPIAuthorization, getLoginUrl, getTrackInfo } = useSpotify();
  const spotifyAuth = useContext(SpotifyAuthContext);

  const formContentRenderer: ContentRenderer<FormContentType> = useMemo(() => {
    return {
      HOME: () => (
        <>
          <LoginForm getLoginUrl={getLoginUrl} />
          <SongForm getTrackInfo={getTrackInfo} />
        </>
      ),
      CLIENT_SECRET: () => (
        <ClientSecretForm
          getPublicAPIAuthorization={getPublicAPIAuthorization}
          setFormContent={setFormContent}
        />
      ),
    };
  }, [getLoginUrl, getTrackInfo, getPublicAPIAuthorization]);

  console.dir(spotifyAuth.userAPIAuth);

  useEffect(() => {
    const parsedHash: ParsedHashType = queryString.parse(hash);
    console.dir(parsedHash);

    if (parsedHash.access_token && parsedHash.expires_in && parsedHash.state) {
      const userAuthObject: UserAPIAuthObject = {
        access_token: parsedHash.access_token,
        expires_in: parsedHash.expires_in,
        state: parsedHash.state,
      };

      spotifyAuth.userAPIAuthDispatch({
        type: "modify",
        payload: userAuthObject,
      });
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
