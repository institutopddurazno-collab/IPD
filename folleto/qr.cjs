// Regenera el código QR de la contraportada.
// Uso: npm run qr -- "https://www.instagram.com/ipd_durazno/"
// Después, volver a exportar con: npm run exportar
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const destino = process.argv[2];
if (!destino) {
  console.error('Falta la dirección. Ejemplo: npm run qr -- "https://www.instagram.com/ipd_durazno/"');
  process.exit(1);
}

const archivo = path.join(__dirname, 'index.html');
const html = fs.readFileSync(archivo, 'utf8');
const inicio = '<!-- QR:inicio -->';
const fin = '<!-- QR:fin -->';
if (!html.includes(inicio) || !html.includes(fin)) {
  console.error('No encontré las marcas del QR en index.html.');
  process.exit(1);
}

QRCode.toString(destino, { type: 'svg', errorCorrectionLevel: 'M', margin: 0, color: { light: '#0000' } }, (error, svg) => {
  if (error) throw error;
  const caja = svg.match(/viewBox="([^"]+)"/)[1];
  const trazo = svg.match(/<path[^>]*\sstroke="[^"]*"[^>]*\sd="([^"]+)"/)[1];
  const nuevo =
    `${inicio}\n          <svg viewBox="${caja}" shape-rendering="crispEdges" role="img" aria-label="Código QR al Instagram del IPD">` +
    `<path fill="none" stroke="currentColor" d="${trazo}"/></svg>\n          ${fin}`;
  const antes = html.slice(0, html.indexOf(inicio));
  const despues = html.slice(html.indexOf(fin) + fin.length);
  fs.writeFileSync(archivo, antes + nuevo + despues);
  console.log('QR actualizado: ' + destino);
});
