// Chiude il menu mobile dopo aver seguito un link ancora, cosi' non resta
// aperto sopra la sezione appena raggiunta. Bootstrap gestisce gia' tutto
// il resto (toggler, collapse) via data-attribute, senza bisogno di JS.
(function () {
  var navCollapse = document.getElementById("vsNav");
  if (!navCollapse || typeof bootstrap === "undefined") return;

  var bsCollapse = new bootstrap.Collapse(navCollapse, { toggle: false });

  navCollapse.querySelectorAll("a.nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      if (navCollapse.classList.contains("show")) {
        bsCollapse.hide();
      }
    });
  });
})();

// Rivela le tool-card con un fade/slide-in quando entrano nello schermo,
// con un piccolo ritardo scalato per ciascuna card (effetto "a cascata").
// Rispetta prefers-reduced-motion: se l'utente lo richiede, le card sono
// gia' visibili in partenza (vedi anche il CSS) e questo script non fa nulla.
(function () {
  var cards = document.querySelectorAll(".tool-card");
  if (!cards.length) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || typeof IntersectionObserver === "undefined") {
    cards.forEach(function (card) { card.classList.add("is-visible"); });
    return;
  }

  cards.forEach(function (card, i) {
    card.style.transitionDelay = Math.min(i * 80, 320) + "ms";
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach(function (card) { observer.observe(card); });
})();
