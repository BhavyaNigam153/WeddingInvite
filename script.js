// LOADING
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loading").classList.add("done");
  }, 800);
});

// PETALS
const pc = document.getElementById("petals");
const petalColors = [
  "#FFB7C5",
  "#FF8FAB",
  "#FFCDD2",
  "#F48FB1",
  "#FFE0B2",
  "#FFCC80",
];
for (let i = 0; i < 18; i++) {
  const p = document.createElement("div");
  p.className = "petal";
  p.style.cssText = `left:${Math.random() * 100}%;top:-20px;background:${petalColors[Math.floor(Math.random() * petalColors.length)]};animation-duration:${4 + Math.random() * 6}s;animation-delay:${Math.random() * 5}s;width:${8 + Math.random() * 10}px;height:${10 + Math.random() * 14}px;border-radius:${Math.random() > 0.5 ? "50% 0 50% 0" : "0 50% 0 50%"}`;
  pc.appendChild(p);
}

// ENV BACKGROUND PETALS
const envBg = document.getElementById("envBg");
for (let i = 0; i < 25; i++) {
  const p = document.createElement("div");
  p.className = "env-bg-petal";
  p.textContent = ["🌸", "🌺", "✿", "❀", "🪷"][Math.floor(Math.random() * 5)];
  p.style.cssText = `top:-200px;left:${Math.random() * 100}%;animation-duration:${3 + Math.random() * 4}s;animation-delay:${Math.random() * 3}s;font-size:${14 + Math.random() * 20}px`;
  envBg.appendChild(p);
}

// STARS for cards
function makeStars(id) {
  const c = document.getElementById(id);
  if (!c) return;
  for (let i = 0; i < 20; i++) {
    const s = document.createElement("div");
    s.className = "star";
    s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${1 + Math.random() * 3}px;height:${1 + Math.random() * 3}px;background:rgba(255,255,255,${0.3 + Math.random() * 0.5});animation-delay:${Math.random() * 2}s;animation-duration:${1 + Math.random() * 2}s`;
    c.appendChild(s);
  }
}
makeStars("sangeetStars");
makeStars("recepStars");

// ENVELOPE
let envOpened = false;
function openEnvelope() {
  if (envOpened) return;
  envOpened = true;
  document.getElementById("envelopeEl").classList.add("opening");
  document.querySelector(".envelope-wrap").classList.add("opening");
  document.getElementById("envFlap").classList.add("open");
  document.getElementById("envCard").classList.add("show");
  // flap open (0.8s) + hold visible (1s), then fade envelope
  setTimeout(() => {
    document.getElementById("envelope-screen").classList.add("hidden");
    document.getElementById("main").classList.add("visible");
    window.scrollTo(0, 0);
    observeElements();
  }, 1800);
}

// COUNTDOWN
function updateCountdown() {
  const target = new Date("2026-11-26T20:00:00");
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) {
    document.getElementById("days").textContent = "00";
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById("days").textContent = String(d).padStart(2, "0");
  document.getElementById("hours").textContent = String(h).padStart(2, "0");
  document.getElementById("minutes").textContent = String(m).padStart(2, "0");
  document.getElementById("seconds").textContent = String(s).padStart(2, "0");
}
setInterval(updateCountdown, 1000);
updateCountdown();

// RSVP
let rsvpAttend = "Yes";
function selectRsvp(el, val) {
  rsvpAttend = val;
  document
    .querySelectorAll(".rsvp-opt")
    .forEach((o) => o.classList.remove("active"));
  el.classList.add("active");
}
function submitRsvp() {
  const name = document.getElementById("rName").value;
  if (!name.trim()) {
    alert("Please enter your name");
    return;
  }
  document.getElementById("rsvpForm").style.display = "none";
  document.getElementById("successMsg").classList.add("show");
}

// SCROLL ANIMATIONS
function observeElements() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
  );
  document.querySelectorAll(".fade-up").forEach((el) => obs.observe(el));
}

// NAV DOTS
const sections = ["hero", "save-date", "countdown", "events", "family", "rsvp"];
const dots = document.querySelectorAll(".nav-dot");
function updateDots() {
  const scrollY = window.scrollY;
  let active = 0;
  sections.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el && el.offsetTop - 200 <= scrollY) active = i;
  });
  dots.forEach((d, i) => d.classList.toggle("active", i === active));
}
dots.forEach((d, i) =>
  d.addEventListener("click", () => {
    const el = document.getElementById(sections[i]);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }),
);
window.addEventListener("scroll", () => {
  updateDots();
  const bt = document.getElementById("back-top");
  bt.classList.toggle("visible", window.scrollY > 400);
});

// For direct URL open, show envelope immediately
// document.getElementById("main").style.pointerEvents = "none";
