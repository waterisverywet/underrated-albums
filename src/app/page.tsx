// src/app/page.tsx
import Link from 'next/link';
import { FaSpotify } from 'react-icons/fa';
import AlbumGrid from '@/components/albums/AlbumGrid';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-8 md:p-12 my-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover Underrated Album Gems
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Find amazing albums from emerging artists that deserve more attention.
            Our platform highlights incredible music from artists with fewer than 150k monthly listeners.
          </p>
          <Link 
            href="/discover" 
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 w-fit"
          >
            <FaSpotify />
            Start Discovering
          </Link>
        </div>
      </section>

     {/* Featured Albums */}
        <AlbumGrid 
         title="Featured Underrated Albums" 
        />

      {/* How It Works */}
      <section className="my-16">
        <h2 className="text-2xl font-bold mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-green-500 text-xl font-bold mb-2">1</div>
            <h3 className="text-xl font-semibold mb-2">Connect with Spotify</h3>
            <p className="text-gray-400">Link your Spotify account to analyze your music taste and preferences.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-green-500 text-xl font-bold mb-2">2</div>
            <h3 className="text-xl font-semibold mb-2">Get Personalized Recommendations</h3>
            <p className="text-gray-400">Our algorithm finds albums from emerging artists that match your taste.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-green-500 text-xl font-bold mb-2">3</div>
            <h3 className="text-xl font-semibold mb-2">Discover Amazing Music</h3>
            <p className="text-gray-400">Explore full albums and support artists who deserve more recognition.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
