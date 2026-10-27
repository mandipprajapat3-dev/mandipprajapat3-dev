/**
 * Mandip Prajapat - Professional Portfolio Website Scripts
 * Features:
 * - Scroll Progress Indicator
 * - Dark / Light Mode Toggle with LocalStorage
 * - Responsive Navigation Drawer & Active Scrollspy
 * - IntersectionObserver Scroll Reveal Animations
 * - Dynamic Project Detail Modal Dialogs
 * - Curriculum Vitae (Resume) In-Page Preview Modal
 * - Interactive Contact Form with Validation & Mailto Action
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. SCROLL PROGRESS INDICATOR
  // =========================================================================
  const progressBar = document.getElementById('progressBar');

  const updateScrollProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  };

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // =========================================================================
  // 2. THEME SWITCHER (DARK / LIGHT MODE - DEFAULT PREMIUM DARK)
  // =========================================================================
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('mandip-portfolio-theme-v3') || 'dark';
  
  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('mandip-portfolio-theme-v3', theme);
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }
  }

  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = htmlRoot.getAttribute('data-theme');
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  // =========================================================================
  // 3. RESPONSIVE NAVIGATION DRAWER & SCROLLSPY
  // =========================================================================
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-links a');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      navLinks.classList.toggle('open', !isOpen);
    });

    navItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scrollspy to set active class on current section link
  const sections = document.querySelectorAll('section[id]');
  function updateScrollspy() {
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href*='${id}']`);

      if (link) {
        if (scrollPos >= top && scrollPos < top + height) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }
  window.addEventListener('scroll', updateScrollspy, { passive: true });

  // =========================================================================
  // 4. INTERSECTION OBSERVER FOR SCROLL REVEAL
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // =========================================================================
  // 5. PROJECT DETAIL MODAL DATA & HANDLERS
  // =========================================================================
  const projectModal = document.getElementById('projectModal');
  const projectModalTitle = document.getElementById('projectModalTitle');
  const projectModalBody = document.getElementById('projectModalBody');
  const closeProjectModal = document.getElementById('closeProjectModal');
  const projectModalCloseBtn = document.getElementById('projectModalCloseBtn');

  const projectDetailsMap = {
    'train-coach-mgmt': {
      title: 'Train Coach Management System',
      badge: 'Data Structures & Web (GitHub Pages)',
      image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80',
      summary: 'A self-contained interactive visual web project built for a Data Structures assignment. Implements singly linked-list representation allowing dynamic management of train coaches.',
      features: [
        'Add coach at beginning or end with visual linked-list node animation.',
        'Insert coach at any chosen index position or delete by coach ID.',
        'Search coach ID with instant feedback and reverse coach order.',
        'Deployed live on GitHub Pages with responsive controls and intuitive UI.'
      ],
      stack: ['HTML5', 'CSS3', 'JavaScript', 'Linked List DSA'],
      liveLink: 'https://mandipprajapat3-dev.github.io/Train_Coach_Management_System/',
      repoLink: 'https://github.com/mandipprajapat3-dev/Train_Coach_Management_System'
    },
    'college-event-app': {
      title: 'College Event Management App',
      badge: 'Academic Web Application',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      summary: 'An event management application engineered for campus fests, technical competitions, and cultural workshops, streamlining participant registrations and schedules.',
      features: [
        'Interactive calendar view and category filtering for upcoming college events and workshops.',
        'Student event registration module with confirmation passes and participant rosters.',
        'Real-time announcements, schedule updates, and venue information display.',
        'Clean responsive interface optimized for desktop and mobile browsers.'
      ],
      stack: ['HTML5', 'CSS3', 'JavaScript', 'Event Management UI', 'Git'],
      liveLink: 'https://mandipprajapat3-dev.github.io/CollegeEventManagementApp/',
      repoLink: 'https://github.com/mandipprajapat3-dev/CollegeEventManagementApp'
    }
  };

  function openProject(id) {
    const data = projectDetailsMap[id];
    if (!data) return;

    projectModalTitle.innerHTML = `<i class="fa-solid fa-code"></i> ${data.title}`;
    projectModalBody.innerHTML = `
      <div style="border-radius: 10px; overflow: hidden; margin-bottom: 20px; max-height: 240px;">
        <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 240px; object-fit: cover;" />
      </div>
      <span class="skill-level-badge" style="margin-bottom: 12px; display: inline-block;">${data.badge}</span>
      <p style="color: var(--muted); font-size: 14.5px; line-height: 1.7; margin-bottom: 18px;">${data.summary}</p>
      
      <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 10px; color: var(--text);">Key Implementation Highlights:</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
        ${data.features.map(f => `<li style="font-size: 13.5px; color: var(--muted); display: flex; gap: 8px;"><i class="fa-solid fa-circle-check" style="color: var(--blue); margin-top: 4px;"></i> <span>${f}</span></li>`).join('')}
      </ul>

      <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 10px; color: var(--text);">Tech Stack:</h4>
      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 22px;">
        ${data.stack.map(s => `<span class="project-tech-stack" style="margin: 0;"><span style="font-size: 11px;">${s}</span></span>`).join('')}
      </div>

      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        ${data.liveLink ? `
          <a href="${data.liveLink}" target="_blank" rel="noreferrer" class="button button-primary" style="padding: 10px 18px;">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Live Project ↗
          </a>
        ` : ''}
        <a href="${data.repoLink}" target="_blank" rel="noreferrer" class="button ${data.liveLink ? 'button-outline' : 'button-primary'}" style="padding: 10px 18px;">
          <i class="fa-brands fa-github"></i> Open Project on GitHub ↗
        </a>
      </div>
    `;

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function hideProject() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      openProject(id);
    });
  });

  if (closeProjectModal) closeProjectModal.addEventListener('click', hideProject);
  if (projectModalCloseBtn) projectModalCloseBtn.addEventListener('click', hideProject);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) hideProject();
    });
  }

  // =========================================================================
  // 6. RESUME PREVIEW MODAL HANDLERS
  // =========================================================================
  const resumeModal = document.getElementById('resumeModal');
  const closeResumeModal = document.getElementById('closeResumeModal');
  const resumeTriggers = document.querySelectorAll('.cv-preview-trigger');

  function showResume() {
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function hideResume() {
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  resumeTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showResume();
    });
  });

  if (closeResumeModal) closeResumeModal.addEventListener('click', hideResume);
  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) hideResume();
    });
  }

  // Press ESC to close any modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideProject();
      hideResume();
    }
  });

  // =========================================================================
  // 7. CONTACT FORM VALIDATION & MAILTO ACTION
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const formNote = document.getElementById('formNote');
  const submitBtn = document.getElementById('submitBtn');

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val).toLowerCase());
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let hasError = false;

      // Clear previous error messages
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';

      const nameVal = nameInput.value.trim();
      const emailVal = emailInput.value.trim();
      const messageVal = messageInput.value.trim();

      if (!nameVal) {
        nameError.textContent = 'Please provide your name.';
        hasError = true;
      }

      if (!emailVal) {
        emailError.textContent = 'Please provide your email address.';
        hasError = true;
      } else if (!isValidEmail(emailVal)) {
        emailError.textContent = 'Please enter a valid email (e.g. name@example.com).';
        hasError = true;
      }

      if (!messageVal) {
        messageError.textContent = 'Please enter a message.';
        hasError = true;
      } else if (messageVal.length < 8) {
        messageError.textContent = 'Message should be at least 8 characters long.';
        hasError = true;
      }

      if (!hasError) {
        submitBtn.innerHTML = `<span>Opening Email App... <i class="fa-solid fa-spinner fa-spin"></i></span>`;
        submitBtn.disabled = true;

        const subject = encodeURIComponent(`Portfolio Message from ${nameVal}`);
        const body = encodeURIComponent(`Hello Mandip,\n\n${messageVal}\n\nFrom: ${nameVal}\nEmail: ${emailVal}`);
        
        formNote.innerHTML = `Opening your email client to send to <strong>mandipprajapat3@gmail.com</strong>...`;
        formNote.style.color = 'var(--blue)';

        setTimeout(() => {
          window.location.href = `mailto:mandipprajapat3@gmail.com?subject=${subject}&body=${body}`;
          submitBtn.innerHTML = `<span>Sent / Prepared ↗</span>`;
          submitBtn.disabled = false;
          contactForm.reset();
        }, 800);
      }
    });

    // Clear individual errors on typing
    [nameInput, emailInput, messageInput].forEach(inp => {
      inp.addEventListener('input', () => {
        const targetErr = document.getElementById(`${inp.id}Error`);
        if (targetErr) targetErr.textContent = '';
      });
    });
  }

  // =========================================================================
  // 8. DYNAMIC YEAR
  // =========================================================================
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
