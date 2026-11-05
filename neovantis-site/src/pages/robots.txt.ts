import type { APIRoute } from 'astro';
import { SITE_URL, INDEXING_ENABLED } from '../config/site';

// Crawling is allowed in both modes so crawlers can see the noindex signals on non-production builds.
// The sitemap is only advertised when indexing is enabled for the approved production domain.
export const GET: APIRoute = () => {
  const lines = ['User-agent: *', 'Allow: /'];
  if (INDEXING_ENABLED) lines.push('', `Sitemap: ${SITE_URL}/sitemap.xml`);
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
