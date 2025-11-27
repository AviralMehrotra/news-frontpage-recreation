"use client";

import Link from "next/link";
import { Home, ArrowLeft, Search, TrendingUp } from "lucide-react";
import Header from "../components/organisms/Header";
import Button from "../components/atoms/Button";

export default function NotFound() {
  const popularCategories = [
    { name: "Business", href: "/category/business" },
    { name: "Sports", href: "/category/sports" },
    { name: "Technology", href: "/category/technology" },
    { name: "Entertainment", href: "/category/entertainment" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Section */}
          <div className="mb-12">
            <div className="text-8xl font-bold text-red-600 mb-4">404</div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Oops! Page Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              The news story you're looking for might have been moved, deleted,
              or never existed. Don't worry, there's plenty more to discover!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button href="/" variant="primary" size="lg">
              <Home size={20} className="mr-2" />
              Back to Homepage
            </Button>

            <Button
              onClick={() => window.history.back()}
              variant="outline"
              size="lg"
              className="cursor-pointer"
            >
              <ArrowLeft size={20} className="mr-2" />
              Go Back
            </Button>
          </div>

          {/* Popular Categories */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center justify-center mb-6">
              <TrendingUp className="text-red-600 mr-2" size={24} />
              <h2 className="text-xl font-semibold text-gray-900">
                Explore Popular Categories
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {popularCategories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="p-4 text-sm text-black bg-gray-100 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors text-center font-medium"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Suggestion */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center mb-3">
              <Search className="text-blue-600 mr-2" size={20} />
              <span className="text-blue-800 font-medium">
                Looking for something specific?
              </span>
            </div>
            <p className="text-blue-700 text-sm">
              Try browsing our categories above or return to the homepage for
              the latest news.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
