// src/app/auth/signin/page.tsx
'use client';

import { signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { FaSpotify } from 'react-icons/fa';

export default function SignInPage() {
  // Automatically redirect to Spotify login
  useEffect(() => {
    // Small delay to ensure the page is fully loaded
    const timer = setTimeout(() => {
      signIn('spotify', { callbackUrl: '/' });
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="animate-pulse mb-6">
          <FaSpotify className="text-green-500 text-6xl mx-auto" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Redirecting to Spotify...</h1>
        <p className="text-gray-400 mb-6">
          You'll be redirected to Spotify to sign in. If nothing happens, click the button below.
        </p>
        <button
          onClick={() => signIn('spotify', { callbackUrl: '/' })}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-full flex items-center justify-center gap-2 font-medium"
        >
          <FaSpotify size={24} />
          Sign in with Spotify
        </button>
      </div>
    </div>
  );
}
