import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import net from 'node:net';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const astroBin = path.join(projectRoot, 'node_modules/astro/bin/astro.mjs');

const locales = [
  { lang: 'es', file: 'cv-jaime-lerga.pdf' },
  { lang: 'en', file: 'cv-jaime-lerga-en.pdf' },
];

const port = await getFreePort();
const baseUrl = `http://127.0.0.1:${port}`;

const server = spawn(process.execPath, [astroBin, 'dev', '--host', '127.0.0.1', '--port', String(port)], {
  cwd: projectRoot,
  stdio: 'inherit',
});

let browser;
let exitCode = 1;

try {
  await waitForServer(baseUrl, 30000);

  browser = await chromium.launch();

  for (const { lang, file } of locales) {
    const page = await browser.newPage();
    const response = await page.goto(`${baseUrl}/${lang}/cv/`, { waitUntil: 'networkidle', timeout: 60000 });
    if (!response || !response.ok()) {
      throw new Error(`GET /${lang}/cv/ failed with ${response?.status()}`);
    }
    await page.evaluate(() => document.fonts.ready);

    const outputPath = path.join(projectRoot, 'public', file);
    await page.pdf({ path: outputPath, preferCSSPageSize: true, printBackground: true });

    const size = fs.statSync(outputPath).size;
    console.log(`PDF generated: ${file} (${(size / 1024).toFixed(0)} KB)`);
    await page.close();
  }

  exitCode = 0;
} catch (err) {
  console.error(`Failed to generate CV PDFs: ${err.message}`);
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  server.kill('SIGTERM');
}

process.exit(exitCode);

async function waitForServer(url, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // server not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Server did not respond at ${url} within ${timeoutMs}ms`);
}

async function getFreePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.listen(0, '127.0.0.1', () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
    srv.on('error', reject);
  });
}
