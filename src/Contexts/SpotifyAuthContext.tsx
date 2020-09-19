import React, { createContext, useState, useMemo } from "react";

type SpotifyAuthContextType = {
    code: string;
    secret: string;
    isLoggedIn: boolean;
    setCode: React.Dispatch<React.SetStateAction<string>> | null
    setSecret: React.Dispatch<React.SetStateAction<string>> | null
};

const initialContext: SpotifyAuthContextType = {
  code: "",
  secret: "",
  isLoggedIn: false,
  setCode: null,
  setSecret: null,
};

export const SpotifyAuthContext = createContext<SpotifyAuthContextType>(initialContext);

const SpotifyAuthProvider = (props): JSX.Element => {
    const [code, setCode] = useState("");
    const [secret, setSecret] = useState("");
    
    const isLoggedIn: boolean = useMemo((): boolean => {
        return !!code/* && !!secret*/;
    }, [code, secret]);

    return (
        <SpotifyAuthContext.Provider 
        value={{
            code: code,
            secret: secret,
            isLoggedIn: isLoggedIn,
            setCode: setCode,
            setSecret: setSecret
        }}
        >
            {props.children}
        </SpotifyAuthContext.Provider>
    );
};

export default SpotifyAuthProvider;