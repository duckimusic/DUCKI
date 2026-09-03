const form = document.getElementById("demoForm");
const success = document.getElementById("success");


// -------------------------
// FORM
// -------------------------

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));

  console.log("DUCKI connection:", data);

  form.hidden = true;
  success.hidden = false;

  document.getElementById("submit").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});


// -------------------------
// SCROLL REVEAL
// -------------------------

const revealElements = document.querySelectorAll(
  ".info > div, .section-title, .submission form"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
  observer.observe(element);
});


// -------------------------
// MAGNETIC BUTTON
// -------------------------

const buttons = document.querySelectorAll(".cta");

buttons.forEach((button) => {

  button.addEventListener("mousemove", (e) => {

    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.transform =
      `translate(${x * 0.08}px, ${y * 0.08}px)`;

  });

  button.addEventListener("mouseleave", () => {

    button.style.transform = "translate(0, 0)";

  });

});
