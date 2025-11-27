import Link from 'next/link';
import { Menu, Search, Bell } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-red-600">
              Live Hindustan
            </div>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors">
              Home
            </Link>
            <Link href="/news" className="text-gray-700 hover:text-red-600 transition-colors">
              News
            </Link>
            <Link href="/politics" className="text-gray-700 hover:text-red-600 transition-colors">
              Politics
            </Link>
            <Link href="/sports" className="text-gray-700 hover:text-red-600 transition-colors">
              Sports
            </Link>
            <Link href="/entertainment" className="text-gray-700 hover:text-red-600 transition-colors">
              Entertainment
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Bell size={20} />
            </button>
            <button className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}