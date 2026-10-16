/* ═════════ THE WHEELHOUSE — main.js ═════════ */
(function () {
  'use strict';

  /* ── data ── */
  const MENU = [
    {cat:'sandwiches', name:'The TBS', price:'', desc:'The famous one — stacked high enough to be lunch AND dinner. A Wheelhouse legend.', badge:'Fan Favorite', img:'images/club.jpg'},
    {cat:'sandwiches', name:'Reuben', price:'', desc:'Corned beef, sauerkraut, Swiss and dressing grilled on rye. "The best around."', badge:'Best Seller', img:'images/reuben.jpg'},
    {cat:'sandwiches', name:'Chicken Club on Rye', price:'', desc:'Turkey-style club stacked on marble rye with bacon, lettuce, tomato and mayo.', badge:'', img:'images/club.jpg'},
    {cat:'sandwiches', name:'Captain\u2019s Club Wrap', price:'', desc:'Loaded wrap with fresh, never-overripe veggies. A crew favorite.', badge:'', img:'images/spread.jpg'},
    {cat:'sandwiches', name:'Turkey Cucumber Wrap', price:'', desc:'High-quality sliced turkey, crisp cucumber and fresh garden veggies.', badge:'', img:'images/spread.jpg'},
    {cat:'sandwiches', name:'Homemade Chicken Salad', price:'', desc:'Made from scratch every single morning. Available by the scoop or the pound.', badge:'Made Daily', img:'images/deli.png'},
    {cat:'sandwiches', name:'Homemade Egg Salad', price:'', desc:'Just like grandma made it — fresh every day, perfect for later, too.', badge:'Made Daily', img:'images/deli.png'},
    {cat:'dogs', name:'WV Hot Dog', price:'', desc:'Chili and creamy coleslaw on a steamed bun — the West Virginia way.', badge:'Local Classic', img:'images/hotdog1.png'},
    {cat:'dogs', name:'Double Slaw Dog Basket', price:'', desc:'Two slaw-topped dogs with a bag of chips. Pure Bridge Road comfort.', badge:'', img:'images/slawdog.png'},
    {cat:'dogs', name:'Chili Cheese Dog', price:'', desc:'Hearty chili and melted cheese over an all-beef frank.', badge:'', img:'images/hotdog2.png'},
    {cat:'dogs', name:'BBQ Sandwich', price:'', desc:'Smoky, saucy and served with crinkle fries or chips.', badge:'', img:'images/spread.jpg'},
    {cat:'soups', name:'Soup of the Day', price:'', desc:'Chili, stuffed pepper soup, and rotating seasonal pots — check Facebook for today\u2019s.', badge:'Rotates Daily', img:'images/spread.jpg'},
    {cat:'bakery', name:'Crumbcake', price:'', desc:'Buttery, generous-crumb slices that sell out fast.', badge:'Baked Fresh', img:'images/storefront.jpg'},
    {cat:'bakery', name:'Babka & Cinnamon Rolls', price:'', desc:'Swirled, sweet and baked in-house. Pair with a coffee.', badge:'Baked Fresh', img:'images/deli.png'},
    {cat:'bakery', name:'Turnovers & Cookies', price:'', desc:'Fruit turnovers, oatmeal cookies, coconut macaroons and more from the case.', badge:'Baked Fresh', img:'images/hotdog3.png'},
    {cat:'scoops', name:'Hand-Scooped Ice Cream', price:'', desc:'Classic scoops in cups or cones — the cherry on top of lunch.', badge:'', img:'images/spread.jpg'},
    {cat:'scoops', name:'Old-Fashioned Milkshakes', price:'', desc:'Thick, hand-spun shakes in rotating flavors.', badge:'', img:'images/spread.jpg'},
  ];

  const GALLERY = [
    {src:'images/storefront.jpg', alt:'The Wheelhouse storefront at 1007 Bridge Rd'},
    {src:'images/spread.jpg', alt:'Cheesesteaks, ice cream, shakes and fries'},
    {src:'images/club.jpg', alt:'Chicken club sandwich on marble rye'},
    {src:'images/reuben.jpg', alt:'Reuben sandwich with chips and a pickle'},
    {src:'images/hotdog1.png', alt:'WV hot dog with chili and slaw'},
    {src:'images/slawdog.png', alt:'Slaw dogs with chips and a cold Nehi'},
    {src:'images/hotdog2.png', alt:'Chili dogs in the basket'},
    {src:'images/hotdog3.png', alt:'Fresh baked goods from the case'},
    {src:'images/storefront2.png', alt:'The Wheelhouse at Bridge Road Shops'},
    {src:'images/deli.png', alt:'Fresh deli sandwiches'},
  ];

  const REVIEWS = [
    {stars:5, text:'\u201CThe Reuben is the best around. The soup of the day was chili and it was great. The food is always packaged well.\u201D', cite:'Trevor S · DoorDash'},
    {stars:5, text:'\u201CThe Captain\u2019s Club Wrap was wonderful and worth every penny. Lots of fresh ingredients — never over-ripe. Everything was very tasty as always.\u201D', cite:'Alisa C · DoorDash'},
    {stars:5, text:'\u201CThe TBS was amazing and HUGE — could definitely make for lunch and dinner. Our order was ready SUPER fast.\u201D', cite:'Stacey S · DoorDash'},
    {stars:5, text:'\u201CStuffed pepper soup of the day was amazing! The Turkey Cucumber Wrap was also fantastic. All of the veggies were really fresh.\u201D', cite:'Mary S · DoorDash'},
    {stars:5, text:'\u201CRanked #37 of 202 restaurants in Charleston — a wonderful place to grab lunch.\u201D', cite:'TripAdvisor · 4.5 / 5'},
  ];

  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* ── nav: scrolled, mobile, hamburger ── */
  const nav = $('#nav');
  const navLinks = $('#navLinks');
  const burger = $('#hamburger');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
    $('#toTop').classList.toggle('show', window.scrollY > 600);
  }, {passive:true});
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.addEventListener('click', e => {
    if (e.target.tagName === 'A') { burger.classList.remove('open'); navLinks.classList.remove('open'); }
  });
  $('#toTop').addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  /* ── hero slideshow ── */
  const slides = $$('.hero-slide');
  const dotsWrap = $('#heroDots');
  let cur = 0, timer;
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', 'Slide ' + (i + 1));
    if (i === 0) b.classList.add('is-on');
    b.addEventListener('click', () => goSlide(i));
    dotsWrap.appendChild(b);
  });
  const dots = $$('button', dotsWrap);
  function goSlide(i) {
    slides[cur].classList.remove('is-active');
    dots[cur].classList.remove('is-on');
    cur = (i + slides.length) % slides.length;
    slides[cur].classList.add('is-active');
    dots[cur].classList.add('is-on');
    restartHero();
  }
  function restartHero() { clearInterval(timer); timer = setInterval(() => goSlide(cur + 1), 6000); }
  $('#heroPrev').addEventListener('click', () => goSlide(cur - 1));
  $('#heroNext').addEventListener('click', () => goSlide(cur + 1));
  restartHero();

  /* ── menu: render + filter ── */
  const grid = $('#menuGrid');
  function renderMenu(cat) {
    grid.innerHTML = '';
    MENU.filter(m => cat === 'all' || m.cat === cat).forEach((m, i) => {
      const card = document.createElement('article');
      card.className = 'menu-card';
      card.innerHTML =
        '<img src="' + m.img + '" alt="' + m.name + '" loading="lazy">' +
        '<div class="menu-card-body"><h3><span>' + m.name + '</span>' + (m.price ? '<span class="price">' + m.price + '</span>' : '') + '</h3>' +
        '<p>' + m.desc + '</p>' +
        (m.badge ? '<span class="badge">' + m.badge + '</span>' : '') + '</div>';
      grid.appendChild(card);
      setTimeout(() => card.classList.add('shown'), 60 * i);
    });
  }
  $('#menuTabs').addEventListener('click', e => {
    const btn = e.target.closest('.tab');
    if (!btn) return;
    $$('.tab').forEach(t => t.classList.remove('is-on'));
    btn.classList.add('is-on');
    renderMenu(btn.dataset.cat);
  });
  renderMenu('all');

  /* ── gallery + lightbox ── */
  const gal = $('#galleryGrid');
  GALLERY.forEach((g, i) => {
    const d = document.createElement('div');
    d.className = 'g-item';
    d.innerHTML = '<img src="' + g.src + '" alt="' + g.alt + '" loading="lazy">';
    d.addEventListener('click', () => openLB(i));
    gal.appendChild(d);
  });
  const lb = $('#lightbox'), lbImg = $('#lbImg');
  let lbIdx = 0;
  function openLB(i) { lbIdx = i; lbImg.src = GALLERY[i].src; lbImg.alt = GALLERY[i].alt; lb.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeLB() { lb.classList.remove('open'); document.body.style.overflow = ''; }
  function stepLB(d) { openLB((lbIdx + d + GALLERY.length) % GALLERY.length); }
  $('#lbClose').addEventListener('click', closeLB);
  $('#lbPrev').addEventListener('click', e => { e.stopPropagation(); stepLB(-1); });
  $('#lbNext').addEventListener('click', e => { e.stopPropagation(); stepLB(1); });
  lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowLeft') stepLB(-1);
    if (e.key === 'ArrowRight') stepLB(1);
  });

  /* ── reviews slider ── */
  const track = $('#reviewTrack'), rdots = $('#reviewDots');
  REVIEWS.forEach((r, i) => {
    const s = document.createElement('div');
    s.className = 'review';
    s.innerHTML = '<div class="stars">' + '\u2605'.repeat(r.stars) + '</div><blockquote>' + r.text + '</blockquote><cite>' + r.cite + '</cite>';
    track.appendChild(s);
    const b = document.createElement('button');
    b.setAttribute('aria-label', 'Review ' + (i + 1));
    if (i === 0) b.classList.add('is-on');
    b.addEventListener('click', () => goReview(i));
    rdots.appendChild(b);
  });
  const rbtns = $$('button', rdots);
  let rCur = 0, rTimer;
  function goReview(i) {
    rCur = (i + REVIEWS.length) % REVIEWS.length;
    track.style.transform = 'translateX(-' + rCur * 100 + '%)';
    rbtns.forEach((b, j) => b.classList.toggle('is-on', j === rCur));
    clearInterval(rTimer);
    rTimer = setInterval(() => goReview(rCur + 1), 5500);
  }
  rTimer = setInterval(() => goReview(rCur + 1), 5500);

  /* ── hours: highlight today ── */
  const day = new Date().getDay();
  $$('#hoursTable tr').forEach(tr => {
    if (tr.dataset.days.split(',').map(Number).includes(day)) tr.classList.add('today');
  });

  /* ── stats counters ── */
  function animateNum(el) {
    const target = parseFloat(el.dataset.target);
    const dec = parseInt(el.dataset.decimal || '0', 10);
    const suffix = el.dataset.suffix || '';
    const dur = 1400, t0 = performance.now();
    function tick(t) {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(dec) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ── reveal on scroll + trigger counters ── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      $$('.stat-num', en.target).forEach(n => { if (!n.dataset.done) { n.dataset.done = '1'; animateNum(n); } });
      io.unobserve(en.target);
    });
  }, {threshold: 0.18});
  $$('.reveal').forEach(el => io.observe(el));
})();
