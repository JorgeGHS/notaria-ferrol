# Web de la Notaría Pedro Luis García de los Huertos Vidal — Ferrol

Sitio estático (HTML + CSS + JS, sin dependencias ni compilación) pensado para GitHub Pages, con selector de idioma castellano/gallego.

## Archivos

```
index.html            Inicio (hero, servicios, CTA, FAQ)
que-hacemos.html       Servicios en desplegables, con anclas (#hipotecas, #herencias...)
quienes-somos.html     El notario + nuestra filosofía
derecho-gallego.html   Pactos de mejora, apartación, usufructo vidual, etc. (NUEVA)
prensa.html            Galería de prensa (NUEVA)
donde-estamos.html     Mapa, fotos del edificio y datos de la notaría
contacto.html          Formulario de contacto + datos
aviso-legal.html       Aviso legal (borrador, revisar)
privacidad.html        Política de privacidad (borrador, revisar)
cookies.html           Política de cookies (borrador, revisar)
styles.css             Todo el diseño (verde corporativo #0D6B4D en :root)
main.js                Menú móvil, modal de cita, WhatsApp, formularios y selector ES/GL
assets/img/notaria/    Fotos del notario y del edificio
assets/img/prensa/     Fotos de prensa
```

La cabecera y el pie están repetidos en cada archivo (así funciona un sitio estático).
Si cambias un enlace del menú, cámbialo en los diez HTML.

## Antes de publicar

1. **Fotos que faltan.** Ya he colocado la foto del notario que me pasaste
   (`assets/img/notaria/pedro-garcia-de-los-huertos-vidal.jpg`). Me faltan las demás:
   descarga estas imágenes de la web actual de Wix y guárdalas con estos nombres
   exactos (mientras no estén, la web muestra un texto de reemplazo automáticamente,
   no se rompe):

   **`assets/img/prensa/`**
   | Archivo | Descarga desde |
   |---|---|
   | `01-racing-sad.jpg` | https://static.wixstatic.com/media/f31337_0b6952683bcc46ea8a86671b4571c8e1~mv2.jpg |
   | `02-xacobeo.jpg` | https://static.wixstatic.com/media/f31337_76834f8b995d4c6383c3cfcce4d4ef8c~mv2.jpg |
   | `03-carvalho-calero.jpg` | https://static.wixstatic.com/media/f31337_0d8e3672c71847fab92f6c04bae869c3~mv2.jpg |
   | `04-fimo.jpg` | https://static.wixstatic.com/media/f31337_863e627aa2c24b6ebba0eda8448762eb~mv2.jpg |
   | `05-boda-notario.jpg` | https://static.wixstatic.com/media/f31337_2c17bee5c565466c88066a2885316092~mv2.jpg |
   | `06-aduana-autoridad-portuaria.jpg` | https://static.wixstatic.com/media/f31337_ae95f9e7a57b4557bbc7abcc1562ec5c~mv2.jpg |
   | `07-hospital-juan-cardona.jpg` | https://static.wixstatic.com/media/f31337_4d4c504041a14974806e43b0eb76cb80~mv2.jpg |
   | `08-xunta-vivienda-social.jpg` | https://static.wixstatic.com/media/f31337_7872cf0eb5d246f78d414116b7415870~mv2.png |
   | `09-fragas-do-eume.jpg` | https://static.wixstatic.com/media/f31337_2928bca13db24e8299a42a03bee5d089~mv2.png |

   Las fotos del edificio y la sala de juntas ya no van sueltas: ahora forman el
   carrusel de "Dónde estamos" — usa los nombres `foto1.avif`...`foto10.avif` del
   punto 2 de arriba.

2. **Fotos del carrusel de "Dónde estamos".** La página espera 10 archivos en
   `assets/img/notaria/`, llamados exactamente `foto1.avif`, `foto2.avif`... hasta
   `foto10.avif`. Cópialos ahí con esos nombres.
3. **Clave del formulario.** Entra en https://web3forms.com, pon el email de la notaría
   (info@notarioferrol.com) y te dan una *access key* al momento. Ábrela en `main.js`
   y sustituye `TU_ACCESS_KEY_AQUI`. Hasta que lo hagas, el formulario avisa en pantalla
   en vez de fallar en silencio.
4. **Facebook.** Añadí el enlace a Facebook que encontré público en la web actual
   (no me lo pediste explícitamente) — bórralo del pie de página en las 10 páginas
   si no lo queréis mantener.
5. **Textos legales.** Los tres archivos legales son un borrador orientativo, ya con
   el NIF de tu padre (33237811M) y sin ninguna sociedad, solo a su nombre como
   autónomo. Que los valide él antes de publicar.
6. **Gallego.** La traducción al gallego la he hecho yo (normativa RAG, no
   reintegracionista). Recomiendo que alguien gallegohablante la revise antes de
   publicar, sobre todo la página de Derecho Gallego, antes de que sea pública.
7. **Favicon.** No he generado favicon ni apple-touch-icon nuevos; puedes reutilizar
   los actuales de Wix (el escudo circular con la "P") o pedirme que te haga unos.
8. **WhatsApp.** Lo he quitado por completo, tal y como pediste (botón flotante y
   modal).

## Publicar en GitHub Pages

Como el repo `notaria-ferrol` ya existe:

```
git clone https://github.com/JorgeGHS/notaria-ferrol.git
cd notaria-ferrol
# copia aquí todos los archivos de esta carpeta
git add .
git commit -m "Web de la notaría de Ferrol"
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
- El selector de idioma (banderas ES/GAL) guarda la preferencia en `localStorage` del
  navegador (no es una cookie de seguimiento).
- El mapa de Google en "Dónde estamos" se carga siempre (a diferencia de la web de tu
  hermano, que esperaba un clic) — si quieres el mismo comportamiento de un solo clic,
  dímelo y lo ajusto.
- El carrusel de fotos es CSS + JS propio (sin librerías): funciona con gestos táctiles
  en móvil (desliza) y con los botones de flecha o los puntos en escritorio.
