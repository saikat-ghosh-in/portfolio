// Core content and links work without JavaScript.
const menu = document.querySelector('[data-menu]');
const toggle = document.querySelector('[data-menu-toggle]');
document.body.classList.add('js-ready');

function closeMenu(returnFocus = false) {
  toggle.setAttribute('aria-expanded', 'false');
  menu.classList.remove('is-open');
  if (returnFocus) toggle.focus();
}

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  menu.classList.toggle('is-open', open);
  if (open) menu.querySelector('a').focus();
});
menu.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) closeMenu();
});
const desktop = matchMedia('(min-width: 581px)');
desktop.addEventListener('change', () => closeMenu());

if ('IntersectionObserver' in window) {
  const links = [...menu.querySelectorAll('a')];
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      links.forEach((link) => {
        if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -65% 0px' });
  links.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (section) observer.observe(section);
  });
}

const copyButton = document.querySelector('[data-copy-email]');
if (navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  let statusTimer;
  copyButton.addEventListener('click', async () => {
    const status = document.querySelector('[data-copy-status]');
    clearTimeout(statusTimer);
    try {
      await navigator.clipboard.writeText(copyButton.dataset.copyEmail);
      status.textContent = 'Email copied.';
    } catch {
      status.textContent = 'Please use the email link above.';
    }
    statusTimer = setTimeout(() => { status.textContent = ''; }, 4000);
  });
}

// Autonomous ambient motion: no cursor tracking, timers, or per-frame JS.
const auroraSections = [...document.querySelectorAll('.aurora-section')];
const visibleAuroras = new Set();
function updateAuroraMotion() {
  auroraSections.forEach(section => {
    section.classList.toggle('aurora-active', !document.hidden && visibleAuroras.has(section));
  });
}
if ('IntersectionObserver' in window) {
  const auroraObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) visibleAuroras.add(entry.target);
      else visibleAuroras.delete(entry.target);
    });
    updateAuroraMotion();
  }, { rootMargin: '80px 0px' });
  auroraSections.forEach(section => auroraObserver.observe(section));
  document.addEventListener('visibilitychange', updateAuroraMotion);
} else {
  auroraSections.forEach(section => visibleAuroras.add(section));
  updateAuroraMotion();
}
