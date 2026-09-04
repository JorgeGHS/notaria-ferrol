# Web de la Notaría Pedro Luis García de los Huertos Vidal — Ferrol

Sitio estático (HTML + CSS + JS, sin dependencias ni compilación) pensado para GitHub Pages, con selector de idioma castellano/gallego.

## Archivos

```
index.html            Inicio (hero, chips de servicios, reseñas de Google, servicios, CTA, FAQ)
que-hacemos.html       Servicios en desplegables, con anclas (#hipotecas, #herencias...)
quienes-somos.html     El notario + nuestra filosofía
derecho-gallego.html   Índice + artículos (legítima, apartación, mejora, tabla comparativa, usufructo, montes)
prensa.html            Galería de prensa
donde-estamos.html     Mapa primero, luego carrusel de fotos del edificio
contacto.html          Formulario de contacto + datos (responsive de verdad, 1 columna en móvil)
aviso-legal.html       Aviso legal (borrador, con NIF ya puesto)
privacidad.html        Política de privacidad (borrador)
cookies.html           Política de cookies (borrador)
styles.css             Todo el diseño (verde corporativo #0D6B4D en :root)
main.js                Menú móvil, modal de cita, carrusel, formularios, selector ES/GL
favicon.ico / favicon-32.png / favicon-192.png / apple-touch-icon.png   Icono del sello "P"
og-image.jpg           Imagen que se ve al compartir el enlace (WhatsApp, redes)
assets/img/notaria/    Foto del notario + foto1.avif...foto10.avif del carrusel
assets/img/prensa/     Fotos de prensa (ya subidas por ti al repo)
```

La cabecera y el pie están repetidos en cada archivo (así funciona un sitio estático).
Si cambias un enlace del menú, cámbialo en los diez HTML.

## Antes de publicar

1. **Clave del formulario.** Entra en https://web3forms.com, pon el email de la notaría
   (info@notarioferrol.com) y te dan una *access key* al momento. Ábrela en `main.js`
   y sustituye `TU_ACCESS_KEY_AQUI`. Hasta que lo hagas, el formulario avisa en pantalla
   en vez de fallar en silencio.
2. **Facebook.** Sigue en el pie de página el enlace público que encontré en la web
   de Wix — bórralo si no lo queréis mantener.
3. **Textos legales.** Los tres archivos legales son un borrador orientativo, ya con
   el NIF de tu padre (33237811M) y sin ninguna sociedad, solo a su nombre como
   autónomo. Que los valide él antes de publicar.
4. **Gallego.** La traducción la he hecho yo (normativa RAG, no reintegracionista).
   Recomiendo que alguien gallegohablante la revise antes de publicar, sobre todo
   la página de Derecho Gallego.
5. **Reseñas de Google.** En la portada puse la puntuación (4,5/5, 109 opiniones) y
   un botón que enlaza a vuestra ficha de Google. Si esas cifras cambian con el
   tiempo, actualízalas en `index.html` (búscalas por "109 opiniones").
6. **WhatsApp.** No lo hemos añadido: al no tener un número de empresa dedicado,
   redirigir al WhatsApp personal de tu padre puede traer más problemas que
   ventajas (mensajes fuera de horario, mezcla con su número privado). Si en algún
   momento contratáis WhatsApp Business, es fácil añadirlo.
7. **Favicon y vista previa al compartir.** Ya generados a partir del sello verde
   con la "P" de la cabecera, y una `og-image.jpg` con la foto de Ferrol de fondo
   — es lo que se verá como miniatura al compartir el enlace por WhatsApp o redes.
   No hace falta que hagas nada, ya están en la carpeta.

## Publicar en GitHub Pages

Como el repo `notaria-ferrol` ya existe:

```
git clone https://github.com/JorgeGHS/notaria-ferrol.git
cd notaria-ferrol
# copia aquí todos los archivos de esta carpeta (sobrescribe los que ya había)
git add .
git commit -m "Actualización de la web"
git pull origin main --no-rebase   # si hace falta reconciliar
git push
```

En el repositorio: **Settings → Pages → Source: Deploy from a branch → main / (root)**.

Para el dominio propio (ya tienes `CNAME` con `notarioferrol.com` incluido):
en Pages, apartado *Custom domain*, escribe el dominio y activa *Enforce HTTPS*.
En Gandi.net, apunta los registros `A` del dominio a las IP de GitHub Pages
(185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) y el
subdominio `www` con un `CNAME` a `jorgeghs.github.io`.

## Notas de diseño

- Color de marca: verde Racing de Ferrol `#0D6B4D`, definido en `:root` de `styles.css`
  como `--brand`.
- Tipografías: Source Serif 4 (titulares) + Source Sans 3 (texto), igual que en la
  web de tu hermano.
- El selector de idioma (banderas ES/GAL) vive en la cabecera en escritorio, y dentro
  del menú desplegable en móvil/tablet. Guarda la preferencia en `localStorage` (no
  es una cookie de seguimiento).
- En móvil hay una barra fija abajo (Llamar / Agenda tu cita) en todas las páginas.
- El carrusel de "Dónde estamos" es CSS + JS propio (sin librerías): gestos táctiles
  en móvil, botones de flecha y puntos en escritorio.
- Cada página incluye datos estructurados (schema.org `Notary`) para mejorar cómo
  Google entiende la ficha en búsquedas locales tipo "notario en Ferrol".
- El mapa de Google en "Dónde estamos" se carga siempre (a diferencia de la web de tu
  hermano, que esperaba un clic) — si quieres el mismo comportamiento de un solo clic,
  dímelo y lo ajusto.
