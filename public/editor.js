// The tabs switch files in place, and the address follows the file. Each file
// also has its own page, so a tab is an ordinary link without this script.
// A click, a tap or the arrow keys put the caret somewhere else in the file;
// nothing can be typed.
(function () {
  var files = {
    swift: { name: 'PlusPlus.swift', lang: 'Swift', line: 14, col: 5, title: 'PlusPlus (++): a workout tracker for incrementing yourself' },
    privacy: { name: 'Privacy.md', lang: 'Markdown', line: 0, col: 0, title: 'Privacy: PlusPlus (++)' }
  };
  var tabs = [].slice.call(document.querySelectorAll('.tab')), current;
  tabs.forEach(function (t) {
    var f = files[t.dataset.tab];
    f.url = t.href;
    f.pane = document.getElementById('pane-' + t.dataset.tab);
    f.rows = [].slice.call(f.pane.children);
    f.caret = f.pane.appendChild(document.createElement('span'));
    f.caret.className = 'caret';
    if (t.classList.contains('on')) current = t.dataset.tab;
  });

  function text(row) { return row.querySelector('.line').textContent.replace(/\s+$/, ''); }

  // A collapsed range at a character offset in a row's text.
  function rangeAt(row, offset) {
    var walk = document.createTreeWalker(row.querySelector('.line'), NodeFilter.SHOW_TEXT), node, last, r = document.createRange();
    while ((node = walk.nextNode())) {
      last = node;
      if (offset <= node.length) { r.setStart(node, offset); return r; }
      offset -= node.length;
    }
    r.setStart(last, last.length);
    return r;
  }

  function place(f) {
    f.line = Math.max(0, Math.min(f.line, f.rows.length - 1));
    var row = f.rows[f.line];
    f.col = Math.max(0, Math.min(f.col, text(row).length));
    f.rows.forEach(function (r, i) { r.classList.toggle('cur', i === f.line); });
    var range = rangeAt(row, f.col), box = range.getClientRects()[0] || range.getBoundingClientRect();
    var pane = f.pane.getBoundingClientRect();
    if (!box || !box.height) { box = row.querySelector('.line').getBoundingClientRect(); }
    f.caret.style.transform = 'translate(' + (box.left - pane.left) + 'px,' + (box.top - pane.top) + 'px)';
    f.caret.style.height = f.caret.style.lineHeight = box.height + 'px';
    // Start the blink over, so the caret shows the moment it lands.
    f.caret.style.animation = 'none'; void f.caret.offsetWidth; f.caret.style.animation = '';
    if (f === files[current]) document.getElementById('pos').textContent = (f.line + 1) + ':' + (f.col + 1);
  }

  function show(id) {
    current = id;
    var f = files[id];
    tabs.forEach(function (t) {
      var on = t.dataset.tab === id;
      t.classList.toggle('on', on);
      if (on) t.setAttribute('aria-current', 'page'); else t.removeAttribute('aria-current');
    });
    Object.keys(files).forEach(function (k) { files[k].pane.hidden = k !== id; });
    document.getElementById('crumb').textContent = f.name;
    document.getElementById('lang').textContent = f.lang;
    document.title = f.title;
    place(f);
  }

  function fromAddress() {
    function bare(u) { return u.split('#')[0].replace(/\/$/, ''); }
    show(bare(location.href) === bare(files.privacy.url) ? 'privacy' : 'swift');
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      if (!t.classList.contains('on')) history.pushState(null, '', t.href);
      show(t.dataset.tab); scrollTo(0, 0);
    });
  });
  addEventListener('popstate', fromAddress);

  // Where in a row's text a point on the screen falls.
  function offsetAt(row, x, y) {
    var line = row.querySelector('.line'), node, offset;
    if (document.caretPositionFromPoint) {
      var p = document.caretPositionFromPoint(x, y); if (p) { node = p.offsetNode; offset = p.offset; }
    } else if (document.caretRangeFromPoint) {
      var c = document.caretRangeFromPoint(x, y); if (c) { node = c.startContainer; offset = c.startOffset; }
    }
    if (!node || !line.contains(node)) return x < line.getBoundingClientRect().left ? 0 : Infinity;
    var before = document.createRange(); before.setStart(line, 0); before.setEnd(node, offset);
    return before.toString().length;
  }

  Object.keys(files).forEach(function (id) {
    var f = files[id];
    f.pane.addEventListener('click', function (e) {
      if (e.target.closest('a') || !getSelection().isCollapsed) return;
      var row = e.target.closest('li'); if (!row) return;
      f.line = f.rows.indexOf(row);
      f.col = offsetAt(row, e.clientX, e.clientY);
      place(f);
    });
  });

  addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var f = files[current], move = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }[e.key];
    if (!move) return;
    e.preventDefault();
    f.line += move[0]; f.col += move[1];
    place(f);
    f.rows[f.line].scrollIntoView({ block: 'nearest' });
  });

  addEventListener('resize', function () { place(files[current]); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { place(files[current]); });
  place(files[current]);
})();
