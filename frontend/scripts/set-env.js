// Generates environment.production.ts before ng build.
// Priority:
//   1. NG_API_URL  — full URL, set manually in Render dashboard
//   2. NG_API_HOST — hostname only (fromService), https:// is prepended
//   3. fallback    — http://localhost:3002/api for local production builds
const fs   = require('fs');
const path = require('path');

let apiUrl = process.env.NG_API_URL || '';

if (!apiUrl) {
  const host = process.env.NG_API_HOST || '';
  if (host) {
    apiUrl = (host.startsWith('http') ? host : `https://${host}`) + '/api';
  } else {
    apiUrl = 'http://localhost:3002/api';
  }
}

const content = `export const environment = {
  production: true,
  apiUrl: '${apiUrl}',
};
`;

const dest = path.join(__dirname, '../src/environments/environment.production.ts');
fs.writeFileSync(dest, content, 'utf8');
console.log(`[set-env] apiUrl → ${apiUrl}`);
