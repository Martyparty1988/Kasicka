// Simple SVG icon generator for the Minibar App
// This script creates SVG icons for the PWA

const fs = require('fs');
const path = require('path');

// Function to create SVG icon
function createSvgIcon(size, color = '#1976d2') {
  const halfSize = size / 2;
  const quarterSize = size / 4;
  const strokeWidth = size / 25;
  
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" fill="white" rx="${size/10}" />
    <rect x="${quarterSize}" y="${quarterSize}" width="${halfSize}" height="${halfSize}" fill="${color}" rx="${size/20}" />
    <path d="M${quarterSize} ${halfSize} L${size-quarterSize} ${halfSize}" stroke="white" stroke-width="${strokeWidth}" />
    <path d="M${halfSize} ${quarterSize} L${halfSize} ${size-quarterSize}" stroke="white" stroke-width="${strokeWidth}" />
    <circle cx="${halfSize}" cy="${halfSize}" r="${quarterSize-strokeWidth}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" />
  </svg>`;
}

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate icons in different sizes
const sizes = [16, 32, 64, 128, 192, 512];
sizes.forEach(size => {
  const iconContent = createSvgIcon(size);
  fs.writeFileSync(path.join(iconsDir, `icon-${size}x${size}.svg`), iconContent);
  console.log(`Created icon-${size}x${size}.svg`);
});

// Create favicon.ico placeholder
console.log('Note: For a production app, convert the 16x16, 32x32, and 64x64 SVGs to .ico format');
