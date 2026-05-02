
export function initCanvas() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const STAR_COUNT = 50; 
  const stars = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 150);
  });

  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.1 + 0.2,
      speed: Math.random() * 0.002 + 0.001,
      phase: Math.random() * Math.PI * 2,
    });
  }

  let t = 0;
  let lastFrameTime = 0;
  ctx.fillStyle = 'rgba(201,169,110,1)';

  function draw(currentTime) {
    // 30fps is plenty for background stars
    if (currentTime - lastFrameTime < 33) {
      requestAnimationFrame(draw);
      return;
    }
    lastFrameTime = currentTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    t++;

    for (let i = 0; i < stars.length; i++) {
      const p = stars[i];
      ctx.globalAlpha = 0.2 + 0.5 * Math.sin(t * p.speed + p.phase);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}
