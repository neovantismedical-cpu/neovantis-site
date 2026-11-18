// Review build: includes draft Insights (clearly marked, always noindex) in dist-review/.
// Never deploy this output to production.
import { spawnSync } from 'node:child_process';
const res = spawnSync('npx', ['astro', 'build', '--outDir', 'dist-review'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, SHOW_DRAFTS: 'true', SITE_INDEXING: 'false' },
});
process.exit(res.status ?? 1);
