const form = document.getElementById("demoForm");
const success = document.getElementById("success");

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzgRCYcl69q8725JOmcyYHbNBcbXtMdZhkgYhn9iz8WYSxnjEJJlO1VWVs_xTB6hWkn/exec";

/* =========================
   FORM SUBMISSION
========================= */

if (form && success) {
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.innerHTML = 'SENDING <span>↗</span>';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Submission failed.");
      }

      form.hidden = true;
      success.hidden = false;

      document.getElementById("submit").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    } catch (error) {
      console.error("DUCKI submission error:", error);

      submitButton.disabled = false;
      submitButton.innerHTML = originalText;

      alert("Something went wrong. Please try again.");
    }
  });
}


/* =========================
   LOGO PROTECTION
========================= */

const logo = document.querySelector(".logo");
const logoImage = document.querySelector(".logo img");

[logo, logoImage].forEach((element) => {
  if (!element) return;

  element.addEventListener("contextmenu", (event) => event.preventDefault());
  element.addEventListener("dragstart", (event) => event.preventDefault());
});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
  ".info-card, .interaction-panel, .section-title, .submission form"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}


/* =========================
   INTERACTIVE INFO CARDS
========================= */

const cards = document.querySelectorAll(".info-card");
const interactionTitle = document.getElementById("interactionTitle");
const interactionText = document.getElementById("interactionText");
const interactionLink = document.getElementById("interactionLink");

const cardContent = {
  "01": {
    title: "MAKE MUSIC.",
    text: "Send a track, remix, rough demo, strange experiment, or an idea that has nowhere else to go.",
    link: "SEND A TRACK ↗"
  },
  "02": {
    title: "MAKE SOMETHING TOGETHER.",
    text: "Producer, vocalist, visual artist, beatmaker — if there is chemistry, let's build something.",
    link: "START A COLLAB ↗"
  },
  "03": {
    title: "DROP BY.",
    text: "No pitch deck required. If you made something interesting, put it in the pond.",
    link: "SEND SOMETHING ↗"
  }
};

cards.forEach((card) => {
  card.addEventListener("click", () => {
    const data = cardContent[card.dataset.card];
    if (!data) return;

    cards.forEach((item) => item.classList.remove("active"));
    card.classList.add("active");

    interactionTitle.textContent = data.title;
    interactionText.textContent = data.text;
    interactionLink.textContent = data.link;

    document.querySelector(".interaction-panel")?.classList.remove("panel-pulse");
    requestAnimationFrame(() => {
      document.querySelector(".interaction-panel")?.classList.add("panel-pulse");
    });
  });
});


/* =========================
   MAGNETIC ELEMENTS
========================= */

const magneticElements = document.querySelectorAll(".magnetic");

if (window.matchMedia("(pointer: fine)").matches) {
  magneticElements.forEach((element) => {
    element.addEventListener("mousemove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      element.style.transform =
        `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });

    element.addEventListener("mouseleave", () => {
      element.style.transform = "translate(0, 0)";
    });
  });
}


/* =========================
   DESKTOP CURSOR + SPOTLIGHT
========================= */

const cursorDot = document.querySelector(".cursor-dot");
const cursorGlow = document.querySelector(".cursor-glow");

if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);

    if (cursorDot) {
      cursorDot.style.transform =
        `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    }

    if (cursorGlow) {
      cursorGlow.style.transform =
        `translate3d(${event.clientX - 180}px, ${event.clientY - 180}px, 0)`;
    }
  });

  document.querySelectorAll("a, button, input, select, textarea").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      document.body.classList.add("cursor-hover");
    });

    element.addEventListener("mouseleave", () => {
      document.body.classList.remove("cursor-hover");
    });
  });
}


/* =========================
   HERO PARALLAX
========================= */

const hero = document.querySelector(".hero");
const heroTitle = document.querySelector(".hero h1");
const heroOrbit = document.querySelector(".hero-orbit");

if (hero && heroTitle && window.matchMedia("(pointer: fine)").matches) {
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroTitle.style.transform =
      `translate(${x * 7}px, ${y * 7}px)`;

    if (heroOrbit) {
      heroOrbit.style.transform =
        `translate(${x * -18}px, ${y * -18}px) rotate(${x * 4}deg)`;
    }
  });

  hero.addEventListener("pointerleave", () => {
    heroTitle.style.transform = "translate(0, 0)";
    if (heroOrbit) heroOrbit.style.transform = "translate(0, 0)";
  });
}


/* =========================
   LOGO EASTER EGG
========================= */

let logoClicks = 0;
let logoTimer;

if (logo) {
  logo.addEventListener("click", (event) => {
    event.preventDefault();

    logoClicks++;
    clearTimeout(logoTimer);

    logoTimer = setTimeout(() => {
      logoClicks = 0;
    }, 900);

    if (logoClicks >= 5) {
      logoClicks = 0;

      const toast = document.querySelector(".ducki-toast");
      toast?.classList.add("show");

      setTimeout(() => toast?.classList.remove("show"), 900);
    }
  });
}


/* =========================
   KEYBOARD EASTER EGG
========================= */

let keyBuffer = "";

window.addEventListener("keydown", (event) => {
  if (event.key.length !== 1) return;

  keyBuffer = (keyBuffer + event.key.toLowerCase()).slice(-5);

  if (keyBuffer === "quack") {
    document.body.classList.add("quack-mode");

    setTimeout(() => {
      document.body.classList.remove("quack-mode");
    }, 1100);

    keyBuffer = "";
  }
});
