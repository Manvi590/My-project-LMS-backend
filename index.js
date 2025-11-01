// Export the already-created CommonJS app from `api/index.js` so Vercel
// can load this file reliably. `api/index.js` mounts your existing
// `src/routes/courses` router and uses CommonJS (module.exports = app).

const app = require('./api/index.js');
module.exports = app;
