// src/components/ui/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaSpotify, FaUser } from 'react-icons/fa';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <nav className="bg-black text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold flex items-center gap-2">
          <span className="text-green-500">
            <FaSpotify size={24} />
          </span>
          Underrated Albums
        </Link>
        
        <div className="flex gap-6 items-center">
          <Link 
            href="/" 
            className={`hover:text-green-400 ${pathname === '/' ? 'text-green-500 font-medium' : ''}`}
          >
            Home
          </Link>
          
          <Link 
            href="/discover" 
            className={`hover:text-green-400 ${pathname === '/discover' ? 'text-green-500 font-medium' : ''}`}
          >
            Discover
          </Link>
          
          {isClient ? (
            status === 'authenticated' ? (
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-400">Hi, {session?.user?.name?.split(' ')[0]}</div>
                <Link 
                  href="/profile" 
                  className="bg-gray-800 p-2 rounded-full hover:bg-gray-700"
                  title="Profile"
                >
                  <FaUser />
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-red-900 hover:bg-red-800 px-3 py-1 rounded text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              // Direct link to Spotify auth instead of using signIn function
              <a
                href="/api/auth/signin/spotify?callbackUrl=/"
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full flex items-center gap-2"
              >
                <FaSpotify />
                Login with Spotify
              </a>
            )
          ) : (
            <div className="w-[120px] h-10"></div>
          )}
        </div>
      </div>
    </nav>
  );
}
