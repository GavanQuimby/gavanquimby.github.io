// Menu, header rule, active nav link, LinkedIn embeds, copy-email
(function () {
  var header = document.querySelector('.site-header');
  var menuBtn = document.querySelector('.menu-toggle');
  var links = document.getElementById('nav-links');

  function setMenu(open) {
    if (!links || !menuBtn) return;
    links.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  if (menuBtn && links) {
    menuBtn.addEventListener('click', function () { setMenu(!links.classList.contains('open')); });
    links.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    window.matchMedia('(min-width: 861px)').addEventListener('change', function (m) { if (m.matches) setMenu(false); });
  }

  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mark the nav link for the section in view
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if ('IntersectionObserver' in window && navLinks.length) {
    var map = {};
    navLinks.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
        var id = en.target.id === 'field' || en.target.id === 'lab' ? 'work' : en.target.id === 'skills' ? 'leadership' : en.target.id;
        if (map[id]) map[id].setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main > section[id]').forEach(function (s) { spy.observe(s); });
  }

  // LinkedIn posts
  var box = document.getElementById('posts');
  if (box) {
    var posts = (window.LINKEDIN_POSTS || []).filter(function (p) { return p && p.urn; }).slice(0, 3);
    var profile = box.getAttribute('data-profile');
    if (posts.length) {
      posts.forEach(function (p, i) {
        var card = document.createElement('div');
        card.className = 'post';
        var f = document.createElement('iframe');
        f.src = 'https://www.linkedin.com/embed/feed/update/' + p.urn;
        f.height = p.height || 640;
        f.title = 'LinkedIn post: ' + (p.topic || 'post ' + (i + 1));
        f.loading = 'lazy';
        f.setAttribute('allowfullscreen', '');
        card.appendChild(f);
        var foot = document.createElement('a');
        foot.className = 'post-foot';
        foot.href = 'https://www.linkedin.com/feed/update/' + p.urn + '/';
        foot.target = '_blank'; foot.rel = 'noopener';
        foot.innerHTML = '<span>Read the full post</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';
        card.appendChild(foot);
        box.appendChild(card);
      });
    } else {
      var a = document.createElement('a');
      a.className = 'post post-empty';
      a.href = profile; a.target = '_blank'; a.rel = 'noopener';
      a.innerHTML = '<svg class="li" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg><p>Follow along on LinkedIn for what I’m working on.</p><span class="arrow-link"><span>Open my profile</span></span>';
      box.appendChild(a);
    }
  }

  // Copy email
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    var t;
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var done = function () {
        btn.classList.add('copied');
        clearTimeout(t);
        t = setTimeout(function () { btn.classList.remove('copied'); }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { window.location.href = 'mailto:' + text; });
      } else { window.location.href = 'mailto:' + text; }
    });
  });

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
