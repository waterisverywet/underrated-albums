// src/components/albums/AlbumGrid.tsx
'use client';

import { useEffect, useState } from 'react';
import AlbumCard from './AlbumCard';

interface Album {
  id: string;
  title: string;
  artist: {
    name: string;
  };
  imageUrl: string;
  releaseDate: string;
}

interface AlbumGridProps {
  title?: string;
  genre?: string;
  year?: string;
  limit?: number;
}

export default function AlbumGrid({ title, genre, year, limit = 24 }: AlbumGridProps) {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAlbums() {
      setLoading(true);
      setError(null);
      
      try {
        // Build query parameters
        const params = new URLSearchParams();
        if (genre && genre !== 'All Genres') params.append('genre', genre);
        if (year && year !== 'Release Year') params.append('year', year);
        params.append('limit', limit.toString());
        // Add a random seed to get different results each time
        params.append('seed', Math.random().toString());
        
        console.log('Fetching albums with params:', Object.fromEntries(params.entries()));
        
        const response = await fetch(`/api/recommendations?${params.toString()}`);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API error response:', errorText);
          throw new Error(`Server responded with ${response.status}: ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Received album data:', data);
        
        if (Array.isArray(data) && data.length > 0) {
          setAlbums(data);
        } else if (data.albums && Array.isArray(data.albums)) {
          setAlbums(data.albums);
        } else {
          setAlbums([]);
        }
      } catch (err) {
        console.error('Error fetching albums:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        setAlbums([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAlbums();
  }, [genre, year, limit]);

  if (loading) {
    return (
      <div className="my-8">
        {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-8">
        {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
        <div className="bg-red-900/50 border border-red-700 text-white p-4 rounded-md mb-6">
          <h3 className="font-bold mb-2">Error Loading Albums</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8">
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      
      {albums.length === 0 ? (
        <div className="text-center py-12 bg-gray-800 rounded-lg">
          <p className="text-gray-300 text-lg mb-2">No albums found</p>
          <p className="text-gray-400">
            Try different filters or check back later for new recommendations.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {albums.map((album) => (
            <AlbumCard
              key={album.id}
              id={album.id}
              title={album.title}
              artist={album.artist.name}
              imageUrl={album.imageUrl || 'https://placehold.co/400x400/1DB954/FFFFFF/png?text=Album+Cover'}
              releaseYear={new Date(album.releaseDate).getFullYear().toString()}
            />
          ))}
        </div>
      )}
    </div>
  );
}
