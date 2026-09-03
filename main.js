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
  var ACCESS_KEY = 'TU_ACCESS_KEY_AQUI';
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

})();
