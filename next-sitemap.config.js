// next-sitemap.config.js
const fs = require('fs');
const path = require('path');

module.exports = {
  siteUrl: "https://annaelisejohnson.com",
  exclude: [],
  generateRobotsTxt: true,
  async additionalPaths(config) {
    // Return empty array, but use this hook to sort the sitemap after generation
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap-0.xml');
    
    // Use a setTimeout to allow the sitemap to be written first
    setTimeout(() => {
      if (fs.existsSync(sitemapPath)) {
        const content = fs.readFileSync(sitemapPath, 'utf-8');
        
        // Parse and sort URLs
        const urlRegex = /<url>[\s\S]*?<\/url>/g;
        const urls = content.match(urlRegex) || [];
        
        // Sort URLs alphabetically by their loc value
        urls.sort((a, b) => {
          const locA = a.match(/<loc>(.*?)<\/loc>/)?.[1] || '';
          const locB = b.match(/<loc>(.*?)<\/loc>/)?.[1] || '';
          return locA.localeCompare(locB);
        });
        
        // Reconstruct the sitemap with sorted URLs
        const header = content.substring(0, content.indexOf('<url>'));
        const footer = content.substring(content.lastIndexOf('</url>') + 6);
        const sortedContent = header + urls.join('\n') + footer;
        
        fs.writeFileSync(sitemapPath, sortedContent);
        console.log('✓ Sitemap sorted alphabetically');
      }
    }, 1000);
    
    return [];
  },
};
