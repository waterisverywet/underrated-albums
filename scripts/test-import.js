// scripts/test-import.js

require('dotenv').config();



const { PrismaClient } = require("@prisma/client");
console.log("Prisma imported successfully");

// Try importing the local spotify module
const { createSpotifyAPIClient } = require("./spotify-client");
console.log("Spotify module imported successfully");

// Test if we can create a client
async function testSpotifyClient() {
  try {
    console.log("Creating Spotify client...");
    const client = await createSpotifyAPIClient();
    console.log("Spotify client created successfully!");
    
    // Optional: Test a simple API call
    console.log("Testing search...");
    const artists = await client.searchArtists("test");
    console.log(`Found ${artists.length} artists`);
  } catch (error) {
    console.error("Error testing Spotify client:", error.message);
  }
}

// Run the test
testSpotifyClient();
