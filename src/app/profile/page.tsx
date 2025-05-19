// src/app/profile/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaSpotify, FaSignOutAlt } from 'react-icons/fa';
import { signOut } from 'next-auth/react';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status !== 'loading') {
      setLoading(false);
    }
  }, [status, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {session?.user?.image ? (
            <div className="relative w-32 h-32 rounded-full overflow-hidden">
              <Image 
                src={session.user.image} 
                alt={session.user.name || 'Profile'} 
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-4xl text-gray-400">
              {session?.user?.name?.charAt(0) || '?'}
            </div>
          )}
          
          <div>
            <h1 className="text-3xl font-bold mb-2">{session?.user?.name || 'Spotify User'}</h1>
            <p className="text-gray-400 mb-4">{session?.user?.email}</p>
            
            <div className="flex gap-4">
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md"
              >
                <FaSignOutAlt />
                Sign Out
              </button>
              
              <a 
                href="https://open.spotify.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md"
              >
                <FaSpotify />
                Open Spotify
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Your Listening Stats</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-700 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Total Recommendations</h3>
            <p className="text-3xl text-green-500">24</p>
          </div>
          
          <div className="bg-gray-700 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Favorite Genre</h3>
            <p className="text-3xl text-green-500">Indie</p>
          </div>
          
          <div className="bg-gray-700 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Albums Explored</h3>
            <p className="text-3xl text-green-500">12</p>
          </div>
        </div>
      </div>
    </div>
  );
}
