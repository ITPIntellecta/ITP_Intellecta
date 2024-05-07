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
      loadCategories();
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

let filesMap = new Map();
let weekMap = new Map();

let fileOrder = 0;
let weekNumber = 0;

function showNextWeek(event) {
  event.preventDefault();
  const btnAdd = document.getElementById("prva");
  btnAdd.style.display = "none";
  weekNumber++;
  showInput(event);
  const btnNew = document.getElementById("addNew");
  btnNew.disabled.toggle;
  const btnAddMore = document.getElementById("addMore");
  btnAddMore.style.display = "none";
}

function saveChanges(event) {
  event.preventDefault();
  const input = document.getElementById("contentFile");

  const fileInputs = document.querySelectorAll(".fileDiv");

  fileInputs.forEach(function (input) {
    if (input.files.length > 0) {
      // Provjeravamo da li je odabrana datoteka
      filesMap.set(fileOrder, input.files[0].name); // Dodajemo prvu odabrana datoteka iz svakog input polja u niz
      weekMap.set(fileOrder, weekNumber);
    }
  });

  console.log(filesMap);
  input.style.display = "none";
  const week = document.getElementById("weekCourse");
  week.innerHTML = `<div class="material-added-notification">Week ${weekNumber} materials saved!</div>
  <button onclick="showInput(event)" id="addMore" class="form-group-btn week-material-btn">Add more material</button>
  <button onclick="showNextWeek(event)" id="addNew" class="form-group-btn week-material-btn">Add new week</button>
  `;

  const btnAddMore = document.getElementById("addMore");
  btnAddMore.disabled = false;
}

function closeWeek(event) {
  event.preventDefault();
  console.log(event.srcElement.value);
  fileOrder--;
  //popraviti weekNumber
  weekNumber--;
  const week = document.getElementsByClassName("weekCourse1")[0];
  week.style.display = "none";
  const week1 = document.getElementById("weekCourse");
  week1.innerHTML = ` 
  <button onclick="showNextWeek(event)" id="addNew" class="form-group-btn week-material-btn">Add new week</button>`;
}

function showInput(event) {
  event.preventDefault();
  fileOrder++;
  const week = document.getElementById("weekCourse");
  week.innerHTML += `<div class="weekCourse1" > <br><h2>Week ${weekNumber}</h2> 
    <div onchange="checkInput(event)" class="fileDiv1">
     <input onchange="checkInput(event)" class="fileDiv" id="contentFile" type="file" accept=".txt,video/*"/>
     <br><br>
     <button class="btnX" onclick="closeWeek(event)" value="x"> ✖ </button>
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

  if (file.value != null) {
    const btn = document.getElementById("sacuvaj");
    btn.disabled = false;
  }
}

function submitCourse(event) {
  event.preventDefault();
  let userId;
  fetch("/api/course/user", {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        console.log(response);
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Uzmite ime korisnika iz podataka koje ste dobili
      //console.log(data);
      userId = data.data.id;
      // Prikazivanje imena korisnika u HTML elementu
      console.log(userId);

      const courseTitle = document.getElementById("courseTitle").value;
      const courseSubtitle = document.getElementById("courseSubtitle").value;
      const courseHighlights = document.getElementById("highlights").value;

      const courseCategory = document.getElementById("courseCategory");
      const selectedOption =
        courseCategory.options[courseCategory.selectedIndex];
      const selectedText = selectedOption.value;
      const weeklyWorkload = document.getElementById("weeklyWorkload").value;

      // console.log(courseTitle, courseSubtitle, courseHighlights, selectedText);
      if (
        courseTitle.trim() != "" &&
        courseSubtitle.trim() != "" &&
        courseHighlights.trim() != "" &&
        selectedText != "- Choose category -" &&
        weeklyWorkload != 0
      ) {
        const formData = {
          CreatorId: userId,
          title: courseTitle,
          subtitle: courseSubtitle,
          category: selectedText,
          DurationInWeeks: weekNumber,
          WeeklyHours: weeklyWorkload,
          Highlights: courseHighlights,
          courseMark: 5,
        };

        //  console.log(formData);
        let courseId;
        fetch("/api/course", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            courseId = data.data.courseId;

            //  console.log(courseId);
            sendMaterial(courseId);
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        // location.reload();

        const div = document.getElementsByClassName("new-course")[0];
        div.innerHTML += `<div>Course sent for authorization!</div>`;
      } else {
        alert("Please ensure all fields are filled in.");
      }
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

function sendMaterial(courseIdd) {
  for (let i = 1; i <= fileOrder; i++) {
    const materialData = {
      courseId: courseIdd,
      videoFile: filesMap.get(i),
      txtFile: filesMap.get(i),
      weekNumber: weekMap.get(i),
      fileOrder: i,
    };

    // console.log(materialData);
    fetch("/api/material", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(materialData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        // Dodajte ovdje logiku za obradu odgovora ako je potrebno
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }
}

function loadCourses() {
  fetch("/api/course/getall")
    .then((response) => response.json())
    .then((data) => {
      data.data.forEach((course) => {
        console.log(course);
        let title = course.title;
        let highlights = course.highlights;

        const div = document.getElementsByClassName("row")[0];
        div.innerHTML += `<div class="col-sm-6 mb-3 mb-sm-0">
              <div class="card" style="margin-bottom:2rem";>
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">
                  ${highlights}
                  </p>
                  <a href="#" class="btn btn-primary">Enroll</a>
                </div>
              </div>
            </div>`;
      });
    })
    .catch((error) => {
      console.error("There was an error:", error);
    });
}
