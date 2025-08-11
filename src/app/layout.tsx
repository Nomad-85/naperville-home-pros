// JSX namespace declaration removed - using standard React types

import type { Metadata, Viewport } from 'next'
import { buildViewport } from '@/components/SchemaMetadata'
import { Inter } from 'next/font/google'
import './globals.css'
import '../styles/print.css'
import '../styles/keyboard-navigation.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import AccessibilityWidget from '@/components/AccessibilityWidget'
import Script from 'next/script'
import SkipLink from '@/components/SkipLink'
import type { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Naperville Home Pros',
    default: 'Home Service Pros in Naperville & Wheaton | Naperville Home Pros',
  },
  description: 'Find trusted plumbers, electricians, roofers & more. Compare top local pros in Naperville & Wheaton. Feature your business today.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export const viewport = buildViewport({
  width: 'device-width',
  initialScale: 1,
  maximumScale: 2,
  userScalable: true,
  themeColor: '#4f46e5'
})

import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: ReactNode
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
          {/* Using standard script tag instead of Next.js Script component to avoid type errors */}
          <script 
            id="register-sw"
            src="/register-sw.js"
            async
            defer
          ></script>
          
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
