import { WEDDING as W } from '../data.js';

const B = W.bride;
const G = W.groom;
const WD = W.wedding;

/* ── helpers ── */
const $ = id => document.getElementById(id);
const html = (id, str) => { const el = $(id); if (el) el.innerHTML = str; };
const text = (id, str) => { const el = $(id); if (el) el.textContent = str; };

/*
 * ── URL PARAM: name order ───────────────────────────────────────────
 *
 *  Default (no param):      Groom first   →  Padma Dev & Vivitha
 *  ?side=bride              Bride first   →  Vivitha & Padma Dev
 *  ?side=groom              Groom first   →  Padma Dev & Vivitha
 */
const params = new URLSearchParams(window.location.search);
const brideFirst = params.get('side') === 'bride';

const FIRST = brideFirst ? B : G;
const SECOND = brideFirst ? G : B;

/* ── METADATA ── */
export function updateMetadata() {
  const title = `${FIRST.name} & ${SECOND.name} | Wedding Invitation`;
  document.title = title;

  const desc = `We cordially invite you to celebrate the wedding of ${FIRST.name} and ${SECOND.name} on ${WD.dateDisplay}. Join us for this joyous occasion!`;

  const updateMeta = (selector, attr, val) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, val);
  };

  updateMeta('meta[name="description"]', 'content', desc);
  updateMeta('meta[property="og:title"]', 'content', title);
  updateMeta('meta[property="og:description"]', 'content', desc);
  updateMeta('meta[property="twitter:title"]', 'content', title);
  updateMeta('meta[property="twitter:description"]', 'content', desc);
}

/* ── INTRO ── */
export function renderIntro() {
  text('introMono', `${FIRST.name} & ${SECOND.name}`);
  text('introSub', WD.dateDisplay.toUpperCase());
}

/* ── NAV ── */
export function renderNav() {
  html('navLogo', `${FIRST.name[0]}<span class="nav-amp">&amp;</span>${SECOND.name[0]}`);
}

/* ── HERO ── */
export function renderHero() {
  text('heroName1', FIRST.name);
  text('heroName2', SECOND.name);
  text('heroDate', `${WD.dayOfWeek} · ${WD.dateDisplay} · ${WD.timeDisplay}`);
  text('heroVenue', `${WD.venue.name} · ${WD.venue.city}`);
  text('cdBgText', `${FIRST.name} & ${SECOND.name}`);

  const heights = [60, 80, 50, 100, 70, 90, 55, 85];
  html('candleRow', heights.map(h => `
    <div class="candle">
      <div class="candle-glow" style="width:${h * 0.5}px;height:${h * 0.5}px;margin-bottom:-${h * 0.1}px;"></div>
      <div class="candle-flame"></div>
      <div class="candle-body" style="height:${h}px;"></div>
    </div>`).join(''));
}

/* ── COUNTDOWN ── */
export function initCountdown() {
  function tick() {
    const target = new Date(`${WD.date}T${WD.time}:00`);
    const diff = target - Date.now();
    const grid = $('countdownGrid');
    if (!grid) return;
    if (diff <= 0) {
      grid.innerHTML = `<p style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:2.5rem;color:var(--gold);text-align:center">The celebration has begun! 🎉</p>`;
      return;
    }
    const units = [
      ['Days', Math.floor(diff / 86400000)],
      ['Hours', Math.floor((diff % 86400000) / 3600000)],
      ['Minutes', Math.floor((diff % 3600000) / 60000)],
      ['Seconds', Math.floor((diff % 60000) / 1000)],
    ];
    grid.innerHTML = units.map(([l, v]) => `
      <div class="countdown-item">
        <div class="countdown-box"><span class="countdown-num">${String(v).padStart(2, '0')}</span></div>
        <div class="countdown-label">${l}</div>
      </div>`).join('');
  }
  tick();
  setInterval(tick, 1000);

  const addCal = $('addToCal');
  if (addCal) {
    addCal.addEventListener('click', () => {
      const dt = WD.date.replace(/-/g, '');
      const tm = WD.time.replace(/:/g, '') + '00';
      const eventStart = dt + 'T' + tm;
      // Rough end time (+4 hours)
      const endHour = String((parseInt(WD.time.split(':')[0], 10) + 4) % 24).padStart(2, '0');
      const eventEnd = dt + 'T' + endHour + tm.substring(2);

      const icsStr = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${window.location.href}
DTSTART:${eventStart}
DTEND:${eventEnd}
SUMMARY:${FIRST.name} & ${SECOND.name}'s Wedding
DESCRIPTION:Celebrate the wedding of ${FIRST.name} and ${SECOND.name}!
LOCATION:${WD.venue.name}, ${WD.venue.address}, ${WD.venue.city}
END:VEVENT
END:VCALENDAR`;

      const blob = new Blob([icsStr], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'wedding_invitation.ics';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
}

/* ── COUPLE ── */
function coupleCard(p, revClass) {
  return `
    <div class="couple-card ${revClass}">
      <div class="couple-avatar-frame">
        <div class="couple-avatar-bg">${p.emoji}</div>
        <div class="couple-avatar-ring"></div>
        <div class="couple-avatar-ring2"></div>
      </div>
      <h3 class="couple-fullname">${p.fullName}</h3>
      <p class="couple-role-tag">${p.role}</p>
      <p class="couple-bio-text">${p.bio}</p>
    </div>`;
}
export function renderCouple() {
  html('coupleGrid',
    coupleCard(FIRST, 'reveal-left') +
    `<div class="couple-center reveal-scale">
       <div class="couple-vline"></div>
       <div class="couple-rings-icon">💍</div>
       <div class="couple-vline"></div>
     </div>` +
    coupleCard(SECOND, 'reveal-right'));

  const p1Data = brideFirst ? W.parents.bride : W.parents.groom;
  const p2Data = brideFirst ? W.parents.groom : W.parents.bride;
  const role1 = brideFirst ? "Bride's Parents" : "Groom's Parents";
  const role2 = brideFirst ? "Groom's Parents" : "Bride's Parents";

  function renderParentColumn(title, parentArr) {
    const items = parentArr.map(p => `
      <div style="margin-bottom: 26px;">
        <h3 class="couple-fullname" style="font-size: 1.4rem; margin-bottom: 4px;">${p.name}</h3>
        <p style="font-family: 'Cinzel', serif; font-size: 0.6rem; color: var(--gold); letter-spacing: 0.15em; margin-bottom: 4px;">${p.qual}</p>
        <p style="font-size: 0.75rem; color: var(--textMid); font-weight: 300; line-height: 1.5;">${p.desc}</p>
      </div>
    `).join('');

    return `
      <div style="flex: 1; min-width: 250px; max-width: 380px; text-align: center;">
        <p class="couple-role-tag" style="margin-bottom: 24px; font-size: 0.7rem;">${title}</p>
        ${items}
      </div>
    `;
  }

  html('parentsGrid',
    renderParentColumn(role1, p1Data) +
    `<div class="parents-divider"></div>` +
    renderParentColumn(role2, p2Data)
  );
}


/* ── SCHEDULE ── */
export function renderSchedule() {
  text('schedSub', `${WD.dateDisplay} · ${WD.venue.name}`);

  const scroll = $('scheduleScroll');
  scroll.innerHTML = W.schedule.map(e => `
    <div class="sch-card">
      <div class="sch-icon">${e.icon}</div>
      <p class="sch-time">${e.time}</p>
      <h3 class="sch-event">${e.event}</h3>
      <p class="sch-desc">${e.desc}</p>
    </div>`).join('');

  const dots = $('schedDots');
  dots.innerHTML = W.schedule.map((_, i) =>
    `<div class="sch-dot${i === 0 ? ' active' : ''}"></div>`).join('');

  scroll.addEventListener('scroll', () => {
    const idx = Math.round(scroll.scrollLeft / 304);
    dots.querySelectorAll('.sch-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
  });
}

/* ── VENUE ── */
export function renderVenue() {
  const v = WD.venue;
  const details = [
    ['🏛️', 'Venue', v.name],
    ['📍', 'Address', `${v.address}, ${v.city}`],
    ['📅', 'Date & Time', `${WD.dateDisplay} · ${WD.timeDisplay}`],
    // ['👗', 'Dress Code', WD.dressCode],
  ];
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(v.name + ', ' + v.city)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  html('venueGrid', `
    <div class="venue-visual reveal-left">
      <iframe class="venue-map-iframe" src="${mapUrl}" allowfullscreen loading="lazy"></iframe>
    </div>
    <div class="reveal-right">
      <h3 class="venue-name-big">${v.name}</h3>
      ${details.map(([icon, label, val]) => `
        <div class="venue-detail-row">
          <div class="venue-icon">${icon}</div>
          <div>
            <p class="venue-detail-label">${label}</p>
            <p class="venue-detail-val">${val}</p>
          </div>
        </div>`).join('')}
    </div>`);
}



/* ── FOOTER ── */
export function renderFooter() {
  html('footerMono', `<span style="padding:0 5px">${FIRST.name}</span><span class="footer-amp">&amp;</span><span style="padding:0 5px">${SECOND.name}</span>`);
  text('footerDate', WD.dateDisplay.toUpperCase());
  text('footerTag', WD.hashtag);
}

/* ── GALLERY ── */
export function renderGallery() {
  if (!W.gallery || W.gallery.length === 0) return;

  const galleryHTML = W.gallery.map((img, i) => `
    <div class="gallery-card g${i % 5} reveal">
      <div class="gallery-img-wrap">
        <img src="${img.src}" alt="${img.label}" class="gallery-photo" />
      </div>
      <div class="gal-overlay">
        <p class="gal-label">${img.label}</p>
      </div>
    </div>
  `).join('');

  html('galleryGrid', galleryHTML);
}
