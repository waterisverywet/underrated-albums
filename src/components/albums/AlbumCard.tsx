import Image from 'next/image';
import Link from 'next/link';
import { FaPlay } from 'react-icons/fa';

interface AlbumCardProps {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: string;
}

export default function AlbumCard({ id, title, artist, imageUrl, releaseYear }: AlbumCardProps) {
  return (
    <Link href={`/albums/${id}`}>
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
        <div className="relative aspect-square">
          <Image 
            src={imageUrl} 
            alt={`${title} by ${artist}`} 
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
            <div className="bg-green-500 rounded-full p-3">
              <FaPlay className="text-white" />
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-white truncate">{title}</h3>
          <p className="text-gray-400 text-sm">{artist}</p>
          <p className="text-gray-500 text-xs mt-1">{releaseYear}</p>
        </div>
      </div>
    </Link>
  );
}
