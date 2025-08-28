/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.primary.600'),
              textDecoration: 'underline',
              fontWeight: '500',
              '&:hover': { color: theme('colors.primary.700') },
            },
            h1: { color: theme('colors.gray.900') },
            h2: { color: theme('colors.gray.900'), scrollMarginTop: '6rem' },
            h3: { color: theme('colors.gray.900'), scrollMarginTop: '6rem' },
            'ul > li::marker': { color: theme('colors.gray.400') },
            'ol > li::marker': { color: theme('colors.gray.400') },
            blockquote: {
              fontStyle: 'italic',
              color: theme('colors.gray.700'),
              borderLeftColor: theme('colors.gray.300'),
            },
            strong: { color: theme('colors.gray.900') },
            hr: { borderColor: theme('colors.gray.200') },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
