const fs = require('fs');
const content = fs.readFileSync('App.tsx', 'utf8');

const lines = content.split('\n');
lines.forEach((line, i) => {
    if (line.match(/[Ãâ]/)) {
        console.log(`Line ${i + 1}: ${line.trim()}`);
    }
});
