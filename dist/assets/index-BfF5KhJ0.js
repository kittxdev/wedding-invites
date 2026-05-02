(function () { const t = document.createElement("link").relList; if (t && t.supports && t.supports("modulepreload")) return; for (const a of document.querySelectorAll('link[rel="modulepreload"]')) o(a); new MutationObserver(a => { for (const s of a) if (s.type === "childList") for (const c of s.addedNodes) c.tagName === "LINK" && c.rel === "modulepreload" && o(c) }).observe(document, { childList: !0, subtree: !0 }); function n(a) { const s = {}; return a.integrity && (s.integrity = a.integrity), a.referrerPolicy && (s.referrerPolicy = a.referrerPolicy), a.crossOrigin === "use-credentials" ? s.credentials = "include" : a.crossOrigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin", s } function o(a) { if (a.ep) return; a.ep = !0; const s = n(a); fetch(a.href, s) } })(); function O() { const e = document.getElementById("bgCanvas"); if (!e) return; const t = e.getContext("2d"), n = 80, o = []; function a() { e.width = window.innerWidth, e.height = window.innerHeight } a(); let s; window.addEventListener("resize", () => { clearTimeout(s), s = setTimeout(a, 150) }); const c = "rgba(201,169,110,"; for (let v = 0; v < n; v++)o.push({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, r: Math.random() * 1.2 + .2, speed: Math.random() * .003 + .001, phase: Math.random() * Math.PI * 2, color: c }); let g = 0, i = 0; function d(v) { if (v - i < 33) { requestAnimationFrame(d); return } i = v, t.clearRect(0, 0, e.width, e.height), g++; for (let C = 0; C < o.length; C++) { const b = o[C], L = .3 + .4 * Math.sin(g * b.speed + b.phase); t.beginPath(), t.arc(b.x, b.y, b.r, 0, Math.PI * 2), t.fillStyle = b.color + L + ")", t.fill() } requestAnimationFrame(d) } requestAnimationFrame(d) } function H() { document.body.classList.add("cursor-ready"); const e = document.getElementById("cursor"), t = document.getElementById("cursorRing"), n = []; for (let i = 0; i < 6; i++) { const d = document.createElement("div"); d.className = "cursor-trail", document.body.appendChild(d), n.push({ el: d, x: 0, y: 0 }) } let o = 0, a = 0, s = 0, c = 0; document.addEventListener("mousemove", i => { o = i.clientX, a = i.clientY }), document.addEventListener("mouseover", i => { const d = i.target.tagName, v = d === "BUTTON" || d === "A" || d === "INPUT" || d === "SELECT" || d === "TEXTAREA"; e.classList.toggle("big", v) }); function g() { e.style.transform = `translate3d(${o}px, ${a}px, 0) translate(-50%, -50%)`, s += (o - s) * .15, c += (a - c) * .15, t.style.transform = `translate3d(${s}px, ${c}px, 0) translate(-50%, -50%)`; for (let i = n.length - 1; i > 0; i--)n[i].x += (n[i - 1].x - n[i].x) * .35, n[i].y += (n[i - 1].y - n[i].y) * .35, n[i].el.style.transform = `translate3d(${n[i].x}px, ${n[i].y}px, 0) translate(-50%, -50%)`, n[i].el.style.opacity = .4 * (1 - i / n.length); n[0].x = o, n[0].y = a, requestAnimationFrame(g) } g() } function j() { let e, t, n, o = !1, a = null, s = [], c = 0, g = 0; const i = [[293.66, 369.99, 440, 587.33], [220, 277.18, 329.63, 440], [246.94, 293.66, 369.99, 493.88], [196, 246.94, 293.66, 392]], d = [587.33, 659.25, 783.99, 880, 783.99, 659.25, 587.33, 523.25]; function v(f) { const l = f.createConvolver(), u = f.sampleRate * 2.5, m = f.createBuffer(2, u, f.sampleRate); for (let h = 0; h < 2; h++) { const D = m.getChannelData(h); for (let $ = 0; $ < u; $++)D[$] = (Math.random() * 2 - 1) * Math.pow(1 - $ / u, 1.8) } l.buffer = m; const p = f.createGain(); return p.gain.value = .38, l.connect(p), { input: l, output: p } } function C(f, l) { f.forEach((u, m) => { const p = e.createOscillator(), h = e.createGain(); p.type = m === 0 ? "triangle" : "sine", p.frequency.value = m === 0 ? u / 2 : u; const D = m === 0 ? .05 : .03; h.gain.setValueAtTime(0, l), h.gain.linearRampToValueAtTime(D, l + 1.2), h.gain.setValueAtTime(D, l + 3), h.gain.linearRampToValueAtTime(0, l + 5), p.connect(h); const $ = e.createGain(); $.gain.value = .5, h.connect($), $.connect(t), h.connect(n.input), p.start(l), p.stop(l + 5.5), s.push(p) }) } function b(f, l) { const u = e.createOscillator(), m = e.createGain(); u.type = "sine", u.frequency.value = f, m.gain.setValueAtTime(0, l), m.gain.linearRampToValueAtTime(.025, l + .15), m.gain.setValueAtTime(.025, l + .6), m.gain.linearRampToValueAtTime(0, l + 1.2), u.connect(m); const p = e.createGain(); p.gain.value = .7, m.connect(p), p.connect(n.input); const h = e.createGain(); h.gain.value = .3, m.connect(h), h.connect(t), u.start(l), u.stop(l + 1.5) } function L() { const f = e.currentTime, l = 4; for (let u = 0; u < 4; u++) { C(i[(c + u) % i.length], f + u * l); for (let m = 0; m < 2; m++) { const p = f + u * l + m * 2 + Math.random() * .5; b(d[g % d.length], p), g++ } } c = (c + 4) % i.length, a = setTimeout(L, (l * 4 - .5) * 1e3) } function G() { e || (e = new (window.AudioContext || window.webkitAudioContext)), e.state === "suspended" && e.resume(), t || (t = e.createGain(), t.gain.value = .4, t.connect(e.destination), n = v(e), n.output.connect(t)) } const S = document.getElementById("musicBtn"), I = document.getElementById("musicBars"); S.addEventListener("click", () => { G(), o ? (o = !1, clearTimeout(a), s.forEach(f => { try { f.stop() } catch { } }), s = [], S.textContent = "▶", I.classList.add("paused")) : (o = !0, L(), S.textContent = "⏸", I.classList.remove("paused")) }), document.getElementById("volSlider").addEventListener("input", function () { t && (t.gain.value = +this.value) }) } const y = { bride: { name: "Vivitha", fullName: "D. Vivitha", role: "The Bride", emoji: "🪷", bio: "Graceful, driven, and full of life. With her radiant smile and gentle heart, she brings immense joy and warmth to everyone around her." }, groom: { name: "Padma Dev", fullName: "E. Padma Dev", role: "The Groom", emoji: "🌿", bio: "Thoughtful, compassionate, and an easygoing spirit. He found his perfect match in Vivitha to share life's beautiful, grand journey." }, wedding: { date: "2026-05-27", dateDisplay: "May 27, 2026", dayOfWeek: "Wednesday", time: "10:30", timeDisplay: "10:30 AM to 11:30 AM", venue: { name: "Aysha Mahal", address: "Abishekapatti", city: "Tirunelveli" }, hashtag: "#PadmaWedsVivitha", dressCode: "Traditional Elegance" }, schedule: [{ time: "10:30 AM", event: "Muhurtham", icon: "🕉️", desc: "The auspicious moment where two souls are bound together in the holy bond of marriage at Aysha Mahal, Tirunelveli." }, { time: "12:00 PM", event: "Wedding Feast", icon: "🍃", desc: "Join us for a grand South Indian banana leaf wedding feast with traditional delicacies." }, { time: "6:30 PM", event: "Grand Reception", icon: "🎉", desc: "An evening of revelry and celebration at Joseph Hall, Mathar Sangam Road, East Ramanputhoor, Nagercoil." }, { time: "7:30 PM", event: "Dinner & Music", icon: "🍽️", desc: "Continue the celebration with a sumptuous dinner, heartfelt blessings, and joyful melodies." }], parents: { bride: [{ name: "Mr. V. Dharma Raj", qual: "M.Sc., M.Tech.", desc: "GAIL India Ltd (VRS), Prop. Vivitha Microns" }, { name: "Mrs. V. Latha", qual: "M.A., B.Ed., M.Phil.", desc: "St. Joseph Matric. Hr.Sec.School., Alangulam." }], groom: [{ name: "Mr. P. Elango", qual: "B.Sc.(Agri)", desc: "Joint Director of Agriculture (Rtd)" }, { name: "Mrs. M. Nagarethinam", qual: "M.Sc. (N)", desc: "Principal, Dept. of Allied Health Sciences, Siva Hospital" }] } }, P = y.bride, V = y.groom, r = y.wedding, A = e => document.getElementById(e), M = (e, t) => { const n = A(e); n && (n.innerHTML = t) }, w = (e, t) => { const n = A(e); n && (n.textContent = t) }, q = new URLSearchParams(window.location.search), E = q.get("side") === "bride", T = E ? P : V, x = E ? V : P; function z() { M("navLogo", `${T.name[0]}<span class="nav-amp">&amp;</span>${x.name[0]}`) } function F() {
  w("heroName1", T.name), w("heroName2", x.name), w("heroDate", `${r.dayOfWeek} · ${r.dateDisplay} · ${r.timeDisplay}`), w("heroVenue", `${r.venue.name} · ${r.venue.city}`), w("cdBgText", `${T.name} & ${x.name}`), M("candleRow", [60, 80, 50, 100, 70, 90, 55, 85].map(t => `
    <div class="candle">
      <div class="candle-glow" style="width:${t * .5}px;height:${t * .5}px;margin-bottom:-${t * .1}px;"></div>
      <div class="candle-flame"></div>
      <div class="candle-body" style="height:${t}px;"></div>
    </div>`).join(""))
} function U() {
  function e() {
    const o = new Date(`${r.date}T${r.time}:00`) - Date.now(), a = A("countdownGrid"); if (!a) return; if (o <= 0) { a.innerHTML = `<p style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:2.5rem;color:var(--gold);text-align:center">The celebration has begun! 🎉</p>`; return } const s = [["Days", Math.floor(o / 864e5)], ["Hours", Math.floor(o % 864e5 / 36e5)], ["Minutes", Math.floor(o % 36e5 / 6e4)], ["Seconds", Math.floor(o % 6e4 / 1e3)]]; a.innerHTML = s.map(([c, g]) => `
      <div class="countdown-item">
        <div class="countdown-box"><span class="countdown-num">${String(g).padStart(2, "0")}</span></div>
        <div class="countdown-label">${c}</div>
      </div>`).join("")
  } e(), setInterval(e, 1e3); const t = A("addToCal"); t && t.addEventListener("click", () => {
    const n = r.date.replace(/-/g, ""), o = r.time.replace(/:/g, "") + "00", a = n + "T" + o, s = String((parseInt(r.time.split(":")[0], 10) + 4) % 24).padStart(2, "0"), c = n + "T" + s + o.substring(2), g = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${window.location.href}
DTSTART:${a}
DTEND:${c}
SUMMARY:${T.name} & ${x.name}'s Wedding
DESCRIPTION:Celebrate the wedding of ${T.name} and ${x.name}!
LOCATION:${r.venue.name}, ${r.venue.address}, ${r.venue.city}
END:VEVENT
END:VCALENDAR`, i = new Blob([g], { type: "text/calendar;charset=utf-8" }), d = URL.createObjectURL(i), v = document.createElement("a"); v.href = d, v.download = "wedding_invitation.ics", document.body.appendChild(v), v.click(), document.body.removeChild(v)
  })
} function R(e, t) {
  return `
    <div class="couple-card ${t}">
      <div class="couple-avatar-frame">
        <div class="couple-avatar-bg">${e.emoji}</div>
        <div class="couple-avatar-ring"></div>
        <div class="couple-avatar-ring2"></div>
      </div>
      <h3 class="couple-fullname">${e.fullName}</h3>
      <p class="couple-role-tag">${e.role}</p>
      <p class="couple-bio-text">${e.bio}</p>
    </div>`} function W() {
  M("coupleGrid", R(T, "reveal-left") + `<div class="couple-center reveal-scale">
       <div class="couple-vline"></div>
       <div class="couple-rings-icon">💍</div>
       <div class="couple-vline"></div>
     </div>`+ R(x, "reveal-right")); const e = E ? y.parents.bride : y.parents.groom, t = E ? y.parents.groom : y.parents.bride, n = E ? "Bride's Parents" : "Groom's Parents", o = E ? "Groom's Parents" : "Bride's Parents"; function a(s, c) {
    const g = c.map(i => `
      <div style="margin-bottom: 26px;">
        <h3 class="couple-fullname" style="font-size: 1.4rem; margin-bottom: 4px;">${i.name}</h3>
        <p style="font-family: 'Cinzel', serif; font-size: 0.6rem; color: var(--gold); letter-spacing: 0.15em; margin-bottom: 4px;">${i.qual}</p>
        <p style="font-size: 0.75rem; color: var(--textMid); font-weight: 300; line-height: 1.5;">${i.desc}</p>
      </div>
    `).join(""); return `
      <div style="flex: 1; min-width: 250px; max-width: 380px; text-align: center;">
        <p class="couple-role-tag" style="margin-bottom: 24px; font-size: 0.7rem;">${s}</p>
        ${g}
      </div>
    `} M("parentsGrid", a(n, e) + '<div class="parents-divider"></div>' + a(o, t))
} function k() {
  w("schedSub", `${r.dateDisplay} · ${r.venue.name} `); const e = A("scheduleScroll"); e.innerHTML = y.schedule.map(n => `
    <div class="sch-card">
      <div class="sch-icon">${n.icon}</div>
      <p class="sch-time">${n.time}</p>
      <h3 class="sch-event">${n.event}</h3>
      <p class="sch-desc">${n.desc}</p>
    </div>`).join(""); const t = A("schedDots"); t.innerHTML = y.schedule.map((n, o) => `<div class="sch-dot${o === 0 ? " active" : ""}"></div>`).join(""), e.addEventListener("scroll", () => { const n = Math.round(e.scrollLeft / 304); t.querySelectorAll(".sch-dot").forEach((o, a) => o.classList.toggle("active", a === n)) })
} function Y() {
  const e = r.venue, t = [["🏛️", "Venue", e.name], ["📍", "Address", `${e.address}, ${e.city}`], ["📅", "Date & Time", `${r.dateDisplay} · ${r.timeDisplay}`], ["👗", "Dress Code", r.dressCode]], n = `https://maps.google.com/maps?q=${encodeURIComponent(e.name + ", " + e.city)}&t=&z=13&ie=UTF8&iwloc=&output=embed`; M("venueGrid", `
    <div class="venue-visual reveal-left">
      <iframe class="venue-map-iframe" src="${n}" allowfullscreen loading="lazy"></iframe>
    </div>
    <div class="reveal-right">
      <h3 class="venue-name-big">${e.name}</h3>
      ${t.map(([o, a, s]) => `
        <div class="venue-detail-row">
          <div class="venue-icon">${o}</div>
          <div>
            <p class="venue-detail-label">${a}</p>
            <p class="venue-detail-val">${s}</p>
          </div>
        </div>`).join("")}
    </div>`)
} function J() { M("footerMono", `<span style="padding:0 5px">${T.name}</span><span class="footer-amp">&amp;</span><span style="padding:0 5px">${x.name}</span>`), w("footerDate", r.dateDisplay.toUpperCase()), w("footerTag", r.hashtag) } function _() {
  if (!r.gallery || r.gallery.length === 0) return; const e = r.gallery.map((t, n) => `
    <div class="gallery-card reveal">
      <div class="gallery-img-wrap">
        <img src="${t.src}" alt="${t.label}" class="gallery-photo" />
      </div>
      <div class="gal-overlay">
        <p class="gal-label">${t.label}</p>
      </div>
    </div>
  `).join(""); M("galleryGrid", e)
} z(); F(); W(); k(); Y(); _(); J(); U(); O(); H(); j(); document.getElementById("musicPlayer").classList.add("show"); let N = !1; window.addEventListener("scroll", () => { N || (requestAnimationFrame(() => { const e = document.getElementById("nav"); e && e.classList.toggle("scrolled", window.scrollY > 80), N = !1 }), N = !0) }, { passive: !0 }); const B = new IntersectionObserver(e => { e.forEach(t => { t.isIntersecting && (t.target.classList.add("visible"), B.unobserve(t.target)) }) }, { threshold: .1, rootMargin: "0px 0px -50px 0px" }); document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach(e => B.observe(e)); document.addEventListener("click", e => {
  const t = ["✦", "✧", "◆", "·"]; for (let n = 0; n < 10; n++) {
    const o = document.createElement("div"); o.className = "burst"; const a = n / 10 * Math.PI * 2, s = 20 + Math.random() * 30; o.style.cssText = `
      left: ${e.clientX + Math.cos(a) * s}px;
      top: ${e.clientY + Math.sin(a) * s}px;
      color: ${n % 2 === 0 ? "var(--gold)" : "var(--rose)"};
      font-size: ${.6 + Math.random() * .5}rem;
    `, o.textContent = t[Math.floor(Math.random() * t.length)], document.body.appendChild(o), setTimeout(() => o.remove(), 700)
  }
});
