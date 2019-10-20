require('dotenv').config();

import spotifyRequest from './spotifyRequest';

const SPOTIFY_USER = 'spotifycharts';
const GLOBAL_CHART = '37i9dQZEVXbMDoHDwVN2tF'; // Global TOP 50
const USA_CHART = '37i9dQZEVXbLRQDuF5jeBp'; // US TOP 50

interface IChartItem {
  track: {
    id: string;
    name: string;
    popularity: number;
    uri: string;
    album: {
      href: string;
      id: string;
      images: {
        height: number;
        url: string;
        width: number;
      }[];
    };
    artists: {
      external_urls: {
        spotify: string;
      }[];
      href: string;
      id: string;
      name: string;
      type: 'artist';
      uri: string;
    };
  };
}

async function getChart(chartID: string) {
  console.log(`trying to fetch chart: ${chartID}`);
  try {
    const res = await spotifyRequest.get<{
      items: IChartItem[];
    }>(`/v1/users/${SPOTIFY_USER}/playlists/${chartID}/tracks`, {
      params: {
        fields: `items(track(album(href,id,images,name),artists(href,id,name),id,name,popularity,uri))`,
        limit: 10,
        offset: 0,
      },
    });

    if (res.status === 200) {
      // TODO: call async function to save data in database
      console.log({ data: JSON.stringify(res.data.items) });
    }
  } catch (err) {
    console.error(`failed to fetch chart data: ${chartID} | ${err.message}`);
    console.log(err.response);
  }
}

(async () => {
  await getChart(USA_CHART);
  await getChart(GLOBAL_CHART);
})();
