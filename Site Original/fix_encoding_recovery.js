const fs = require('fs');
const path = 'App.tsx';

try {
    let content = fs.readFileSync(path, 'utf8');
    let originalLength = content.length;

    // Map of corrupted sequences to correct characters
    const replacements = [
        { s: 'Ã§', r: 'ç' },
        { s: 'Ã£', r: 'ã' },
        { s: 'Ã¡', r: 'á' },
        { s: 'Ã©', r: 'é' },
        { s: 'Ãª', r: 'ê' },
        { s: 'Ã³', r: 'ó' },
        { s: 'Ãµ', r: 'õ' },
        { s: 'Ãº', r: 'ú' },
        { s: 'Ã­', r: 'í' },
        { s: 'Ã¢', r: 'â' },
        { s: 'Ã ', r: 'à' },
        { s: 'Ã€', r: 'À' },
        // Specific words to ensure correctness
        { s: 'Ã cones', r: 'Ícones' },
        { s: 'Ã rea', r: 'Área' },
        { s: 'NÃºcleo', r: 'Núcleo' },
        { s: 'FricÃ§Ã£o', r: 'Fricção' },
        { s: 'ConversÃ£o', r: 'Conversão' },
        { s: 'InformaÃ§Ãµes', r: 'Informações' },
        { s: 'InstalaÃ§Ã£o', r: 'Instalação' },
        { s: 'NegÃ³cio', r: 'Negócio' },
        { s: 'SeguranÃ§a', r: 'Segurança' },
        { s: 'SEGURANÃ‡A', r: 'SEGURANÇA' },
        { s: 'rÃ¡pida', r: 'rápida' },
        { s: 'prÃ³pria', r: 'própria' },
        { s: 'prÃ³prio', r: 'próprio' },
        { s: 'mÃ©dio', r: 'médio' },
        { s: 'vÃª', r: 'vê' },
        { s: 'vocÃª', r: 'você' },
        { s: 'trÃ¡fego', r: 'tráfego' }
    ];

    // Apply replacements iteratively
    replacements.forEach(({ s, r }) => {
        // Escaping special regex characters for global replace
        const regex = new RegExp(s, 'g');
        content = content.replace(regex, r);
    });

    // Targeted fixes for any remaining tricky patterns
    content = content.replace(/Ã \s*experiência/g, 'à experiência');
    content = content.replace(/\/\/ .*cones/g, '// Ícones');
    content = content.replace(/title: ".*rea de Membros/g, 'title: "Área de Membros');

    fs.writeFileSync(path, content, 'utf8');
    console.log(`Successfully processed ${path}. Length: ${content.length} (was ${originalLength})`);

} catch (e) {
    console.error('Error fixing encoding:', e);
    process.exit(1);
}
