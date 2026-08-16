import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jacsurfacecoatings.com',
  integrations: [sitemap()],
  output: 'static',
});
