import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// Defensive proxy configuration: ensure `server.proxy` is always an object.
// The original runtime error came from Vite receiving a boolean `true` for
// a proxy entry which makes the internal proxy code attempt to set
// properties on a primitive (causing "Cannot create property 'prependPath' on boolean 'true'").
let proxySetting = {
  '/api': {
    target: 'http://127.0.0.1:8000',
    changeOrigin: true,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
};

// Defensive normalization: if for some reason proxySetting becomes a boolean
// (or anything other than a plain object), replace it with an empty object
// so Vite's proxy middleware doesn't receive a primitive.
if (typeof proxySetting !== 'object' || proxySetting === null || Array.isArray(proxySetting)) {
  // eslint-disable-next-line no-console
  console.warn('vite: invalid server.proxy, falling back to empty proxy {}');
  proxySetting = {};
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: proxySetting
  }
});
