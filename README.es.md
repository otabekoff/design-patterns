# Patrones de diseño

Languages: [English](README.md) | [Oʻzbek](README.uz.md) | [Русский](README.ru.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Deutsch](README.de.md) | [Español](README.es.md)

Una referencia completa y con búsqueda de patrones de diseño de software — creacionales, estructurales, de comportamiento y arquitectónicos — con diagramas y ejemplos en paralelo en TypeScript, Python, Java, Go y Rust.

**Sitio en vivo:** https://otabekoff.github.io/design-patterns/

## Características

- 41 patrones, cada uno con una analogía, un diagrama de estructura en Mermaid, implementaciones en cinco lenguajes, errores comunes y preguntas de entrevista
- Una guía de decisión "Elegir un patrón" y páginas de comparación lado a lado (Strategy vs State, Decorator vs Proxy, …)
- Ediciones en inglés y uzbeko
- Búsqueda local de texto completo, temas claro/oscuro y preferencia de lenguaje de código recordada entre páginas
- Acciones "Copy Markdown" y "Open in ChatGPT / Claude" en cada página

## Stack tecnológico

[VitePress](https://vitepress.dev) (Vue 3 + Vite), Mermaid, iconos de Lucide, desplegado en GitHub Pages. Se usa [Bun](https://bun.sh) como gestor de paquetes y ejecutor de scripts.

## Inicio rápido

```bash
bun install
bun run dev        # http://localhost:5173/design-patterns/
```

## Scripts

| Comando | Qué hace |
| --- | --- |
| `bun run dev` | Inicia el servidor de desarrollo |
| `bun run build` | Genera el sitio estático en `.vitepress/dist` (falla si hay enlaces rotos) |
| `bun run preview` | Sirve localmente la build de producción |
| `bun run check` | Ejecuta todas las comprobaciones de contenido de abajo |
| `bun run check:mermaid` | Analiza cada diagrama de Mermaid |
| `bun run check:code` | Comprueba la sintaxis de cada ejemplo de código (TS/JS con esbuild, Python, Java, Go, Rust — se omiten las toolchains no instaladas) |
| `bun run check:i18n` | Compara cada página en inglés con su traducción al uzbeko (páginas faltantes, diferencias en código/diagramas) |
| `bun run images` | Recodifica las imágenes de portada/tarjeta a WebP y regenera las imágenes para redes sociales (requiere Python + Pillow) |

## Estructura del proyecto

```
src/                     # Contenido (inglés en la raíz)
  creational/ structural/ behavioral/ architectural/
  comparisons/           # Páginas de comparación entre patrones
  uz/                    # Traducción al uzbeko, con las mismas rutas
public/                  # Recursos estáticos: covers/, cards/, og/ (imágenes para redes sociales), iconos
.vitepress/
  config/                # Configuración del sitio, nav/sidebar por idioma (langs/), plugins de markdown
  theme/                 # Personalizaciones del tema y componentes Vue (CoverImage, Card, Mermaid, …)
scripts/                 # Comprobaciones de contenido y pipeline de imágenes
```

## Escribir contenido

- Cada página empieza con frontmatter: `title`, `description` e `icon` (un nombre de icono de [Lucide](https://lucide.dev/icons) en PascalCase, que se muestra en la barra lateral).
- Agrupa las implementaciones con `::: code-group` y etiqueta las pestañas por lenguaje, p. ej. ` ```python [Python] `.
- Los diagramas van en bloques ` ```mermaid `.
- Añade las páginas nuevas a la barra lateral en `.vitepress/config/langs/en.ts` y `uz.ts`.
- Las traducciones están en la misma ruta bajo `src/uz/`; mantén los bloques de código idénticos al inglés (los comentarios se pueden traducir) y ejecuta `bun run check:i18n`.

## Apoyo

Si este proyecto te resulta útil, considera apoyarlo: https://taps.uz/uzhandy

## Contribuir

Las contribuciones son bienvenidas — abre un issue o un pull request. Ejecuta `bun run check` y `bun run build` antes de enviarlo.

## Licencia

[MIT](LICENSE) © 2025-present Otabek Sadiridinov
