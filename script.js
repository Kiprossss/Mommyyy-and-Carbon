/* 🕯 ELEMENTS (mobile-safe) */

const ritual = document.getElementById("ritual");
const home = document.getElementById("home");
const greeting = document.getElementById("greeting");
const timer = document.getElementById("timer");
const loveLetter = document.getElementById("loveLetter");
const moon = document.getElementById("moon");

/* 🕯 RITUAL */

setTimeout(()=>{
  ritual.style.display="none";
  home.classList.remove("hidden");
},4000);

/* 🎵 MUSIC (mobile unlock) */

document.body.addEventListener("click",()=>{
  document.getElementById("bg-music").play();
},{once:true});

/* ⏳ RELATIONSHIP TIMER (YOUR LONG ACCURATE VERSION) */

const startDate = new Date("2025-10-31T00:00:00");

function updateTimer(){

  const now = new Date();

  let months =
    (now.getFullYear() - startDate.getFullYear()) * 12 +
    (now.getMonth() - startDate.getMonth());

  let anniversary = new Date(startDate);
  anniversary.setFullYear(now.getFullYear(), now.getMonth(), startDate.getDate());

  if (anniversary.getDate() !== startDate.getDate()) {
    anniversary = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  }

  if (now < anniversary) {

    months--;

    anniversary = new Date(startDate);
    anniversary.setFullYear(now.getFullYear(), now.getMonth() - 1, startDate.getDate());

    if (anniversary.getDate() !== startDate.getDate()) {
      anniversary = new Date(now.getFullYear(), now.getMonth(), 0);
    }
  }

  let diff = now - anniversary;

  const days = Math.floor(diff / (1000*60*60*24));
  diff -= days * (1000*60*60*24);

  const hours = Math.floor(diff / (1000*60*60));
  diff -= hours * (1000*60*60);

  const minutes = Math.floor(diff / (1000*60));
  diff -= minutes * (1000*60);

  const seconds = Math.floor(diff / 1000);

  timer.innerHTML = `
    ${months} months ${days} days 🖤<br>
    ${hours} hours ${minutes} minutes ${seconds} seconds
  `;
}

setInterval(updateTimer,1000);
updateTimer();

/* 🌙 GREETING */

const hour = new Date().getHours();
const greetingEl = document.getElementById("greeting");

if (hour >= 5 && hour < 12) {
  greetingEl.innerText = "Good morning, my love";
}
else if (hour >= 12 && hour < 18) {
  greetingEl.innerText = "You are my eternal light";
}
else if (hour >= 18 && hour < 24) {
  greetingEl.innerText = "Good evening, my princess of darkness";
}
else {
  greetingEl.innerText = "In the deepest night, you are mine";
}
/* 💬 BUBBLE SYSTEM */

window.showBubble = function(array){

  const bubble = document.getElementById("love-bubble");

  bubble.innerText = array[Math.floor(Math.random()*array.length)];

  bubble.classList.remove("show");
  void bubble.offsetWidth;
  bubble.classList.add("show");
};

/* 🖤 WHISPER */

window.whisper = function(){

  const input = document.getElementById("whisperInput");

  if(!input.value.trim()) return;

  showBubble([input.value]);

  input.value="";
};

/* 🌌 STARS CANVAS */

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
window.addEventListener("orientationchange", resizeCanvas);

let stars = Array.from({length:60},()=>({

  x:Math.random()*canvas.width,
  y:Math.random()*canvas.height,
  r:Math.random()*1.2

}));

function drawStars(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle="#6e5aa6";

  stars.forEach(s=>{
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fill();
  });

  requestAnimationFrame(drawStars);
}

drawStars();

/* 🌙 MOON VISIBILITY */

moon.style.opacity = (hour>=18 || hour<=5) ? "0.18" : "0.08";

/* 🥀 LOVE LETTER DELAY */

setTimeout(()=>{
  loveLetter.style.opacity=1;
},20000);

/* 📱 REAL MOBILE HEIGHT FIX (iOS + ANDROID + PWA) */

function setRealViewportHeight(){
  document.documentElement.style
  .setProperty('--vh', `${window.innerHeight * 0.01}px`);
}

setRealViewportHeight();
window.addEventListener("resize", setRealViewportHeight);
window.addEventListener("orientationchange", setRealViewportHeight);

/* 📦 SERVICE WORKER */

if("serviceWorker" in navigator){
  navigator.serviceWorker.register("service-worker.js");
}