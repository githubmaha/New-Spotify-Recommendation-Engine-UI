import { useState } from "react";

const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const CLIENT_ID = "b129fa9d3806443d901ed25d828bad03";
const REDIRECT_URI = "http://localhost:3000";
const scopes = ["user-read-currently-playing", "user-read-playback-state"];


type UseSpotifyType = {
  loggingIn: boolean;
  loggedIn: boolean;
  getLoginUrl: () => string;
  login: () => Promise<void>;
};

const useSpotify = (): UseSpotifyType => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);

    return {
        loggingIn: loggingIn,
        loggedIn: loggedIn,
        getLoginUrl: (): string => {
              return `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${scopes.join("%20")}`;
        },
        login: async (): Promise<void> => {
            setLoggingIn(true);
        }
    };
};

export default useSpotify;