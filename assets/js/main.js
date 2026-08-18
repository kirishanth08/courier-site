/* ============================================
   SwiftShip Courier - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  initPreloader();
  initThemeToggle();
  initRTLToggle();
  initNavbar();
  initMobileMenu();
  initScrollTop();
  initScrollAnimations();
  initCounters();
  initTabs();
  initDropdowns();
  initRateCalculator();
  initShipmentTracker();
  initBookingForm();
  initBlogFilter();
  initFAQAccordion();
  initDashboardSidebar();
  initCharts();
  // Redraw dashboard charts after external styles/layout have finished applying.
  window.addEventListener('load', function() {
    setTimeout(function() { initCharts(); }, 150);
  });
  window.addEventListener('resize', function() {
    clearTimeout(window.__swiftshipChartResize);
    window.__swiftshipChartResize = setTimeout(function() { initCharts(); }, 120);
  });
  initSmoothReveal();
  initParallax();
  initMagneticButtons();
  initCardTilt();
  initRippleEffect();
});

/* ---------- Preloader ---------- */
function initPreloader() {
  var preloader = document.getElementById('preloader');
  if (!preloader) return;
  window.addEventListener('load', function() {
    setTimeout(function() { preloader.style.opacity = '0'; preloader.style.pointerEvents = 'none'; }, 400);
    setTimeout(function() { preloader.style.display = 'none'; }, 900);
  });
  setTimeout(function() { preloader.style.opacity = '0'; preloader.style.pointerEvents = 'none'; setTimeout(function() { preloader.style.display = 'none'; }, 500); }, 3000);
}

/* ---------- Theme Toggle (Dark Mode) ---------- */
function initThemeToggle() {
  var toggles = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile, #themeToggle');
  if (!toggles.length) return;

  /* Apply saved theme on load */
  var saved = localStorage.getItem('swiftship-theme');
  if (saved === 'dark') {
    document.documentElement.classList.add('dark');
  }
  updateAllThemeIcons();

  toggles.forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.documentElement.classList.toggle('dark');
      var isDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('swiftship-theme', isDark ? 'dark' : 'light');
      updateAllThemeIcons();
    });
  });
}

function updateAllThemeIcons() {
  var isDark = document.documentElement.classList.contains('dark');
  document.querySelectorAll('.theme-icon-sun').forEach(function(el) {
    el.style.display = isDark ? 'inline' : 'none';
  });
  document.querySelectorAll('.theme-icon-moon').forEach(function(el) {
    el.style.display = isDark ? 'none' : 'inline';
  });
}

/* ---------- RTL Toggle ---------- */
function initRTLToggle() {
  var toggles = document.querySelectorAll('#rtl-toggle, #rtlToggle');
  if (!toggles.length) return;

  var saved = localStorage.getItem('swiftship-rtl');
  if (saved === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar');
  }

  toggles.forEach(function(btn) {
    var currentRTL = document.documentElement.getAttribute('dir') === 'rtl';
    btn.textContent = currentRTL ? 'LTR' : 'RTL';
    btn.classList.toggle('bg-brand-500', currentRTL);
    btn.classList.toggle('text-white', currentRTL);

    btn.addEventListener('click', function() {
      var isRTL = document.documentElement.getAttribute('dir') === 'rtl';
      document.documentElement.setAttribute('dir', isRTL ? 'ltr' : 'rtl');
      document.documentElement.setAttribute('lang', isRTL ? 'en' : 'ar');
      localStorage.setItem('swiftship-rtl', isRTL ? 'ltr' : 'rtl');

      var nowRTL = !isRTL;
      this.textContent = nowRTL ? 'LTR' : 'RTL';
      this.classList.toggle('bg-brand-500', nowRTL);
      this.classList.toggle('text-white', nowRTL);
    });
  });
}

/* ---------- Sticky Navbar ---------- */
function initNavbar() {
  var navbar = document.querySelector('.navbar') || document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('shadow-md');
      navbar.style.background = document.documentElement.classList.contains('dark')
        ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.95)';
    } else {
      navbar.classList.remove('shadow-md');
      navbar.style.background = document.documentElement.classList.contains('dark')
        ? 'rgba(15,23,42,0.8)' : 'rgba(255,255,255,0.8)';
    }
  });
}

/* ---------- Mobile Menu ---------- */
function initMobileMenu() {
  var openBtn = document.getElementById('mobile-menu-open');
  var closeBtn = document.getElementById('mobile-menu-close');
  var menu = document.getElementById('mobile-menu');
  var overlay = document.getElementById('mobile-menu-overlay');
  if (!openBtn || !menu) return;

  function openMenu() {
    menu.classList.remove('translate-x-full');
    menu.classList.add('translate-x-0');
    if (overlay) { overlay.classList.remove('opacity-0', 'pointer-events-none'); overlay.classList.add('opacity-100', 'pointer-events-auto'); }
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    menu.classList.add('translate-x-full');
    menu.classList.remove('translate-x-0');
    if (overlay) { overlay.classList.add('opacity-0', 'pointer-events-none'); overlay.classList.remove('opacity-100', 'pointer-events-auto'); }
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);
  menu.querySelectorAll('a').forEach(function(link) { link.addEventListener('click', closeMenu); });

  /* Mobile dropdown toggles */
  document.querySelectorAll('.mobile-nav-item > button').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var submenu = btn.nextElementSibling;
      var icon = btn.querySelector('.fa-chevron-down');
      if (submenu) {
        submenu.classList.toggle('hidden');
        if (icon) icon.style.transform = submenu.classList.contains('hidden') ? '' : 'rotate(180deg)';
      }
    });
  });
}

/* ---------- Scroll to Top ---------- */
function initScrollTop() {
  var btn = document.getElementById('scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      btn.classList.remove('opacity-0', 'invisible', 'translate-y-4');
      btn.classList.add('opacity-100', 'visible', 'translate-y-0');
    } else {
      btn.classList.add('opacity-0', 'invisible', 'translate-y-4');
      btn.classList.remove('opacity-100', 'visible', 'translate-y-0');
    }
  });
  btn.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
}

/* ---------- Scroll Animations (IntersectionObserver) ---------- */
function initScrollAnimations() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) translateX(0) scale(1)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-animate]').forEach(function(el) {
    var anim = el.getAttribute('data-animate') || 'up';
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
    switch (anim) {
      case 'up': el.style.transform = 'translateY(40px)'; break;
      case 'down': el.style.transform = 'translateY(-40px)'; break;
      case 'left': el.style.transform = 'translateX(-40px)'; break;
      case 'right': el.style.transform = 'translateX(40px)'; break;
      case 'scale': el.style.transform = 'scale(0.9)'; break;
      default: el.style.transform = 'translateY(40px)';
    }
    observer.observe(el);
  });
}

/* ---------- Smooth Reveal for staggered children ---------- */
function initSmoothReveal() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var children = entry.target.querySelectorAll('[data-stagger]');
        children.forEach(function(child, i) {
          setTimeout(function() {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0) scale(1)';
          }, i * 100);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-stagger-group]').forEach(function(group) {
    group.querySelectorAll('[data-stagger]').forEach(function(child) {
      child.style.opacity = '0';
      child.style.transform = 'translateY(30px) scale(0.95)';
      child.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
    });
    observer.observe(group);
  });
}

/* ---------- Parallax Effect ---------- */
function initParallax() {
  var parallaxEls = document.querySelectorAll('[data-parallax]');
  if (!parallaxEls.length) return;
  window.addEventListener('scroll', function() {
    var scrollY = window.pageYOffset;
    parallaxEls.forEach(function(el) {
      var speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
      var rect = el.getBoundingClientRect();
      if (rect.bottom > -100 && rect.top < window.innerHeight + 100) {
        var offset = (scrollY - el.offsetTop) * speed;
        el.style.transform = 'translateY(' + offset + 'px)';
      }
    });
  });
}

/* ---------- Counter Animation ---------- */
function initCounters() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter-value, [data-counter]').forEach(function(el) {
    observer.observe(el);
  });
}

function animateCounter(el) {
  var target = parseInt(el.getAttribute('data-target') || el.getAttribute('data-counter'));
  var suffix = el.getAttribute('data-suffix') || '';
  if (isNaN(target)) return;
  var duration = 2000;
  var startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    var progress = Math.min((timestamp - startTime) / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    var current = Math.floor(eased * target);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ---------- Tabs ---------- */
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var group = this.closest('.tab-group');
      if (!group) return;
      group.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active', 'text-brand-500', 'border-brand-500'); });
      this.classList.add('active', 'text-brand-500', 'border-brand-500');
      var target = this.getAttribute('data-tab');
      group.querySelectorAll('.tab-content').forEach(function(c) {
        c.style.display = (c.id === target) ? 'block' : 'none';
      });
    });
  });
}

/* ---------- Dropdowns ---------- */
function initDropdowns() {
  document.querySelectorAll('.dropdown-trigger').forEach(function(trigger) {
    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      var menu = this.nextElementSibling;
      document.querySelectorAll('.dropdown-menu').forEach(function(m) { if (m !== menu) m.classList.remove('show'); });
      menu.classList.toggle('show');
    });
  });
  document.addEventListener('click', function() {
    document.querySelectorAll('.dropdown-menu').forEach(function(m) { m.classList.remove('show'); });
  });
}

/* ---------- Rate Calculator ---------- */
function initRateCalculator() {
  var weightSlider = document.getElementById('weightSlider');
  var weightDisplay = document.getElementById('weightDisplay');
  var rateDisplay = document.getElementById('rateDisplay');
  var serviceSelect = document.getElementById('deliveryService');
  if (!weightSlider) return;

  function calculateRate() {
    var weight = parseFloat(weightSlider.value) || 1;
    var service = serviceSelect ? serviceSelect.value : 'standard';
    if (weightDisplay) weightDisplay.textContent = weight + ' kg';
    var baseRate, perKg;
    switch (service) {
      case 'express': baseRate = 15; perKg = 3.5; break;
      case 'sameday': baseRate = 25; perKg = 5; break;
      case 'cargo': baseRate = 20; perKg = 2; break;
      default: baseRate = 8; perKg = 1.5;
    }
    var total = baseRate + (weight * perKg);
    if (rateDisplay) rateDisplay.textContent = '$' + total.toFixed(2);
  }

  weightSlider.addEventListener('input', calculateRate);
  if (serviceSelect) serviceSelect.addEventListener('change', calculateRate);
  calculateRate();
}

/* ---------- Shipment Tracker ---------- */
function initShipmentTracker() {
  var trackBtn = document.getElementById('trackBtn');
  var trackingInput = document.getElementById('trackingInput');
  var trackingResult = document.getElementById('trackingResult');
  if (!trackBtn) return;

  trackBtn.addEventListener('click', function() {
    var trackingNo = trackingInput ? trackingInput.value.trim() : '';
    if (!trackingNo) { showToast('Please enter a tracking number', 'warning'); return; }
    if (trackingResult) {
      trackingResult.style.display = 'block';
      trackingResult.style.opacity = '0';
      trackingResult.style.transform = 'translateY(20px)';
      setTimeout(function() {
        trackingResult.style.transition = 'opacity 0.5s, transform 0.5s';
        trackingResult.style.opacity = '1';
        trackingResult.style.transform = 'translateY(0)';
      }, 50);
      showToast('Tracking loaded for ' + trackingNo, 'success');
    }
  });
}

/* ---------- Booking Form ---------- */
function initBookingForm() {
  var form = document.getElementById('bookingForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var valid = true;
    form.querySelectorAll('[required]').forEach(function(field) {
      if (!field.value.trim()) { field.style.borderColor = '#ef4444'; valid = false; } else { field.style.borderColor = ''; }
    });
    if (valid) {
      showToast('Booking confirmed! Tracking: SS' + Math.random().toString(36).substr(2, 8).toUpperCase(), 'success');
      form.reset();
    } else {
      showToast('Please fill in all required fields', 'error');
    }
  });
}

/* ---------- Blog Filter ---------- */
function initBlogFilter() {
  var filterBtns = document.querySelectorAll('.blog-filter-btn');
  var blogCards = document.querySelectorAll('.blog-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterBtns.forEach(function(b) { b.classList.remove('bg-brand-500', 'text-white'); b.classList.add('bg-gray-200', 'dark:bg-gray-700'); });
      this.classList.add('bg-brand-500', 'text-white');
      this.classList.remove('bg-gray-200', 'dark:bg-gray-700');
      var filter = this.getAttribute('data-filter');
      blogCards.forEach(function(card) {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = '';
          setTimeout(function() { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 100);
        } else {
          card.style.opacity = '0'; card.style.transform = 'translateY(20px)';
          setTimeout(function() { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  var searchInput = document.getElementById('blogSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      var q = this.value.toLowerCase();
      blogCards.forEach(function(card) { card.style.display = card.textContent.toLowerCase().indexOf(q) > -1 ? '' : 'none'; });
    });
  }

  // Sidebar category links use the same filtering system as the top filter buttons.
  document.querySelectorAll('[data-sidebar-filter]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var filter = this.getAttribute('data-sidebar-filter');
      var matchingBtn = document.querySelector('.blog-filter-btn[data-filter="' + filter + '"]');
      if (matchingBtn) {
        matchingBtn.click();
      } else {
        blogCards.forEach(function(card) {
          var match = card.getAttribute('data-category') === filter;
          card.style.display = match ? '' : 'none';
          card.style.opacity = match ? '1' : '0';
        });
      }
      var grid = document.getElementById('blogGrid');
      if (grid) grid.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
}

/* ---------- FAQ Accordion ---------- */
function initFAQAccordion() {
  document.querySelectorAll('.faq-question').forEach(function(q) {
    q.setAttribute('type', 'button');
    q.addEventListener('click', function() {
      var faq = this.closest('.faq-item');
      var answer = faq ? faq.querySelector('.faq-answer') : null;
      var icon = this.querySelector('.faq-icon');
      if (!answer) return;

      var wasOpen = faq.classList.contains('is-open');

      // Close every other FAQ item.
      document.querySelectorAll('.faq-item').forEach(function(item) {
        item.classList.remove('is-open');
        var a = item.querySelector('.faq-answer');
        var i = item.querySelector('.faq-icon');
        var b = item.querySelector('.faq-question');
        if (a) a.style.maxHeight = '0px';
        if (i) i.style.transform = 'rotate(0deg)';
        if (b) b.setAttribute('aria-expanded', 'false');
      });

      // Toggle the clicked item.
      if (!wasOpen) {
        faq.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        if (icon) icon.style.transform = 'rotate(180deg)';
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ---------- Dashboard Sidebar ---------- */
function initDashboardSidebar() {
  var toggle = document.getElementById('sidebarToggle');
  var sidebar = document.querySelector('.sidebar');
  if (!toggle || !sidebar) return;

  toggle.addEventListener('click', function() {
    if (window.innerWidth <= 1024) {
      sidebar.classList.toggle('-translate-x-full');
      sidebar.classList.toggle('translate-x-0');
    } else {
      sidebar.classList.toggle('sidebar-collapsed');
    }
  });
}

/* ---------- Simple Canvas Charts ---------- */
function initCharts() {
  document.querySelectorAll('.chart-bar').forEach(function(c) { drawBarChart(c); });
  document.querySelectorAll('.chart-line').forEach(function(c) { drawLineChart(c); });
  document.querySelectorAll('.chart-doughnut').forEach(function(c) { drawDoughnutChart(c); });
}

function drawBarChart(canvas) {
  var ctx = canvas.getContext('2d');
  var data = JSON.parse(canvas.getAttribute('data-values') || '[]');
  var labels = JSON.parse(canvas.getAttribute('data-labels') || '[]');
  var parentWidth = canvas.parentElement ? canvas.parentElement.getBoundingClientRect().width : 0;
  var w = canvas.width = Math.max(320, Math.floor(parentWidth || 320));
  var h = canvas.height = 300;
  var pad = 50;
  var maxVal = Math.max.apply(null, data) * 1.2;
  var bw = (w - pad * 2) / data.length * 0.6;
  var gap = (w - pad * 2) / data.length;
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 0.5;
  for (var i = 0; i <= 5; i++) { var y = pad + (h - pad * 2) * i / 5; ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(w - pad, y); ctx.stroke(); }
  data.forEach(function(val, idx) {
    var bh = (val / maxVal) * (h - pad * 2);
    var x = pad + gap * idx + (gap - bw) / 2;
    var y = h - pad - bh;
    var g = ctx.createLinearGradient(0, y, 0, h - pad); g.addColorStop(0, '#f97316'); g.addColorStop(1, '#fb923c');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.roundRect(x, y, bw, bh, [4, 4, 0, 0]); ctx.fill();
    ctx.fillStyle = '#94a3b8'; ctx.font = '11px Inter, sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(labels[idx] || '', x + bw / 2, h - pad + 20);
    ctx.fillStyle = '#f97316'; ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillText('$' + val.toLocaleString(), x + bw / 2, y - 8);
  });
}

function drawLineChart(canvas) {
  var ctx = canvas.getContext('2d');
  var data = JSON.parse(canvas.getAttribute('data-values') || '[]');
  var labels = JSON.parse(canvas.getAttribute('data-labels') || '[]');
  var parentWidth = canvas.parentElement ? canvas.parentElement.getBoundingClientRect().width : 0;
  var w = canvas.width = Math.max(320, Math.floor(parentWidth || 320));
  var h = canvas.height = 300;
  var pad = 50;
  var maxVal = Math.max.apply(null, data) * 1.2;
  var gap = (w - pad * 2) / (data.length - 1);
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 0.5;
  for (var i = 0; i <= 5; i++) { var y = pad + (h - pad * 2) * i / 5; ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(w - pad, y); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(pad, h - pad);
  data.forEach(function(val, idx) { ctx.lineTo(pad + gap * idx, h - pad - (val / maxVal) * (h - pad * 2)); });
  ctx.lineTo(pad + gap * (data.length - 1), h - pad); ctx.closePath();
  var ag = ctx.createLinearGradient(0, pad, 0, h - pad); ag.addColorStop(0, 'rgba(249,115,22,0.3)'); ag.addColorStop(1, 'rgba(249,115,22,0.02)');
  ctx.fillStyle = ag; ctx.fill();
  ctx.beginPath(); ctx.strokeStyle = '#f97316'; ctx.lineWidth = 2.5; ctx.lineJoin = 'round';
  data.forEach(function(val, idx) { var x = pad + gap * idx; var y = h - pad - (val / maxVal) * (h - pad * 2); idx === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); });
  ctx.stroke();
  data.forEach(function(val, idx) {
    var x = pad + gap * idx; var y = h - pad - (val / maxVal) * (h - pad * 2);
    ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fillStyle = '#f97316'; ctx.fill();
    ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill();
  });
  ctx.fillStyle = '#94a3b8'; ctx.font = '11px Inter, sans-serif'; ctx.textAlign = 'center';
  labels.forEach(function(l, idx) { ctx.fillText(l, pad + gap * idx, h - pad + 20); });
}

function drawDoughnutChart(canvas) {
  var ctx = canvas.getContext('2d');
  var data = JSON.parse(canvas.getAttribute('data-values') || '[]');
  var colors = JSON.parse(canvas.getAttribute('data-colors') || '[]');
  var w = canvas.width = 200; var h = canvas.height = 200;
  var cx = w / 2, cy = h / 2, r = 80, ir = 50;
  var total = data.reduce(function(a, b) { return a + b; }, 0);
  var sa = -Math.PI / 2;
  ctx.clearRect(0, 0, w, h);
  data.forEach(function(val) {
    var sa2 = (val / total) * Math.PI * 2;
    ctx.beginPath(); ctx.arc(cx, cy, r, sa, sa + sa2); ctx.arc(cx, cy, ir, sa + sa2, sa, true); ctx.closePath();
    ctx.fillStyle = colors[data.indexOf(val)] || '#ccc'; ctx.fill(); sa += sa2;
  });
  ctx.fillStyle = '#0f172a'; ctx.font = 'bold 20px Inter, sans-serif'; ctx.textAlign = 'center';
  ctx.fillText(total.toLocaleString(), cx, cy + 2);
  ctx.fillStyle = '#94a3b8'; ctx.font = '11px Inter, sans-serif'; ctx.fillText('Total', cx, cy + 18);
}

/* ---------- Toast Notification ---------- */
function showToast(message, type) {
  var existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();
  var toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.style.cssText = 'position:fixed;top:100px;right:20px;z-index:99999;padding:1rem 1.5rem;border-radius:0.75rem;color:#fff;font-weight:500;font-size:0.9rem;box-shadow:0 20px 25px -5px rgba(0,0,0,0.1);max-width:400px;transform:translateX(120%);transition:transform 0.4s cubic-bezier(0.16,1,0.3,1),opacity 0.3s;opacity:1;';
  switch(type) {
    case 'success': toast.style.background = '#22c55e'; break;
    case 'error': toast.style.background = '#ef4444'; break;
    case 'warning': toast.style.background = '#eab308'; toast.style.color = '#1a1a1a'; break;
    default: toast.style.background = '#06b6d4';
  }
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(function() { toast.style.transform = 'translateX(0)'; });
  setTimeout(function() { toast.style.transform = 'translateX(120%)'; setTimeout(function() { toast.remove(); }, 400); }, 3500);
}

/* ---------- Helpers ---------- */
function formatCurrency(amount) { return '$' + parseFloat(amount).toFixed(2); }

/* ---------- Magnetic Button Effect ---------- */
function initMagneticButtons() {
  document.querySelectorAll('.btn-magnetic').forEach(function(btn) {
    btn.addEventListener('mousemove', function(e) {
      var rect = btn.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = 'translate(' + (x * 0.3) + 'px, ' + (y * 0.3) + 'px)';
    });
    btn.addEventListener('mouseleave', function() {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

/* ---------- Card Tilt Effect ---------- */
function initCardTilt() {
  document.querySelectorAll('.card-tilt').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = 'perspective(800px) rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 8) + 'deg) translateY(-4px)';
    });
    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateY(0)';
    });
  });
}

/* ---------- Ripple Click Effect ---------- */
function initRippleEffect() {
  document.querySelectorAll('.ripple').forEach(function(el) {
    el.addEventListener('click', function(e) {
      var rect = el.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--ripple-x', x + '%');
      el.style.setProperty('--ripple-y', y + '%');
    });
  });
}

/* ---------- Dashboard chart bootstrap ---------- */
document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('.chart-line, .chart-doughnut, .chart-bar')) {
    initCharts();
    setTimeout(initCharts, 250);
  }
});
window.addEventListener('load', function () {
  if (document.querySelector('.chart-line, .chart-doughnut, .chart-bar')) {
    initCharts();
  }
});
window.addEventListener('resize', function () {
  clearTimeout(window.__swiftshipChartTimer);
  window.__swiftshipChartTimer = setTimeout(function () {
    if (document.querySelector('.chart-line, .chart-doughnut, .chart-bar')) initCharts();
  }, 120);
});
