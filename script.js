function goToProfile() {
  location = "profile.html";
}

function showRightMenu() {
  const divMenu = document.getElementsByClassName("right-menu")[0];
  divMenu.classList.toggle("show-menu");
}

function scrollR() {
  const el = document.getElementById("scroll");
  el.scrollBy({ left: 100, behavior: "smooth" });
}

function scrollL() {
  const el = document.getElementById("scroll");
  el.scrollBy({ left: -100, behavior: "smooth" });
}

document.addEventListener("click", function (event) {
  const targetElement = document.getElementById("right-menu");
  const tag = document.getElementById("nav-menu");
  // Provera da li je kliknuti element različit od ciljnog elementa
  if (event.target == targetElement) {
    targetElement.classList.remove("show-menu");
  } else if (event.target == tag) {
    targetElement.classList.toggle("show-menu");
  } else targetElement.classList.add("show-menu");

  const targetEvr = document.getElementById("dropdown-list");
  const header = document.getElementById("dropdown-header");
  const arrowDown = document.getElementsByClassName("span-arrow-down")[0];
  if (event.target != header) {
    targetEvr.classList.remove("show-list");
    arrowDown.classList.remove("rotate-up");
  } else {
    targetEvr.classList.toggle("show-list");
    const arrowDown = document.getElementsByClassName("span-arrow-down")[0];
    arrowDown.classList.toggle("rotate-up");
  }
});

const scrollBtn = document.getElementById("scrollBtn");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    scrollBtn.classList.remove("hidden");
  } else {
    scrollBtn.classList.add("hidden");
  }
});

scrollBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" }); // Skrolujte na vrh stranice glatko
});
