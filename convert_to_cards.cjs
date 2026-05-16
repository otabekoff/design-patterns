const fs = require('fs');
const path = require('path');

const languages = ['.', 'uz', 'tr', 'ru', 'es', 'de', 'ar'];

for (const lang of languages) {
  const file = path.join(__dirname, lang, 'introduction.md');
  if (!fs.existsSync(file)) {
    console.log(`Skipping ${file}`);
    continue;
  }

  let content = fs.readFileSync(file, 'utf8');

  // Remove Fumadocs imports if they exist
  content = content.replace(/^import\s+.*from\s+['"]fumadocs-ui.*['"];?\n?/gm, '');

  const blocks = content.split('\n\n');
  const newBlocks = blocks.map(block => {
    // We trim each line before testing because of potential nested formatting issues
    const lines = block.split('\n');
    const isList = lines.every(line => /^\s*-\s+\[\*\*/.test(line));
    
    if (isList && lines.length > 0) {
      let cardStr = '<Cards>\n';
      const itemRegex = /^\s*-\s+\[\*\*([^*]+)\*\*\]\(([^)]+)\)[:\-]?\s*(.+)$/;
      for (const line of lines) {
        const match = line.match(itemRegex);
        if (match) {
          const title = match[1].trim();
          const href = match[2].trim();
          let desc = match[3].trim();
          desc = desc.replace(/"/g, '&quot;');
          cardStr += `  <Card\n    title="${title}"\n    description="${desc}"\n    href="${href}"\n  />\n`;
        } else {
          return block; 
        }
      }
      cardStr += '</Cards>';
      return cardStr;
    }
    return block;
  });

  fs.writeFileSync(file, newBlocks.join('\n\n') + '\n');
  console.log(`Updated ${file}`);
}
