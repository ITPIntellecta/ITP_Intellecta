function goToProfile() {
  location = "profile.html";
}

// function scrollR() {
//   const el = document.getElementById("scroll");
//   el.scrollBy({ left: 100, behavior: "smooth" });
// }

// function scrollL() {
//   const el = document.getElementById("scroll");
//   el.scrollBy({ left: -100, behavior: "smooth" });
// }

function smoothScroll(element, target, duration) {
  const start = element.scrollLeft;
  const change = target - start;
  const increment = 20;

  function animate(elapsedTime) {
    elapsedTime += increment;
    const position = easeInOut(elapsedTime, start, change, duration);
    element.scrollLeft = position;
    if (elapsedTime < duration) {
      setTimeout(function () {
        animate(elapsedTime);
      }, increment);
    }
  }

  animate(0);
}

function easeInOut(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
}

function scrollR() {
  const el = document.getElementById("scroll");
  const newScrollLeft = el.scrollLeft + 100;
  if (newScrollLeft + el.clientWidth >= el.scrollWidth) {
    smoothScroll(el, 0, 500);
  } else {
    smoothScroll(el, newScrollLeft, 500);
  }
}

function scrollL() {
  const el = document.getElementById("scroll");
  const newScrollLeft = el.scrollLeft - 100;
  if (newScrollLeft <= 0) {
    smoothScroll(el, el.scrollWidth - el.clientWidth, 500);
  } else {
    smoothScroll(el, newScrollLeft, 500);
  }
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
  const categoryList = document.getElementById("categoryName");

  if (targetEvr != null) {
    if (event.target != header && event.target != categoryList) {
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
    location.href = "courses.html?parametar=" + element;
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
      filesMap.set(fileOrder, input.files[0].name);
      weekMap.set(fileOrder, weekNumber);
    }
  });

  input.style.display = "none";
  const week = document.getElementById("weekCourse");

  week.innerHTML = `<div class="material-added-notification">Materijal u sedmici ${weekNumber} sačuvan!</div>
  <button onclick="showInput(event)" id="addMore" class="form-group-btn week-material-btn">Dodaj još materijala</button>
  <button onclick="showNextWeek(event)" id="addNew" class="form-group-btn week-material-btn">Dodaj novu sedmicu</button>
  `;

  const btnAddMore = document.getElementById("addMore");
  btnAddMore.disabled = false;
  saveFile();
}

function closeWeek(event) {
  event.preventDefault();

  let posljednjiKljuc = Array.from(weekMap.keys()).pop();

  let posljednjaVrijednost = weekMap.get(posljednjiKljuc);

  if (posljednjaVrijednost != weekNumber) weekNumber--;
  if (weekNumber == 0 && fileOrder == 0) {
    const btnAdd = document.getElementById("prva");
    btnAdd.style.display = "flex";
  }

  const week = document.querySelectorAll(".weekCourse1");
  week.forEach((div) => (div.style.display = "none"));

  const btnNew = document.getElementById("addNew");
  if (btnNew != null) btnNew.disabled = false;
  const btnAddMore = document.getElementById("addMore");
  if (btnAddMore != null) btnAddMore.disabled = false;

  const weekAll = document.getElementById("weekCourse");
  if (weekNumber >= 1)
    weekAll.innerHTML = `<div class="material-added-notification"> Materijal u sedmici ${weekNumber} sačuvan!</div>
  <button onclick="showInput(event)" id="addMore" class="form-group-btn week-material-btn">Dodaj još materijala</button>
  <button onclick="showNextWeek(event)" id="addNew" class="form-group-btn week-material-btn">Dodaj novu sedmicu</button>
  `;
}

function showInput(event) {
  event.preventDefault();
  const week = document.getElementById("weekCourse");
  week.style.display = "block";
  week.innerHTML = `<div class="weekCourse1" id="weekCourse1"> <br><h2>Sedmica ${weekNumber}</h2> 
    <div class="fileDiv1">
     <input onchange="checkInput(event)" class="fileDiv" id="contentFile" type="file" accept=".txt,video/*,.doc,.docx,.pdf"/>
     <br><br>
     <button class="btnX" onclick="closeWeek(event)" value="x"> ✖ </button>
  </div> 

  <button disabled class="form-group-btn week-material-btn" id='sacuvaj' onclick='saveChanges(event)'>Sačuvaj promjene</button>

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
}
const formData = new FormData();
function saveFile() {
  filesToUpload = [];
  filesToUpload.push(...files);
  filesToUpload.forEach((file) => {
    formData.append("files[]", file);
  });
}

let userCurrentId;
function getCurrentUserId() {
  if (localStorage.getItem("jwtToken") != null) {
    fetch("/api/course/user", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        userCurrentId = data.data.id;
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
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
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      userId = data.data.id;

      const courseTitle = document.getElementById("courseTitle").value;
      const courseSubtitle = document.getElementById("courseSubtitle").value;
      const courseHighlights = document.getElementById("highlights").value;

      const courseCategory = document.getElementById("courseCategory");
      const selectedOption =
        courseCategory.options[courseCategory.selectedIndex];
      const selectedText = selectedOption.value;
      const weeklyWorkload = document.getElementById("weeklyWorkload").value;
      const price = document.getElementById("price").value;
      if (
        courseTitle.trim() != "" &&
        courseSubtitle.trim() != "" &&
        courseHighlights.trim() != "" &&
        selectedText != "- Izaberite kategoriju -" &&
        weeklyWorkload != 0 &&
        price != 0
      ) {
        const formData = {
          CreatorId: userId,
          title: courseTitle,
          subtitle: courseSubtitle,
          category: selectedText,
          DurationInWeeks: weekNumber,
          WeeklyHours: weeklyWorkload,
          Highlights: courseHighlights,
          Price: price,
        };

        let courseId;
        fetch("/api/course/AddCourse", {
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
            sendMaterial(courseId);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        alert("Uvjerite se da su sva polja popunjena!");
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

async function sendMaterial(courseIdd) {
  for (let i = 1; i <= fileOrder; i++) {
    const materialData = {
      courseId: courseIdd,
      videoFile: filesMap.get(i),
      txtFile: filesMap.get(i),
      weekNumber: weekMap.get(i),
      fileOrder: i,
    };

    await fetch("/api/material/uploadMaterial", {
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
  // for (let pair of formData.entries()) {
  //   console.log(pair[0] + ": " + pair[1].name);
  // }
  fetch("/api/material/allFiles", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      filesToUpload = [];

      if (brojac == 0) {
        brojac++;
        var odgovor = confirm("Kurs poslat na autorizaciju!");
        if (odgovor) window.location = "newCourse.html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function filteredCategory(courses, category) {
  return courses.filter((course) => {
    if (
      category != "Everything" &&
      category != "myLearning" &&
      category != null
    ) {
      return course.category === category;
    } else {
      return true;
    }
  });
}

function filteredDuration(courses, duration) {
  return courses.filter((course) => {
    if (duration != undefined && duration != null && duration != 0) {
      return course.durationInWeeks == duration;
    } else {
      return true;
    }
  });
}

function filteredPrice(courses, min, max) {
  return courses.filter((course) => {
    if (min != undefined && min != null && max != undefined && max != null) {
      return course.price >= min && course.price <= max;
    } else {
      return true;
    }
  });
}

function filteredSubTitle(courses, subTitle) {
  return courses.filter((course) => {
    if (subTitle !== "") {
      const lowerSubTitle = subTitle.toLowerCase();
      return (
        course.title.toLowerCase().includes(lowerSubTitle) ||
        course.subtitle.toLowerCase().includes(lowerSubTitle)
      );
    } else {
      return true;
    }
  });
}

let courseId;
function loadCourses() {
  let isAdmin;
  if (localStorage.getItem("jwtToken") != null) {
    fetch("/api/course/user", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        userCurrentId = data.data.id;
        let userType = data.data.userType;
        const urlParams = new URLSearchParams(window.location.search);

        const category = urlParams.get("parametar");
        const text = urlParams.get("text");
        const min = urlParams.get("min");
        const max = urlParams.get("max");
        const duration = urlParams.get("duration");

        if (window.location.href.includes("myLearning")) {
          loadMyLearning();
        } else if (window.location.href.includes("myCourses")) {
          loadMyCourses();
        } else {
          fetch("/api/course/getall")
            .then((response) => response.json())
            .then((data) => {
              let filteredCourses = filteredCategory(data.data, category);

              if (text != null) {
                filteredCourses = filteredSubTitle(filteredCourses, text);
              }
              if (duration != null) {
                filteredCourses = filteredDuration(filteredCourses, duration);
              }
              if (min != null && max != null) {
                filteredCourses = filteredPrice(filteredCourses, min, max);
              }

              filteredCourses.forEach((course) => {
                isAdmin = false;
                if (course.approved == 1) {
                  if (
                    userType == "Admin" ||
                    userCurrentId == course.creatorId
                  ) {
                    isAdmin = true;
                  }
                  let title = course.title;
                  let highlights = course.highlights;
                  let id = course.courseId;

                  let category = course.category;
                  let background;

                  switch (category) {
                    case "Inženjerstvo":
                      background = "eng.png";
                      break;
                    case "Poslovni razvoj":
                      background = "business.jpg";
                      break;
                    case "IT i tehnologije":
                      background = "it.jpg";
                      break;
                    case "Zdravlje i fitnes":
                      background = "fitness.jpg";
                      break;
                    case "Jezici":
                      background = "lang.jpg";
                      break;
                    case "Nauka":
                      background = "science-eng.jpg";
                      break;
                    case "Lični razvoj":
                      background = "fitness.jpg";
                      break;
                    case "Nauka o podacima":
                      background = "data1jpg.jpg";
                      break;
                    case "Edukacija i podučavanje":
                      background = "lang.jpg";
                      break;
                    case "Pravne studije i pravo":
                      background = "law.webp";
                      break;
                    case "Psihologija i savjetovanje":
                      background = "medicine.jpg";
                      break;
                    case "Zdravstvo i medicina":
                      background = "medicine.jpg";
                      break;
                    default:
                      background = "other.jpg";
                      break;
                  }

                  const div = document.getElementsByClassName("row")[0];
                  div.innerHTML += `<div class="col-sm-6 mb-3 mb-sm-0">
              <div class="item mmm" id='${id}' style="margin-bottom:2rem";>
                  <p class="categoryCard">${category}</p>
                  <h5 class="courseCardTitle loadVideo" >${title}</h5>
                  <p class="card-text">
                  ${highlights}
                  </p>
                  <div class="authButtons" id="authBtns${id}">
                  <button id="enrollBtn" class="popularCourse authButton" onclick="showModal('${id}', '${userCurrentId}')">Pogledaj kurs</button> 
                 </div>
              </div>
            </div>`;

                  let e = document.getElementById(`${id}`);
                  e.style.backgroundImage = "url(" + background + ")";

                  if (isAdmin) {
                    document.getElementById(
                      `authBtns${id}`
                    ).innerHTML += ` <button
                    id="btnDel"
                    class="popularCourse authButton"
                    onclick="deleteCourse(${id})"
                  >
                    Obriši kurs
                  </button>`;
                  }
                }
              });
            })

            .catch((error) => {
              console.error("There was an error:", error);
            });
        }
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }
}

function loadMyLearning() {
  document.getElementsByClassName("addcourse1")[0].style.display = "none";
  if (localStorage.getItem("jwtToken") != null) {
    fetch("/api/course/user", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        userCurrentId = data.data.id;

        fetch(`/api/course/getmylearning/${userCurrentId}`)
          .then((response) => response.json())
          .then((data) => {
            data.data.forEach((course) => {
              let title = course.title;
              let highlights = course.highlights;
              let id = course.courseId;

              let category = course.category;
              let background;

              switch (category) {
                case "Inženjerstvo":
                  background = "eng.png";
                  break;
                case "Poslovni razvoj":
                  background = "business.jpg";
                  break;
                case "IT i tehnologije":
                  background = "it.jpg";
                  break;
                case "Zdravlje i fitnes":
                  background = "fitness.jpg";
                  break;
                case "Jezici":
                  background = "lang.jpg";
                  break;
                case "Nauka":
                  background = "science-eng.jpg";
                  break;
                case "Lični razvoj":
                  background = "fitness.jpg";
                  break;
                case "Nauka o podacima":
                  background = "data1jpg.jpg";
                  break;
                case "Edukacija i podučavanje":
                  background = "lang.jpg";
                  break;
                case "Pravne studije i pravo":
                  background = "law.webp";
                  break;
                case "Psihologija i savjetovanje":
                  background = "medicine.jpg";
                  break;
                case "Zdravstvo i medicina":
                  background = "medicine.jpg";
                  break;
                default:
                  background = "other.jpg";
                  break;
              }

              const div = document.getElementsByClassName("row")[0];
              div.innerHTML += `<div class="col-sm-6 mb-3 mb-sm-0">
              <div class="item mmm" id='${id}' style="margin-bottom:2rem";>
                
                  <h5 class="courseCardTitle loadVideo">${title}</h5>
                  <p class="card-text">
                  ${highlights}
                  </p>
                  <button class="popularCourse" onclick="loadVideo(${id}, false)">Pogledaj kurs</button>
               
              </div>
            </div>`;

              let e = document.getElementById(`${id}`);
              e.style.backgroundImage = "url(" + background + ")";
              let elements = document.getElementsByClassName("popularCourse");
            });
          })

          .catch((error) => {
            console.error("There was an error:", error);
          });
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }
}

function loadMyCourses() {
  if (localStorage.getItem("jwtToken") != null) {
    console.log("ISPIS ISPIS");

    fetch("/api/course/user", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        userCurrentId = data.data.id;

        fetch("/api/course/getall")
          .then((response) => response.json())
          .then((data) => {
            data.data.forEach((course) => {
              if (course.creatorId == userCurrentId) {
                let title = course.title;
                let highlights = course.highlights;
                let id = course.courseId;

                let category = course.category;
                let background;

                switch (category) {
                  case "Inženjerstvo":
                    background = "eng.png";
                    break;
                  case "Poslovni razvoj":
                    background = "business.jpg";
                    break;
                  case "IT i tehnologije":
                    background = "it.jpg";
                    break;
                  case "Zdravlje i fitnes":
                    background = "fitness.jpg";
                    break;
                  case "Jezici":
                    background = "lang.jpg";
                    break;
                  case "Nauka":
                    background = "science-eng.jpg";
                    break;
                  case "Lični razvoj":
                    background = "fitness.jpg";
                    break;
                  case "Nauka o podacima":
                    background = "data1jpg.jpg";
                    break;
                  case "Edukacija i podučavanje":
                    background = "lang.jpg";
                    break;
                  case "Pravne studije i pravo":
                    background = "law.webp";
                    break;
                  case "Psihologija i savjetovanje":
                    background = "medicine.jpg";
                    break;
                  case "Zdravstvo i medicina":
                    background = "medicine.jpg";
                    break;
                  default:
                    background = "other.jpg";
                    break;
                }

                const div = document.getElementsByClassName("row")[0];
                div.innerHTML += `<div class="col-sm-6 mb-3 mb-sm-0">
              <div class="item mmm" id='${id}' style="margin-bottom:2rem">
              

                  <h5 class="courseCardTitle loadVideo">${title}</h5>
                  <p class="card-text" id="pId${id}">
                  ${highlights}
                  </p>
                  <div class="authButtons">
                  <button class="popularCourse authButton" onclick="loadVideo(${id}, false)">Pogledaj kurs</button>  
                 <button  class="popularCourse authButton" onclick="deleteCourse(${id})">Obriši kurs</button>

                 </div>
              </div>
            </div>`;

                let e = document.getElementById(`${id}`);
                e.style.backgroundImage = "url(" + background + ")";

                if (course.approved == false) {
                  document.getElementById(`${id}`).style.backgroundImage =
                    "url('notyetapproved.jpg')";

                  document.getElementById(`pId${id}`).innerHTML =
                    "Kurs na odobravanju, budite strpljivi!";
                  document.getElementById(`pId${id}`).style.color = "black";
                }
              }
            });
          })

          .catch((error) => {
            console.error("There was an error:", error);
          });
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }
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
          let title = course.title;
          let highlights = course.highlights;
          let id = course.courseId;
          const div = document.getElementsByClassName("row")[0];
          const boolAdmin = true;

          div.innerHTML += `<div class="col-sm-6 mb-3 mb-sm-0">
              <div class="item mmm" style="margin-bottom:2rem";>
                  <h5 class="courseCardTitle loadVideo" onclick="loadVideo('${id}', '${boolAdmin}')">${title}</h5>
                  <p class="card-text">
                  ${highlights}
                  </p>
                  <div class="authButtons">
                  <button  class="popularCourse authButton"  onclick="confirmCourse(${id})">Odobri kurs</button>
                 <button  class="popularCourse authButton" onclick="deleteCourse(${id})">Obriši kurs</button>
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

function confirmCourse(courseId) {
  fetch(`/api/course/GetCourseById/${courseId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
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
        Price: data.data.Price,
      };

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
          approveCourseMail(formData.CreatorId);
          showCoursesForAuthorization();
        })
        .catch((error) => {
          console.error("Error updating course:", error);
        });
    });
}

function approveCourseMail(id) {
  fetch(`/api/email/send-email/${id}/Vaš kurs je odobren!`, {
    method: "POST",
  })
    .then((response) => {})
    .then((data) => {})
    .catch((error) => {
      console.error("Error updating course:", error);
    });
}

function loadVideoPage() {
  const urlParams = new URLSearchParams(window.location.search);

  const id = urlParams.get("parametar");
  const admin = urlParams.get("admin");

  let cccourse;

  cccourse = id;
  let creatorId;
  let title;
  let subtitle;
  let durationInWeeks;
  let weeklyHours;
  let highlights;
  let category;
  let courseMark;
  let approved;
  let price;
  fetch(`/api/course/GetCourseById/${id}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      creatorId = data.data.creatorId;
      title = data.data.title;
      subtitle = data.data.subtitle;
      durationInWeeks = data.data.durationInWeeks;
      weeklyHours = data.data.weeklyHours;
      highlights = data.data.highlights;
      category = data.data.category;
      courseMark = data.data.courseMark;
      approved = data.data.approved;
      price = data.data.price;
      const titleH = document.getElementById("title-course");
      titleH.innerHTML = title;
      const subtitleH = document.getElementById("subtitle-course");
      subtitleH.innerHTML = subtitle;

      const highlightsH = document.getElementById("highlights-course");
      highlightsH.innerHTML = highlights;

      const priceEl = document.getElementById("price-course");
      const categoryEl = document.getElementById("category-course");
      categoryEl.innerHTML = "Kategorija: " + category;
      priceEl.style.display = "none";

      markEl = document.getElementById("mark-course");
      markEl.innerHTML = "Ocjena";
      let stars = document.querySelectorAll(".star");
      for (let i = 0; i < courseMark; i++) {
        stars[i].classList.add("filled");
      }

      fetch(`/api/course/Creator/${creatorId}`, {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const fname = data.data.firstName;
          const lname = data.data.lastName;

          const creator = document.getElementById("creator-course");
          creator.innerHTML = "Kreator: " + fname + " " + lname;
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });

      fetch(`/api/material/GetMaterialById/${id}`, {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const divWeeks = document.getElementById("course-weeks");
          for (var i = 1; i <= durationInWeeks; i++) {
            divWeeks.innerHTML += `  <div class="week" id="week-course">
            <button class="button-week" id="week${i}">Sedmica ${i}</button>
             <div class="week-lessons show-lesson">`;

            data.data.forEach((material) => {
              const video = material.videoFile;
              if (material.weekNumber == i) {
                divWeeks.innerHTML += `<div class="lesson"><div class="checkbox-wrapper-39">
                <label class='labelCheckbox'>
                <input id="input${material.contentId}" type="checkbox" onchange="completeLesson('${material.contentId}', '${i}', ${material.courseId}, ${durationInWeeks}, '${title}', ${creatorId})"/>
                <span class="checkbox"></span>
                </label>
                </div><button class="btnLesson"  onclick="showFile('${video}')"> 
                Lekcija ${material.fileOrder}</button></div>`;

                divWeeks.innerHTML += `</div></div>`;
              }

              fetch("/api/course/user", {
                method: "GET",
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Network response was not ok");
                  }
                  return response.json();
                })
                .then((data) => {
                  userCurrentId = data.data.id;
                  // console.log(admin);

                  if (userCurrentId !== creatorId && admin !== true) {
                    fetch(
                      `/api/material/getLessonStatus/${userCurrentId}/${id}/${material.contentId}`
                    )
                      .then((response) => response.json())
                      .then((data) => {
                        var elem = document.getElementById(
                          `input${data.data.materialId}`
                        );
                        elem.checked = data.data.completed;
                      })

                      .catch((error) => {
                        console.error("There was an error:", error);
                      });
                  } else if (userCurrentId === creatorId) {
                    var elements = document.querySelectorAll(".labelCheckbox");
                    Array.from(elements).forEach((element) => {
                      element.style.display = "none";
                    });
                    var elementsDivs = document.querySelectorAll(".lesson");
                    Array.from(elementsDivs).forEach((element1) => {
                      element1.style.gridTemplateColumns = "100%";
                    });
                  } else if (admin === true) {
                    console.log(admin);
                    var elements = document.querySelectorAll(".labelCheckbox");
                    Array.from(elements).forEach((element) => {
                      element.style.display = "none";
                    });
                    var elementsDivs = document.querySelectorAll(".lesson");
                    Array.from(elementsDivs).forEach((element1) => {
                      element1.style.gridTemplateColumns = "100%";
                    });
                  }
                  let sendEmailBool = false;
                  checkAllWeeks(
                    cccourse,
                    durationInWeeks,
                    title,
                    userCurrentId,
                    creatorId,
                    sendEmailBool
                  );
                })
                .catch((error) => {
                  console.error(
                    "There has been a problem with your fetch operation:",
                    error
                  );
                });
            });
          }
        });
    });
}

async function checkAllCompleted(week, courseId, userId) {
  try {
    const response = await fetch(
      `api/material/checkAllCompleted/${week}/${courseId}/${userId}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    var weekDiv = document.getElementById(`week${week}`);

    if (data.data == true) {
      console.log(weekDiv);
      weekDiv.innerHTML = `Sedmica ${week} - Završena!`;
      return true;
    } else {
      weekDiv.innerHTML = `Sedmica ${week}`;
      return false;
    }
  } catch (error) {
    console.error("Error fetching completion status:", error);
  }
}
async function checkAllWeeks(
  courseId,
  duration,
  title,
  userCurrentIdd,
  creatorIdd,
  sendEmailBool
) {
  let completedWeeks = 0;
  const promises = [];

  const urlParams = new URLSearchParams(window.location.search);

  const admin = urlParams.get("admin");

  if (userCurrentIdd !== creatorIdd && admin !== true) {
    fetch("/api/course/user", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
        }
        return response.json();
      })
      .then((data) => {
        for (let i = 1; i <= duration; i++) {
          const promise = checkAllCompleted(i, courseId, userCurrentIdd).then(
            (result) => {
              if (result == true) {
                completedWeeks++;
              }
            }
          );
          promises.push(promise);
        }

        return Promise.all(promises).then(() => completedWeeks);
      })
      .then((completedWeeks) => {
        const percentage = parseFloat(
          ((completedWeeks * 100) / duration).toFixed(2)
        );
        let divCourse = document.getElementsByClassName("coursePercentage")[0];

        if (completedWeeks == duration) {
          if (sendEmailBool) {
            fetch(
              `/api/email/send-email/${userCurrentId}/Uspješno ste završili kurs: ${title}! Čestitamo!!`,
              {
                method: "POST",
              }
            )
              .then((response) => {})
              .then((data) => {})
              .catch((error) => {
                console.error("Error updating course:", error);
              });
          }
          divCourse.innerHTML = `Uspješno ste završili kurs! Čestitamo!<br>
          
          <div class="progress-bar__wrapper">
  <label class="progress-bar__value" htmlFor="progress-bar"> ${percentage}% </label>
  <progress id="progress-bar" value="${percentage}" max="100"></progress>
</div>
            `;
        } else {
          divCourse.innerHTML = `Završili ste  ${completedWeeks} od ukupno ${duration} sedmica! Samo naprijed!<br>
         <div class="progress-bar__wrapper">
  <label class="progress-bar__value" htmlFor="progress-bar"> ${percentage}% </label>
  <progress id="progress-bar" value="${percentage}" max="100"></progress>
</div>          `;
        }
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }
}

function completeLesson(
  contentId,
  week,
  courseId,
  durationInWeeks,
  title,
  creator
) {
  let inputEl = document.getElementById(`input${contentId}`);
  let checked = inputEl.checked;

  if (localStorage.getItem("jwtToken") != null) {
    fetch("/api/course/user", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        userCurrentId = data.data.id;
        const updateData = {
          UserId: userCurrentId,
          CourseId: courseId,
          MaterialId: contentId,
          Completed: checked,
          Week: week,
        };

        fetch("/api/Material/ChangeCompletedStatus", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            let sendEmailBool = true;

            checkAllCompleted(week, courseId, userCurrentId);
            checkAllWeeks(
              courseId,
              durationInWeeks,
              title,
              userCurrentId,
              creator,
              sendEmailBool
            );
          })
          .catch((error) => {
            console.error(
              "There has been a problem with your update operation:",
              error
            );
          });
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }
}

function loadVideo(id, admin) {
  location.href = "course.html?parametar=" + id + "&admin=" + admin;
}

function showFile(name) {
  var fileExtension = name.split(".").pop().toLowerCase();
  var divFile = document.getElementsByClassName("course-content")[0];

  switch (fileExtension) {
    case "txt":
      divFile.innerHTML = `<iframe src="folder/${name}" width="100%" height="100%"></iframe>
`;
      break;
    case "pdf":
      divFile.innerHTML = `<iframe src="folder/${name}" width="100%" height="100%"></iframe>
`;
      break;
    case "doc":
      divFile.innerHTML = `<iframe src="folder/${name}" width="0" height="0"></iframe>
`;
      break;
    case "docx":
      divFile.innerHTML = `<iframe src="folder/${name}" width="100%" height="10%"> <p class="materialText">Fajl preuzet</p></iframe>
`;
      divFile.innerHTML += `<p class="materialText">Fajl preuzet</p>`;
      break;
    case "mp4":
      divFile.innerHTML = `<video id="myVideo" controls>
  <source src="folder/${name}" type="video/mp4">
  Vaš pregledač ne podržava video sadržaj.
</video>`;
      break;
    default:
      break;
  }
}

function loadPopularCourses() {
  const container = document.getElementById("scroll");
  if (localStorage.getItem("jwtToken") != null) {
    fetch("/api/course/user", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        userCurrentId = data.data.id;
        fetch("/api/course/getall")
          .then((response) => response.json())
          .then((data) => {
            data.data.forEach((course) => {
              if (course.approved == 1) {
                let title = course.title;
                let highlights = course.highlights;
                let subtitle = course.subtitle;
                let mark = course.courseMark;
                let id = course.courseId;
                let price = course.Price;
                let category = course.category;
                let background;

                switch (category) {
                  case "Inženjerstvo":
                    background = "eng.png";
                    break;
                  case "Poslovni razvoj":
                    background = "business.jpg";
                    break;
                  case "IT i tehnologije":
                    background = "it.jpg";
                    break;
                  case "Zdravlje i fitnes":
                    background = "fitness.jpg";
                    break;
                  case "Jezici":
                    background = "lang.jpg";
                    break;
                  case "Nauka":
                    background = "science-eng.jpg";
                    break;
                  case "Lični razvoj":
                    background = "fitness.jpg";
                    break;
                  case "Nauka o podacima":
                    background = "data1jpg.jpg";
                    break;
                  case "Edukacija i podučavanje":
                    background = "lang.jpg";
                    break;
                  case "Pravne studije i pravo":
                    background = "law.webp";
                    break;
                  case "Psihologija i savjetovanje":
                    background = "medicine.jpg";
                    break;
                  case "Zdravstvo i medicina":
                    background = "medicine.jpg";
                    break;
                  default:
                    background = "other.jpg";
                    break;
                }

                container.innerHTML += `<div class="item1 mmmm" id='${id}'>
                <p class="categoryCard">${category}</p>
          <h4 class="courseCardTitle">${title}</h4><h5 class="courseCardSubtitle">${subtitle}</h5> <button onclick="showModal('${id}', '${userCurrentId}'); " class="popularCourse">Pogledaj kurs</button>
          </div>`;

                let e = document.getElementById(`${id}`);
                e.style.backgroundImage = "url(" + background + ")";
              }
            });
          })
          .catch((error) => {
            console.error("There was an error:", error);
          });
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }
}

function displayCategory(category) {
  const categoryList = document.getElementById("categoryName");
  categoryList.innerHTML = category;
}

function searchCourses() {
  const category = document.getElementById("categoryName").innerHTML;
  const searchWord = document.getElementById("input-search").value;
  const priceMin = fromInput.value;
  const priceMax = toInput.value;
  const durationInWeeks = durationWeek.value;
  window.location =
    "courses.html?parametar=" +
    category +
    "&text=" +
    searchWord +
    "&duration=" +
    durationInWeeks +
    "&min=" +
    priceMin +
    "&max=" +
    priceMax;
  loadCourses();
  durationInWeeks = null;
  priceMin = 0;
  priceMax = 300;
}

function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
  const [from, to] = getParsed(fromInput, toInput);
  fillSlider(fromInput, toInput, "#C6C6C6", "#113946", controlSlider);
  if (from > to) {
    fromSlider.value = to;
    fromInput.value = to;
  } else {
    fromSlider.value = from;
  }
}

function controlToInput(toSlider, fromInput, toInput, controlSlider) {
  const [from, to] = getParsed(fromInput, toInput);
  fillSlider(fromInput, toInput, "#C6C6C6", "#113946", controlSlider);
  setToggleAccessible(toInput);
  if (from <= to) {
    toSlider.value = to;
    toInput.value = to;
  } else {
    toInput.value = from;
  }
}

function controlFromSlider(fromSlider, toSlider, fromInput) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, "#C6C6C6", "#113946", toSlider);
  if (from > to) {
    fromSlider.value = to;
    fromInput.value = to;
  } else {
    fromInput.value = from;
  }
}

function controlToSlider(fromSlider, toSlider, toInput) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, "#C6C6C6", "#113946", toSlider);
  setToggleAccessible(toSlider);
  if (from <= to) {
    toSlider.value = to;
    toInput.value = to;
  } else {
    toInput.value = from;
    toSlider.value = from;
  }
}

function getParsed(currentFrom, currentTo) {
  const from = parseFloat(currentFrom.value);
  const to = parseFloat(currentTo.value);
  return [from, to];
}

function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
  const rangeDistance = to.max - to.min;
  const fromPosition = from.value - to.min;
  const toPosition = to.value - to.min;
  controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} 100%)`;
}

function setToggleAccessible(currentTarget) {
  const toSlider = document.querySelector("#toSlider");
  if (Number(currentTarget.value) <= 0) {
    toSlider.style.zIndex = 2;
  } else {
    toSlider.style.zIndex = 0;
  }
}

const fromSlider = document.querySelector("#fromSlider");
const toSlider = document.querySelector("#toSlider");
let fromInput = document.querySelector("#fromInput");
let toInput = document.querySelector("#toInput");
let durationWeek = document.getElementById("durationWeek");
fillSlider(fromSlider, toSlider, "#C6C6C6", "#113946", toSlider);
setToggleAccessible(toSlider);

fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
fromInput.oninput = () =>
  controlFromInput(fromSlider, fromInput, toInput, toSlider);
toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);

function showFilter() {
  document.getElementById("more-filter").style.display = "flex";
}

function hideFilter() {
  document.getElementById("more-filter").style.display = "none";
  fromInput = document.querySelector("#fromInput");
  toInput = document.querySelector("#toInput");
  durationWeek = document.getElementById("durationWeek");
}

function cancelFilter() {
  document.getElementById("more-filter").style.display = "none";

  fromInput = "";
  toInput = "";
}

var enrollCourseId = -1;
function confirmEnroll() {
  answer = true;
  let id = enrollCourseId;
  if (localStorage.getItem("jwtToken") != null) {
    fetch("/api/course/user", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        userCurrentId = data.data.id;
        const enroll = {
          UserId: userCurrentId,
          CourseId: id,
        };

        fetch("/api/course/Course", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(enroll),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Nash Fail");
            }
            return response.json();
          })
          .then((data) => {
            enrollCourseMail(userCurrentId);

            fetch(`/api/course/GetCourseById/${id}`, {
              method: "GET",
            })
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                data.data.courseContents.forEach((material) => {
                  const updateData = {
                    UserId: userCurrentId,
                    CourseId: id,
                    MaterialId: material.contentId,
                    Completed: false,
                    Week: material.weekNumber,
                  };
                  fetch("/api/Material/UpdateMaterialStatus", {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updateData),
                  })
                    .then((response) => {
                      if (!response.ok) {
                        throw new Error("Network response was not ok");
                      }
                      return response.json();
                    })
                    .then((data) => {})
                    .catch((error) => {
                      console.error(
                        "There has been a problem with your update operation:",
                        error
                      );
                    });
                });
              })
              .catch((error) => {
                console.error("Error (enroll):", error);
              });
          })
          .catch((error) => {
            console.error("Nash Error", error);
          });
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }

  var modal1 = document.getElementById("myModal1");
  modal1.style.display = "none";
  var modal2 = document.getElementsByClassName("modal2")[0];
  modal2.style.display = "block";
  modal2.innerHTML = `
        <!-- Modal content -->
        <div class="modal-content1">
        <span class="close1" onclick="closeModal()">&times;</span><br />
        <div class="innerbox">
        <div>
          
          <p style="font-size:15pt; font-weight:bold; margin:auto;">Upisali ste se na kurs!</p>
          
        </div>
        </div>
        </div>
      `;
}
function closeModal() {
  var modal1 = document.getElementById("myModal1");
  var modal2 = document.getElementsByClassName("modal2")[0];
  if (modal2 != null) modal2.style.display = "none";
  modal1.style.display = "none";
  let mainmodal = document.getElementById("myModal");
  mainmodal.style.display = "none";
}
function joinCourse(id) {
  var modal1 = document.getElementById("myModal1");

  var span1 = document.getElementsByClassName("close1")[0];

  span1.onclick = function () {
    modal1.style.display = "none";
  };
  modal1.style.display = "block";
  enrollCourseId = id;
}

function enrollCourseMail(id) {
  fetch(`/api/email/send-email/${id}/Uspješno ste se upisali na kurs!`, {
    method: "POST",
  })
    .then((response) => {})
    .then((data) => {})
    .catch((error) => {
      console.error("Error (enroll):", error);
    });
}

function deleteCourse(id) {
  fetch(`/api/course/GetCourseById/${id}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      creatorId = data.data.creatorId;
      fetch(`/api/course/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {})
        .then((data) => {
          fetch(
            `/api/email/send-email/${creatorId}/Izvinjavamo se, nažalost Vaš kurs je odbijen. Pokušajte ponovo!`,
            {
              method: "POST",
            }
          )
            .then((response) => {})
            .then((data) => {})
            .catch((error) => {
              console.error("Error updating course:", error);
            });
        });

      alert("Kurs je uspješno obrisan!");
      location.reload();
    })
    .catch((error) => {
      console.error("Error (enroll):", error);
    });
}

function loadReviews() {
  fetch("/api/course/topReviews")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let div = document.getElementsByClassName("review")[0];
      div.innerHTML = "";
      data.data.forEach((review) => {
        div.innerHTML += `
                <div class="card">
          <div class="card-header">${review.user.firstName} &nbsp; ${review.user.lastName}</div>
          <div class="card-body">
            <h5 class="card-title ct"><div>
                <span class="star star${review.id}">&#9733;</span>
                <span class="star star${review.id}">&#9733;</span>
                <span class="star star${review.id}">&#9733;</span>
                <span class="star star${review.id}">&#9733;</span>
                <span class="star star${review.id}">&#9733;</span>
              </div></h5>
            <span class="quote">&#10077;</span><br />
            <p class="card-text">O <i>${review.course.title}:<br> </i>
            ${review.reviewText}</p>
            <br />
            <span class="quote">&#10078;</span>
          </div>
        </div>
        `;
        let stars = document.querySelectorAll(`.star${review.id}`);
        for (let i = 0; i < review.mark; i++) {
          stars[i].classList.add("filled");
        }
      });
    })
    .catch((error) => {
      console.error("There was an error:", error);
    });
}
