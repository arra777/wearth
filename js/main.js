const i18n = {
  nl: {
    "hero.pill": "IN OPBOUW — NOG NIET GELANCEERD",
    "hero.eyebrow": "EEN NIEUW SOORT GEMEENSCHAP",
    "hero.line1": "Geworteld in beoefening.",
    "hero.line2": "Verweven met gemeenschap.",
    "hero.sub": "Wearth is een yoga- en lifestylegemeenschap — gegrond in natuurlijke kleding, echte verbinding en een rustiger manier van leven.",
    "hero.formLabel": "E-mailadres",
    "hero.formPlaceholder": "jij@email.nl",
    "hero.formButton": "Sluit je aan",
    "hero.formNote": "Geen spam. Eén bericht zodra we starten.",
    "pillars.eyebrow": "DRIE DRADEN, ÉÉN WEEFSEL",
    "pillar1.tag": "BEOEFENING",
    "pillar1.title": "Yoga als aanwezigheid",
    "pillar1.body": "Lessen en bijeenkomsten die je terugbrengen naar je adem — niet naar prestatie. Rustig tempo, veel ruimte, weinig poeha.",
    "pillar2.tag": "GEMEENSCHAP",
    "pillar2.title": "Een kring die blijft",
    "pillar2.body": "Mensen die er voor elkaar zijn, op en naast de mat. Gemeenschap is niet een extraatje bij Wearth — het is het uitgangspunt.",
    "pillar3.tag": "MATERIAAL",
    "pillar3.title": "Kleding die ademt",
    "pillar3.body": "Organische, natuurlijk geverfde stoffen die met je meebewegen en jarenlang meegaan — gemaakt om te dragen, niet om te vervangen.",
    "manifesto.eyebrow": "WAAROM WEARTH",
    "manifesto.title": "We wilden geen studio die ook kleding verkoopt.",
    "manifesto.body": "We wilden één ding, drie kanten. Dus bouwen we het rustig op: eerst een gemeenschap, dan lessen, dan de eerste stoffen. Alles geworteld in hetzelfde idee — vertraag, verbind, draag wat ademt.",
    "signup.eyebrow": "WORD LID VAN HET BEGIN",
    "signup.title": "We bouwen dit langzaam, en met zorg.",
    "signup.body": "Laat je e-mailadres achter en hoor als eerste over de oprichtende gemeenschap, de eerste lessen en de eerste kledingdrop.",
    "signup.button": "Houd me op de hoogte",
    "signup.thanks": "Bedankt — je hoort snel van ons.",
    "footer.composition": "100% GEWORTELD · 100% ECHT"
  },
  en: {
    "hero.pill": "IN THE MAKING — NOT LAUNCHED YET",
    "hero.eyebrow": "A NEW KIND OF COMMUNITY",
    "hero.line1": "Rooted in practice.",
    "hero.line2": "Woven into community.",
    "hero.sub": "Wearth is a yoga and lifestyle community — grounded in natural clothing, real connection, and a slower way of moving through the world.",
    "hero.formLabel": "Email address",
    "hero.formPlaceholder": "you@email.com",
    "hero.formButton": "Join us",
    "hero.formNote": "No spam. One message when we launch.",
    "pillars.eyebrow": "THREE THREADS, ONE WEAVE",
    "pillar1.tag": "PRACTICE",
    "pillar1.title": "Yoga as presence",
    "pillar1.body": "Classes and gatherings that bring you back to your breath, not your performance. Slow pace, lots of room, little fuss.",
    "pillar2.tag": "COMMUNITY",
    "pillar2.title": "A circle that stays",
    "pillar2.body": "People who show up for each other, on and off the mat. Community isn't an add-on at Wearth — it's the starting point.",
    "pillar3.tag": "MATERIAL",
    "pillar3.title": "Clothing that breathes",
    "pillar3.body": "Organic, naturally dyed fabrics that move with you and last for years — made to wear, not to replace.",
    "manifesto.eyebrow": "WHY WEARTH",
    "manifesto.title": "We didn't want a studio that also sells clothes.",
    "manifesto.body": "We wanted one thing with three sides. So we're building it slowly: a community first, then classes, then the first fabrics. All rooted in the same idea — slow down, connect, wear what breathes.",
    "signup.eyebrow": "BE PART OF THE START",
    "signup.title": "We're building this slowly, and with care.",
    "signup.body": "Leave your email and be the first to hear about the founding community, the first classes, and the first clothing drop.",
    "signup.button": "Keep me posted",
    "signup.thanks": "Thank you — you'll hear from us soon.",
    "footer.composition": "100% ROOTED · 100% REAL"
  }
};

function applyLanguage(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (i18n[lang][key]) el.textContent = i18n[lang][key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (i18n[lang][key]) el.setAttribute("placeholder", i18n[lang][key]);
  });
  localStorage.setItem("wearth-lang", lang);
}

function initLanguageToggle() {
  const saved = localStorage.getItem("wearth-lang");
  const browserLang = navigator.language.startsWith("en") ? "en" : "nl";
  applyLanguage(saved || browserLang);

  document.getElementById("langToggle").addEventListener("click", () => {
    const next = document.documentElement.lang === "nl" ? "en" : "nl";
    applyLanguage(next);
  });
}

function initSignupForms() {
  document.querySelectorAll(".signup-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.hidden = true;
      const thanks = form.parentElement.querySelector(".form-thanks, .form-note");
      if (thanks) {
        thanks.hidden = false;
        thanks.textContent = i18n[document.documentElement.lang]["signup.thanks"];
      }
    });
  });
}

function initThreadReveal() {
  const track = document.querySelector(".thread");
  const fill = document.getElementById("threadFill");
  if (!track || !fill) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    fill.style.height = "100%";
    return;
  }

  function update() {
    const rect = track.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const visible = Math.min(viewportH * 0.75, viewportH - rect.top);
    const progress = Math.max(0, Math.min(1, visible / rect.height));
    fill.style.height = `${progress * 100}%`;
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

document.getElementById("year").textContent = new Date().getFullYear();
initLanguageToggle();
initSignupForms();
initThreadReveal();
