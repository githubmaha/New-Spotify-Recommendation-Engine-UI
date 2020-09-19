import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { SpotifyAuthContext } from './../../Contexts/SpotifyAuthContext';

const UserDashboard = (): JSX.Element => {
    const spotifyAuth = useContext(SpotifyAuthContext);

    return (<><Grid container item>Logged In Dashboard</Grid></>);
};

export default UserDashboard;