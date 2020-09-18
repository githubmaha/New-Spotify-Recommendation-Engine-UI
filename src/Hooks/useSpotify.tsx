import { useState } from "react";

const useSpotify = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    return {
        login: (clientId, clientSecret) => {}
    };
};

export default useSpotify;