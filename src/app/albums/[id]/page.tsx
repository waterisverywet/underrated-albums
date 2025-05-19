// src/app/albums/[id]/page.tsx
import Image from 'next/image';
import { FaSpotify, FaPlay } from 'react-icons/fa';

// Define types for our data
interface Track {
  id: string;
  title: string;
  duration: string;
  trackNumber: number;
}

interface Artist {
  name: string;
  monthlyListeners?: number;
}

interface Album {
  id: string;
  spotifyId: string;
  title: string;
  artist: Artist;
  imageUrl: string;
  releaseDate: string;
  genres?: string[];
  totalTracks: number;
  tracks?: Track[];
  description?: string;
}

async function getAlbumData(id: string): Promise<Album> {
  try {
    console.log('Fetching album with ID:', id);
    // Use the correct API endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/album-details/${id}`, { 
      next: { revalidate: 3600 } 
    });
    
    if (!response.ok) {
      console.error('Failed to fetch album:', response.status, response.statusText);
      throw new Error(`Failed to fetch album: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Album data received:', data);
    
    return data;
  } catch (error) {
    console.error('Error in getAlbumData:', error);
    throw error; // Re-throw to be handled by the error boundary
  }
}

export default async function AlbumPage({ params }: { params: { id: string } }) {
  try {
    const album = await getAlbumData(params.id);
    const releaseYear = new Date(album.releaseDate).getFullYear();

    return (
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Album Cover */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
              <Image 
                src={album.imageUrl} 
                alt={`${album.title} by ${album.artist.name}`} 
                fill
                className="object-cover"
              />
            </div>
            
            <a 
              href={`https://open.spotify.com/album/${album.spotifyId}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full flex items-center justify-center gap-2"
            >
              <FaSpotify />
              Listen on Spotify
            </a>
          </div>

          {/* Album Info */}
          <div className="flex-grow">
            <h1 className="text-3xl font-bold mb-1">{album.title}</h1>
            <p className="text-xl text-gray-300 mb-4">{album.artist.name}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {album.genres?.map(genre => (
                <span 
                  key={genre} 
                  className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
            
            <div className="mb-4">
              <p className="text-gray-400">{releaseYear} • {album.totalTracks} tracks</p>
              <p className="text-gray-400">Monthly Listeners: {album.artist.monthlyListeners?.toLocaleString() || 'Unknown'}</p>
            </div>
            
            <p className="text-gray-300 mb-6">{album.description}</p>
          </div>
        </div>
        
        {/* Track List */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Tracks</h2>
          <div className="space-y-2">
            {album.tracks?.map((track: Track) => (
              <div 
                key={track.id} 
                className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-md group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center text-gray-400 group-hover:text-green-500">
                    <FaPlay size={14} />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 w-5 text-right">{track.trackNumber}.</span>
                    <span>{track.title}</span>
                  </div>
                </div>
                <span className="text-gray-500">{track.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="max-w-5xl mx-auto my-12 p-6 bg-red-900/30 border border-red-800 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Error Loading Album</h1>
        <p className="mb-4">We couldn't load the album details. Please try again later.</p>
        <p className="text-gray-400">{error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    );
  }
}
