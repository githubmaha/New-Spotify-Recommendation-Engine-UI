import React, { useState, useMemo, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import './styles.css';
import { TextField, Button } from '@material-ui/core';

enum FormContentType {
  CREDENTIALS = "CREDENTIALS",
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
        <Grid item className="submit-button">
          <Button variant="outlined" size="large" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    );
}

type CredentialsFormProps = {
  onSubmit: (formContentType: FormContentType) => void;
};

const CredentialsForm: React.FC<CredentialsFormProps> = (props): JSX.Element => {
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const clientIdOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setClientId(event.target.value);
    },
    []
  );

  const clientSecretOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setClientSecret(event.target.value);
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
          label="Client Id"
          variant="outlined"
          onChange={clientIdOnChange}
        />
      </Grid>
      <Grid item className="spacing">
        <TextField
          label="Client Secret"
          type="password"
          variant="outlined"
          onChange={clientSecretOnChange}
        />
      </Grid>
      <Grid item className="spacing">
        <Button
          variant="outlined"
          size="large"
          color="primary"
          onClick={() => props.onSubmit(FormContentType.SONGFORM)}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

const Home = (): JSX.Element => {
    const [formContent, setFormContent] = useState<FormContentType>(FormContentType.CREDENTIALS);

    const formContentRenderer: ContentRenderer = useMemo(() => {
        return {
          CREDENTIALS: () => <CredentialsForm onSubmit={setFormContent} />,
          SONGFORM: () => <SongForm />,
        };
    }, []);

    return (
      <>
        <Title></Title>
        {formContentRenderer[formContent]()}
      </>
    );
};

export default Home;
