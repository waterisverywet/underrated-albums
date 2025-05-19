// src/lib/spotify.ts
import axios from 'axios';

// Base Spotify API URL
const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

// Get access token using client credentials
export async function getClientCredentialsToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    throw new Error('Missing Spotify API credentials');
  }
  
  try {
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      params: {
        grant_type: 'client_credentials',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
    });
    
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    throw error;
  }
}

// Create a Spotify API client with authentication
export async function createSpotifyAPIClient(userToken?: string) {
  // Use user token if provided, otherwise get client credentials token
  const token = userToken || await getClientCredentialsToken();
  
  return {
    // Search for artists
    searchArtists: async (query: string, limit = 20) => {
      const response = await axios.get(`${SPOTIFY_API_URL}/search`, {
        params: {
          q: query,
          type: 'artist',
          limit,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.artists.items;
    },
    
    // Get artist details
    getArtist: async (artistId: string) => {
      const response = await axios.get(`${SPOTIFY_API_URL}/artists/${artistId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    
    // Get artist's albums
    getArtistAlbums: async (artistId: string, limit = 50) => {
      const response = await axios.get(`${SPOTIFY_API_URL}/artists/${artistId}/albums`, {
        params: {
          include_groups: 'album',
          limit,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.items;
    },
    
    // Get album details
    getAlbum: async (albumId: string) => {
      const response = await axios.get(`${SPOTIFY_API_URL}/albums/${albumId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    
    // Get user's top artists (requires user auth)
    getUserTopArtists: async (timeRange = 'medium_term', limit = 20) => {
      if (!userToken) throw new Error('User token required');
      
      const response = await axios.get(`${SPOTIFY_API_URL}/me/top/artists`, {
        params: {
          time_range: timeRange,
          limit,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.items;
    },
    
    // Get user's top tracks (requires user auth)
    getUserTopTracks: async (timeRange = 'medium_term', limit = 20) => {
      if (!userToken) throw new Error('User token required');
      
      const response = await axios.get(`${SPOTIFY_API_URL}/me/top/tracks`, {
        params: {
          time_range: timeRange,
          limit,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.items;
    },
    
    // Get user's recently played tracks (requires user auth)
    getUserRecentlyPlayed: async (limit = 50) => {
      if (!userToken) throw new Error('User token required');
      
      const response = await axios.get(`${SPOTIFY_API_URL}/me/player/recently-played`, {
        params: {
          limit,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.items;
    },
  };
}
