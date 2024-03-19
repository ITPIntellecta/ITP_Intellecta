function showList() {
  const dropdown = document.getElementById("dropdown-list");
  dropdown.classList.toggle("show-list");

  const arrowDown = document.getElementsByClassName("span-arrow-down")[0];
  arrowDown.classList.toggle("hide-arrow");

  const arrowUp = document.getElementsByClassName("span-arrow-up")[0];
  arrowUp.classList.toggle("hide-arrow");
}

function goToProfile() {
  location = "profile.html";
}

function showRightMenu() {
  const divMenu = document.getElementsByClassName("right-menu")[0];
  divMenu.classList.toggle("show-menu");
}
