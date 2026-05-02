import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    // Allows all hosts so that any dynamic Cloudflare Tunnel URL works.
    allowedHosts: true, 
  }
});
