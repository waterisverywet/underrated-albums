// scripts/collectSpotifyData.js
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { createSpotifyAPIClient } = require('./spotify-client');

const prisma = new PrismaClient();

async function collectArtistsAndAlbums() {
  try {
    console.log("Starting data collection...");
    
    // Get Spotify API client
    const spotify = await createSpotifyAPIClient();
    
    // Search for artists with various genres to find emerging artists
    const genres = [
      "indie", "alternative", "electronic", "hip-hop", 
      "rock", "pop", "ambient", "folk", "jazz"
    ];
    
    for (const genre of genres) {
      console.log(`Searching for ${genre} artists...`);
      
      // Search for artists in this genre
      const artists = await spotify.searchArtists(`genre:${genre}`, 50);
      
      for (const spotifyArtist of artists) {
        // Skip artists with more than 150k monthly listeners
        // Note: monthly_listeners isn't directly available in the API
        // We'll use popularity as a proxy and update later
        if (spotifyArtist.popularity > 50) continue;
        
        console.log(`Processing artist: ${spotifyArtist.name}`);
        
        // Get or create artist in database
        let artist = await prisma.artist.findUnique({
          where: { spotifyId: spotifyArtist.id },
        });
        
        if (!artist) {
          artist = await prisma.artist.create({
            data: {
              spotifyId: spotifyArtist.id,
              name: spotifyArtist.name,
              monthlyListeners: 0, // Will update this later
              genres: spotifyArtist.genres,
              imageUrl: spotifyArtist.images[0]?.url,
              popularity: spotifyArtist.popularity,
            },
          });
        }
        
        // Get artist's albums
        const albums = await spotify.getArtistAlbums(spotifyArtist.id);
        
        for (const spotifyAlbum of albums) {
          // Skip singles and compilations if focusing on albums
          if (spotifyAlbum.album_type !== "album") continue;
          
          console.log(`Processing album: ${spotifyAlbum.name}`);
          
          // Get album details
          const albumDetails = await spotify.getAlbum(spotifyAlbum.id);
          
          // Create or update album in database
          await prisma.album.upsert({
            where: { spotifyId: albumDetails.id },
            update: {
              title: albumDetails.name,
              releaseDate: new Date(albumDetails.release_date),
              totalTracks: albumDetails.total_tracks,
              popularity: albumDetails.popularity,
              imageUrl: albumDetails.images[0]?.url,
              albumType: albumDetails.album_type,
              lastUpdated: new Date(),
            },
            create: {
              spotifyId: albumDetails.id,
              title: albumDetails.name,
              artistId: artist.id,
              releaseDate: new Date(albumDetails.release_date),
              totalTracks: albumDetails.total_tracks,
              popularity: albumDetails.popularity,
              imageUrl: albumDetails.images[0]?.url,
              albumType: albumDetails.album_type,
            },
          });
        }
      }
    }
    
    console.log("Data collection completed successfully!");
  } catch (error) {
    console.error("Error collecting data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the collection function
collectArtistsAndAlbums()
  .catch(error => {
    console.error("Fatal error during data collection:", error);
    process.exit(1);
  });
