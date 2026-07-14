// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import db from '@astrojs/db';
import react from '@astrojs/react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define a shared database file in the workspace root for local production builds
if (!process.env.ASTRO_DATABASE_FILE && !process.env.ASTRO_DB_REMOTE_URL) {
  process.env.ASTRO_DATABASE_FILE = path.resolve(__dirname, '../../../../local.db');
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