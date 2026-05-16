const fs = require('fs');
const path = require('path');

const languages = ['.', 'uz', 'tr', 'ru', 'es', 'de', 'ar'];

for (const lang of languages) {
  const file = path.join(__dirname, 'src', lang, 'tour.md');
  if (!fs.existsSync(file)) {
    console.log(`Skipping ${file}`);
    continue;
  }

  let content = fs.readFileSync(file, 'utf8');

  // Remove Fumadocs imports if they exist
  content = content.replace(/^import\s+.*from\s+['"]fumadocs-ui.*['"];?\n?/gm, '');

  const blocks = content.split('\n\n');
  const newBlocks = blocks.map(block => {
    const lines = block.split('\n');
    
    // Check if every line in the block is a list item (allowing leading whitespace)
    const isList = lines.every(line => /^\s*-\s+\[/.test(line));
    
    if (isList && lines.length > 0) {
      let cardStr = '<Cards>\n';
      // Capture lines regardless of leading spaces
      const itemRegex = /^\s*-\s+\[(?:\*\*)?([^*\]]+)(?:\*\*)?\]\(([^)]+)\)[:\-]?\s*(.+)$/;
      for (const line of lines) {
        const match = line.match(itemRegex);
        if (match) {
          const title = match[1].trim();
          const href = match[2].trim();
          let desc = match[3].trim();
          desc = desc.replace(/"/g, '&quot;');
          cardStr += `  <Card\n    title="${title}"\n    description="${desc}"\n    href="${href}"\n  />\n`;
        } else {
          // If a line doesn't match the list pattern, return the original block to be safe
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
