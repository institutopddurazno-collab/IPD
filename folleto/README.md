# Folleto IPD · Mes de la Salud Mental

Tríptico del Instituto Psicopedagógico de Durazno para el evento de Salud Mental. Sigue el estilo del folleto anterior del IPD: fondo blanco con manchas pastel, hojas, títulos en píldoras, íconos en círculos de color y olas al pie, con un relieve suave (degradados y sombras difusas) que le da volumen. El verde es el color principal porque es el color del mes este año, y el rosa, el turquesa y el azul vienen del logo.

## Archivos para usar

Están en `exportados/`:

| Archivo | Para qué sirve |
|---|---|
| `IPD-folleto-imprenta.pdf` | Mandar a la imprenta. Son 2 páginas (exterior e interior) de 303 × 216 mm: A4 apaisado más 3 mm de sangrado por lado, con la línea de corte marcada (TrimBox). |
| `IPD-folleto-digital.pdf` | Compartir por WhatsApp o mail. Son 6 páginas de 100 × 210 mm en orden de lectura. |
| `IPD-folleto.html` | El mismo folleto en un solo archivo, con estilos y fuentes incluidos. Se abre en cualquier navegador, también desde el celular. |
| `vista-exterior.png`, `vista-interior.png` | Vistas previas al corte final. |

## Qué dice cada panel

| Cara | Panel | Contenido |
|---|---|---|
| Exterior | Portada (derecha) | "Tu bienestar tiene equipo.", logo con el lazo verde y el sello de 33 años, "Salud mental" |
| Exterior | Solapa (izquierda, 97 mm) | "¿Cuándo consultar?": seis señales para reconocerse |
| Exterior | Contraportada (centro) | Dirección, teléfono, horario, Instagram y QR |
| Interior | Izquierdo | Quiénes somos y las cifras: 33 años, 25 años de talleres y 7 especialidades |
| Interior | Centro | Las 7 especialidades con íconos |
| Interior | Derecho (97 mm) | Cómo empezar: teléfono, convenios y el Árbol del Bienestar |

Al abrir la portada aparece la pregunta de la solapa, y al abrir la solapa aparecen las especialidades que la responden.

## Cómo editarlo

- El texto está en `index.html` y el diseño en `estilos.css`.
- En el navegador, `index.html` tiene dos vistas: **Hojas para imprenta** y **En orden de lectura**. La casilla **Guías de corte y pliegue** muestra el corte (magenta), los pliegues (celeste) y el área de contenido (violeta).
- Si `index.html` abierto desde una carpeta local no muestra las tipografías, usá `exportados/IPD-folleto.html`, que las trae incluidas.

Para regenerar los archivos de `exportados/` después de un cambio:

```bash
npm install
npx playwright install chromium   # solo la primera vez
npm run exportar
```

Para cambiar la dirección del QR (por ejemplo, a un QR dinámico):

```bash
npm run qr -- "https://www.instagram.com/ipd_durazno/"
npm run exportar
```

## Checklist de la guía

**Hecho**

- Un solo objetivo: que la persona llame o se acerque al instituto. El teléfono aparece en la solapa interior, en el interior derecho y en la contraportada.
- El titular de la portada comunica un beneficio, y cada especialidad lleva una línea que explica para qué sirve.
- Hay datos concretos como prueba: 33 años, 25 años de talleres, 7 especialidades y 5 convenios.
- Tríptico con la solapa 3 mm más angosta (97 / 100 / 100 mm) y un solo foco por panel.
- Dos familias tipográficas: Outfit, geométrica y moderna, para títulos y texto, y Caveat, manuscrita, solo para la frase de la portada.
- El texto corrido va de 10,5 a 12,5 pt y nada baja de 7,5 pt. No hay texto sobre fotos y todo está alineado a la izquierda.
- Margen duplicado junto a cada pliegue (8 mm por lado) y el contenido a 9 mm o más del corte.
- 3 mm de sangrado y fuentes incrustadas en el PDF (TrueType).
- QR de unos 28 mm con un texto al lado. Se probó leyéndolo desde la imagen exportada.
- No hay precios ni ofertas, así que no aplica la parte de la Ley 17.250 sobre condiciones.

**Queda para la imprenta o el IPD**

- **Color:** el PDF está en RGB. Si la imprenta pide CMYK o PDF/X-1a, que lo convierta con su perfil de color, y pedirle una prueba impresa para revisar los verdes.
- **Sombras:** las sombras suaves del relieve usan transparencias, que el PDF guarda como máscaras a 300 ppp. Si la imprenta aplana el archivo, que lo haga a 300 ppp o más.
- **Texto en negro puro:** el texto es azul marino, no negro 100 % K. En los tamaños que usa el folleto no da problemas de registro, pero conviene consultarlo con la imprenta.
- **Papel sugerido:** estucado mate de 150 a 170 g/m², que se lee mejor que el brillo.
- **Prueba física:** imprimir una copia, doblarla, leerla entera y escanear el QR con un celular. Que otra persona la revise.
- **Medición:** el QR va al perfil de Instagram, que no permite medir cuántos escaneos vienen del folleto. Si se quiere medir, usar un QR dinámico.

## Créditos

- Íconos: [Tabler Icons](https://tabler.io/icons) (MIT).
- Tipografías: Outfit y Caveat (SIL Open Font License; las licencias están en `fuentes/`).
- El logo, el lazo, las hojas, las olas y las ilustraciones están dibujados en SVG. El logo se redibujó a partir del folleto anterior: si el IPD tiene el archivo original, conviene reemplazarlo.
