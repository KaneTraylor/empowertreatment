#!/usr/bin/env node

// Script to check if all required environment variables are set
const requiredEnvVars = [
  'SENDGRID_API_KEY',
  'SENDGRID_FROM_EMAIL',
  'TWILIO_ACCOUNT_SID',
  'TWILIO_AUTH_TOKEN',
  'TWILIO_PHONE_NUMBER',
];

const optionalEnvVars = [
  'KANE_PHONE',
  'TAYLOR_PHONE',
  'CAROL_PHONE',
  'DOTTIE_PHONE',
  'SARA_PHONE',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_GA_MEASUREMENT_ID',
  'GOOGLE_GEMINI_API_KEY',
];

console.log('Checking environment variables...\n');

console.log('Required Environment Variables:');
let hasAllRequired = true;
requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: Set`);
  } else {
    console.log(`❌ ${varName}: Missing`);
    hasAllRequired = false;
  }
});

console.log('\nOptional Environment Variables:');
optionalEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: Set`);
  } else {
    console.log(`⚠️  ${varName}: Not set (optional)`);
  }
});

if (!hasAllRequired) {
  console.log('\n❌ Missing required environment variables!');
  console.log('Please check your .env.local file and ensure all required variables are set.');
  process.exit(1);
} else {
  console.log('\n✅ All required environment variables are set!');
}