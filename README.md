# Web de la Notaría Pedro Luis García de los Huertos Vidal — Ferrol

Sitio estático (HTML + CSS + JS) pensado para GitHub Pages, con selector de idioma castellano/gallego y URLs limpias (sin `.html`) mediante Jekyll.

## ⚠️ Antes de nada: arregla el error 400

Lo que viste no era un fallo de la página de Prensa en concreto — era el `CNAME`.
Al tener un archivo `CNAME` con `notarioferrol.com` en el repositorio, GitHub Pages
configura automáticamente ese dominio como "dominio personalizado" del sitio y
**redirige** cualquier visita a `jorgeghs.github.io/notaria-ferrol/...` hacia
`notarioferrol.com/...` — pero como el DNS de ese dominio todavía no apunta a
GitHub Pages, esa redirección cae en un error 400.

Este paquete ya **no incluye el archivo `CNAME`**, a propósito. Antes de subir esta
versión:

1. En tu copia local del repo, borra el archivo `CNAME` si todavía existe:
   `git rm CNAME`
2. En GitHub: **Settings → Pages**, borra lo que haya en el campo *Custom domain*
   y guarda.
3. Sube los cambios. A partir de ahí, `jorgeghs.github.io/notaria-ferrol/` funcionará
   sin redirigir a ningún sitio.

Cuando el dominio `notarioferrol.com` ya tenga el DNS apuntando a GitHub Pages (lo
vimos en la primera conversación: registros A a las IPs de GitHub + CNAME de `www`),
entonces sí añade de nuevo el archivo `CNAME` con `notarioferrol.com` dentro y
configura el dominio personalizado en Settings → Pages.

## URLs limpias (sin .html)

Como pediste, las páginas ya no se ven como `que-hacemos.html` sino como
`que-hacemos/`. Esto funciona gracias a Jekyll (el motor que usa GitHub Pages por
detrás): cada archivo lleva ahora un pequeño encabezado al principio:

```
---
permalink: /que-hacemos/
---
```

Eso le dice a GitHub "sirve este archivo en la URL /que-hacemos/", sin que tengas
que mover ni renombrar nada — los archivos siguen llamándose `que-hacemos.html`,
`prensa.html`, etc. en el repositorio.

**Un detalle a tener en cuenta:** la URL final llevará una barra al final
(`.../que-hacemos/`, no `.../que-hacemos`). Si alguien escribe la URL sin la barra,
GitHub la redirige automáticamente añadiéndola — es el comportamiento estándar en
prácticamente todas las webs con URLs limpias, no hay forma de evitarlo sin
cambiar de proveedor de hosting.

La página de inicio no lleva front-matter ni cambia: sigue siendo `index.html`
y se sirve en la raíz (`/`) como siempre.

## Archivos

```
index.html            Inicio (hero, chips de servicios, reseñas de Google, servicios, CTA, FAQ)
que-hacemos.html       → /que-hacemos/   Servicios en desplegables, con anclas (#hipotecas...)
quienes-somos.html     → /quienes-somos/ El notario + nuestra filosofía
derecho-gallego.html   → /derecho-gallego/  Índice + artículos + tabla comparativa
prensa.html            → /prensa/        Galería de prensa
donde-estamos.html     → /donde-estamos/ Mapa primero, luego carrusel de fotos
contacto.html          → /contacto/      Formulario de contacto + datos
aviso-legal.html       → /aviso-legal/   Aviso legal (borrador, con NIF ya puesto)
privacidad.html        → /privacidad/    Política de privacidad (borrador)
cookies.html           → /cookies/       Política de cookies (borrador)
styles.css             Todo el diseño (verde corporativo #0D6B4D en :root)
main.js                Menú móvil, modal de cita, carrusel, formularios, selector ES/GL
                        (la clave de Web3Forms YA está puesta y activa)
favicon.ico / favicon-32.png / favicon-192.png / apple-touch-icon.png   Icono del sello "P"
og-image.jpg           Imagen que se ve al compartir el enlace (WhatsApp, redes)
assets/img/notaria/    Foto del notario + foto1.avif...foto10.avif del carrusel
assets/img/prensa/     Fotos de prensa (ya subidas por ti al repo)
```

La cabecera y el pie están repetidos en cada archivo (así funciona un sitio estático).
Si cambias un enlace del menú, cámbialo en los diez HTML — o mejor, dímelo a mí y
regenero todo desde las plantillas.

## Formulario de contacto — ya activo

La clave de Web3Forms que me diste (`01f8fb18-285e-...`) ya está puesta en `main.js`.
No hace falta que hagas nada más: en cuanto subas esta versión, los formularios de
"Contacto" y "Agenda tu cita" enviarán los mensajes a info@notarioferrol.com.

## Publicar en GitHub Pages

```
git clone https://github.com/JorgeGHS/notaria-ferrol.git
cd notaria-ferrol
git rm CNAME                          # solo si todavía existe, ver arriba
# copia aquí todos los archivos de esta carpeta (sobrescribe los que ya había)
git add .
git commit -m "URLs limpias, reseñas, favicon y correcciones"
git pull origin main --no-rebase      # si hace falta reconciliar
git push
```

En **Settings → Pages**, confirma que el campo *Custom domain* está vacío (por
ahora) y que la fuente sigue siendo *Deploy from a branch → main / (root)*.

## Notas de diseño

- Color de marca: verde Racing de Ferrol `#0D6B4D`, definido en `:root` de `styles.css`.
- Tipografías: Source Serif 4 (titulares) + Source Sans 3 (texto).
- El selector de idioma (banderas ES/GAL) vive en la cabecera en escritorio, y dentro
  del menú desplegable en móvil/tablet. Guarda la preferencia en `localStorage`.
- Barra fija en móvil (Llamar / Agenda tu cita) en todas las páginas.
- El carrusel de "Dónde estamos" es CSS + JS propio, sin librerías externas.
- Datos estructurados (schema.org `Notary`) en cada página para SEO local.
- El mapa de Google en "Dónde estamos" se carga siempre, sin esperar un clic.
