/* ==========================================================================
   NILU SHAH — PORTFOLIO INTERACTIVE MASTER ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initAmbientCanvas();
  initSidebarMenu();
  initHeaderScroll();
  initHiddenBioCard();
  init3DTilt();
  initPortfolioFilters();
  initModals();
  initSkillMeters();
  initContactForm();
  initThemeToggle();
  initLiveClock();
});

/* ==========================================================================
   1. CUSTOM MAGNETIC CURSOR
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  let posX = 0, posY = 0;
  let mouseX = 0, mouseY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  function loop() {
    posX += (mouseX - posX) * 0.15;
    posY += (mouseY - posY) * 0.15;

    follower.style.left = `${posX}px`;
    follower.style.top = `${posY}px`;

    requestAnimationFrame(loop);
  }
  loop();

  // Hover target reaction
  const hoverTargets = document.querySelectorAll('.hover-target, a, button, input, textarea');
  hoverTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
    target.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
  });
}

/* ==========================================================================
   2. AMBIENT PARTICLE CANVAS
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 25), 45);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      color: i % 2 === 0 ? 'rgba(124, 58, 237, 0.4)' : 'rgba(6, 182, 212, 0.4)'
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(124, 58, 237, ${0.15 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(render);
  }
  render();
}

/* ==========================================================================
   3. SIDEBAR CURTAIN NAVIGATION
   ========================================================================== */
function initSidebarMenu() {
  const menuToggle = document.getElementById('menu-toggle-btn');
  const sidebar = document.getElementById('sidebar-curtain');
  const overlay = document.getElementById('sidebar-overlay');
  const closeBtn = document.getElementById('sidebar-close-btn');
  const navLinks = document.querySelectorAll('.sidebar-link');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  }

  if (menuToggle) menuToggle.addEventListener('click', openSidebar);
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);

  navLinks.forEach((link) => {
    link.addEventListener('click', closeSidebar);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });
}

/* ==========================================================================
   4. HEADER SCROLL & BACK TO TOP
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   5. INTERACTIVE HIDDEN BIO CARD (FROM SKETCH REQUIREMENT)
   ========================================================================== */
function initHiddenBioCard() {
  const card = document.getElementById('hidden-bio-card');
  if (!card) return;

  card.addEventListener('click', () => {
    card.classList.toggle('expanded');
    const chevron = card.querySelector('.fa-chevron-down');
    if (chevron) {
      chevron.style.transform = card.classList.contains('expanded') ? 'rotate(180deg)' : 'rotate(0deg)';
      chevron.style.transition = 'transform 0.3s ease';
    }
  });
}

/* ==========================================================================
   6. 3D PARALLAX TILT EFFECT ON HERO PHOTO
   ========================================================================== */
function init3DTilt() {
  const photoFrame = document.getElementById('hero-photo-frame');
  if (!photoFrame) return;

  photoFrame.addEventListener('mousemove', (e) => {
    const rect = photoFrame.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (y / rect.height) * -20;
    const tiltY = (x / rect.width) * 20;

    photoFrame.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.03)`;
  });

  photoFrame.addEventListener('mouseleave', () => {
    photoFrame.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
  });
}

/* ==========================================================================
   7. PORTFOLIO FILTER TABS
   ========================================================================== */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   8. MODALS & CASE STUDY PREVIEWS
   ========================================================================== */
const projectData = {
  1: {
    title: "Aether Fintech Analytics Dashboard",
    category: "Web Application / FinTech",
    image: "assets/images/project_fintech.jpg",
    description: "Aether is a high-performance financial analytics suite built for institutional traders. Featuring real-time WebSockets data feeds, custom canvas-rendered charts, and light/dark high-contrast rendering mode.",
    tech: ["JavaScript ES6+", "HTML5 Canvas", "CSS3 Custom Variables", "REST APIs", "WebSocket"],
    client: "Aether Capital LLC",
    year: "2026"
  },
  2: {
    title: "Nexus Generative AI Creative Studio",
    category: "Interactive Web App",
    image: "assets/images/project_ai_studio.jpg",
    description: "Nexus empowers creators with AI asset generation in a web-native environment. Includes canvas composition tools, layer blend controls, and immediate GPU-accelerated texture previews.",
    tech: ["WebGL", "Node.js", "Vanilla JS", "Design Systems", "WebAssembly"],
    client: "Nexus Labs",
    year: "2025"
  },
  3: {
    title: "Vogue Luxe E-Commerce Platform",
    category: "UI/UX & Front-End",
    image: "assets/images/project_ecommerce.jpg",
    description: "An ultra-sleek luxury storefront designed with editorial typography, smooth animated page transitions, fluid filtering controls, and responsive micro-interactions.",
    tech: ["HTML5", "CSS Flexbox/Grid", "JavaScript ES6+", "Web Animations API"],
    client: "Vogue Maison",
    year: "2025"
  }
};

const blogData = {
  1: {
    title: "Learning From Core Everyday: Deep Dive Into Event Loop & Microtasks",
    date: "July 18, 2026",
    category: "Core JavaScript",
    content: `<p>To build award-winning web applications, relying solely on abstractions isn't enough. One must understand the core execution thread, call stack, microtask queue, and browser render phase.</p><br><p>When scheduling DOM mutations, utilizing <code>requestAnimationFrame</code> over asynchronous timeouts prevents layout thrashing and guarantees 60fps fluidity.</p>`
  },
  2: {
    title: "Designing Award-Winning Websites Without Heavy Frameworks",
    date: "June 24, 2026",
    category: "CSS Architecture",
    content: `<p>Vanilla web technologies have evolved dramatically. Modern CSS custom properties, <code>backdrop-filter</code>, and subgrid allow developers to construct luxury interfaces with minimal JavaScript overhead and instantaneous load times.</p>`
  },
  3: {
    title: "The Art of Micro-Animations & Cognitive Ergonomics",
    date: "May 10, 2026",
    category: "UI/UX Craft",
    content: `<p>Micro-interactions provide crucial sensory feedback to users. From magnetic hover effects to spring physics on modal dialogs, subtle motion design communicates reactivity and premium craftsmanship.</p>`
  }
};

function initModals() {
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalContent = document.getElementById('modal-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function openModal(html) {
    modalContent.innerHTML = html;
    modalBackdrop.classList.add('active');
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  // Project Click Event
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-project-id');
      const data = projectData[id];
      if (!data) return;

      const html = `
        <div style="text-align: left;">
          <span style="color: var(--accent-cyan); font-weight: 600; font-size: 0.85rem; text-transform: uppercase;">${data.category}</span>
          <h2 style="font-family: var(--font-display); font-size: 2rem; margin: 10px 0 20px; color: var(--text-primary);">${data.title}</h2>
          <div style="width: 100%; height: 300px; border-radius: 12px; overflow: hidden; margin-bottom: 20px;">
            <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px;">${data.description}</p>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 25px;">
            ${data.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 15px;">
            <span style="font-size: 0.9rem; color: var(--text-muted);">Client: ${data.client} (${data.year})</span>
            <button class="btn btn-primary" onclick="alert('Launching live demo sandbox...')">Live Demo <i class="fa-solid fa-arrow-up-right-from-square"></i></button>
          </div>
        </div>
      `;
      openModal(html);
    });
  });

  // Blog Click Event
  document.querySelectorAll('.blog-card').forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-blog-id');
      const data = blogData[id];
      if (!data) return;

      const html = `
        <div style="text-align: left;">
          <span style="color: var(--accent-purple); font-weight: 600; font-size: 0.85rem; text-transform: uppercase;">${data.category} • ${data.date}</span>
          <h2 style="font-family: var(--font-title); font-size: 1.8rem; margin: 15px 0 20px; color: var(--text-primary);">${data.title}</h2>
          <div style="color: var(--text-secondary); line-height: 1.7; font-size: 1rem;">
            ${data.content}
          </div>
        </div>
      `;
      openModal(html);
    });
  });
}

/* ==========================================================================
   9. SKILL METERS SCROLL ANIMATION
   ========================================================================== */
function initSkillMeters() {
  const skillBars = document.querySelectorAll('.skill-bar');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progress = entry.target.getAttribute('data-progress');
        entry.target.style.width = `${progress}%`;
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach((bar) => observer.observe(bar));
}

/* ==========================================================================
   10. CONTACT FORM VALIDATION & TOAST
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...`;
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = `<i class="fa-solid fa-check"></i> Message Sent!`;
      btn.style.background = 'var(--accent-green)';

      showToast('Thank you! Nilu Shah has received your message.');
      form.reset();

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 1200);
  });
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent-green);"></i> <span>${message}</span>`;

  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 4500);
}

/* ==========================================================================
   11. THEME SWITCHER (DARK / LIGHT MODE)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  if (!toggleBtn || !icon) return;

  const savedTheme = localStorage.getItem('nilu-portfolio-theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    icon.className = 'fa-solid fa-sun';
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');

    icon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    localStorage.setItem('nilu-portfolio-theme', isLight ? 'light' : 'dark');
  });
}

/* ==========================================================================
   12. LIVE CLOCK WIDGET
   ========================================================================== */
function initLiveClock() {
  const clockEl = document.getElementById('local-clock');
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');

    clockEl.textContent = `${hours}:${mins}:${secs} (UTC+5:45)`;
  }
  updateClock();
  setInterval(updateClock, 1000);
}
