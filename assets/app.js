/* ============================================================
   LeeuwOS — window manager, boot loader, and assorted 1980s
   behaviour. Vanilla JavaScript, zero dependencies.
   ============================================================ */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var desktop = $('#desktop');
  var isMobile = function () { return window.matchMedia('(max-width: 760px)').matches; };
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var RICKROLL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

  /* ---------- Window manager ---------- */

  var zTop = 10;
  var openCount = 0;

  function focusWindow(win) {
    $$('.window').forEach(function (w) { w.classList.remove('is-active'); });
    win.classList.add('is-active');
    win.style.zIndex = ++zTop;
  }

  function openWindow(id, noScroll) {
    var win = document.getElementById(id);
    if (!win) return;
    var firstOpen = !win.dataset.placed;
    win.hidden = false;
    if (!isMobile() && firstOpen) {
      win.dataset.placed = '1';
      var rect = desktop.getBoundingClientRect();
      var x = 56 + (openCount % 6) * 36;
      var y = 34 + (openCount % 6) * 30;
      var w = Math.min(win.offsetWidth, rect.width - 40);
      win.style.left = Math.max(8, Math.min(x, rect.width - w - 150)) + 'px';
      win.style.top = y + 'px';
      openCount++;
    }
    focusWindow(win);
    if (isMobile() && !noScroll) {
      win.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  }

  function closeWindow(win) {
    win.hidden = true;
    var top = topWindow();
    if (top) focusWindow(top);
  }

  function topWindow() {
    var best = null;
    $$('.window').forEach(function (w) {
      if (w.hidden) return;
      if (!best || (parseInt(w.style.zIndex || 0, 10) > parseInt(best.style.zIndex || 0, 10))) best = w;
    });
    return best;
  }

  $$('.window').forEach(function (win) {
    win.addEventListener('pointerdown', function () { focusWindow(win); });
    $('.window__close', win).addEventListener('click', function (e) {
      e.stopPropagation();
      closeWindow(win);
    });

    /* Drag by the title bar (desktop only) */
    var bar = $('.window__bar', win);
    bar.addEventListener('pointerdown', function (e) {
      if (isMobile() || e.target.closest('.window__close')) return;
      e.preventDefault();
      var rect = desktop.getBoundingClientRect();
      var startX = e.clientX, startY = e.clientY;
      var origX = win.offsetLeft, origY = win.offsetTop;
      bar.setPointerCapture(e.pointerId);
      function onMove(ev) {
        var x = origX + (ev.clientX - startX);
        var y = origY + (ev.clientY - startY);
        x = Math.max(80 - win.offsetWidth, Math.min(x, rect.width - 80));
        y = Math.max(0, Math.min(y, rect.height - 34));
        win.style.left = x + 'px';
        win.style.top = y + 'px';
      }
      function onUp() {
        bar.removeEventListener('pointermove', onMove);
        bar.removeEventListener('pointerup', onUp);
      }
      bar.addEventListener('pointermove', onMove);
      bar.addEventListener('pointerup', onUp);
    });
  });

  /* ---------- Desktop icons: click to open, drag to move ---------- */

  $$('.icon').forEach(function (icon) {
    var dragging = false;

    icon.addEventListener('pointerdown', function (e) {
      if (isMobile()) return;
      var startX = e.clientX, startY = e.clientY;
      var rect = icon.getBoundingClientRect();
      var deskRect = desktop.getBoundingClientRect();
      dragging = false;
      icon.setPointerCapture(e.pointerId);
      function onMove(ev) {
        if (!dragging && Math.hypot(ev.clientX - startX, ev.clientY - startY) < 6) return;
        dragging = true;
        icon.style.zIndex = 5;
        icon.style.right = 'auto';
        icon.style.bottom = 'auto';
        var x = rect.left - deskRect.left + (ev.clientX - startX);
        var y = rect.top - deskRect.top + (ev.clientY - startY);
        icon.style.left = Math.max(0, Math.min(x, deskRect.width - rect.width)) + 'px';
        icon.style.top = Math.max(0, Math.min(y, deskRect.height - rect.height)) + 'px';
      }
      function onUp() {
        icon.removeEventListener('pointermove', onMove);
        icon.removeEventListener('pointerup', onUp);
        icon.style.zIndex = '';
      }
      icon.addEventListener('pointermove', onMove);
      icon.addEventListener('pointerup', onUp);
    });

    icon.addEventListener('click', function () {
      if (dragging) { dragging = false; return; }
      $$('.icon').forEach(function (i) { i.classList.remove('is-selected'); });
      icon.classList.add('is-selected');
      var openId = icon.dataset.open;
      var action = icon.dataset.action;
      setTimeout(function () {
        if (openId) openWindow(openId);
        if (action) runAction(action);
        icon.classList.remove('is-selected');
      }, 140);
    });
  });

  /* Anything with data-open opens a window (menu items, README links) */
  document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-open]');
    if (opener && !opener.classList.contains('icon')) {
      openWindow(opener.dataset.open);
      closeMenus();
    }
    var actor = e.target.closest('[data-action]');
    if (actor && !actor.classList.contains('icon')) {
      runAction(actor.dataset.action);
      closeMenus();
    }
  });

  /* ---------- Menus ---------- */

  function closeMenus() {
    $$('.menu').forEach(function (m) {
      m.classList.remove('is-open');
      $('.menu__btn', m).setAttribute('aria-expanded', 'false');
    });
  }

  $$('.menu').forEach(function (menu) {
    var btn = $('.menu__btn', menu);
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var wasOpen = menu.classList.contains('is-open');
      closeMenus();
      if (!wasOpen) {
        menu.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.menu')) closeMenus();
    if (e.target === desktop) {
      $$('.icon').forEach(function (i) { i.classList.remove('is-selected'); });
    }
  });

  /* ---------- Actions ---------- */

  function runAction(action) {
    if (action === 'trash') {
      showDialog(
        'The Trash is empty. All failed experiments were long ago recycled into CAREER.DOC.',
        [{ label: 'OK', primary: true }]
      );
    } else if (action === 'restart') {
      try { sessionStorage.removeItem('leeuwos_booted'); } catch (err) { /* private mode */ }
      window.location.href = window.location.pathname;
    } else if (action === 'cleanup') {
      $$('.icon').forEach(function (i) {
        i.style.left = i.style.top = i.style.right = i.style.bottom = i.style.zIndex = '';
      });
    } else if (action === 'scanlines') {
      var s = $('#scanlines');
      s.hidden = !s.hidden;
    } else if (action === 'close-front') {
      var top = topWindow();
      if (top) closeWindow(top);
    }
  }

  /* The classified file. You were warned. */
  $('#file-donotopen').addEventListener('click', function () {
    showDialog(
      'DO_NOT_OPEN.TXT is classified.',
      [
        { label: 'Cancel' },
        {
          label: 'Open Anyway',
          primary: true,
          onClick: function () { window.open(RICKROLL, '_blank', 'noopener'); }
        }
      ]
    );
  });

  /* ---------- Dialog ---------- */

  function showDialog(text, buttons) {
    var overlay = document.createElement('div');
    overlay.className = 'dialog-overlay';
    var dialog = document.createElement('div');
    dialog.className = 'dialog';
    dialog.setAttribute('role', 'alertdialog');
    dialog.setAttribute('aria-label', text);

    var row = document.createElement('div');
    row.className = 'dialog__row';
    row.innerHTML = '<svg class="pix" aria-hidden="true"><use href="#i-warn"/></svg>';
    var p = document.createElement('p');
    p.className = 'dialog__text';
    p.textContent = text;
    row.appendChild(p);

    var btns = document.createElement('div');
    btns.className = 'dialog__buttons';
    var primaryBtn = null;
    buttons.forEach(function (b) {
      var btn = document.createElement('button');
      btn.className = 'btn' + (b.primary ? ' btn--primary' : '');
      btn.textContent = b.label;
      btn.addEventListener('click', function () {
        overlay.remove();
        if (b.onClick) b.onClick();
      });
      if (b.primary) primaryBtn = btn;
      btns.appendChild(btn);
    });

    dialog.appendChild(row);
    dialog.appendChild(btns);
    overlay.appendChild(dialog);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) overlay.remove();
    });
    $('#dialog-root').appendChild(overlay);
    (primaryBtn || $('button', btns)).focus();
  }

  /* ---------- Keyboard ---------- */

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var overlay = $('.dialog-overlay');
      if (overlay) { overlay.remove(); return; }
      closeMenus();
      var top = topWindow();
      if (top) closeWindow(top);
    }
  });

  /* ---------- Clock ---------- */

  var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  function tickClock() {
    var d = new Date();
    var hh = String(d.getHours());
    var mm = String(d.getMinutes());
    if (mm.length < 2) mm = '0' + mm;
    $('#clock').textContent = DAYS[d.getDay()] + ' ' + hh + ':' + mm;
  }
  tickClock();
  setInterval(tickClock, 15000);

  /* ---------- Boot sequence ---------- */

  var BOOT_LINES = [
    'LEEUWOS ROM BIOS v1.0.4',
    '(C) 1984-2026 DE LEEUW SYSTEMS, AMSTERDAM',
    '',
    'CPU ........ MOS 6502 @ 1.023 MHZ ........ OK',
    'RAM ........ 640K ......................... OK',
    'DISK ....... LEEUW HD 20MB ................ OK',
    'COFFEE ..... DOUBLE ESPRESSO .............. OK',
    'NETWORK .... GITHUB PAGES ................. OK',
    '',
    'LOADING DESKTOP ...'
  ];

  function skipBootWanted() {
    if (reducedMotion) return true;
    if (window.location.search.indexOf('fast') !== -1) return true;
    try { return sessionStorage.getItem('leeuwos_booted') === '1'; } catch (err) { return false; }
  }

  function finishBoot() {
    var boot = $('#boot');
    if (boot.hidden) return;
    boot.hidden = true;
    try { sessionStorage.setItem('leeuwos_booted', '1'); } catch (err) { /* private mode */ }
    openWindow('win-readme', true);
  }

  function runBoot() {
    var boot = $('#boot');
    if (skipBootWanted()) { finishBoot(); return; }
    var out = $('#boot-text');
    var i = 0;
    var timer = setInterval(function () {
      if (i >= BOOT_LINES.length) {
        clearInterval(timer);
        setTimeout(finishBoot, 500);
        return;
      }
      out.textContent += BOOT_LINES[i] + '\n';
      i++;
    }, 130);
    function skip() {
      clearInterval(timer);
      finishBoot();
      document.removeEventListener('keydown', skip);
    }
    boot.addEventListener('click', skip);
    document.addEventListener('keydown', skip);
  }

  runBoot();

  /* ---------- For the people who open the console ---------- */

  console.log([
    '  /\\_/\\   LeeuwOS 1.0 "Waterpolo"',
    ' ( o.o )  no frameworks, no trackers, no cookies.',
    '  > ^ <   reading source code counts as a site visit.',
    '',
    'hello@: peterpaul.deleeuw@gmail.com'
  ].join('\n'));
})();
