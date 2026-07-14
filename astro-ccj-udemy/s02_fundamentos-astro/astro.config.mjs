// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import db from '@astrojs/db';

import react from '@astrojs/react';

// Define database file fallback for local production builds
if (!process.env.ASTRO_DATABASE_FILE && !process.env.ASTRO_DB_REMOTE_URL) {
  process.env.ASTRO_DATABASE_FILE = 'local.db';
}

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [db(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});