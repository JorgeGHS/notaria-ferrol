# Web de la Notaría Pedro Luis García de los Huertos Vidal — Ferrol

Sitio estático (HTML + CSS + JS) para GitHub Pages, con selector de idioma castellano/gallego y URLs limpias (sin `.html`).

## Por qué se rompía el menú (y cómo se arregló de verdad)

La primera vez intenté conseguir las URLs limpias con un truco de Jekyll
(front-matter `permalink:`). El problema es que **no todos los repos de GitHub
Pages ejecutan Jekyll** — muchos usan el flujo moderno de "GitHub Actions" que
sube los archivos tal cual, sin procesar ese front-matter. En tu caso pasaba
justo eso: el enlace apuntaba a `/que-hacemos/`, pero como nadie generaba esa
carpeta de verdad, la página no existía y todo se rompía.

Esta vez lo he hecho de la forma que funciona **siempre, en cualquier hosting
estático**, sin depender de que Jekyll esté activado: cada página vive de
verdad en su propia carpeta con un `index.html` dentro. Es exactamente lo mismo
que hace cualquier framework moderno para conseguir URLs limpias.

## Estructura de archivos (nueva)

```
index.html                    → /                  Inicio
que-hacemos/index.html        → /que-hacemos/       Servicios (anclas: #hipotecas, #herencias...)
quienes-somos/index.html      → /quienes-somos/     El notario + nuestra filosofía
derecho-gallego/index.html    → /derecho-gallego/   Índice + artículos + tabla comparativa
prensa/index.html             → /prensa/            Galería de prensa
donde-estamos/index.html      → /donde-estamos/     Mapa + carrusel de fotos
contacto/index.html           → /contacto/          Formulario de contacto
aviso-legal/index.html        → /aviso-legal/       Aviso legal (borrador, con NIF ya puesto)
privacidad/index.html         → /privacidad/        Política de privacidad (borrador)
cookies/index.html            → /cookies/           Política de cookies (borrador)
styles.css, main.js           En la raíz — todas las páginas los referencian con ../
favicon.ico, favicon-32.png, favicon-192.png, apple-touch-icon.png, og-image.jpg   En la raíz
assets/img/notaria/           Foto del notario + foto1.avif...foto10.avif del carrusel
assets/img/prensa/            Fotos de prensa (con los nombres reales que subiste)
```

**Importante:** como cada página ahora es una carpeta, todos los enlaces a
`styles.css`, `main.js`, otras páginas, etc. dentro de esas carpetas llevan el
prefijo `../` delante (p. ej. `../styles.css`, `../prensa/`). Esto ya está
hecho en el HTML generado — no hay que tocar nada a mano, solo asegurarte de
subir la carpeta completa tal cual.

## ⚠️ Limpieza necesaria en el repositorio

Tu repo todavía tiene los archivos antiguos sueltos (`que-hacemos.html`,
`prensa.html`, etc. en la raíz, como se ve en tu captura). Hay que borrarlos
para que no queden páginas duplicadas / rotas conviviendo con las nuevas:

```
git rm que-hacemos.html quienes-somos.html donde-estamos.html derecho-gallego.html prensa.html contacto.html aviso-legal.html privacidad.html cookies.html
```

Y si el archivo `CNAME` sigue ahí (ver el aviso de la ronda anterior sobre el
error 400), bórralo también por ahora:

```
git rm CNAME
```

## Fotos de prensa — ya con tus nombres reales

Actualicé `prensa/index.html` para usar exactamente los archivos que subiste:
`ferrol-FC.avif`, `xacobeo.avif`, `ricardo.avif`, `fimo.avif`,
`primera-boda.avif`, `aduanas.avif`, `hospital.avif`, `xunta-inmuebles.avif`,
`fragas.avif`. No hace falta que renombres nada, ya coincide.

**Sobre `barca.jpg`**: lo vi en tu carpeta `assets/img/` pero no sé para qué es
todavía — dímelo y lo incorporo donde corresponda.

## Formulario de contacto — ya activo

La clave de Web3Forms que me diste ya está puesta en `main.js`. En cuanto subas
esta versión, "Contacto" y "Agenda tu cita" enviarán a info@notarioferrol.com.

## Publicar en GitHub Pages

```
git clone https://github.com/JorgeGHS/notaria-ferrol.git
cd notaria-ferrol
git rm que-hacemos.html quienes-somos.html donde-estamos.html derecho-gallego.html prensa.html contacto.html aviso-legal.html privacidad.html cookies.html
git rm CNAME   # solo si todavía existe
# copia aquí TODOS los archivos y carpetas de este paquete (sobrescribe lo que ya había)
git add .
git commit -m "URLs limpias con carpetas reales, fotos de prensa, formulario activo"
git pull origin main --no-rebase   # si hace falta reconciliar
git push
```

En **Settings → Pages**: fuente = *Deploy from a branch → main / (root)*, y el
campo *Custom domain* vacío por ahora (hasta que el DNS de notarioferrol.com
esté listo).

## Notas de diseño

- Color de marca: verde Racing de Ferrol `#0D6B4D`, definido en `:root` de `styles.css`.
- Tipografías: Source Serif 4 (titulares) + Source Sans 3 (texto).
- Selector de idioma (banderas ES/GAL): cabecera en escritorio, dentro del menú en móvil.
- Barra fija en móvil (Llamar / Agenda tu cita) en todas las páginas.
- Carrusel de "Dónde estamos": CSS + JS propio, sin librerías externas.
- Datos estructurados (schema.org `Notary`) en cada página para SEO local.
