// 301 Redirects for SEO - www to non-www
// This would typically be handled by your hosting provider or CDN
// For Replit, you can handle this in the Express server

import { Express } from 'express';

export function setupSEORedirects(app: Express) {
  // Redirect www to non-www for SEO consolidation
  app.use((req, res, next) => {
    if (req.headers.host?.startsWith('www.')) {
      const redirectUrl = `https://${req.headers.host.slice(4)}${req.url}`;
      return res.redirect(301, redirectUrl);
    }
    next();
  });

  // Ensure HTTPS redirect for production
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] === 'http' && process.env.NODE_ENV === 'production') {
      return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
  });
}