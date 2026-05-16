const fs = require('fs');
const path = require('path');

const translations = {
  en: "Edit this page on GitHub",
  uz: "Ushbu sahifani GitHub-da tahrirlash",
  tr: "Bu sayfayı GitHub'da düzenleyin",
  ru: "Редактировать эту страницу на GitHub",
  es: "Editar esta página en GitHub",
  de: "Diese Seite auf GitHub bearbeiten",
  ar: "تعديل هذه الصفحة على GitHub"
};

for (const lang of Object.keys(translations)) {
  const filePath = path.join(__dirname, '.vitepress/config/langs', `${lang}.ts`);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  const text = translations[lang];
  const editLinkConfig = `    editLink: {\n      pattern: 'https://github.com/otabekoff/design-patterns/edit/main/:path',\n      text: '${text}'\n    },`;

  if (!content.includes('editLink:')) {
    content = content.replace(/themeConfig:\s*\{/, `themeConfig: {\n${editLinkConfig}`);
    fs.writeFileSync(filePath, content);
    console.log(`Updated editLink for ${lang}`);
  }
}
