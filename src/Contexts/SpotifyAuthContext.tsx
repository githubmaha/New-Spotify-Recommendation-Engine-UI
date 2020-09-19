import React, { createContext, useState, useMemo } from "react";
import { v4 as uuid } from "uuid";

type SpotifyAuthContextType = {
  token: string;
  expiresIn: string;
  isLoggedIn: boolean;
  setToken: React.Dispatch<React.SetStateAction<string>> | ((param) => void);
  setExpiresIn: React.Dispatch<React.SetStateAction<string>> | ((param) => void);
  state: string;
};

const initialContext: SpotifyAuthContextType = {
  token: "",
  expiresIn: "",
  isLoggedIn: false,
  setToken: (param) => {},
  setExpiresIn: (param) => {},
  state: uuid(),
};

export const SpotifyAuthContext: React.Context<SpotifyAuthContextType> = createContext<SpotifyAuthContextType>(initialContext);

const SpotifyAuthProvider = (props): JSX.Element => {
    const [token, setToken] = useState("");
    const [expiresIn, setExpiresIn] = useState("");
    const [state, setState] = useState(initialContext.state);
    
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
        }}
      >
        {props.children}
      </SpotifyAuthContext.Provider>
    );
};

export default SpotifyAuthProvider;