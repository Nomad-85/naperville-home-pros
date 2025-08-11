/**
 * Axe Core React integration for accessibility testing
 * Only runs in development mode to help identify accessibility issues
 */

export function initAxe(): void {
  // Only run in browser environment and in development mode
  if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
    // Dynamic import to ensure it only runs in browser and in development
    import('@axe-core/react')
      .then((axeModule) => {
        const axe = axeModule.default;
        // Use dynamic imports for React and ReactDOM to avoid SSR issues
        Promise.all([
          import('react'),
          import('react-dom')
        ]).then(([React, ReactDOM]) => {
          axe(React, ReactDOM, 1000, {
            rules: [
              // Include specific rules or customize existing ones
              {
                id: 'color-contrast',
                enabled: true
              },
              {
                id: 'landmark-one-main',
                enabled: true
              },
              {
                id: 'page-has-heading-one',
                enabled: true
              },
              {
                id: 'region',
                enabled: true
              }
            ]
          });
          console.log('Axe accessibility testing initialized');
        });
      })
      .catch(err => {
        console.error('Error initializing axe-core for accessibility testing:', err);
      });
  }
}
