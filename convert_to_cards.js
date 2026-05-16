const fs = require('fs');
const glob = require('glob');

const files = glob.sync('**/introduction.md', { ignore: ['node_modules/**'] });

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Remove Fumadocs imports if they exist
  content = content.replace(/^import\s+.*from\s+['"]fumadocs-ui.*['"];?\n?/gm, '');

  // We want to match contiguous blocks of list items.
  // A list item looks like: `  - [**Title**](/href): Description` or `  - [**Title**](/href) - Description`
  // We can split the file by double newlines and process blocks that look like lists.
  
  const blocks = content.split('\n\n');
  const newBlocks = blocks.map(block => {
    // Check if the block consists entirely of list items
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
          // Fallback if regex fails, just keep the line (shouldn't happen)
          return block; 
        }
      }
      cardStr += '</Cards>';
      return cardStr;
    }
    return block;
  });

  fs.writeFileSync(file, newBlocks.join('\n\n') + '\n');
}

console.log('Done processing', files.length, 'files');
