// Public URL of the deployed Cloudflare Worker analytics proxy.
// After you run `npx wrangler deploy` in /worker, paste its URL here
// (e.g. "https://analytics-proxy.<your-subdomain>.workers.dev").
// This URL is NOT secret — the secret API token lives inside the Worker.
export const ANALYTICS_API_URL =
  import.meta.env.VITE_ANALYTICS_API || 'PUT_YOUR_WORKER_URL_HERE';

// World topojson used by the choropleth (fetched at runtime from a CDN).
export const WORLD_GEO_URL =
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
