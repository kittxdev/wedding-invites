export function initCursor() {
  document.body.classList.add('cursor-ready');

  const cur  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  const trails = [];
  const TRAIL_COUNT = 4; // Reduced for performance

  for (let i = 0; i < TRAIL_COUNT; i++) {
    const t = document.createElement('div');
    t.className = 'cursor-trail';
    // Set static opacity once
    t.style.opacity = 0.35 * (1 - i / TRAIL_COUNT);
    document.body.appendChild(t);
    trails.push({ el: t, x: 0, y: 0 });
  }

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => { 
    mx = e.clientX; 
    my = e.clientY; 
  }, { passive: true });

  document.addEventListener('mouseover', e => {
    const tag = e.target.tagName;
    const grow = tag === 'BUTTON' || tag === 'A' || tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA';
    cur.classList.toggle('big', grow);
  }, { passive: true });

  function animate() {
    cur.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;

    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;

    for (let i = trails.length - 1; i > 0; i--) {
      trails[i].x += (trails[i - 1].x - trails[i].x) * 0.35;
      trails[i].y += (trails[i - 1].y - trails[i].y) * 0.35;
      trails[i].el.style.transform = `translate3d(${trails[i].x}px, ${trails[i].y}px, 0) translate(-50%, -50%)`;
    }
    trails[0].x = mx;
    trails[0].y = my;

    requestAnimationFrame(animate);
  }
  animate();
}
