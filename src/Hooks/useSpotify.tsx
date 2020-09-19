import { v4 as uuid} from 'uuid'

const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const CLIENT_ID = "b129fa9d3806443d901ed25d828bad03";
const REDIRECT_URI = "http://localhost:3000";
const scopes = ["user-read-currently-playing", "user-read-playback-state"];


type UseSpotifyType = {
  getLoginUrl: (state) => string;
  login: () => Promise<void>;
};

const useSpotify = (): UseSpotifyType => {

    return {
        getLoginUrl: (state): string => {
              return `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scopes.join("%20")}&state=${state}}`;
        },
        login: async (): Promise<void> => {
        }
    };
};

export default useSpotify;