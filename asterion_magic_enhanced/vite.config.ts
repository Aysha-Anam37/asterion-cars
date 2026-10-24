import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function spaStaticRoutesPlugin(): Plugin {
  return {
    name: 'asterion-spa-static-routes',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexFile = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexFile)) return;

      const html = fs.readFileSync(indexFile, 'utf-8');
      const routes = ['vehicle', 'engineering', 'philosophy', 'about', 'contact'];

      for (const route of routes) {
        const routeDir = path.join(distDir, route);
        fs.mkdirSync(routeDir, {recursive: true});
        fs.writeFileSync(path.join(routeDir, 'index.html'), html);
      }

      fs.writeFileSync(path.join(distDir, '404.html'), html);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), spaStaticRoutesPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

