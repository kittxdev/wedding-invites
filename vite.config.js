import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  server: {
    // Allows all hosts so that any dynamic Cloudflare Tunnel URL works.
    allowedHosts: true, 
  }
});
