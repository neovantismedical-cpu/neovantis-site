import type { APIRoute } from 'astro';
import { SITE_URL, specialities } from '../config/site';
import { getApprovedInsights } from '../lib/insights';

// Final indexable URLs only: no redirects, drafts, thank-you or 404 pages.
export const GET: APIRoute = async () => {
  const approved = await getApprovedInsights();
  const paths = [
    '/',
    '/about/',
    '/portfolio/',
    ...specialities.map((s) => `/portfolio/${s.slug}/`),
    '/support/',
    ...(approved.length ? ['/insights/', ...approved.map((a) => `/insights/${a.slug}/`)] : []),
    '/contact/',
    '/privacy-policy/',
    '/terms/',
    '/medical-disclaimer/',
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${new URL(p, SITE_URL).href}</loc></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
