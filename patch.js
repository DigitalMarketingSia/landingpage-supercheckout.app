const fs = require('fs');
const path = 'c:\\Users\\Jean\\Desktop\\landing-V2-super-checkout-.app\\App.tsx';
let content = fs.readFileSync(path, 'utf8');

// Reduce heights
content = content.replace(/style=\{\{\s*height:\s*"220vh"\s*\}\}/g, 'style={{ height: "150vh" }}');
content = content.replace(/style=\{\{\s*height:\s*"250vh"\s*\}\}/g, 'style={{ height: "150vh" }}');
content = content.replace(/style=\{\{\s*height:\s*"300vh"\s*\}\}/g, 'style={{ height: "150vh" }}');

// Update max-w classes to give 80% look and feel and add some padding on desktop
content = content.replace(/max-w-7xl/g, 'max-w-6xl xl:px-12');

// We also want to remove the sidebar [0, 1, 2] from section 7.
// The sidebar is located near the text "Left Sidebar Dots Vertical Indicator"
// Let's use a regex to match the sidebar div and comment it out or remove it.
content = content.replace(/\{\/\* Left Sidebar Dots Vertical Indicator \*\/\}([\s\S]*?)<\/div>\s*<\/div>\s*\{\/\* Left Side:/, '{/* Left Sidebar Dots Vertical Indicator Removed */} \n {/* Left Side:');

fs.writeFileSync(path, content, 'utf8');
console.log('Patch complete.');
