'use client';

import { signIn } from 'next-auth/react';
import { FaSpotify } from 'react-icons/fa';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Sign In</h1>
          <p className="text-gray-400">
            Connect with Spotify to discover underrated albums tailored to your taste
          </p>
        </div>
        
        <button
          onClick={() => signIn('spotify', { callbackUrl: '/' })}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-full flex items-center justify-center gap-2 font-medium"
        >
          <FaSpotify size={24} />
          Sign in with Spotify
        </button>
        
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>We'll only access your music preferences to provide better recommendations.</p>
        </div>
      </div>
    </div>
  );
}
