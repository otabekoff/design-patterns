import fs from 'fs'
import path from 'path'
import * as lucide from 'lucide'

function getSvgString(iconName: string) {
  // Try to find the icon in lucide
  const children = (lucide.icons as any)[iconName];
  if (!children) return '';
  
  const childTags = children.map((child: any) => {
    const [tag, attrs] = child;
    const attrString = Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ');
    return `<${tag} ${attrString}></${tag}>`;
  }).join('');
  
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; margin-right: 6px; margin-bottom: -3px; color: inherit;">${childTags}</svg>`;
}

const iconCache: Record<string, string> = {};

function getIconForLink(link: string): string {
  if (!link) return '';
  
  // Strip off root language prefix (e.g. /uz/structural/adapter -> /structural/adapter)
  // because the source of truth for icons is the root English markdown files
  const rootLink = link.replace(/^\/(uz|ru|tr|de|es|ar)\//, '/');
  
  if (iconCache[rootLink] !== undefined) {
    return iconCache[rootLink];
  }
  
  try {
    const filePath = path.join(process.cwd(), `${rootLink}.md`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const match = content.match(/^icon:\s*(.+)$/m);
      if (match) {
        const iconName = match[1].trim();
        const svg = getSvgString(iconName);
        iconCache[rootLink] = svg;
        return svg;
      }
    }
  } catch (e) {
    console.error('Error reading icon for', link, e);
  }
  
  iconCache[rootLink] = '';
  return '';
}

export function injectSidebarIcons(sidebar: any[]): any[] {
  return sidebar.map(section => {
    if (section.items) {
      return {
        ...section,
        items: section.items.map((item: any) => {
          if (item.link) {
            const svg = getIconForLink(item.link);
            if (svg && !item.text.includes('<svg')) {
              return { ...item, text: `${svg}${item.text}` };
            }
          }
          return item;
        })
      }
    }
    return section;
  });
}
