const fs = require('fs');
const code = fs.readFileSync('c:\\Users\\Jean\\Desktop\\landing-V2-super-checkout-.app\\App.tsx', 'utf8');

const regex = /<(\/)?([a-zA-Z0-9.:_-]+)/g;
let match;
const stack = [];

const htmlTags = new Set([
  'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'section', 'footer', 'header',
  'svg', 'path', 'defs', 'linearGradient', 'stop', 'g', 'circle', 'button', 'a', 'b', 'i',
  'strong', 'em', 'img', 'br', 'hr', 'ul', 'li', 'ol', 'iframe', 'canvas', 'input', 'textarea',
  'select', 'option', 'form', 'label', 'motion.div', 'motion.button', 'motion.a', 'motion.path',
  'motion.circle', 'FAQ', 'HeroV2'
]);

while ((match = regex.exec(code)) !== null) {
  const isClosing = !!match[1];
  const tagName = match[2];
  const index = match.index;
  
  if (!htmlTags.has(tagName) && !/^[A-Z]/.test(tagName) && !tagName.startsWith('motion.')) {
    continue;
  }
  
  const before = code.slice(0, index);
  const line = before.split('\n').length;
  
  const lastLineOfBefore = before.split('\n').pop();
  if (lastLineOfBefore.includes('//') || lastLineOfBefore.includes('{/*')) {
    continue;
  }
  
  const rest = code.slice(index);
  const nextGreater = rest.indexOf('>');
  if (nextGreater !== -1) {
    const tagContent = rest.slice(0, nextGreater + 1);
    if (tagContent.trim().endsWith('/>')) {
      continue;
    }
  }
  
  if (isClosing) {
    if (stack.length === 0) {
      console.log(`Error: Closing tag </${tagName}> at line ${line} has no matching open tag!`);
    } else {
      let matchIdx = -1;
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].name === tagName) {
          matchIdx = i;
          break;
        }
      }
      
      if (matchIdx !== -1) {
        const unclosed = stack.splice(matchIdx);
        if (unclosed.length > 1) {
          console.log(`Mismatch/Unclosed inside <${tagName}> closed at line ${line}:`);
          for (let j = 1; j < unclosed.length; j++) {
            console.log(`  - Unclosed <${unclosed[j].name}> opened at line ${unclosed[j].line}`);
          }
        }
      } else {
        console.log(`Error: Closing tag </${tagName}> at line ${line} has no matching open tag in stack!`);
      }
    }
  } else {
    stack.push({ name: tagName, line });
  }
}

console.log("\nRemaining stack at end of file:");
stack.forEach(t => {
  console.log(`- <${t.name}> opened at line ${t.line}`);
});
