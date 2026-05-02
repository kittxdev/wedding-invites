(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();function G(){const e=document.getElementById("bgCanvas");if(!e)return;const t=e.getContext("2d"),n=50,o=[];function a(){e.width=window.innerWidth,e.height=window.innerHeight}a();let i;window.addEventListener("resize",()=>{clearTimeout(i),i=setTimeout(a,150)});for(let s=0;s<n;s++)o.push({x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,r:Math.random()*1.1+.2,speed:Math.random()*.002+.001,phase:Math.random()*Math.PI*2});let r=0,v=0;t.fillStyle="rgba(201,169,110,1)";function p(s){if(s-v<33){requestAnimationFrame(p);return}v=s,t.clearRect(0,0,e.width,e.height),r++;for(let c=0;c<o.length;c++){const y=o[c];t.globalAlpha=.2+.5*Math.sin(r*y.speed+y.phase),t.beginPath(),t.arc(y.x,y.y,y.r,0,Math.PI*2),t.fill()}t.globalAlpha=1,requestAnimationFrame(p)}requestAnimationFrame(p)}function j(){document.body.classList.add("cursor-ready");const e=document.getElementById("cursor"),t=document.getElementById("cursorRing"),n=[],o=4;for(let s=0;s<o;s++){const c=document.createElement("div");c.className="cursor-trail",c.style.opacity=.35*(1-s/o),document.body.appendChild(c),n.push({el:c,x:0,y:0})}let a=0,i=0,r=0,v=0;document.addEventListener("mousemove",s=>{a=s.clientX,i=s.clientY},{passive:!0}),document.addEventListener("mouseover",s=>{const c=s.target.tagName,y=c==="BUTTON"||c==="A"||c==="INPUT"||c==="SELECT"||c==="TEXTAREA";e.classList.toggle("big",y)},{passive:!0});function p(){e.style.transform=`translate3d(${a}px, ${i}px, 0) translate(-50%, -50%)`,r+=(a-r)*.15,v+=(i-v)*.15,t.style.transform=`translate3d(${r}px, ${v}px, 0) translate(-50%, -50%)`;for(let s=n.length-1;s>0;s--)n[s].x+=(n[s-1].x-n[s].x)*.35,n[s].y+=(n[s-1].y-n[s].y)*.35,n[s].el.style.transform=`translate3d(${n[s].x}px, ${n[s].y}px, 0) translate(-50%, -50%)`;n[0].x=a,n[0].y=i,requestAnimationFrame(p)}p()}function q(){let e,t,n,o=!1,a=null,i=[],r=0,v=0;const p=[[293.66,369.99,440,587.33],[220,277.18,329.63,440],[246.94,293.66,369.99,493.88],[196,246.94,293.66,392]],s=[587.33,659.25,783.99,880,783.99,659.25,587.33,523.25];function c(g){const l=g.createConvolver(),u=g.sampleRate*2.5,m=g.createBuffer(2,u,g.sampleRate);for(let f=0;f<2;f++){const L=m.getChannelData(f);for(let M=0;M<u;M++)L[M]=(Math.random()*2-1)*Math.pow(1-M/u,1.8)}l.buffer=m;const h=g.createGain();return h.gain.value=.38,l.connect(h),{input:l,output:h}}function y(g,l){g.forEach((u,m)=>{const h=e.createOscillator(),f=e.createGain();h.type=m===0?"triangle":"sine",h.frequency.value=m===0?u/2:u;const L=m===0?.05:.03;f.gain.setValueAtTime(0,l),f.gain.linearRampToValueAtTime(L,l+1.2),f.gain.setValueAtTime(L,l+3),f.gain.linearRampToValueAtTime(0,l+5),h.connect(f);const M=e.createGain();M.gain.value=.5,f.connect(M),M.connect(t),f.connect(n.input),h.start(l),h.stop(l+5.5),i.push(h)})}function B(g,l){const u=e.createOscillator(),m=e.createGain();u.type="sine",u.frequency.value=g,m.gain.setValueAtTime(0,l),m.gain.linearRampToValueAtTime(.025,l+.15),m.gain.setValueAtTime(.025,l+.6),m.gain.linearRampToValueAtTime(0,l+1.2),u.connect(m);const h=e.createGain();h.gain.value=.7,m.connect(h),h.connect(n.input);const f=e.createGain();f.gain.value=.3,m.connect(f),f.connect(t),u.start(l),u.stop(l+1.5)}function S(){const g=e.currentTime,l=4;for(let u=0;u<4;u++){y(p[(r+u)%p.length],g+u*l);for(let m=0;m<2;m++){const h=g+u*l+m*2+Math.random()*.5;B(s[v%s.length],h),v++}}r=(r+4)%p.length,a=setTimeout(S,(l*4-.5)*1e3)}function O(){e||(e=new(window.AudioContext||window.webkitAudioContext)),e.state==="suspended"&&e.resume(),t||(t=e.createGain(),t.gain.value=.4,t.connect(e.destination),n=c(e),n.output.connect(t))}const D=document.getElementById("musicBtn"),I=document.getElementById("musicBars");D.addEventListener("click",()=>{O(),o?(o=!1,clearTimeout(a),i.forEach(g=>{try{g.stop()}catch{}}),i=[],D.textContent="▶",I.classList.add("paused")):(o=!0,S(),D.textContent="⏸",I.classList.remove("paused"))}),document.getElementById("volSlider").addEventListener("input",function(){t&&(t.gain.value=+this.value)})}const $={bride:{name:"Vivitha",fullName:"D. Vivitha",role:"The Bride",emoji:"🪷",bio:"Graceful, driven, and full of life. With her radiant smile and gentle heart, she brings immense joy and warmth to everyone around her."},groom:{name:"Padma Dev",fullName:"E. Padma Dev",role:"The Groom",emoji:"🌿",bio:"Thoughtful, compassionate, and an easygoing spirit. He found his perfect match in Vivitha to share life's beautiful, grand journey."},wedding:{date:"2026-05-27",dateDisplay:"May 27, 2026",dayOfWeek:"Wednesday",time:"10:30",timeDisplay:"10:30 AM to 11:30 AM",venue:{name:"Aysha Mahal",address:"Abishekapatti",city:"Tirunelveli"},hashtag:"#PadmaWedsVivitha"},schedule:[{time:"10:30 AM",event:"Muhurtham",icon:"🕉️",desc:"The auspicious moment where two souls are bound together in the holy bond of marriage at Aysha Mahal, Tirunelveli."},{time:"12:00 PM",event:"Wedding Feast",icon:"🍃",desc:"Join us for a grand South Indian banana leaf wedding feast with traditional delicacies."},{time:"6:30 PM",event:"Grand Reception",icon:"🎉",desc:"An evening of revelry and celebration at Joseph Hall, Mathar Sangam Road, East Ramanputhoor, Nagercoil."},{time:"7:30 PM",event:"Dinner & Music",icon:"🍽️",desc:"Continue the celebration with a sumptuous dinner, heartfelt blessings, and joyful melodies."}],parents:{bride:[{name:"Mr. V. Dharma Raj",qual:"M.Sc., M.Tech.",desc:"GAIL India Ltd (VRS), Prop. Vivitha Microns"},{name:"Mrs. V. Latha",qual:"M.A., B.Ed., M.Phil.",desc:"St. Joseph Matric. Hr.Sec.School., Alangulam."}],groom:[{name:"Mr. P. Elango",qual:"B.Sc.(Agri)",desc:"Joint Director of Agriculture (Rtd)"},{name:"Mrs. M. Nagarethinam",qual:"M.Sc. (N)",desc:"Principal, Dept. of Allied Health Sciences, Siva Hospital"}]}},R=$.bride,P=$.groom,d=$.wedding,E=e=>document.getElementById(e),A=(e,t)=>{const n=E(e);n&&(n.innerHTML=t)},T=(e,t)=>{const n=E(e);n&&(n.textContent=t)},H=new URLSearchParams(window.location.search),x=H.get("side")==="bride",b=x?R:P,w=x?P:R;function U(){const e=`${b.name} & ${w.name} | Wedding Invitation`;document.title=e;const t=`We cordially invite you to celebrate the wedding of ${b.name} and ${w.name} on ${d.dateDisplay}. Join us for this joyous occasion!`,n=(o,a,i)=>{const r=document.querySelector(o);r&&r.setAttribute(a,i)};n('meta[name="description"]',"content",t),n('meta[property="og:title"]',"content",e),n('meta[property="og:description"]',"content",t),n('meta[property="twitter:title"]',"content",e),n('meta[property="twitter:description"]',"content",t)}function W(){A("navLogo",`${b.name[0]}<span class="nav-amp">&amp;</span>${w.name[0]}`)}function z(){T("heroName1",b.name),T("heroName2",w.name),T("heroDate",`${d.dayOfWeek} · ${d.dateDisplay} · ${d.timeDisplay}`),T("heroVenue",`${d.venue.name} · ${d.venue.city}`),T("cdBgText",`${b.name} & ${w.name}`),A("candleRow",[60,80,50,100,70,90,55,85].map(t=>`
    <div class="candle">
      <div class="candle-glow" style="width:${t*.5}px;height:${t*.5}px;margin-bottom:-${t*.1}px;"></div>
      <div class="candle-flame"></div>
      <div class="candle-body" style="height:${t}px;"></div>
    </div>`).join(""))}function F(){function e(){const o=new Date(`${d.date}T${d.time}:00`)-Date.now(),a=E("countdownGrid");if(!a)return;if(o<=0){a.innerHTML=`<p style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:2.5rem;color:var(--gold);text-align:center">The celebration has begun! 🎉</p>`;return}const i=[["Days",Math.floor(o/864e5)],["Hours",Math.floor(o%864e5/36e5)],["Minutes",Math.floor(o%36e5/6e4)],["Seconds",Math.floor(o%6e4/1e3)]];a.innerHTML=i.map(([r,v])=>`
      <div class="countdown-item">
        <div class="countdown-box"><span class="countdown-num">${String(v).padStart(2,"0")}</span></div>
        <div class="countdown-label">${r}</div>
      </div>`).join("")}e(),setInterval(e,1e3);const t=E("addToCal");t&&t.addEventListener("click",()=>{const n=d.date.replace(/-/g,""),o=d.time.replace(/:/g,"")+"00",a=n+"T"+o,i=String((parseInt(d.time.split(":")[0],10)+4)%24).padStart(2,"0"),r=n+"T"+i+o.substring(2),v=`BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${window.location.href}
DTSTART:${a}
DTEND:${r}
SUMMARY:${b.name} & ${w.name}'s Wedding
DESCRIPTION:Celebrate the wedding of ${b.name} and ${w.name}!
LOCATION:${d.venue.name}, ${d.venue.address}, ${d.venue.city}
END:VEVENT
END:VCALENDAR`,p=new Blob([v],{type:"text/calendar;charset=utf-8"}),s=URL.createObjectURL(p),c=document.createElement("a");c.href=s,c.download="wedding_invitation.ics",document.body.appendChild(c),c.click(),document.body.removeChild(c)})}function N(e,t){return`
    <div class="couple-card ${t}">
      <div class="couple-avatar-frame">
        <div class="couple-avatar-bg">${e.emoji}</div>
        <div class="couple-avatar-ring"></div>
        <div class="couple-avatar-ring2"></div>
      </div>
      <h3 class="couple-fullname">${e.fullName}</h3>
      <p class="couple-role-tag">${e.role}</p>
      <p class="couple-bio-text">${e.bio}</p>
    </div>`}function k(){A("coupleGrid",N(b,"reveal-left")+`<div class="couple-center reveal-scale">
       <div class="couple-vline"></div>
       <div class="couple-rings-icon">💍</div>
       <div class="couple-vline"></div>
     </div>`+N(w,"reveal-right"));const e=x?$.parents.bride:$.parents.groom,t=x?$.parents.groom:$.parents.bride,n=x?"Bride's Parents":"Groom's Parents",o=x?"Groom's Parents":"Bride's Parents";function a(i,r){const v=r.map(p=>`
      <div style="margin-bottom: 26px;">
        <h3 class="couple-fullname" style="font-size: 1.4rem; margin-bottom: 4px;">${p.name}</h3>
        <p style="font-family: 'Cinzel', serif; font-size: 0.6rem; color: var(--gold); letter-spacing: 0.15em; margin-bottom: 4px;">${p.qual}</p>
        <p style="font-size: 0.75rem; color: var(--textMid); font-weight: 300; line-height: 1.5;">${p.desc}</p>
      </div>
    `).join("");return`
      <div style="flex: 1; min-width: 250px; max-width: 380px; text-align: center;">
        <p class="couple-role-tag" style="margin-bottom: 24px; font-size: 0.7rem;">${i}</p>
        ${v}
      </div>
    `}A("parentsGrid",a(n,e)+'<div class="parents-divider"></div>'+a(o,t))}function J(){T("schedSub",`${d.dateDisplay} · ${d.venue.name}`);const e=E("scheduleScroll");e.innerHTML=$.schedule.map(n=>`
    <div class="sch-card">
      <div class="sch-icon">${n.icon}</div>
      <p class="sch-time">${n.time}</p>
      <h3 class="sch-event">${n.event}</h3>
      <p class="sch-desc">${n.desc}</p>
    </div>`).join("");const t=E("schedDots");t.innerHTML=$.schedule.map((n,o)=>`<div class="sch-dot${o===0?" active":""}"></div>`).join(""),e.addEventListener("scroll",()=>{const n=Math.round(e.scrollLeft/304);t.querySelectorAll(".sch-dot").forEach((o,a)=>o.classList.toggle("active",a===n))})}function Y(){const e=d.venue,t=[["🏛️","Venue",e.name],["📍","Address",`${e.address}, ${e.city}`],["📅","Date & Time",`${d.dateDisplay} · ${d.timeDisplay}`]],n=`https://maps.google.com/maps?q=${encodeURIComponent(e.name+", "+e.city)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;A("venueGrid",`
    <div class="venue-visual reveal-left">
      <iframe class="venue-map-iframe" src="${n}" allowfullscreen loading="lazy"></iframe>
    </div>
    <div class="reveal-right">
      <h3 class="venue-name-big">${e.name}</h3>
      ${t.map(([o,a,i])=>`
        <div class="venue-detail-row">
          <div class="venue-icon">${o}</div>
          <div>
            <p class="venue-detail-label">${a}</p>
            <p class="venue-detail-val">${i}</p>
          </div>
        </div>`).join("")}
    </div>`)}function _(){A("footerMono",`<span style="padding:0 5px">${b.name}</span><span class="footer-amp">&amp;</span><span style="padding:0 5px">${w.name}</span>`),T("footerDate",d.dateDisplay.toUpperCase()),T("footerTag",d.hashtag)}U();W();z();k();J();Y();_();F();G();j();q();document.getElementById("musicPlayer").classList.add("show");let C=!1;window.addEventListener("scroll",()=>{C||(requestAnimationFrame(()=>{const e=document.getElementById("nav");e&&e.classList.toggle("scrolled",window.scrollY>80),C=!1}),C=!0)},{passive:!0});const V=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(t.target.classList.add("visible"),V.unobserve(t.target))})},{threshold:.1,rootMargin:"0px 0px -50px 0px"});document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach(e=>V.observe(e));document.addEventListener("click",e=>{const t=["✦","✧","◆","·"];for(let n=0;n<10;n++){const o=document.createElement("div");o.className="burst";const a=n/10*Math.PI*2,i=20+Math.random()*30;o.style.cssText=`
      left: ${e.clientX+Math.cos(a)*i}px;
      top: ${e.clientY+Math.sin(a)*i}px;
      color: ${n%2===0?"var(--gold)":"var(--rose)"};
      font-size: ${.6+Math.random()*.5}rem;
    `,o.textContent=t[Math.floor(Math.random()*t.length)],document.body.appendChild(o),setTimeout(()=>o.remove(),700)}});
