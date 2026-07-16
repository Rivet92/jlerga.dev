# jlerga.dev

Landing personal de portfolio/CV de Jaime Lerga Marquina, construida con Astro + Tailwind CSS v4 y desplegada en GitHub Pages bajo el dominio `jlerga.dev`.

## Desarrollo

```bash
pnpm install      # instalar dependencias
pnpm run dev     # servidor de desarrollo (http://localhost:4321)
pnpm run build   # generar build estático en dist/
pnpm run preview # previsualizar el build
pnpm run check   # typecheck de componentes .astro
```

## OG Image

La imagen de OpenGraph se genera automáticamente en cada build con `scripts/generate-og.mjs` usando [Satori](https://github.com/vercel/satori) + `@resvg/resvg-js` + `sharp`. Replica el diseño del componente Hero con las fuentes y colores del tema oscuro.

```bash
pnpm run generate:og   # regenerar manualmente public/og.jpg
```

Los pesos de Inter necesarios están en `scripts/fonts/` (extraídos de la colección del sistema).

## Markdown inline

Los textos de los contenidos (tagline, about, experiencias, educación, proyectos) soportan formato markdown inline:

- `**negrita**` → negrita
- `*cursiva*` → cursiva
- `__subrayado__` → subrayado

Está implementado en `src/utils/markdown.ts` con las funciones `inlineMarkdown()` (convierte a HTML) y `stripMarkdown()` (limpia el markup para la OG image).

## CV PDF

El PDF del CV está en `public/cv-jaime-lerga.pdf`. Para actualizarlo:

```bash
# Reemplazar public/cv-jaime-lerga.pdf y hacer commit
```

## Despliegue

El workflow `.github/workflows/deploy.yml` compila y publica automáticamente en GitHub Pages al hacer push a `main`.

### Pasos manuales (una sola vez)

1. Crear el repositorio `Rivet92/jlerga.dev` y subir este código a la rama `main`.
2. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Añadir los registros DNS del dominio `jlerga.dev`:
   ```
   @ A 185.199.108.153
   @ A 185.199.109.153
   @ A 185.199.110.153
   @ A 185.199.111.153
   ```
4. En **Settings → Pages → Custom domain** introducir `jlerga.dev` y activar **Enforce HTTPS**.
5. Esperar a que el workflow se ejecute en verde y el certificado SSL se emita (puede tardar unos minutos).

Ver `../PLAN/05-fase-4-deploy-github-pages.md` para más detalle.