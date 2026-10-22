
document.body.classList.add("js-ready");

const menuBtn = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.textContent = open ? "✕" : "☰";
  menuBtn.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.textContent = "☰";
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent =
  new Date().getFullYear();

const dateInput = document.getElementById("bookingDate");
const today = new Date();
const localDate = new Date(
  today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];
dateInput.min = localDate;

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

document.getElementById("bookingForm").addEventListener("submit", e => {
  e.preventDefault();

  const data = new FormData(e.currentTarget);
  const subject = "Poptávka ošetření – Exclusive Salon";
  const message = [
    "Dobrý den,",
    "",
    "ráda bych se informovala na možnost objednání.",
    "",
    "Jméno: " + data.get("name"),
    "E-mail: " + data.get("email"),
    "Telefon: " + data.get("phone"),
    "Ošetření: " + data.get("service"),
    "Preferovaný termín: " + data.get("date"),
    "",
    "Zpráva:",
    data.get("message") || "Bez další zprávy.",
    "",
    "Děkuji."
  ].join("\n");

  window.location.href =
    "mailto:exclusivesalon@seznam.cz?subject=" +
    encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(message);
});
