import { defineConfig } from 'vite';

export default defineConfig({
    base: '/anatomy-viewer/',
    build: {
        outDir: '../anatomy-viewer-dist',
        emptyOutDir: true
    }
});
