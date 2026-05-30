const ts = require('typescript');
const fs = require('fs');
const path = require('path');

const fileName = path.join(__dirname, 'App.tsx');
const fileContent = fs.readFileSync(fileName, 'utf8');

const sourceFile = ts.createSourceFile(
  fileName,
  fileContent,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX
);

console.log("Checking diagnostics...");
// Get syntactic diagnostics
const diagnostics = sourceFile.parseDiagnostics || [];
if (diagnostics.length === 0) {
  console.log("No syntax errors found by TypeScript compiler!");
} else {
  console.log(`Found ${diagnostics.length} syntax errors:`);
  diagnostics.forEach((diag, idx) => {
    const { line, character } = sourceFile.getLineAndCharacterOfPosition(diag.start);
    let message = diag.messageText;
    if (typeof message !== 'string') {
      message = JSON.stringify(message);
    }
    console.log(`[Error ${idx + 1}] Line ${line + 1}, Col ${character + 1}: TS${diag.code} - ${message}`);
    
    // Print a few lines around the error
    const lines = fileContent.split('\n');
    const startLine = Math.max(0, line - 3);
    const endLine = Math.min(lines.length - 1, line + 3);
    console.log("--- Snippet ---");
    for (let l = startLine; l <= endLine; l++) {
      const isErrorLine = l === line;
      console.log(`${isErrorLine ? '->' : '  '} ${String(l + 1).padStart(5)}: ${lines[l]}`);
    }
    console.log("----------------\n");
  });
}
