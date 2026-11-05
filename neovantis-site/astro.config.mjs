import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

// Writes a Netlify _headers file at build time. Unless SITE_INDEXING=true (approved production
// domain only), every response carries X-Robots-Tag: noindex in addition to the meta robots tag.
const indexingHeaders = {
  name: 'neovantis-indexing-headers',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const indexing = process.env.SITE_INDEXING === 'true';
      const lines = [];
      if (!indexing) lines.push('/*', '  X-Robots-Tag: noindex, nofollow', '');
      lines.push('/thank-you/*', '  X-Robots-Tag: noindex', '');
      lines.push('/fonts/*', '  Cache-Control: public, max-age=604800', '');
      lines.push('/_astro/*', '  Cache-Control: public, max-age=31536000, immutable', '');
      fs.writeFileSync(new URL('_headers', dir), lines.join('\n'));
      console.log(`[neovantis] indexing ${indexing ? 'ENABLED' : 'disabled (noindex headers written)'}`);
    },
  },
};

export default defineConfig({
  site: 'https://neovantis.co.za',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  compressHTML: true,
  // Hide Astro's developer toolbar in the local preview so pages look as they will live.
  devToolbar: { enabled: false },
  integrations: [indexingHeaders],
});
