export function initMusic() {
  let audioCtx, master, reverbOutput, playing = false;
  let chordTimer = null, oscillators = [];
  let chordIdx = 0, melodyIdx = 0;

  // D major key — Dmaj / Amaj / Bmin / Gmaj
  const CHORDS = [
    [293.66, 369.99, 440.00, 587.33],
    [220.00, 277.18, 329.63, 440.00],
    [246.94, 293.66, 369.99, 493.88],
    [196.00, 246.94, 293.66, 392.00],
  ];
  const MELODY = [587.33, 659.25, 783.99, 880.00, 783.99, 659.25, 587.33, 523.25];

  function buildReverb(ctx) {
    const conv = ctx.createConvolver();
    const len  = ctx.sampleRate * 2.5;
    const buf  = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 1.8);
    }
    conv.buffer = buf;
    const wet = ctx.createGain(); wet.gain.value = 0.38;
    conv.connect(wet);
    return { input: conv, output: wet };
  }

  function playChord(chord, t) {
    chord.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const g   = audioCtx.createGain();
      osc.type = i === 0 ? 'triangle' : 'sine';
      osc.frequency.value = i === 0 ? freq / 2 : freq;
      const vol = i === 0 ? 0.05 : 0.03;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + 1.2);
      g.gain.setValueAtTime(vol, t + 3);
      g.gain.linearRampToValueAtTime(0, t + 5);
      osc.connect(g);
      const dry = audioCtx.createGain(); dry.gain.value = 0.5;
      g.connect(dry); dry.connect(master);
      g.connect(reverbOutput.input);
      osc.start(t); osc.stop(t + 5.5);
      oscillators.push(osc);
    });
  }

  function playNote(freq, t) {
    const osc = audioCtx.createOscillator();
    const g   = audioCtx.createGain();
    osc.type = 'sine'; osc.frequency.value = freq;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.025, t + 0.15);
    g.gain.setValueAtTime(0.025, t + 0.6);
    g.gain.linearRampToValueAtTime(0, t + 1.2);
    osc.connect(g);
    const rev = audioCtx.createGain(); rev.gain.value = 0.7;
    g.connect(rev); rev.connect(reverbOutput.input);
    const dry = audioCtx.createGain(); dry.gain.value = 0.3;
    g.connect(dry); dry.connect(master);
    osc.start(t); osc.stop(t + 1.5);
  }

  function schedule() {
    const now = audioCtx.currentTime;
    const BAR = 4;
    for (let i = 0; i < 4; i++) {
      playChord(CHORDS[(chordIdx + i) % CHORDS.length], now + i * BAR);
      for (let j = 0; j < 2; j++) {
        const mt = now + i * BAR + j * 2 + Math.random() * 0.5;
        playNote(MELODY[melodyIdx % MELODY.length], mt);
        melodyIdx++;
      }
    }
    chordIdx = (chordIdx + 4) % CHORDS.length;
    chordTimer = setTimeout(schedule, (BAR * 4 - 0.5) * 1000);
  }

  function setup() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    if (!master) {
      master = audioCtx.createGain();
      master.gain.value = 0.4;
      master.connect(audioCtx.destination);
      reverbOutput = buildReverb(audioCtx);
      reverbOutput.output.connect(master);
    }
  }

  const btn  = document.getElementById('musicBtn');
  const bars = document.getElementById('musicBars');

  btn.addEventListener('click', () => {
    setup();
    if (!playing) {
      playing = true;
      schedule();
      btn.textContent = '⏸';
      bars.classList.remove('paused');
    } else {
      playing = false;
      clearTimeout(chordTimer);
      oscillators.forEach(o => { try { o.stop(); } catch (_) {} });
      oscillators = [];
      btn.textContent = '▶';
      bars.classList.add('paused');
    }
  });

  document.getElementById('volSlider').addEventListener('input', function () {
    if (master) master.gain.value = +this.value;
  });
}
