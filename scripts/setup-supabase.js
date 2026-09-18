#!/usr/bin/env node

/**
 * Setup Supabase Database Schema
 * Applies the initial migration to create all tables and seed data.
 *
 * SECURITY: credentials must be supplied through environment variables.
 * Never add service-role credentials to this repository.
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
  console.error('Load them from a secure local/runtime secret store before running this script.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('NEW WORLD KIDS - DATABASE SETUP');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log('Supabase URL:', supabaseUrl);
  console.log('');

  const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20250120_initial_schema.sql');

  if (!fs.existsSync(migrationPath)) {
    console.error('Migration file not found:', migrationPath);
    process.exit(1);
  }

  const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');
  console.log('Migration file loaded');
  console.log('Size:', Math.round(migrationSQL.length / 1024), 'KB');
  console.log('');
  console.log('Apply migrations through the authorized Supabase CLI or dashboard for the project selected by SUPABASE_URL.');
  console.log('Do not hard-code a project reference or credential in this script.');
  console.log('');

  try {
    const { error } = await supabase.from('agents').select('count');

    if (error) {
      if (error.code === '42P01') {
        console.log('Tables not yet created - apply the migration before continuing.');
      } else {
        console.log('Database check:', error.message);
      }
    } else {
      console.log('Database connection is accessible.');
    }
  } catch (error) {
    console.error('Error checking database:', error.message);
  }
}

setupDatabase();
