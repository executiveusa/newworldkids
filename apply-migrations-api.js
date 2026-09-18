#!/usr/bin/env node

/**
 * Apply Supabase migrations via the Management API.
 *
 * SECURITY:
 * - No credentials or project refs are stored in source.
 * - SUPABASE_ACCESS_TOKEN must come from a secure runtime secret store.
 * - SUPABASE_PROJECT_REF identifies the authorized target project.
 */

const fs = require('fs');
const https = require('https');

const SUPABASE_ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const PROJECT_REF = process.env.SUPABASE_PROJECT_REF;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_ACCESS_TOKEN || !PROJECT_REF) {
  console.error('Missing SUPABASE_ACCESS_TOKEN or SUPABASE_PROJECT_REF.');
  process.exit(1);
}

const MIGRATIONS = [
  'supabase/migrations/20250120_initial_schema.sql',
  'supabase/migrations/20250120_impact_tracking.sql',
];

function executeSQL(sql) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ query: sql });
    const options = {
      hostname: 'api.supabase.com',
      port: 443,
      path: `/v1/projects/${PROJECT_REF}/database/query`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SUPABASE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve({ statusCode: res.statusCode, data }));
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function applyMigration(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return false;
  }

  const result = await executeSQL(fs.readFileSync(filePath, 'utf8'));
  if (result.statusCode >= 200 && result.statusCode < 300) {
    console.log('Applied:', filePath);
    return true;
  }

  console.error('Migration failed:', filePath, 'HTTP', result.statusCode);
  return false;
}

async function verifyTable(tableName) {
  if (!SUPABASE_ANON_KEY) return null;

  return new Promise((resolve) => {
    const options = {
      hostname: `${PROJECT_REF}.supabase.co`,
      port: 443,
      path: `/rest/v1/${tableName}?select=count&limit=0`,
      method: 'GET',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    };

    const req = https.request(options, (res) => {
      res.resume();
      res.on('end', () => resolve(res.statusCode === 200));
    });
    req.on('error', () => resolve(false));
    req.end();
  });
}

async function main() {
  for (const migration of MIGRATIONS) {
    const ok = await applyMigration(migration);
    if (!ok) process.exitCode = 1;
  }

  if (SUPABASE_ANON_KEY) {
    for (const table of ['agents', 'impact_projects', 'partnerships', 'blog_posts']) {
      console.log(table, await verifyTable(table) ? 'verified' : 'not verified');
    }
  } else {
    console.log('Skipping REST verification because NEXT_PUBLIC_SUPABASE_ANON_KEY is not set.');
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
