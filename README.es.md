# Documentación de Patrones de Diseño

Languages: [English](README.md) | [Oʻzbek](README.uz.md) | [Русский](README.ru.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Deutsch](README.de.md) | [Español](README.es.md)

Un sitio de documentación moderno, rápido y con búsqueda para patrones de diseño de software. Construido con TanStack Start y Fumadocs, ofrece una experiencia de lectura clara para patrones creacionales, estructurales, de comportamiento y arquitectónicos.

## Características

- Diseño limpio y fácil de leer
- Navegación rápida y búsqueda de texto completo
- Contenido MDX en `content/docs`
- UI adaptable optimizada para lectura
- Rutas de docs y árbol de páginas integrados

## Stack tecnológico

- **TanStack Start**
- **Fumadocs UI + Core**
- **React**
- **Vite**
- **Tailwind CSS**

## Inicio rápido

Instala dependencias:

```bash
npm install
# or
pnpm install
# or
yarn
```

Inicia el servidor de desarrollo:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

## Scripts útiles

```bash
npm run dev        # Iniciar dev server
npm run build      # Compilar para producción
npm run preview    # Previsualizar build de producción
npm run types:check
npm run lint
```

## Estructura del proyecto

```
content/docs/        # Contenido de documentación (MDX)
src/routes/          # Rutas (home, docs, api)
src/lib/             # Configuración y helpers compartidos
src/components/      # Componentes UI
src/styles/          # Estilos globales
```

## Configuración

- **Nombre del sitio**: actualiza `src/lib/shared.ts`
- **Enlaces del navbar**: actualiza `src/lib/layout.shared.tsx`
- **Contenido docs**: añade o edita archivos en `content/docs`

## Soporte

Si este proyecto te resulta útil, apóyalo:

- https://tirikchilik.uz/uzhandy

## Contribuir

Las contribuciones son bienvenidas. Abre un issue o PR con tus cambios.

## Licencia

Este proyecto está bajo la licencia MIT.
