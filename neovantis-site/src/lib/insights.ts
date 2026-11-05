import { getCollection } from 'astro:content';
import { SHOW_DRAFTS } from '../config/site';

/** Articles visible in this build: approved always; drafts only in dev or review builds. */
export async function getVisibleInsights() {
  const all = await getCollection('insights');
  return all
    .filter((a) => a.data.status === 'approved' || SHOW_DRAFTS)
    .sort((a, b) => a.data.title.localeCompare(b.data.title));
}

/** Approved articles only: used for public navigation decisions and the sitemap. */
export async function getApprovedInsights() {
  return (await getCollection('insights')).filter((a) => a.data.status === 'approved');
}

/** Whether Insights links should appear in navigation for this build. */
export async function insightsLinksVisible() {
  return (await getVisibleInsights()).length > 0;
}
