import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://melanotanii.com',
  integrations: [sitemap()],
});
