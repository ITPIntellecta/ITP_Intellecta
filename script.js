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
  fileOrder = 0;
  const btnAdd = document.getElementById("prva");
  btnAdd.style.display = "none";
  weekNumber++;
  showInput(event);
  const btnNew = document.getElementById("addNew");
  btnNew.disabled.toggle;
  const btnAddMore = document.getElementById("addMore");
  btnAddMore.style.display = "none";
}

let filesArray = [];
let fileOrder = 0;

function saveChanges(event) {
  event.preventDefault();
  const input = document.getElementById("contentFile");

  //ne radi!
  const fileInputs = document.querySelectorAll(".fileDiv");
  console.log(fileInputs);
  fileInputs.forEach(function (input) {
    if (input.files.length > 0) {
      // Provjeravamo da li je odabrana datoteka
      filesArray.push(input.files[0]); // Dodajemo prvu odabrana datoteka iz svakog input polja u niz
    }
  });

  console.log(filesArray);

  input.style.display = "none";
  const week = document.getElementById("weekCourse");
  week.innerHTML = `<div class="material-added-notification">Week ${weekNumber} materials saved!</div>
  <button onclick="showInput(event)" id="addMore" class="form-group-btn week-material-btn">Add more material</button>
  <button onclick="showNextWeek(event)" id="addNew" class="form-group-btn week-material-btn">Add new week</button>

  `;

  const btnAddMore = document.getElementById("addMore");
  btnAddMore.disabled = false;
}

function showInput(event) {
  event.preventDefault();
  fileOrder++;
  const week = document.getElementById("weekCourse");
  week.innerHTML += `<div class="weekCourse1" > <br><h2>Week ${weekNumber}</h2> 
    <div onchange="checkInput(event)" class="fileDiv1">
     <input onchange="checkInput(event)" class="fileDiv" id="contentFile" type="file" accept=".txt,video/*"/>
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

function checkInput(event) {
  event.preventDefault();
  const file = document.getElementById("contentFile");
  console.log(file.value);

  if (file.value != null) {
    const btn = document.getElementById("sacuvaj");
    btn.disabled = false;
  }
}

function submitCourse(event) {
  event.preventDefault();
  const courseTitle = document.getElementById("courseTitle").textContent;
  const courseSubtitle = document.getElementById("courseSubtitle").textContent;
  const courseHighlights = document.getElementById("highlights").textContent;

  const courseCategory = document.getElementById("courseCategory");
  const selectedOption = courseCategory.options[courseCategory.selectedIndex];
  const selectedText = selectedOption.textValue;

  const formData = {
    title: courseTitle,
    subtitle: courseSubtitle,
    category: selectedText,
    DurationInWeeks: 0,
    WeeklyHours: 0,
    Highlights: courseHighlights,
    courseMark: 5,
  };

  fetch("/api/course", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      // Dodajte ovdje logiku za obradu odgovora ako je potrebno
    });
  // .catch((error) => {
  //   console.error("Error:", error);
  //   // Dodajte ovdje logiku za obradu greške ako je potrebno
  // })
}
