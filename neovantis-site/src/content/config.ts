import { defineCollection, z } from 'astro:content';

// One source for the Insights list and detail pages.
// status: 'draft' articles are excluded from production pages, navigation and the sitemap.
// Change to 'approved' only after owner sign-off. Do not add invented authors or dates.
const insights = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['draft', 'approved']),
    summary: z.string(),
    image: z
      .object({ src: z.string(), srcset: z.string().optional(), width: z.number(), height: z.number(), alt: z.string() })
      .optional(),
    /** ISO date, set only when the article is actually published */
    published: z.string().optional(),
    updated: z.string().optional(),
    related: z.array(z.string()).default([]),
  }),
});

export const collections = { insights };
