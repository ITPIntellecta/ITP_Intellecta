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
  if (btnAdd != null) btnAdd.style.display = "none";
  weekNumber++;
  showInput(event);
  const btnNew = document.getElementById("addNew");
  if (btnNew != null) btnNew.disabled.toggle;
  const btnAddMore = document.getElementById("addMore");
  if (btnAddMore != null) btnAddMore.style.display = "none";
}

function saveChanges(event) {
  event.preventDefault();
  fileOrder++;
  const input = document.getElementById("contentFile");

  const fileInputs = document.querySelectorAll(".fileDiv");

  fileInputs.forEach(function (input) {
    if (input.files.length > 0) {
      // Provjeravamo da li je odabrana datoteka
      filesMap.set(fileOrder, input.files[0].name); // Dodajemo prvu odabrana datoteka iz svakog input polja u niz
      weekMap.set(fileOrder, weekNumber);
    }
  });

  //console.log(filesMap);
  input.style.display = "none";
  const week = document.getElementById("weekCourse");

  week.innerHTML = `<div class="material-added-notification">Week ${weekNumber} materials saved!</div>
  <button onclick="showInput(event)" id="addMore" class="form-group-btn week-material-btn">Add more material</button>
  <button onclick="showNextWeek(event)" id="addNew" class="form-group-btn week-material-btn">Add new week</button>
  `;

  const btnAddMore = document.getElementById("addMore");
  btnAddMore.disabled = false;
  saveFile();
}

function closeWeek(event) {
  event.preventDefault();

  let posljednjiKljuc = Array.from(weekMap.keys()).pop();

  let posljednjaVrijednost = weekMap.get(posljednjiKljuc);
  // console.log(posljednjaVrijednost);

  if (posljednjaVrijednost != weekNumber) weekNumber--;
  // console.log(weekNumber, fileOrder);
  if (weekNumber == 0 && fileOrder == 0) {
    const btnAdd = document.getElementById("prva");
    btnAdd.style.display = "block";
  }

  const week = document.querySelectorAll(".weekCourse1");
  // console.log(week);
  week.forEach((div) => (div.style.display = "none"));

  const btnNew = document.getElementById("addNew");
  if (btnNew != null) btnNew.disabled = false;
  const btnAddMore = document.getElementById("addMore");
  if (btnAddMore != null) btnAddMore.disabled = false;

  const weekAll = document.getElementById("weekCourse");
  // console.log(weekAll);
  if (weekNumber >= 1)
    weekAll.innerHTML = `<div class="material-added-notification"> Week ${weekNumber} materials saved!</div>
  <button onclick="showInput(event)" id="addMore" class="form-group-btn week-material-btn">Add more material</button>
  <button onclick="showNextWeek(event)" id="addNew" class="form-group-btn week-material-btn">Add new week</button>
  `;
}

function showInput(event) {
  event.preventDefault();
  //  fileOrder++;
  const week = document.getElementById("weekCourse");
  week.style.display = "block";
  week.innerHTML = `<div class="weekCourse1" id="weekCourse1"> <br><h2>Week ${weekNumber}</h2> 
    <div class="fileDiv1">
     <input onchange="checkInput(event)" class="fileDiv" id="contentFile" type="file" accept=".txt,video/*,.doc,.docx,.pdf"/>
     <br><br>
     <button class="btnX" onclick="closeWeek(event)" value="x"> ✖ </button>
  </div> 

  <button disabled class="form-group-btn week-material-btn" id='sacuvaj' onclick='saveChanges(event)'>Save changes</button>

  <br>
  </div>
  `;

  const btnNew = document.getElementById("addNew");
  if (btnNew != null) btnNew.disabled = true;

  const btnAddMore = document.getElementById("addMore");
  if (btnAddMore != null) btnAddMore.disabled = true;
}

function checkInput(event) {
  event.preventDefault();
  const file = document.getElementById("contentFile");

  if (file.value != null) {
    const btn = document.getElementById("sacuvaj");
    btn.disabled = false;
  }
  handleFileInputChange(event);
}
var files;
let filesToUpload = [];
function handleFileInputChange(event) {
  files = event.target.files;
  //filesToUpload.push(...files); // Dodajemo izabrane fajlove u niz
}
const formData = new FormData();
function saveFile() {
  filesToUpload = [];
  filesToUpload.push(...files);

  filesToUpload.forEach((file) => {
    // console.log(file);

    formData.append("files[]", file); // Dodajemo sve fajlove iz niza u FormData objekat
  });
  //console.log([...formData.entries()]);
  // fetch("/material/uploadAll", {
  //   // Endpoint za čuvanje svih fajlova
  //   method: "POST",
  //   body: formData,
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data); // Možete prikazati poruku o uspešnom čuvanju fajlova ili drugu povratnu informaciju
  //     filesToUpload = []; // Resetujemo niz nakon što su fajlovi sačuvani
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });
}

function submitCourse(event) {
  event.preventDefault();
  let userId;
  fetch("/api/course/user", {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        //  console.log(response);
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Uzmite ime korisnika iz podataka koje ste dobili
      //console.log(data);
      userId = data.data.id;
      // Prikazivanje imena korisnika u HTML elementu
      // console.log(userId);

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
var brojac = 0;

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
    fetch("/api/material/uploadMaterial", {
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
        sendM();
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }
}

function sendM() {
  fetch("/api/material/allFiles", {
    // Endpoint za čuvanje svih fajlova
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data); // Možete prikazati poruku o uspešnom čuvanju fajlova ili drugu povratnu informaciju
      filesToUpload = []; // Resetujemo niz nakon što su fajlovi sačuvani

      if (brojac == 0) {
        brojac++;
        var odgovor = confirm("Course sent for authorization!");
        if (odgovor) window.location = "newCourse.html";
      }
    });
  // .catch((error) => {
  //   console.error("Error:", error);
  // })
}

let courseId;
function loadCourses() {
  fetch("/api/course/getall")
    .then((response) => response.json())
    .then((data) => {
      data.data.forEach((course) => {
        if (course.approved == 1) {
          //  console.log(course);
          let title = course.title;
          let highlights = course.highlights;
          let id = course.courseId;
          const div = document.getElementsByClassName("row")[0];
          div.innerHTML += `<div class="col-sm-6 mb-3 mb-sm-0">
              <div class="card" style="margin-bottom:2rem";>
                <div class="card-body">
                  <h5 class="card-title loadVideo" onclick="loadVideo(${id})">${title}</h5>
                  <p class="card-text">
                  ${highlights}
                  </p>
                  <a href="#" class="btn btn-primary">Enroll</a>
                </div>
              </div>
            </div>`;
        }
      });
    })
    .catch((error) => {
      console.error("There was an error:", error);
    });
}

function showCoursesForAuthorization() {
  window.location = "authorizeCourse.html";
}
function loadCoursesForAuth() {
  fetch("/api/course/getall")
    .then((response) => response.json())
    .then((data) => {
      data.data.forEach((course) => {
        if (course.approved == 0) {
          // console.log(course);
          let title = course.title;
          let highlights = course.highlights;
          let id = course.courseId;
          const div = document.getElementsByClassName("row")[0];
          div.innerHTML += `<div class="col-sm-6 mb-3 mb-sm-0">
              <div class="card" style="margin-bottom:2rem";>
                <div class="card-body">
                  <h5 class="card-title" onclick="loadVideo(${id})">${title}</h5>
                  <p class="card-text">
                  ${highlights}
                  </p>
                  <a href="#" class="btn btn-primary" onclick="confirmCourse(${id})">Authorize</a>
                </div>
              </div>
            </div>`;
        }
      });
    })
    .catch((error) => {
      console.error("There was an error:", error);
    });
}

let creatorId;
function confirmCourse(courseId) {
  // console.log(courseId);

  fetch(`/api/course/GetCourseById/${courseId}`, {
    method: "GET",
  })
    .then((response) => {
      //  console.log(response);
      return response.json();
    })
    .then((data) => {
      //  console.log(data);
      creatorId = data.data.creatorId;
      const formData = {
        CreatorId: data.data.creatorId,
        Title: data.data.title,
        subtitle: data.data.subtitle,
        DurationInWeeks: data.data.durationInWeeks,
        WeeklyHours: data.data.weeklyHours,
        highlights: data.data.highlights,
        category: data.data.category,
        courseMark: data.data.courseMark,
        courseId: data.data.courseId,
        approved: true,
      };
      //  console.log(formData);

      fetch("api/course", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("Course updated successfully:", data);
          approveCourseMail();
          //   showCoursesForAuthorization();
        })
        .catch((error) => {
          console.error("Error updating course:", error);
        });
    });
}

function approveCourseMail() {
  fetch(`/api/email/send-email/${creatorId}/Your course has been approved!`, {
    method: "POST",
  })
    .then((response) => {
      //  console.log(response);
      //return response.json;
    })
    .then((data) => {
      //console.log(data);
    })
    .catch((error) => {
      console.error("Error updating course:", error);
    });
}

function loadVideoPage() {
  const urlParams = new URLSearchParams(window.location.search);

  const id = urlParams.get("parametar");

  let creatorId;
  let title;
  let subtitle;
  let durationInWeeks;
  let weeklyHours;
  let highlights;
  let category;
  let courseMark;
  let approved;
  // console.log(id);
  fetch(`/api/course/GetCourseById/${id}`, {
    method: "GET",
  })
    .then((response) => {
      //  console.log(response);
      return response.json();
    })
    .then((data) => {
      //  console.log(data);
      creatorId = data.data.creatorId;
      title = data.data.title;
      subtitle = data.data.subtitle;
      durationInWeeks = data.data.durationInWeeks;
      weeklyHours = data.data.weeklyHours;
      highlights = data.data.highlights;
      category = data.data.category;
      courseMark = data.data.courseMark;
      approved = data.data.approved;
      const titleH = document.getElementById("title-course");
      titleH.innerHTML = title;
      const subtitleH = document.getElementById("subtitle-course");
      subtitleH.innerHTML = subtitle;

      const highlightsH = document.getElementById("highlights-course");
      highlightsH.innerHTML = highlights;

      fetch(`/api/material/GetMaterialById/${id}`, {
        method: "GET",
      })
        .then((response) => {
          // console.log(response);
          return response.json();
        })
        .then((data) => {
          //  console.log(data);
          const divWeeks = document.getElementById("course-weeks");
          for (var i = 1; i <= durationInWeeks; i++) {
            divWeeks.innerHTML += `  <div class="week" id="week-course">
            <button class="button-week" >Week ${i}</button>
             <div class="week-lessons show-lesson">`;
            // console.log(i);
            data.data.forEach((material) => {
              //   console.log(material);
              const video = material.videoFile;
              if (material.weekNumber == i) {
                divWeeks.innerHTML += `<button class="lesson" onclick="showFile('${video}')"> 
                Lesson ${material.fileOrder}</button><br>`;
              }

              divWeeks.innerHTML += `</div></div>`;
            });
          }
        });
    });
}

function loadVideo(id) {
  location.href = "course.html?parametar=" + id;
}

function showFile(name) {
  var fileExtension = name.split(".").pop().toLowerCase();
  var divFile = document.getElementsByClassName("course-content")[0];
  console.log(fileExtension);

  switch (fileExtension) {
    case "txt":
      console.log("Tip fajla je tekstualni (.txt) fajl.");
      divFile.innerHTML = `<iframe src="folder/${name}" width="100%" height="100%"></iframe>
`;
      break;
    case "pdf":
      console.log("Tip fajla je tekstualni (.pdf) fajl.");
      divFile.innerHTML = `<iframe src="folder/${name}" width="100%" height="100%"></iframe>
`;
      break;
    case "doc":
      console.log("Tip fajla je tekstualni (.doc) fajl.");
      divFile.innerHTML = `<iframe src="folder/${name}" width="0" height="0"></iframe>
`;
      // divFile.innerHTML = `<p class="materialText">File downloaded</p>`;
      break;
    case "docx":
      console.log("Tip fajla je tekstualni (.docx) fajl.");
      divFile.innerHTML = `<iframe src="folder/${name}" width="100%" height="10%"> <p class="materialText">File downloaded</p></iframe>
`;
      divFile.innerHTML += `<p class="materialText">File downloaded</p>`;
      break;
    case "mp4":
      console.log("Tip fajla je video fajl (.mp4).");
      divFile.innerHTML = `<video id="myVideo" controls>
  <source src="folder/${name}" type="video/mp4">
  Vaš pregledač ne podržava video sadržaj.
</video>`;
      break;
    default:
      console.log("Tip fajla nije podrzan.");
      break;
  }
}
