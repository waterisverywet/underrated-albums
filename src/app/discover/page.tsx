// src/app/discover/page.tsx
'use client';

import { useState } from 'react';
import AlbumGrid from '@/components/albums/AlbumGrid';
import { FaRandom } from 'react-icons/fa';

export default function DiscoverPage() {
  const [genre, setGenre] = useState<string | undefined>(undefined);
  const [year, setYear] = useState<string | undefined>(undefined);
  const [refreshKey, setRefreshKey] = useState(0);
  const [albumCount, setAlbumCount] = useState(24); // Show 24 albums by default

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setGenre(value === 'All Genres' ? undefined : value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setYear(value === 'Release Year' ? undefined : value);
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleShowMore = () => {
    setAlbumCount(prev => prev + 12);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Discover Underrated Albums</h1>
        <p className="text-gray-400">
          Albums recommended for you based on your listening preferences
        </p>
      </div>

      {/* Filter options */}
      <div className="bg-gray-800 p-4 rounded-lg mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          <select 
            className="bg-gray-700 text-white px-4 py-2 rounded-md"
            onChange={handleGenreChange}
            value={genre || 'All Genres'}
          >
            <option>All Genres</option>
            <option>Rock</option>
            <option>Electronic</option>
            <option>Hip-Hop</option>
            <option>Jazz</option>
            <option>Indie</option>
            <option>Folk</option>
            <option>Ambient</option>
            <option>Pop</option>
          </select>
          
          <select 
            className="bg-gray-700 text-white px-4 py-2 rounded-md"
            onChange={handleYearChange}
            value={year || 'Release Year'}
          >
            <option>Release Year</option>
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
            <option>2021</option>
            <option>2020</option>
          </select>
          
          <button 
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md ml-auto flex items-center gap-2"
            onClick={handleRefresh}
          >
            <FaRandom />
            Refresh Recommendations
          </button>
        </div>
      </div>

      {/* Album recommendations */}
      <AlbumGrid 
        title="Recommended Albums" 
        genre={genre} 
        year={year}
        limit={albumCount}
        key={refreshKey} // This forces a re-render when refreshed
      />
      
      {/* Show more button */}
      <div className="text-center mt-8 mb-12">
        <button
          onClick={handleShowMore}
          className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-full"
        >
          Show More Albums
        </button>
      </div>
    </div>
  );
}
