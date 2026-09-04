(function(){
  "use strict";

  /* ---------- Menú móvil ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu-principal');
  if (toggle && nav) {
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded','false');
      });
    });
  }

  /* ---------- Modal de cita ---------- */
  function openModal(modal){
    if(!modal) return;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    var focusable = modal.querySelector('input,select,textarea,button');
    if(focusable) focusable.focus();
  }
  function closeModal(modal){
    if(!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
  }
  document.querySelectorAll('[data-open-modal]').forEach(function(btn){
    btn.addEventListener('click', function(){ openModal(document.getElementById('modal-cita')); });
  });
  document.querySelectorAll('[data-close-modal]').forEach(function(btn){
    btn.addEventListener('click', function(){ closeModal(btn.closest('.modal')); });
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      document.querySelectorAll('.modal:not([hidden])').forEach(closeModal);
    }
  });

  /* ---------- Mostrar campo "Banco" solo si el trámite es hipoteca ---------- */
  var tramite = document.getElementById('cita-tramite');
  var campoBanco = document.getElementById('campo-banco');
  if (tramite && campoBanco) {
    tramite.addEventListener('change', function(){
      var val = tramite.value.toLowerCase();
      campoBanco.hidden = !(val.indexOf('hipoteca') > -1);
    });
  }

  /* ---------- Envío de formularios (Web3Forms) ---------- */
  var ACCESS_KEY = '01f8fb18-285e-41c3-b420-c194d23b9c57';
  document.querySelectorAll('[data-form]').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var status = form.querySelector('.form-status');
      if (ACCESS_KEY === 'TU_ACCESS_KEY_AQUI') {
        if(status) status.textContent = 'Formulario pendiente de activar: falta la clave de Web3Forms en main.js.';
        return;
      }
      var data = new FormData(form);
      data.append('access_key', ACCESS_KEY);
      data.append('subject', form.getAttribute('data-subject') || 'Nuevo mensaje desde la web');
      if(status) status.textContent = 'Enviando…';
      fetch('https://api.web3forms.com/submit', { method:'POST', body:data })
        .then(function(r){ return r.json(); })
        .then(function(json){
          if (json.success) {
            if(status) status.textContent = '¡Gracias! Te contactaremos lo antes posible.';
            form.reset();
          } else {
            if(status) status.textContent = 'No se pudo enviar. Llámanos o escríbenos por email.';
          }
        })
        .catch(function(){
          if(status) status.textContent = 'No se pudo enviar. Llámanos o escríbenos por email.';
        });
    });
  });

  /* ---------- Año en el pie de página ---------- */
  document.querySelectorAll('[data-year]').forEach(function(el){
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Selector de idioma ES / GL ---------- */
  var LANG_KEY = 'notarioferrol-lang';
  function applyLang(lang){
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang === 'gl' ? 'gl' : 'es');
    document.querySelectorAll('[data-lang-btn]').forEach(function(btn){
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang-btn') === lang ? 'true' : 'false');
    });
    try { localStorage.setItem(LANG_KEY, lang); } catch(e){}
  }
  var savedLang = 'es';
  try { savedLang = localStorage.getItem(LANG_KEY) || 'es'; } catch(e){}
  applyLang(savedLang);
  document.querySelectorAll('[data-lang-btn]').forEach(function(btn){
    btn.addEventListener('click', function(){
      applyLang(btn.getAttribute('data-lang-btn'));
    });
  });

  /* ---------- Carrusel (Dónde estamos) ---------- */
  document.querySelectorAll('[data-carousel]').forEach(function(root){
    var viewport = root.querySelector('.carousel__viewport');
    var slides = Array.prototype.slice.call(root.querySelectorAll('.carousel__slide'));
    var dotsWrap = root.querySelector('.carousel__dots');
    var prevBtn = root.querySelector('.carousel__btn--prev');
    var nextBtn = root.querySelector('.carousel__btn--next');
    if (!viewport || slides.length === 0) return;

    slides.forEach(function(_, i){
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Ir a la foto ' + (i + 1));
      if (i === 0) dot.setAttribute('aria-current', 'true');
      dot.addEventListener('click', function(){ goTo(i); });
      if (dotsWrap) dotsWrap.appendChild(dot);
    });
    var dots = dotsWrap ? Array.prototype.slice.call(dotsWrap.children) : [];

    function currentIndex(){
      return Math.round(viewport.scrollLeft / viewport.clientWidth);
    }
    function goTo(i){
      var idx = (i + slides.length) % slides.length;
      viewport.scrollTo({ left: idx * viewport.clientWidth, behavior: 'smooth' });
    }
    function updateDots(){
      var idx = currentIndex();
      dots.forEach(function(d, i){
        if (i === idx) d.setAttribute('aria-current', 'true');
        else d.removeAttribute('aria-current');
      });
    }
    if (prevBtn) prevBtn.addEventListener('click', function(){ goTo(currentIndex() - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function(){ goTo(currentIndex() + 1); });
    viewport.addEventListener('scroll', function(){
      window.clearTimeout(viewport._t);
      viewport._t = window.setTimeout(updateDots, 100);
    });
  });

  /* ---------- Lightbox (ampliar fotos de galería) ---------- */
  (function(){
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    var imgEl = lightbox.querySelector('.lightbox__img');
    var capEs = lightbox.querySelector('[data-lightbox-caption="es"]');
    var capGl = lightbox.querySelector('[data-lightbox-caption="gl"]');
    var counterEl = lightbox.querySelector('[data-lightbox-counter]');
    var items = Array.prototype.slice.call(document.querySelectorAll('.gallery__item'));
    var current = 0;

    function openAt(i){
      if (!items.length) return;
      current = (i + items.length) % items.length;
      var item = items[current];
      var img = item.querySelector('img');
      var capEsEl = item.querySelector('figcaption [data-lang-block="es"]');
      var capGlEl = item.querySelector('figcaption [data-lang-block="gl"]');
      imgEl.src = img.currentSrc || img.src;
      imgEl.alt = img.alt || '';
      if (capEs) capEs.textContent = capEsEl ? capEsEl.textContent : '';
      if (capGl) capGl.textContent = capGlEl ? capGlEl.textContent : '';
      if (counterEl) counterEl.textContent = (current + 1) + ' / ' + items.length;
      var navs = lightbox.querySelectorAll('.lightbox__nav');
      navs.forEach(function(n){ n.hidden = items.length < 2; });
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox(){
      lightbox.hidden = true;
      document.body.style.overflow = '';
    }
    items.forEach(function(item, i){
      var trigger = item.querySelector('[data-lightbox-trigger]');
      if (!trigger) return;
      trigger.addEventListener('click', function(){ openAt(i); });
      trigger.addEventListener('keydown', function(e){
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openAt(i); }
      });
    });
    lightbox.querySelectorAll('[data-lightbox-close]').forEach(function(btn){
      btn.addEventListener('click', closeLightbox);
    });
    var prevBtn = lightbox.querySelector('[data-lightbox-prev]');
    var nextBtn = lightbox.querySelector('[data-lightbox-next]');
    if (prevBtn) prevBtn.addEventListener('click', function(){ openAt(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function(){ openAt(current + 1); });
    document.addEventListener('keydown', function(e){
      if (lightbox.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') openAt(current - 1);
      if (e.key === 'ArrowRight') openAt(current + 1);
    });
  })();

})();
