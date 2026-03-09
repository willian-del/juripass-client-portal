#!/usr/bin/env node

/**
 * Script to automatically generate routes for react-snap prerendering
 * Extracts blog routes from blog-data.ts and combines with static routes
 */

const fs = require('fs');
const path = require('path');

// Static routes that should always be prerendered
const staticRoutes = [
  "/",
  "/como-funciona",
  "/para-quem",
  "/faq", 
  "/nr-01",
  "/para-seus-colaboradores",
  "/gestao-riscos-psicossociais-nr01",
  "/nr01-riscos-psicossociais",
  "/gestao-riscos-humanos-rh",
  "/blog"
];

/**
 * Extract blog slugs from blog-data.ts file
 */
function extractBlogRoutes() {
  try {
    const blogDataPath = path.join(__dirname, '../src/lib/blog-data.ts');
    const content = fs.readFileSync(blogDataPath, 'utf8');
    
    // Extract slugs using regex
    const slugMatches = content.match(/slug:\s*['"]([^'"]+)['"]/g);
    
    if (!slugMatches) {
      console.warn('No blog slugs found in blog-data.ts');
      return [];
    }
    
    const blogRoutes = slugMatches.map(match => {
      const slug = match.match(/slug:\s*['"]([^'"]+)['"]/)[1];
      return `/blog/${slug}`;
    });
    
    return blogRoutes;
  } catch (error) {
    console.error('Error reading blog-data.ts:', error.message);
    return [];
  }
}

/**
 * Generate complete list of routes for prerendering
 */
function generateRoutes() {
  const blogRoutes = extractBlogRoutes();
  const allRoutes = [...staticRoutes, ...blogRoutes];
  
  console.log('Generated routes for prerendering:');
  console.log(JSON.stringify(allRoutes, null, 2));
  
  return allRoutes;
}

/**
 * Update package.json with generated routes
 */
function updatePackageJson() {
  try {
    const packageJsonPath = path.join(__dirname, '../package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    const routes = generateRoutes();
    
    if (!packageJson.reactSnap) {
      packageJson.reactSnap = {};
    }
    
    packageJson.reactSnap.include = routes;
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('\n✅ Updated package.json with generated routes');
    console.log(`📊 Total routes: ${routes.length}`);
    
  } catch (error) {
    console.error('Error updating package.json:', error.message);
    process.exit(1);
  }
}

// Main execution
if (require.main === module) {
  console.log('🚀 Generating routes for react-snap prerendering...\n');
  
  if (process.argv.includes('--update')) {
    updatePackageJson();
  } else {
    generateRoutes();
    console.log('\n💡 Run with --update flag to automatically update package.json');
  }
}

module.exports = {
  generateRoutes,
  extractBlogRoutes,
  staticRoutes
};