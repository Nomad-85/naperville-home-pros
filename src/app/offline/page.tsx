import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import TryAgainButton from './TryAgainButton';

export const metadata: Metadata = {
  title: 'Offline | Naperville Home Pros',
  description: 'You are currently offline. Some features may be unavailable.',
};

export const viewport = {
  themeColor: '#ffffff',
};

export const dynamic = 'force-static';

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">You&apos;re offline</h1>
          <p className="text-lg text-gray-600 mb-6">
            It looks like you&apos;re not connected to the internet right now.
          </p>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <svg
              className="mx-auto h-16 w-16 text-primary-600 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636a9 9 0 010 12.728m-3.536-3.536a5 5 0 010-7.072m-3.183 1.757a3 3 0 010 3.558M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75"
              />
            </svg>
            <p className="text-gray-700 mb-4">
              Some features of Naperville Home Pros may be unavailable while you&apos;re offline. 
              Any cached pages you&apos;ve previously visited should still work.
            </p>
            <div className="space-y-3">
              <TryAgainButton />
              <Link
                href="/"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Offline Tips</h2>
            <ul className="text-left text-gray-600 space-y-2">
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-primary-500 mr-2 mt-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Check your internet connection
              </li>
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-primary-500 mr-2 mt-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Try refreshing the page when back online
              </li>
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-primary-500 mr-2 mt-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Some pages may be available from cache
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
