"use client";

import Link from "next/link";
import { Menu, Search, Bell, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* Using the same logo of the Website Live Hindustan */}
            <Image
              src="https://www.livehindustan.com/static-content/1y/lh/img/lh-logo-desk.webp"
              height={200}
              width={200}
              alt="Live Hindustan"
            />
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-red-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/category/business"
              className="text-gray-700 hover:text-red-600 transition-colors"
            >
              Business
            </Link>
            <Link
              href="/category/entertainment"
              className="text-gray-700 hover:text-red-600 transition-colors"
            >
              Entertainment
            </Link>
            <Link
              href="/category/health"
              className="text-gray-700 hover:text-red-600 transition-colors"
            >
              Health
            </Link>
            <Link
              href="/category/science"
              className="text-gray-700 hover:text-red-600 transition-colors"
            >
              Science
            </Link>
            <Link
              href="/category/sports"
              className="text-gray-700 hover:text-red-600 transition-colors"
            >
              Sports
            </Link>
            <Link
              href="/category/technology"
              className="text-gray-700 hover:text-red-600 transition-colors"
            >
              Technology
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
            <button
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="px-4 py-4 space-y-2">
              <Link
                href="/"
                className="block py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/category/business"
                className="block py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Business
              </Link>
              <Link
                href="/category/entertainment"
                className="block py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Entertainment
              </Link>
              <Link
                href="/category/health"
                className="block py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Health
              </Link>
              <Link
                href="/category/science"
                className="block py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Science
              </Link>
              <Link
                href="/category/sports"
                className="block py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sports
              </Link>
              <Link
                href="/category/technology"
                className="block py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Technology
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
