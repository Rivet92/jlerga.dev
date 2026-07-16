// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jlerga.dev',
  output: 'static',
  integrations: [sitemap({
    i18n: {
      defaultLocale: 'es',
      locales: {
        es: 'es-ES',
        en: 'en-US',
      },
    },
    filter: (page) => !page.includes('/cv/') && !page.includes('/cv/index.html'),
  })],
  vite: { plugins: [tailwindcss()] },
});