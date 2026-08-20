/* Sidedoor Digital :: site enhancements
   - Glitches the first word of every eyebrow label automatically.
   - Staggers the flicker per-instance so a page never fires all at once.
   - Skips entirely for reduced-motion, same rule the CSS already follows. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  var eyebrows = document.querySelectorAll('.eyebrow');
  eyebrows.forEach(function (el, i) {
    if (el.querySelector('.glitch')) return; // already hand-marked, leave it
    var text = el.textContent.trim();
    if (!text) return;
    var words = text.split(' ');
    var first = words.shift();
    var rest = words.join(' ');

    el.textContent = '';
    var span = document.createElement('span');
    span.className = 'glitch';
    span.setAttribute('data-text', first);
    span.textContent = first;
    span.style.setProperty('--glitch-delay', (i * 1.3 + 0.2) + 's');
    el.appendChild(span);
    if (rest) el.appendChild(document.createTextNode(' ' + rest));
  });
})();
