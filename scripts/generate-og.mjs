import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const fontsDir = path.join(__dirname, 'fonts');

const profile = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/profile/main.json'), 'utf-8'),
);

function stripMarkdown(text) {
  return text.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1').replace(/__(.+?)__/g, '$1');
}

const role = profile.role.es;
const tagline = stripMarkdown(profile.tagline.es);

function h(type, props, ...children) {
  const flat = children.flat(Infinity).filter(c => c != null && c !== false && c !== true);
  const c = flat.length === 1 ? flat[0] : flat;
  const style = { ...props.style };
  return { type, props: { ...props, style, children: c } };
}

const svg = await satori(
  h('div', {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0f172a',
      fontFamily: 'Inter',
      padding: '64px',
    },
  },
    h('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '48px',
      },
    },
      h('div', {
        style: {
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          backgroundColor: '#818cf8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        },
      },
        h('span', {
          style: {
            fontSize: '56px',
            fontWeight: 700,
            color: '#1e1b4b',
            lineHeight: 1,
          },
        }, 'JL'),
      ),
      h('div', {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        },
      },
        h('div', {
          style: {
            fontSize: '48px',
            fontWeight: 600,
            color: '#f1f5f9',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          },
        }, profile.name),
        h('div', {
          style: {
            fontSize: '26px',
            fontWeight: 500,
            color: '#cbd5e1',
            lineHeight: 1.3,
          },
        }, role),
        h('div', {
          style: {
            fontSize: '20px',
            fontWeight: 400,
            color: '#94a3b8',
            lineHeight: 1.4,
            maxWidth: '620px',
          },
        }, tagline),
      ),
    ),
  ),
  {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Inter', data: fs.readFileSync(path.join(fontsDir, 'Inter-400.ttf')), weight: 400, style: 'normal' },
      { name: 'Inter', data: fs.readFileSync(path.join(fontsDir, 'Inter-500.ttf')), weight: 500, style: 'normal' },
      { name: 'Inter', data: fs.readFileSync(path.join(fontsDir, 'Inter-600.ttf')), weight: 600, style: 'normal' },
      { name: 'Inter', data: fs.readFileSync(path.join(fontsDir, 'Inter-700.ttf')), weight: 700, style: 'normal' },
    ],
  },
);

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
});
const pngBuffer = resvg.render().asPng();

const jpgBuffer = await sharp(pngBuffer).jpeg({ quality: 95 }).toBuffer();

const outputPath = path.join(__dirname, '../public/og.jpg');
fs.writeFileSync(outputPath, jpgBuffer);
console.log(`OG image generated: ${outputPath} (${(jpgBuffer.length / 1024).toFixed(0)} KB)`);
