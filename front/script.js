function goToProfile() {
  location = "profile.html";
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

  console.log(targetElement);
  console.log(event.target);

  // Provera da li je kliknuti element različit od ciljnog elementa
  if (event.target == targetElement) {
    targetElement.classList.remove("show-menu");
  } else if (event.target == tag) {
    targetElement.classList.toggle("show-menu");
  } else targetElement.classList.add("show-menu");

  const targetEvr = document.getElementById("dropdown-list");
  const header = document.getElementById("dropdown-header");
  const arrowDown = document.getElementsByClassName("span-arrow-down")[0];
  if (targetEvr != null) {
    if (event.target != header) {
      targetEvr.classList.remove("show-list");
      arrowDown.classList.remove("rotate-up");
    } else {
      targetEvr.classList.toggle("show-list");
      const arrowDown = document.getElementsByClassName("span-arrow-down")[0];
      arrowDown.classList.toggle("rotate-up");
    }
  }
});

const scrollBtn = document.getElementById("scrollBtn");
if (scrollBtn != null) {
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
}

function redirectToPage(url) {
  window.location.href = url;
}

function changeToCourses(element) {
  if (element == "myLearning") {
    location.href = "courses.html?parametar=" + element;
    document.getElementsByClassName("addcourse")[0].classList.add("showbtn");
  } else {
    location = "courses.html";
  }
}

function goToNewCourse() {
  window.location = "newCourse.html";
}

let weekNumber = 0;
function showNextWeek(event) {
  event.preventDefault();
  const btnAdd = document.getElementById("prva");
  btnAdd.style.display = "none";
  weekNumber++;
  showInput();
  const btnNew = document.getElementById("addNew");
  btnNew.disabled.toggle;
  const btnAddMore = document.getElementById("addMore");
  btnAddMore.style.display = "none";
}

function saveChanges(event) {
  event.preventDefault();
  const input = document.getElementById("contentFile");
  input.style.display = "none";
  const week = document.getElementById("weekCourse");
  week.innerHTML = `<div class="material-added-notification">Week ${weekNumber} materials saved!</div>
  <button onclick="showInput()" id="addMore" class="form-group-btn week-material-btn">Add more material</button>
  <button onclick="showNextWeek(event)" id="addNew" class="form-group-btn week-material-btn">Add new week</button>

  `;

  const btnAddMore = document.getElementById("addMore");
  btnAddMore.disabled = false;
}

function showInput() {
  const week = document.getElementById("weekCourse");
  week.innerHTML += `<div class="weekCourse1"> <br><h2>Week ${weekNumber}</h2> 
    <div onchange="checkInput()" class="fileDiv">
     <input onchange="checkInput()" class="fileDiv" id="contentFile" type="file" accept=".txt,video/*"/>
  </div> 
  <div class="form-group">
      <textarea class="" cols="150" id="highlights" placeholder="Highlights" wrap="soft"></textarea>
  </div>

  <button disabled class="form-group-btn week-material-btn" id='sacuvaj' onclick='saveChanges(event)'>Save changes</button>

  <br>
  </div>
  `;

  const btnNew = document.getElementById("addNew");
  btnNew.disabled = true;

  const btnAddMore = document.getElementById("addMore");
  btnAddMore.disabled = true;
}

function checkInput() {
  const file = document.getElementById("contentFile");
  console.log(file.value);

  if (file.value != null) {
    const btn = document.getElementById("sacuvaj");
    btn.disabled = false;
  }
}
