// Genera los archivos finales del folleto en la carpeta exportados/:
//   IPD-folleto.html            una sola página HTML con estilos y fuentes incluidos
//   IPD-folleto-imprenta.pdf    2 páginas de 303 × 216 mm (A4 apaisado + 3 mm de sangrado)
//   IPD-folleto-digital.pdf     6 páginas de 100 × 210 mm en orden de lectura
//   vista-exterior.png / vista-interior.png   vistas previas al corte final
// Uso: npm install && npm run exportar
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { PDFDocument } = require('pdf-lib');

const MM = 72 / 25.4;

// Agrega título, autor e idioma; en el PDF de imprenta marca además la línea de corte (TrimBox)
// y el sangrado (BleedBox) para que la imprenta sepa dónde cortar.
async function completarPdf(archivo, { sangradoMm = 0 } = {}) {
  const pdf = await PDFDocument.load(fs.readFileSync(archivo));
  pdf.setTitle('IPD · Salud mental · Tu bienestar tiene equipo');
  pdf.setAuthor('Instituto Psicopedagógico de Durazno');
  pdf.setSubject('Folleto tríptico para el Mes de la Salud Mental');
  pdf.setLanguage('es-UY');
  if (sangradoMm) {
    const s = sangradoMm * MM;
    for (const hoja of pdf.getPages()) {
      const { width, height } = hoja.getSize();
      hoja.setBleedBox(0, 0, width, height);
      hoja.setTrimBox(s, s, width - 2 * s, height - 2 * s);
    }
  }
  fs.writeFileSync(archivo, await pdf.save());
}

const raiz = __dirname;
const salida = path.join(raiz, 'exportados');
fs.mkdirSync(salida, { recursive: true });

function fuenteEnLinea(_, archivo) {
  const datos = fs.readFileSync(path.join(raiz, archivo)).toString('base64');
  return `url("data:font/woff2;base64,${datos}")`;
}

const css = fs
  .readFileSync(path.join(raiz, 'estilos.css'), 'utf8')
  .replace(/url\("(fuentes\/[^"]+\.woff2)"\)/g, fuenteEnLinea);
const html = fs
  .readFileSync(path.join(raiz, 'index.html'), 'utf8')
  .replace('<link rel="stylesheet" href="estilos.css">', () => `<style>\n${css}</style>`);
const htmlFinal = path.join(salida, 'IPD-folleto.html');
fs.writeFileSync(htmlFinal, html);

(async () => {
  const navegador = await chromium.launch();
  const pagina = await navegador.newPage({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: 2 });
  const url = 'file://' + htmlFinal;

  await pagina.goto(url);
  await pagina.evaluate(() => window.folletoListo);
  const pdfImprenta = path.join(salida, 'IPD-folleto-imprenta.pdf');
  await pagina.pdf({ path: pdfImprenta, printBackground: true, preferCSSPageSize: true });
  await completarPdf(pdfImprenta, { sangradoMm: 3 });
  const sangrado = 3 * 96 / 25.4;
  for (const [cara, selector] of [['exterior', '.hoja--exterior'], ['interior', '.hoja--interior']]) {
    const caja = await pagina.locator(selector).boundingBox();
    await pagina.screenshot({
      path: path.join(salida, `vista-${cara}.png`),
      clip: { x: caja.x + sangrado, y: caja.y + sangrado, width: caja.width - 2 * sangrado, height: caja.height - 2 * sangrado },
      fullPage: true,
    });
  }

  await pagina.goto(url + '?vista=lectura');
  await pagina.addStyleTag({ content: '@page { size: 100mm 210mm; margin: 0; }' });
  await pagina.evaluate(() => window.folletoListo);
  const pdfDigital = path.join(salida, 'IPD-folleto-digital.pdf');
  await pagina.pdf({ path: pdfDigital, printBackground: true, preferCSSPageSize: true });
  await completarPdf(pdfDigital);

  await navegador.close();
  console.log('Listo: ' + fs.readdirSync(salida).join(', '));
})();
