/* Sidedoor Digital :: site enhancements
   - Glitches the first word of every eyebrow label + the brand mark.
   - Staggers the flicker per-instance so a page never fires all at once.
   - Wires up the mobile hamburger menu.
   - Drives scroll parallax on the background circuit vectors for depth.
   Skips the glitch entirely for reduced-motion; nav + parallax still work. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function makeGlitchSpan(word, delay) {
    var span = document.createElement('span');
    span.className = 'glitch';
    span.setAttribute('data-text', word);
    span.textContent = word;
    span.style.setProperty('--glitch-delay', delay + 's');
    return span;
  }

  if (!reduce) {
    document.querySelectorAll('.eyebrow').forEach(function (el, i) {
      if (el.querySelector('.glitch')) return;
      var text = el.textContent.trim();
      if (!text) return;
      var words = text.split(' ');
      var first = words.shift();
      var rest = words.join(' ');
      el.textContent = '';
      el.appendChild(makeGlitchSpan(first, i * 1.3 + 0.2));
      if (rest) el.appendChild(document.createTextNode(' ' + rest));
    });

    document.querySelectorAll('.brand-name').forEach(function (el) {
      if (el.querySelector('.glitch')) return;
      var firstNode = el.childNodes[0];
      if (!firstNode || firstNode.nodeType !== 3) return;
      var word = firstNode.textContent.trim();
      if (!word) return;
      var span = makeGlitchSpan(word, 0.6);
      el.replaceChild(span, firstNode);
      el.insertBefore(document.createTextNode(' '), span.nextSibling);
    });
  }

  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (!reduce) {
    var layers = document.querySelectorAll('.hero, .page-hero, .pipeline-band');
    if (layers.length) {
      var ticking = false;
      var update = function () {
        layers.forEach(function (el) {
          var rect = el.getBoundingClientRect();
          var offset = rect.top * 0.06;
          el.style.setProperty('--parallax', offset.toFixed(1) + 'px');
        });
        ticking = false;
      };
      window.addEventListener('scroll', function () {
        if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
      }, { passive: true });
      update();
    }
  }
})();
