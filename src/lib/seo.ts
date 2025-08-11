/**
 * SEO helper functions for Naperville Home Pros
 */

/**
 * Builds a formatted page title with the site name
 * @param pageTitle Optional page title to prepend to site name
 * @returns Formatted title string
 */
export function buildTitle(pageTitle?: string): string {
  const siteName = 'Naperville Home Pros';
  return pageTitle ? `${pageTitle} | ${siteName}` : `Home Service Pros in Naperville & Wheaton | ${siteName}`;
}

/**
 * Generates a canonical URL for the current page
 * @param urlPath The path portion of the URL (without domain)
 * @returns Full canonical URL
 */
export function canonical(urlPath: string): string {
  const domain = 'https://napervillehomepros.com';
  // Ensure path starts with a slash
  const normalizedPath = urlPath.startsWith('/') ? urlPath : `/${urlPath}`;
  return `${domain}${normalizedPath}`;
}

/**
 * Creates a JSON-LD script element with the provided data
 * @param obj The JSON-LD data object
 * @returns Script element with JSON-LD content
 */
export function jsonLd(obj: unknown): string {
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}

/**
 * Site-wide constants for SEO
 */
export const SEO_CONSTANTS = {
  SITE_NAME: 'Naperville Home Pros',
  DOMAIN: 'https://napervillehomepros.com',
  DEFAULT_DESCRIPTION: 'Find trusted plumbers, electricians, roofers & more. Compare top local pros in Naperville & Wheaton. Feature your business today.',
  AREAS_SERVED: ['Naperville', 'Wheaton', 'DuPage County'],
  CONTACT_EMAIL: 'hello@napervillehomepros.com',
  CONTACT_PHONE: '(630) 555-0134',
};
