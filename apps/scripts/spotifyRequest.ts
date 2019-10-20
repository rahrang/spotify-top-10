import axios from 'axios';

let accessToken = '';
let expiryTime = -1;

interface IAccessTokenResponse {
  access_token: string;
  expires_in: number;
  grant_type: 'client_credentials';
  scope: '';
}

async function getAccessToken() {
  try {
    const res = await axios({
      method: 'POST',
      baseURL: `https://accounts.spotify.com/`,
      url: 'api/token',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        grant_type: 'client_credentials',
      },
    });

    if (res.status === 200) {
      console.log(
        `fetched access token successfully! ${res.data.access_token}`
      );

      const data: IAccessTokenResponse = res.data;
      accessToken = data.access_token;
      expiryTime = Date.now() + data.expires_in * 1000;
    }
  } catch (err) {
    console.error(`failed to get access token: ${err.message}`);
  }
}

async function getAccessTokenInterceptor(config) {
  const now = Date.now();
  if (!accessToken || now >= expiryTime) {
    await getAccessToken();
  }

  // TODO: figure out how to make sure the `Bearer: ${accessToken}` piece below in the `instance` actually takes
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  return config;
}

const instance = axios.create({
  baseURL: 'https://api.spotify.com',
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

instance.interceptors.request.use(getAccessTokenInterceptor);

export default instance;
