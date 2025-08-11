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
    <div ref={searchRef} className={`relative ${className} animate-fadeIn`}>
      <form onSubmit={handleSubmit} role="search">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
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
            className="block w-full p-4 pl-12 text-base text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-colors duration-200 shadow-sm hover:shadow"
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
            className="absolute right-2.5 bottom-2 top-2 px-4 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-500 focus:ring-2 focus:outline-none focus:ring-primary-300 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
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
          className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden animate-fadeIn max-h-[80vh] overflow-y-auto animate-slideInUp"
          role="listbox"
        >
          {isLoading ? (
            <div className="p-6 text-center text-gray-500">
              <div className="inline-block h-7 w-7 animate-spin rounded-full border-3 border-solid border-primary-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <span className="ml-3 text-base">Searching...</span>
            </div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((result) => (
                <li key={result.id} className="border-b border-gray-100 last:border-b-0">
                  <Link
                    href={`/${result.categorySlug}/${result.slug}`}
                    className="block p-5 hover:bg-primary-50 transition-colors hover:shadow-inner"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="font-medium text-primary-600 hover:text-primary-700 transition-colors text-lg mb-1">{result.name}</div>
                    <div className="text-sm font-medium text-gray-500 mb-2">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-gray-800 mr-1 text-xs font-medium">
                        {result.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2">{result.description}</p>
                  </Link>
                </li>
              ))}
              <li className="p-4 bg-gray-50 text-center border-t border-gray-100 hover:bg-gray-100 transition-colors">
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  className="text-base font-medium text-primary-600 hover:text-primary-700 transition-colors flex items-center justify-center hover:underline"
                  onClick={() => setIsOpen(false)}
                >
                  View all results
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </li>
            </ul>
          ) : query.length >= 2 ? (
            <div className="p-8 text-center text-gray-500">
              <svg className="w-8 h-8 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-base">No results found for <span className="font-medium">&quot;{query}&quot;</span></p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
