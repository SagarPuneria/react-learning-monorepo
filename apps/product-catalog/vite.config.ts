/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/product-catalog',
  server: {
    port: 4204,
    host: 'localhost',
  },
  preview: {
    port: 4204,
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
      '@react-learning-monorepo/utils': path.resolve(__dirname, '../../libs/utils/src/index.ts'),
      '@react-learning-monorepo/types': path.resolve(__dirname, '../../libs/types/src/index.ts'),
      '@react-learning-monorepo/hooks': path.resolve(__dirname, '../../libs/hooks/src/index.ts'),
      '@react-learning-monorepo/ui-components': path.resolve(__dirname, '../../libs/ui-components/src/index.ts'),
    },
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-redux', '@reduxjs/toolkit'],
  },
}));
