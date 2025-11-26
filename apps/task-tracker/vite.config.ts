/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/task-tracker',
  server: {
    port: 4201,
    host: 'localhost',
  },
  preview: {
    port: 4201,
    host: 'localhost',
  },
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', {}]],
      },
    }),
  ],
  resolve: {
    alias: {
      '@task-tracker': path.resolve(__dirname, './src'),
      // '@libs': path.resolve(__dirname, '../../libs'), // ❌
      // Map each library to its source directory ✅
      '@libs/utils': path.resolve(__dirname, '../../libs/utils/src'), // ✅
      '@libs/hooks': path.resolve(__dirname, '../../libs/hooks/src'), // ✅
      '@libs/ui-components': path.resolve(__dirname, '../../libs/ui-components/src'), // ✅
      '@libs/types': path.resolve(__dirname, '../../libs/types/src'), // ✅
    },
  },
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [],
  // },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
}));
