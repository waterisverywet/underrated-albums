import Link from 'next/link';
import { FaGithub, FaSpotify } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 p-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>© 2025 Underrated Albums. All rights reserved.</p>
            <p className="text-sm mt-1">Powered by Spotify API</p>
          </div>
          <div className="flex gap-4">
            <Link href="https://github.com" className="hover:text-white">
              <FaGithub size={24} />
            </Link>
            <Link href="https://spotify.com" className="hover:text-green-500">
              <FaSpotify size={24} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
