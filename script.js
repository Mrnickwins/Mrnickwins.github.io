/* ---------- Projects (edit this list to add or change projects) ---------- */
const GITHUB = "https://github.com/Mrnickwins";

const projects = [
  {
    name: "Shadows of Valenford",
    type: "Game",
    text: "A 2D action-platformer inspired by Castlevania, built with Java and LibGDX. Focused on gameplay mechanics, level design and player movement.",
    tags: ["Java", "LibGDX"],
    link: GITHUB
  },
  {
    name: "Guitarist Community Website",
    type: "Web",
    text: "A platform for guitarists with guides to guitars, amplifiers and pedals, plus a forum to discuss and exchange opinions on gear.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: GITHUB
  },
  {
    name: "Spotify Blend App",
    type: "In progress",
    text: "A music-sharing app using the Spotify API, designed to create a shared listening experience for me and my friends.",
    tags: ["JavaScript", "Spotify API"],
    link: GITHUB
  },
  {
    name: "Cybersecurity Labs",
    type: "Security",
    text: "Hands-on challenges on TryHackMe and Hack The Box covering Linux, networking, reconnaissance and ethical hacking concepts.",
    tags: ["TryHackMe", "Hack The Box", "Linux"],
    link: ""
  }
];

/* ---------- Scroll reveal ---------- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

/* ---------- Build project cards ---------- */
const grid = document.getElementById("repo-grid");

projects.forEach((p, i) => {
  const card = document.createElement("div");
  card.className = "card";
  card.style.transitionDelay = `${i * 80}ms`;
  card.innerHTML = `
    <span class="badge">${p.type}</span>
    <h3>${p.name}</h3>
    <p>${p.text}</p>
    <div class="tags small">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
    ${p.link ? `<div class="card-links"><a href="${p.link}" target="_blank" rel="noopener">View on GitHub</a></div>` : ""}
  `;
  grid.appendChild(card);
  observer.observe(card);
});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* Stagger the skill tag pop-in */
document.querySelectorAll(".skill-groups .tag").forEach((t, i) => t.style.setProperty("--i", i));

/* ---------- Typed status line ---------- */
const phrases = ['"Learning pentesting"', '"Working toward CEH"', '"Building web projects"'];
const status = document.getElementById("status");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let p = 0, c = 0, deleting = false;

function type() {
  const text = phrases[p];
  status.textContent = text.slice(0, c);
  if (!deleting && c < text.length) c++;
  else if (!deleting) { deleting = true; return setTimeout(type, 1500); }
  else if (c > 0) c--;
  else { deleting = false; p = (p + 1) % phrases.length; }
  setTimeout(type, deleting ? 40 : 90);
}
if (reduceMotion) status.textContent = phrases[0]; else type();

/* ---------- Scroll progress bar ---------- */
const bar = document.getElementById("progress");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
});

/* ---------- Dark mode (remembers your choice) ---------- */
const toggle = document.getElementById("theme-toggle");

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  toggle.textContent = theme === "dark" ? "Light" : "Dark";
  try { localStorage.setItem("theme", theme); } catch (e) {}
}

let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
setTheme(saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

toggle.addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

/* ---------- Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();