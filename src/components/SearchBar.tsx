'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SearchResult {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  slug: string;
  description: string;
}

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  placeholder = 'Search for services...',
  className = '',
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle search input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length >= 2) {
      setIsLoading(true);
      setIsOpen(true);
      
      // In a real implementation, this would be an API call
      // For now, we'll simulate a search with setTimeout
      setTimeout(() => {
        // This would be replaced with actual search logic
        import('@/data/listings.json').then((module) => {
          const listings = module.default;
          const filtered = listings.filter((listing: any) => 
            listing.name.toLowerCase().includes(value.toLowerCase()) ||
            listing.description.toLowerCase().includes(value.toLowerCase()) ||
            listing.category.name.toLowerCase().includes(value.toLowerCase())
          ).slice(0, 5).map((listing: any) => ({
            id: listing.id,
            name: listing.name,
            category: listing.category.name,
            categorySlug: listing.category.slug,
            slug: listing.slug,
            description: listing.description.substring(0, 100) + '...'
          }));
          
          setResults(filtered);
          setIsLoading(false);
        });
      }, 300);
      
      if (onSearch) {
        onSearch(value);
      }
    } else {
      setIsOpen(false);
      setResults([]);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} role="search">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="search"
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-primary-500 focus:border-primary-500"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            aria-expanded={isOpen}
            aria-controls="search-results"
            autoComplete="off"
            required
          />
          <button
            type="submit"
            className="absolute right-2 bottom-1.5 top-1.5 px-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300"
          >
            <span className="sr-only">Search</span>
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 19l-4-4m0-7A7 7 0 111 8a7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>

      {/* Search results dropdown */}
      {isOpen && (
        <div
          id="search-results"
          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg"
          role="listbox"
        >
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-primary-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <span className="ml-2">Searching...</span>
            </div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((result) => (
                <li key={result.id} className="border-b border-gray-100 last:border-b-0">
                  <Link
                    href={`/${result.categorySlug}/${result.slug}`}
                    className="block p-3 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="font-medium text-primary-600">{result.name}</div>
                    <div className="text-xs text-gray-500 mb-1">
                      Category: {result.category}
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2">{result.description}</p>
                  </Link>
                </li>
              ))}
              <li className="p-2 bg-gray-50 text-center">
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  className="text-sm text-primary-600 hover:underline"
                  onClick={() => setIsOpen(false)}
                >
                  View all results
                </Link>
              </li>
            </ul>
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-gray-500">
              No results found for &quot;{query}&quot;
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
