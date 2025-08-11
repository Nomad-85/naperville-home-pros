'use client';

import React from 'react';

interface OfflineButtonProps {
  className?: string;
}

export default function OfflineButton({ className }: OfflineButtonProps) {
  return (
    <button
      onClick={() => window.location.reload()}
      className={className || "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"}
    >
      Try Again
    </button>
  );
}
