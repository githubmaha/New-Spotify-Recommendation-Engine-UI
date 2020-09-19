import React, { createContext, useState, useMemo } from "react";
import { v4 as uuid } from "uuid";

type SpotifyAuthContextType = {
  token: string;
  expiresIn: string;
  state: string;
  isLoggedIn: boolean;
  setToken: React.Dispatch<React.SetStateAction<string>> | ((param) => void);
  setExpiresIn: React.Dispatch<React.SetStateAction<string>> | ((param) => void);
  setState: React.Dispatch<React.SetStateAction<string>> | ((param) => void);
};

const initialContext: SpotifyAuthContextType = {
  token: "",
  expiresIn: "",
  state: "",
  isLoggedIn: false,
  setToken: (param) => {},
  setExpiresIn: (param) => {},
  setState: (param) => {}
};

export const SpotifyAuthContext: React.Context<SpotifyAuthContextType> = createContext<SpotifyAuthContextType>(initialContext);

const SpotifyAuthProvider = (props): JSX.Element => {
    const [token, setToken] = useState("");
    const [expiresIn, setExpiresIn] = useState("");
    const [state, setState] = useState("");
    
    const isLoggedIn: boolean = useMemo((): boolean => {
      return !!token /* && !!expiresIn*/;
    }, [token, expiresIn]);

    return (
      <SpotifyAuthContext.Provider
        value={{
          token: token,
          expiresIn: expiresIn,
          state: state,
          isLoggedIn: isLoggedIn,
          setToken: setToken,
          setExpiresIn: setExpiresIn,
          setState: setState
        }}
      >
        {props.children}
      </SpotifyAuthContext.Provider>
    );
};

export default SpotifyAuthProvider;