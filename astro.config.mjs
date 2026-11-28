import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const commercial = /\/(product|products|cart|shop|checkout|privacy-policy|about-us|contact-us|shipping-policy|category|melatropin|my-account)(\/|$)/i;

export default defineConfig({
  site: 'https://melanotanii.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !commercial.test(page) && !page.includes('/og/'),
    }),
  ],
});
