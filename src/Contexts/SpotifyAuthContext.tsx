import React, { createContext, useReducer } from "react";
import PublicAPIAuthObject from "../Types/Spotify/PublicAPIAuthObject";
import UserAPIAuthObject from "../Types/Spotify/UserAPIAuthObject";

type SpotifyPublicAPIAuthType = {
  access_token: string;
  expires_in: string;
  isLoggedIn: boolean;
};

type SpotifyUserAPIAuthType = SpotifyPublicAPIAuthType &{
  state: string;
};

type SpotifyAuthContextType = {
  userAPIAuth: SpotifyUserAPIAuthType;
  publicAPIAuth: SpotifyPublicAPIAuthType;
  userAPIAuthDispatch: React.Dispatch<SpotifyUserAPIAuthReducerActionType> | (() =>  void);
  publicAPIAuthDispatch: React.Dispatch<SpotifyPublicAPIAuthReducerActionType> | (() =>  void);
};

const initialContext: SpotifyAuthContextType = {
  userAPIAuth: {
    access_token: "",
    expires_in: "",
    state: "",
    isLoggedIn: false
  },
  publicAPIAuth: {
    access_token: "",
    expires_in: "",
    isLoggedIn: false
  },
  userAPIAuthDispatch: () => {},
  publicAPIAuthDispatch: () => {}
};

export const SpotifyAuthContext: React.Context<SpotifyAuthContextType> = createContext<SpotifyAuthContextType>(initialContext);

type SpotifyUserAPIAuthReducerActionType = {
  type: string;
  payload: UserAPIAuthObject;
};

const spotifyUserAPIAuthReducer = (
  authState: SpotifyUserAPIAuthType,
  action: SpotifyUserAPIAuthReducerActionType
) => {
  switch (action.type) {
    case "modify":
      const access_token = action.payload.access_token;
      const expires_in = action.payload.expires_in;
      const state = action.payload.state;
      const isLoggedIn =
        !!action.payload.access_token && !!action.payload.state;
      return { access_token, expires_in, state, isLoggedIn };

    default:
      throw new Error("Invalid action type");
  }
};

type SpotifyPublicAPIAuthReducerActionType = {
  type: string;
  payload: PublicAPIAuthObject;
};

const spotifyPublicAPIAuthReducer = (
  authState: SpotifyPublicAPIAuthType,
  action: SpotifyPublicAPIAuthReducerActionType
) => {
  switch (action.type) {
    case "modify":
      const access_token = action.payload.access_token;
      const expires_in = action.payload.expires_in;
      const isLoggedIn = !!action.payload.access_token;
      return { access_token, expires_in, isLoggedIn };
    default:
      throw new Error("Invalid action type");
  }
};

const initialUserAPIAuthState: SpotifyUserAPIAuthType = {
  access_token: "",
  expires_in: "",
  state: "",
  isLoggedIn: false,
};

const initialPublicAPIAuthState: SpotifyPublicAPIAuthType = {
  access_token: "",
  expires_in: "",
  isLoggedIn: false,
};

const SpotifyAuthProvider = (props): JSX.Element => {
    const [userAPIAuth, userAPIAuthDispatch] = useReducer(
      spotifyUserAPIAuthReducer,
      initialUserAPIAuthState
    );
    const [publicAPIAuth, publicAPIAuthDispatch] = useReducer(
      spotifyPublicAPIAuthReducer,
      initialPublicAPIAuthState
    );

    return (
      <SpotifyAuthContext.Provider
        value={{
          userAPIAuth: userAPIAuth,
          publicAPIAuth: publicAPIAuth,
          userAPIAuthDispatch: userAPIAuthDispatch,
          publicAPIAuthDispatch: publicAPIAuthDispatch
        }}
      >
        {props.children}
      </SpotifyAuthContext.Provider>
    );
};

export default SpotifyAuthProvider;