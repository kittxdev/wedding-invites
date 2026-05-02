
import './style.css';

import { initCursor } from './modules/cursor.js';
import { initMusic } from './modules/music.js';
import { WEDDING } from './data.js';
import {
  renderNav,
  renderHero,
  initCountdown,
  renderCouple,
  renderSchedule,
  renderVenue,
  renderGallery,
  renderFooter,
  updateMetadata,
} from './modules/render.js';

const { sections } = WEDDING;
Object.entries(sections).forEach(([id, enabled]) => {
  if (!enabled) {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  }
});


/* ── render all content from data ── */
updateMetadata();
renderNav();
renderHero();

if (sections.couple) renderCouple();
if (sections.schedule) renderSchedule();
if (sections.venue) renderVenue();
if (sections.gallery) renderGallery();
if (sections.footer) renderFooter();

if (sections.countdown) initCountdown();



/* ── cursor ── */
initCursor();

/* ── cursor ── */
initCursor();

/* ── music player ── */
initMusic();

/* ── show music player ── */
document.getElementById('musicPlayer').classList.add('show');

/* ── nav scroll style ── */
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const nav = document.getElementById('nav');
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 80);
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

/* ── scroll reveal via IntersectionObserver ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
  .forEach(el => observer.observe(el));

/* ── click sparkle burst ── */
document.addEventListener('click', e => {
  const symbols = ['✦', '✧', '◆', '·'];
  for (let i = 0; i < 10; i++) {
    const s = document.createElement('div');
    s.className = 'burst';
    const angle = (i / 10) * Math.PI * 2;
    const dist = 20 + Math.random() * 30;
    s.style.cssText = `
      left: ${e.clientX + Math.cos(angle) * dist}px;
      top: ${e.clientY + Math.sin(angle) * dist}px;
      color: ${i % 2 === 0 ? 'var(--gold)' : 'var(--rose)'};
      font-size: ${0.6 + Math.random() * 0.5}rem;
    `;
    s.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 700);
  }
});
