/* The site is served from a GitHub Pages project URL
   (sandhukaran.github.io/shortcutz/), not a domain root, so a bare
   '/assets/logo.png' resolves to sandhukaran.github.io/assets/logo.png
   and 404s. Vite rewrites absolute paths it finds in index.html, but it
   cannot see paths built inside JS strings — those are ours to prefix.

   import.meta.env.BASE_URL is whatever `base` is set to in
   vite.config.js ('/shortcutz/' in production, '/' under `npm run dev`),
   and it always carries a trailing slash — hence the leading slash is
   stripped off the path here rather than doubled up. */
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
