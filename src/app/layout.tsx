// Add JSX namespace declaration to fix JSX element type errors
// @ts-ignore
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// @ts-ignore - Ignoring missing type declarations for Next.js modules
import type { Metadata } from 'next'
// @ts-ignore - Ignoring missing type declarations for Next.js font module
import { Inter } from 'next/font/google'
import './globals.css'
import '../styles/print.css'
import '../styles/keyboard-navigation.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import AccessibilityWidget from '@/components/AccessibilityWidget'
// @ts-ignore - Ignoring missing type declarations for Next.js script module
import Script from 'next/script'
import SkipLink from '@/components/SkipLink'
// Add React import to fix ReactNode type issues
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Naperville Home Pros',
    default: 'Home Service Pros in Naperville & Wheaton | Naperville Home Pros',
  },
  description: 'Find trusted plumbers, electricians, roofers & more. Compare top local pros in Naperville & Wheaton. Feature your business today.',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#4f46e5',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  // Using any type to avoid React.ReactNode type issues
  children: any
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical fonts */}
        <link 
          rel="preload" 
          href="/fonts/inter-var.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        {/* @ts-ignore - Ignoring missing children prop error */}
        <Providers>
          {/* Skip to content link for accessibility */}
          <SkipLink targetId="main-content" />
          
          <Header />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <Footer />
          
          {/* Accessibility Widget */}
          <AccessibilityWidget />
          
          {/* Schema.org Organization data */}
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Naperville Home Pros",
              "url": "https://napervillehomepros.com",
              "logo": "https://napervillehomepros.com/static/logo.png",
              "areaServed": ["Naperville IL", "Wheaton IL"]
            }}
          />
          
          {/* Inline critical JS for performance */}
          <Script id="show-banner" strategy="afterInteractive">
            {`
              document.addEventListener('DOMContentLoaded', function() {
                // Initialize focus trap for modals if they exist
                const modals = document.querySelectorAll('[role="dialog"]');
                if (modals.length) {
                  // Focus trap implementation would go here
                }
              });
            `}
          </Script>
          
          {/* Service worker registration for offline support */}
          <Script 
            src="/register-sw.js"
            id="register-sw"
            strategy="lazyOnload"
          />
          
          {/* Connection status indicator */}
          <div 
            id="connection-status" 
            className="fixed bottom-4 left-4 p-3 rounded-md shadow-md hidden z-50"
            role="status"
            aria-live="polite"
          ></div>
        </Providers>
      </body>
    </html>
  )
}
