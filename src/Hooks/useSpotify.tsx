import Track from './../Types/Spotify/Track.d';
import PublicAPIAuthObject from '../Types/Spotify/PublicAPIAuthObject';

const AUTH_ENDPOINT = "https://accounts.spotify.com";
const CLIENT_ID = "b129fa9d3806443d901ed25d828bad03";
const REDIRECT_URI = "http://localhost:3000";
const scopes = ["user-read-currently-playing", "user-read-playback-state"];

const API_ENDPOINT = "https://api.spotify.com/v1";


type UseSpotifyType = {
  getPublicAPIAuthorization: (clientSecret: string) => Promise<PublicAPIAuthObject>;
  getLoginUrl: (state: string) => string;
  getTrackInfo: (trackId: string, access_token: string) => Promise<Track>;
};

const useSpotify = (): UseSpotifyType => {

    return {
        getPublicAPIAuthorization: async (clientSecret: string): Promise<PublicAPIAuthObject> => {
            const base64EncodedAuth = btoa(`${CLIENT_ID}:${clientSecret}`);
            const response = await fetch(`${AUTH_ENDPOINT}/api/token`, {
                method: "POST",
                mode: "cors",
                headers: {
                    Authorization: `Basic ${base64EncodedAuth}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    grant_type: "client_credentials"
                }),
            });

            if (!response.ok) {
                throw new Error(JSON.stringify(response.json()));
            }
            
            return response.json();
        },
        getLoginUrl: (state: string): string => {
              return `${AUTH_ENDPOINT}/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(
                "%20"
              )}&state=${state}}`;
        },
        getTrackInfo: async (trackId: string, access_token: string): Promise<Track> => {
            const response = await fetch(`${API_ENDPOINT}/tracks/${trackId}`, {
              method: "GET",
              mode: "cors",
              headers: {
                Authorization: `Bearer ${access_token}`
              },
            });

            if (!response.ok) {
              throw new Error(JSON.stringify(response.json()));
            }

            return response.json();
        },
        
    };
};

export default useSpotify;