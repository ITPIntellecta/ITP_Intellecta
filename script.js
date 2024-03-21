function showList() {
  const dropdown = document.getElementById("dropdown-list");
  dropdown.classList.toggle("show-list");

  const arrowDown = document.getElementsByClassName("span-arrow-down")[0];
  arrowDown.classList.toggle("rotate-up");
}

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
