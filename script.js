const form = document.getElementById("demoForm");
const success = document.getElementById("success");


// =========================
// GOOGLE APPS SCRIPT
// =========================

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwDPjiFe_8ZMizJJOZjJt2FBUW3220S-dLFwsUASaeDykrV-WlSydtDB3Hwt_OlJhHE/exec";


// =========================
// FORM SUBMISSION
// =========================

if (form && success) {

  form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const submitButton =
      form.querySelector('button[type="submit"]');

    const originalText =
      submitButton.innerHTML;

    submitButton.disabled = true;

    submitButton.innerHTML =
      'SENDING <span>↗</span>';


    const formData =
      new FormData(form);

    const data =
      Object.fromEntries(formData.entries());


    console.log("DUCKI connection:", data);


    try {

      const response = await fetch(
        GOOGLE_SCRIPT_URL,
        {
          method: "POST",

          headers: {
            "Content-Type": "text/plain;charset=utf-8"
          },

          body: JSON.stringify(data)
        }
      );


      const result =
        await response.json();


      if (!result.success) {
        throw new Error(
          result.error || "Submission failed."
        );
      }


      // Hide form
      form.hidden = true;

      // Show success message
      success.hidden = false;


      // Scroll to submission section
      document
        .getElementById("submit")
        .scrollIntoView({
          behavior: "smooth",
          block: "start"
        });


    } catch (error) {

      console.error(
        "DUCKI submission error:",
        error
      );


      submitButton.disabled = false;

      submitButton.innerHTML =
        originalText;


      alert(
        "Something went wrong. Please try again."
      );

    }

  });

}


// =========================
// LOGO PROTECTION
// =========================

const logo =
  document.querySelector(".logo");

const logoImage =
  document.querySelector(".logo img");


if (logo) {

  logo.addEventListener(
    "contextmenu",
    function (event) {

      event.preventDefault();

    }
  );


  logo.addEventListener(
    "dragstart",
    function (event) {

      event.preventDefault();

    }
  );

}


if (logoImage) {

  logoImage.addEventListener(
    "dragstart",
    function (event) {

      event.preventDefault();

    }
  );


  logoImage.addEventListener(
    "contextmenu",
    function (event) {

      event.preventDefault();

    }
  );

}


// =========================
// SCROLL REVEAL
// =========================

const revealElements =
  document.querySelectorAll(
    ".info > div, .section-title, .submission form"
  );


if ("IntersectionObserver" in window) {

  const observer =
    new IntersectionObserver(
      function (entries) {

        entries.forEach(
          function (entry) {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: 0.15
      }
    );


  revealElements.forEach(
    function (element) {

      element.classList.add(
        "reveal"
      );

      observer.observe(
        element
      );

    }
  );


} else {

  revealElements.forEach(
    function (element) {

      element.classList.add(
        "visible"
      );

    }
  );

}


// =========================
// MAGNETIC BUTTON
// =========================

const buttons =
  document.querySelectorAll(".cta");


buttons.forEach(
  function (button) {

    button.addEventListener(
      "mousemove",
      function (event) {

        const rect =
          button.getBoundingClientRect();


        const x =
          event.clientX -
          rect.left -
          rect.width / 2;


        const y =
          event.clientY -
          rect.top -
          rect.height / 2;


        button.style.transform =
          `translate(${x * 0.08}px, ${y * 0.08}px)`;

      }
    );


    button.addEventListener(
      "mouseleave",
      function () {

        button.style.transform =
          "translate(0, 0)";

      }
    );

  }
);
