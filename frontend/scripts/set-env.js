// Generates environment.production.ts before ng build.
// On Render: NG_API_HOST is injected via fromService reference.
// Locally:   falls back to localhost so the build still works.
const fs   = require('fs');
const path = require('path');

const host   = process.env.NG_API_HOST || '';
const apiUrl = host
  ? (host.startsWith('http') ? `${host}/api` : `https://${host}/api`)
  : 'http://localhost:3002/api';

const content = `export const environment = {
  production: true,
  apiUrl: '${apiUrl}',
};
`;

const dest = path.join(__dirname, '../src/environments/environment.production.ts');
fs.writeFileSync(dest, content, 'utf8');
console.log(`[set-env] apiUrl → ${apiUrl}`);
