'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Category {
  slug: string;
  name: string;
}

interface SearchProps {
  categories: Category[];
  className?: string;
}

const Search: React.FC<SearchProps> = ({ categories, className = '' }) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedCategory) {
      router.push(`/${selectedCategory}${keyword ? `?q=${encodeURIComponent(keyword)}` : ''}`);
    } else if (keyword) {
      router.push(`/categories?q=${encodeURIComponent(keyword)}`);
    } else {
      router.push('/categories');
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          {/* Keyword Search */}
          <div className="flex-1">
            <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">
              What service do you need?
            </label>
            <input
              type="text"
              id="keyword"
              name="keyword"
              placeholder="Search for services..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          
          {/* Category Filter */}
          <div className="md:w-1/3">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Submit Button */}
          <div className="md:flex md:items-end">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
