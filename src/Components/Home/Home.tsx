import React, { useState, useMemo } from 'react';
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
        <Grid item>The NEW Spotify Recommendation Engine</Grid>
      </Grid>
    );
}

const SongForm = (): JSX.Element => {
    return (
      <Grid container item justify="center" alignItems="center" className="song-form">
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
  return (
    <Grid
      container
      item
      justify="center"
      alignItems="center"
      className="song-form"
    >
      <Grid item>
        <TextField label="Credentials" variant="outlined" />
      </Grid>
      <Grid item className="submit-button">
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
    const [formContent, setFormContent] = useState<FormContentType>(FormContentType.CREDENTIALS)

    const formContentRenderer: ContentRenderer = useMemo(() => {
        return {
          CREDENTIALS: () => <CredentialsForm onSubmit={setFormContent} />,
          SONGFORM: () => <SongForm />,
        };
    }, [formContent]);

    return (
      <>
        <Title></Title>
        {formContentRenderer[formContent]()}
      </>
    );
};

export default Home;
