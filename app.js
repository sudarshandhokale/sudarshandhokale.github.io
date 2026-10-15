'use strict';
document.documentElement.classList.add('js');

// Career began in September 2013; completed years update at the anniversary month.
function completedExperienceYears(now = new Date()) {
  const startYear = 2013;
  const startMonth = 8; // Zero-based September; no exact starting day is assumed.
  return Math.max(0, now.getFullYear() - startYear - (now.getMonth() < startMonth ? 1 : 0));
}
function updateCareerDates() {
  const now = new Date();
  document.querySelectorAll('[data-experience-years]').forEach(el => { el.textContent = String(completedExperienceYears(now)); });
  document.querySelectorAll('[data-current-year]').forEach(el => { el.textContent = String(now.getFullYear()); });
}
updateCareerDates();
window.addEventListener('pageshow', updateCareerDates);

// Close the compact mobile navigation after following any section link.
const mobileMenu = document.querySelector('.mobile-nav');
if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { mobileMenu.open = false; }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobileMenu.open) {
      mobileMenu.open = false;
      mobileMenu.querySelector('summary').focus();
    }
  });
  document.addEventListener('click', event => {
    if (!mobileMenu.contains(event.target)) mobileMenu.open = false;
  });
}

// Native, keyboard-accessible tabs. All case content stays in the document.
const tabs = [...document.querySelectorAll('[data-case]')];
function selectCase(tab) {
  tabs.forEach(item => {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
  });
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectCase(tab));
  tab.addEventListener('keydown', event => {
    let target;
    if (event.key === 'ArrowRight') target = tabs[(index + 1) % tabs.length];
    if (event.key === 'ArrowLeft') target = tabs[(index + tabs.length - 1) % tabs.length];
    if (event.key === 'Home') target = tabs[0];
    if (event.key === 'End') target = tabs[tabs.length - 1];
    if (target) { event.preventDefault(); selectCase(target); target.focus(); }
  });
});

// XING: one complete initiative at a time; each keeps its own comparison state.
const xingTabs = [...document.querySelectorAll('[data-xing-case]')];
const xingSteps = [...document.querySelectorAll('[data-xing-step]')];
let activeXingIndex = 0;
function selectXingCase(index) {
  activeXingIndex = Math.max(0, Math.min(xingTabs.length - 1, index));
  xingTabs.forEach((tab, i) => {
    const active = i === activeXingIndex;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
  });
  const count = document.getElementById('xing-case-count');
  if (count) count.textContent = String(activeXingIndex + 1).padStart(2, '0') + ' / ' + String(xingTabs.length).padStart(2, '0');
  xingSteps.forEach(button => {
    button.disabled = Number(button.dataset.xingStep) < 0 ? activeXingIndex === 0 : activeXingIndex === xingTabs.length - 1;
  });
}
xingTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectXingCase(index));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % xingTabs.length;
    if (event.key === 'ArrowLeft') next = (index + xingTabs.length - 1) % xingTabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = xingTabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      selectXingCase(next);
      xingTabs[next].focus();
    }
  });
});
xingSteps.forEach(button => button.addEventListener('click', () => {
  selectXingCase(activeXingIndex + Number(button.dataset.xingStep));
  xingTabs[activeXingIndex].focus({preventScroll:true});
  const selector = document.querySelector('.xing-case-selector');
  if (selector && typeof selector.scrollIntoView === 'function') selector.scrollIntoView({block:'nearest', behavior:'auto'});
}));
document.querySelectorAll('[data-xing-view]').forEach(button => {
  button.addEventListener('click', () => {
    const panel = button.closest('[data-xing-panel]');
    const phase = button.dataset.xingView;
    panel.querySelectorAll('[data-xing-view]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    panel.querySelectorAll('[data-phase]').forEach(view => { view.hidden = view.dataset.phase !== phase; });
    panel.querySelector('.xing-comparison').classList.toggle('is-before', phase === 'before');
  });
});

const intro = document.getElementById('intro-dialog');
const introTrigger = document.getElementById('open-intro');
introTrigger.addEventListener('click', () => {
  if (typeof intro.showModal === 'function') {
    intro.showModal();
    document.body.classList.add('modal-open');
    document.getElementById('close-intro').focus();
  } else { document.getElementById('work').scrollIntoView(); }
});
document.getElementById('close-intro').addEventListener('click', () => intro.close());
intro.addEventListener('click', event => {
  if (event.target === intro) {
    const r = intro.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) intro.close();
  }
});
intro.addEventListener('close', () => { document.body.classList.remove('modal-open'); introTrigger.focus(); });
document.querySelectorAll('.intro-nav').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  intro.close();
  const target = document.getElementById('work-title');
  requestAnimationFrame(() => {
    target.setAttribute('tabindex', '-1');
    target.focus({preventScroll:true});
    document.getElementById('work').scrollIntoView();
  });
}));

let toastTimer;
function announce(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 4000);
}
const emailField = document.getElementById('contact-email');
const copyEmailButton = document.getElementById('copy-email');
function selectEmailAddress() {
  if (!emailField) return;
  emailField.focus({preventScroll:true});
  emailField.select();
  emailField.setSelectionRange(0, emailField.value.length);
}
if (emailField) {
  emailField.addEventListener('focus', () => emailField.select());
  emailField.addEventListener('click', () => emailField.select());
}
if (copyEmailButton && emailField) {
  copyEmailButton.addEventListener('click', async () => {
    let copied = false;
    if (window.isSecureContext && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(emailField.value);
        copied = true;
      } catch { /* A denied clipboard permission falls back to selecting the address. */ }
    }
    if (!copied) {
      selectEmailAddress();
      try {
        copied = typeof document.execCommand === 'function' && document.execCommand('copy');
      } catch { copied = false; }
    }
    if (copied) {
      announce('Email address copied.');
    } else {
      announce('Email selected. Use your device’s Copy command, or connect on LinkedIn.');
    }
  });
}

// Scroll UI has one deterministic update per animation frame.
// Keep the sticky header solid and interactive cards stationary while scrolling.
const scrollProgress = document.getElementById('progress');
const scrollHeader = document.querySelector('.site-header');
const scrollSections = ['work', 'safego', 'projects', 'journey', 'skills', 'contact']
  .map(id => document.getElementById(id)).filter(Boolean);
const scrollNavLinks = [...document.querySelectorAll('.nav-links a')];
let scrollFramePending = false;
let activeScrollSection = null;
let lastScrollProgress = -1;

function updateScrollUI() {
  scrollFramePending = false;
  const scrollY = Math.max(0, window.scrollY);
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const progress = total > 0 ? Math.min(1, scrollY / total) : 0;
  const activeLine = (scrollHeader ? scrollHeader.offsetHeight : 0) + 24;
  let nextSection = '';

  // Read all positions before changing styles. A single fixed activation line
  // avoids callback-order changes when two section boundaries are visible.
  scrollSections.forEach(section => {
    if (section.getBoundingClientRect().top <= activeLine) nextSection = section.id;
  });
  if (total > 0 && scrollY >= total - 2 && scrollSections.length) {
    nextSection = scrollSections[scrollSections.length - 1].id;
  }

  if (scrollProgress && progress !== lastScrollProgress) {
    scrollProgress.style.transform = 'scaleX(' + progress + ')';
    lastScrollProgress = progress;
  }
  if (nextSection !== activeScrollSection) {
    scrollNavLinks.forEach(link => {
      const active = link.getAttribute('href') === '#' + nextSection;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    activeScrollSection = nextSection;
  }
}
function scheduleScrollUI() {
  if (scrollFramePending) return;
  scrollFramePending = true;
  requestAnimationFrame(updateScrollUI);
}
window.addEventListener('scroll', scheduleScrollUI, {passive:true});
window.addEventListener('resize', scheduleScrollUI);
window.addEventListener('pageshow', scheduleScrollUI);
scheduleScrollUI();
