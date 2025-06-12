const fs = require('fs');
const path = require('path');

// This script analyzes the Next.js build output to identify optimization opportunities

async function analyzeBundle() {
  console.log('🔍 Analyzing bundle size and performance...\n');
  
  // Check if .next directory exists
  const nextDir = path.join(process.cwd(), '.next');
  if (!fs.existsSync(nextDir)) {
    console.error('❌ No .next directory found. Please run "npm run build" first.');
    process.exit(1);
  }
  
  // Analyze build manifest
  const buildManifestPath = path.join(nextDir, 'build-manifest.json');
  if (fs.existsSync(buildManifestPath)) {
    const buildManifest = JSON.parse(fs.readFileSync(buildManifestPath, 'utf8'));
    console.log('📦 Pages in build:');
    Object.keys(buildManifest.pages).forEach(page => {
      console.log(`  - ${page}`);
    });
    console.log('');
  }
  
  // Check for large dependencies
  console.log('📊 Checking for optimization opportunities:\n');
  
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const dependencies = Object.keys(packageJson.dependencies);
  
  // Identify potentially large dependencies
  const largeDeps = {
    '@sendgrid/mail': 'Consider using dynamic imports for email functionality',
    'twilio': 'Consider moving to API route only, use dynamic imports',
    'react-phone-number-input': 'Check if tree-shaking is working properly',
  };
  
  dependencies.forEach(dep => {
    if (largeDeps[dep]) {
      console.log(`⚠️  ${dep}: ${largeDeps[dep]}`);
    }
  });
  
  console.log('\n💡 Optimization recommendations:');
  console.log('1. Implement dynamic imports for heavy components');
  console.log('2. Enable image optimization with next/image');
  console.log('3. Consider code splitting for form steps');
  console.log('4. Implement proper caching strategies');
  console.log('5. Use production builds for testing performance');
}

analyzeBundle();