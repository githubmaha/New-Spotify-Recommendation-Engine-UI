import SpotifyAuthProvider from "../../Contexts/SpotifyAuthContext";
import React from 'react';

const MetaContainer = (props): JSX.Element => {
    return (
        <SpotifyAuthProvider>
            {props.children}
        </SpotifyAuthProvider>
    );
}

export default MetaContainer;