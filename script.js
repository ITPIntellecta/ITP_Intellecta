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
  const categoryList = document.getElementById("categoryName");

  if (targetEvr != null) {
    if (event.target != header && event.target != categoryList) {
      targetEvr.classList.remove("show-list");
      arrowDown.classList.remove("rotate-up");
      console.log("Van menija");
      console.log(event.target);
    } else {
      targetEvr.classList.toggle("show-list");
      console.log("U meniju");
      console.log(event.target);

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
      // Provjeravamo da li je odabrana datoteka
      filesMap.set(fileOrder, input.files[0].name); // Dodajemo prvu odabrana datoteka iz svakog input polja u niz
      weekMap.set(fileOrder, weekNumber);
    }

    console.log(filesMap);
    console.log(weekMap);
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
  console.log(filesToUpload);
  filesToUpload.forEach((file) => {
    console.log(file);

    formData.append("files[]", file); // Dodajemo sve fajlove iz niza u FormData objekat
  });

  console.log(formData);
  for (let pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1].name); // Ispisuje ključeve i imena fajlova
  }
}

let userCurrentId;
function getCurrentUserId() {
  // checkUserRole();
  if (localStorage.getItem("jwtToken") != null) {
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
        userCurrentId = data.data.id;
        console.log(userCurrentId);
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
      const price = document.getElementById("price").value;
      // console.log(courseTitle, courseSubtitle, courseHighlights, selectedText);
      if (
        courseTitle.trim() != "" &&
        courseSubtitle.trim() != "" &&
        courseHighlights.trim() != "" &&
        selectedText != "- Choose category -" &&
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
          courseMark: 5,
          Price: price,
        };

        //  console.log(formData);
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

async function sendMaterial(courseIdd) {
  for (let i = 1; i <= fileOrder; i++) {
    const materialData = {
      courseId: courseIdd,
      videoFile: filesMap.get(i),
      txtFile: filesMap.get(i),
      weekNumber: weekMap.get(i),
      fileOrder: i,
    };

    console.log(filesMap.get(i));

    console.log(materialData);
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
  for (let pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1].name); // Ispisuje ključeve i imena fajlova
  }
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
        // if (odgovor) window.location = "newCourse.html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function filteredCategory(courses, category) {
  return courses.filter((course) => {
    console.log(category);

    if (
      category != "Everything" &&
      category != "myLearning" &&
      category != null
    ) {
      // console.log(category);
      return course.category === category;
    } else {
      return true;
    }
  });
}

function filteredDuration(courses, duration) {
  return courses.filter((course) => {
    //  console.log(duration);

    if (duration != undefined && duration != null && duration != 0) {
      // console.log(course.durationInWeeks + " " + duration);
      return course.durationInWeeks == duration;
    } else {
      return true;
    }
  });
}

function filteredPrice(courses, min, max) {
  return courses.filter((course) => {
    //   console.log(duration);

    if (min != undefined && min != null && max != undefined && max != null) {
      console.log(course.price + " " + min + " " + max);
      return course.price >= min && course.price <= max;
    } else {
      return true;
    }
  });
}

function filteredSubTitle(courses, subTitle) {
  return courses.filter((course) => {
    if (subTitle != "") {
      console.log(course.title);
      return (
        course.title.toLowerCase() === subTitle.toLowerCase() ||
        course.subtitle.toLowerCase() === subTitle.toLowerCase()
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
          console.log(response);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Uzmite ime korisnika iz podataka koje ste dobili
        console.log(data);
        userCurrentId = data.data.id;
        console.log(userCurrentId);
        let userType = data.data.userType;
        const urlParams = new URLSearchParams(window.location.search);

        const category = urlParams.get("parametar");
        const text = urlParams.get("text");
        const min = urlParams.get("min");
        const max = urlParams.get("max");
        const duration = urlParams.get("duration");

        console.log(category);
        //console.log(window.location);
        if (window.location.href.includes("myLearning")) {
          console.log("String sadrži 'myLearning'");
          loadMyLearning();
        } else if (window.location.href.includes("myCourses")) {
          console.log("MY COURSES");
          loadMyCourses();
        } else {
          fetch("/api/course/getall")
            .then((response) => response.json())
            .then((data) => {
              let filteredCourses = filteredCategory(data.data, category);
              console.log(filteredCourses);

              if (text != null) {
                filteredCourses = filteredSubTitle(filteredCourses, text);
                console.log(filteredCourses);
              }
              if (duration != null) {
                filteredCourses = filteredDuration(filteredCourses, duration);
                console.log(filteredCourses);
              }
              if (min != null && max != null) {
                filteredCourses = filteredPrice(filteredCourses, min, max);
                console.log(filteredCourses);
              }

              filteredCourses.forEach((course) => {
                isAdmin = false;
                if (course.approved == 1) {
                  if (
                    userType == "Admin" ||
                    userCurrentId == course.creatorId
                  ) {
                    console.log(data.data.userType);
                    isAdmin = true;
                  }
                  //  console.log(course);
                  let title = course.title;
                  let highlights = course.highlights;
                  let id = course.courseId;
                  const div = document.getElementsByClassName("row")[0];
                  div.innerHTML += `<div class="col-sm-6 mb-3 mb-sm-0">
              <div class="item mmm" style="margin-bottom:2rem";>
                  <h5 class="courseCardTitle loadVideo" >${title}</h5>
                  <p class="card-text">
                  ${highlights}
                  </p>
                  <div class="authButtons" id="authBtns${id}">
                  <button id="enrollBtn" class="popularCourse authButton" onclick="showModal('${id}', '${userCurrentId}')">View</button> 
                 </div>
              </div>
            </div>`;

                  //  <button
                  //    id="enrollBtn"
                  //    class="popularCourse authButton"
                  //    onclick="joinCourse(${id})"
                  //  >
                  //    Enroll
                  //  </button>;

                  if (isAdmin) {
                    document.getElementById(
                      `authBtns${id}`
                    ).innerHTML += ` <button
                    id="btnDel"
                    class="popularCourse authButton"
                    onclick="deleteCourse(${id})"
                  >
                    Delete Course
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
  if (localStorage.getItem("jwtToken") != null) {
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
        userCurrentId = data.data.id;
        console.log(userCurrentId);

        fetch(`/api/course/getmylearning/${userCurrentId}`)
          .then((response) => response.json())
          .then((data) => {
            // let filteredCourses = filteredCategory(data.data, category);
            // console.log(filteredCourses);
            console.log(data);
            data.data.forEach((course) => {
              console.log(course);
              let title = course.title;
              let highlights = course.highlights;
              let id = course.courseId;
              const div = document.getElementsByClassName("row")[0];
              div.innerHTML += `<div class="col-sm-6 mb-3 mb-sm-0">
              <div class="item mmm" style="margin-bottom:2rem";>
                
                  <h5 class="courseCardTitle loadVideo">${title}</h5>
                  <p class="card-text">
                  ${highlights}
                  </p>
                  <button class="popularCourse" onclick="loadVideo(${id})">View Course</button>
               
              </div>
            </div>`;
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
          console.log(response);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Uzmite ime korisnika iz podataka koje ste dobili
        //console.log(data);
        userCurrentId = data.data.id;
        console.log(userCurrentId);

        fetch("/api/course/getall")
          .then((response) => response.json())
          .then((data) => {
            data.data.forEach((course) => {
              console.log(course.creatorId);
              // console.log(course.creatorId);
              console.log(course.approved);
              console.log(course);
              if (course.creatorId == userCurrentId) {
                console.log("USAO U IF");
                let title = course.title;
                let highlights = course.highlights;
                let id = course.courseId;
                const div = document.getElementsByClassName("row")[0];
                div.innerHTML += `<div class="col-sm-6 mb-3 mb-sm-0">
              <div class="item mmm" style="margin-bottom:2rem" id="cccourse${id}">
              

                  <h5 class="courseCardTitle loadVideo">${title}</h5>
                  <p class="card-text" id="pId${id}">
                  ${highlights}
                  </p>
                  <div class="authButtons">
                  <button class="popularCourse authButton" onclick="loadVideo(${id})">View Course</button>  
                 <button  class="popularCourse authButton" onclick="deleteCourse(${id})">Delete Course</button>

                 </div>
              </div>
            </div>`;
                if (course.approved == false) {
                  console.log("USAO U IF ZA APPROVED");
                  document
                    .getElementById(`cccourse${id}`)
                    .classList.add("notapproved");

                  document.getElementById(`pId${id}`).innerHTML =
                    "COURSE NOT YET APPROVED";
                  document.getElementById(`pId${id}`).style.color = "black";
                } else {
                  document
                    .getElementById(`cccourse${id}`)
                    .classList.remove("notapproved");
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
          // console.log(course);
          let title = course.title;
          let highlights = course.highlights;
          let id = course.courseId;
          const div = document.getElementsByClassName("row")[0];

          div.innerHTML += `<div class="col-sm-6 mb-3 mb-sm-0">
              <div class="item mmm" style="margin-bottom:2rem";>
                  <h5 class="courseCardTitle loadVideo" onclick="loadVideo(${id})">${title}</h5>
                  <p class="card-text">
                  ${highlights}
                  </p>
                  <div class="authButtons">
                  <button  class="popularCourse authButton"  onclick="confirmCourse(${id})">Authorize</button>
                 <button  class="popularCourse authButton" onclick="deleteCourse(${id})">Delete</button>
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

// let creatorId;
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
        Price: data.data.Price,
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
          approveCourseMail(formData.CreatorId);
          showCoursesForAuthorization();
        })
        .catch((error) => {
          console.error("Error updating course:", error);
        });
    });
}

function approveCourseMail(id) {
  fetch(`/api/email/send-email/${id}/Your course has been approved!`, {
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
  let price;
  // console.log(id);
  fetch(`/api/course/GetCourseById/${id}`, {
    method: "GET",
  })
    .then((response) => {
      //  console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
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
      categoryEl.innerHTML = "Category: " + category;
      priceEl.style.display = "none";

      markEl = document.getElementById("mark-course");
      markEl.innerHTML = "Mark";
      let stars = document.querySelectorAll(".star");
      for (let i = 0; i < courseMark; i++) {
        stars[i].classList.add("filled");
      }

      fetch(`/api/course/Creator/${creatorId}`, {
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
          console.log(data);
          const fname = data.data.firstName;
          const lname = data.data.lastName;

          const creator = document.getElementById("creator-course");
          console.log(creator);
          creator.innerHTML = "Creator: " + fname + " " + lname;
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
          // console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log(data);
          // PROBA
          // ascending = true;
          // data.sort((a, b) => {
          //   if (a[fileOrder] < b[fileOrder]) {
          //     return ascending ? -1 : 1;
          //   }
          //   if (a[fileOrder] > b[fileOrder]) {
          //     return ascending ? 1 : -1;
          //   }
          //   return 0;
          // });
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
                divWeeks.innerHTML += `<div class="lesson"><div class="checkbox-wrapper-39">
<label>
<input id="input${material.contentId}" type="checkbox" id="courseComplete" onchange="completeLesson('${material.contentId}', '${i}', ${material.courseId})"/>
<span class="checkbox"></span>
</label>
</div><button class="btnLesson"  onclick="showFile('${video}')"> 
                Lesson ${material.fileOrder}</button></div>`;

                divWeeks.innerHTML += `</div></div>`;
              }
            });
          }
        });
    });
}

function completeLesson(contentId, week, courseId) {
  console.log(contentId);
  console.log(week);

  let inputEl = document.getElementById(`input${contentId}`);
  //console.log(inputEl.checked);
  let checked = inputEl.checked;

  if (localStorage.getItem("jwtToken") != null) {
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
        userCurrentId = data.data.id;
        // console.log(userCurrentId);

        const updateData = {
          UserId: userCurrentId,
          CourseId: courseId,
          MaterialId: contentId,
          Completed: checked,
          Week: week,
        };

        console.log(updateData);

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
              console.log(response);
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            // Uzmite ime korisnika iz podataka koje ste dobili
            console.log(data);
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

function loadPopularCourses() {
  const container = document.getElementById("scroll");
  if (localStorage.getItem("jwtToken") != null) {
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
        userCurrentId = data.data.id;
        fetch("/api/course/getall")
          .then((response) => response.json())
          .then((data) => {
            data.data.forEach((course) => {
              if (course.approved == 1) {
                console.log(course);
                let title = course.title;
                let highlights = course.highlights;
                let subtitle = course.subtitle;
                let mark = course.courseMark;
                let id = course.courseId;
                let price = course.Price;
                container.innerHTML += `<div class="item mmmm">
          <h4 class="courseCardTitle">${title}</h4><h5>${subtitle}</h5> <button onclick="showModal('${id}', '${userCurrentId}'); " class="popularCourse">View course</button>
          </div>`;

                let elements = document.getElementsByClassName("popularCourse");
                // Array.from(elements).forEach((element, index) => {
                //   element.addEventListener("click", (event) => {
                //     let courseId = data.data[index].courseId;
                //       showModal(courseId, userCurrentId); // Proslediti event i tačan id
                //   });
                // });
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
  // let elements1 = document.getElementsByClassName("btn-close");
  // Array.from(elements1).forEach((element, index) => {
  //   element.addEventListener("click", hideModal);
  // });

  // console.log(elements1);

  // let elements2 = document.getElementsByClassName("btn-savee");
  // Array.from(elements2).forEach((element, index) => {
  //   element.addEventListener("click", alert("ivana"));
  // });
  // document
  //   .getElementsByClassName("btn-close")
  //   .addEventListener("click", hideModal);

  // document
  //   .getElementsByClassName("btn-savee")
  //   .addEventListener("click", hideModal);
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
  console.log(searchWord);
  console.log(category);
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

//INPUT
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

// Prikazivanje moda
function showFilter() {
  document.getElementById("more-filter").style.display = "flex";
}

// Sakrivanje moda
function hideFilter() {
  document.getElementById("more-filter").style.display = "none";
  fromInput = document.querySelector("#fromInput");
  toInput = document.querySelector("#toInput");
  durationWeek = document.getElementById("durationWeek");
  console.log(
    "BROJEVI: " +
      fromInput.value +
      " " +
      toInput.value +
      " " +
      durationWeek.value
  );

  // searchCourses();
}

function cancelFilter() {
  document.getElementById("more-filter").style.display = "none";

  fromInput = "";
  toInput = "";
  console.log(
    "BROJEVI: " +
      fromInput.value +
      " " +
      toInput.value +
      " " +
      durationWeek.value
  );
}

var enrollCourseId = -1;
function confirmEnroll() {
  answer = true;
  let id = enrollCourseId;
  console.log(id);
  if (localStorage.getItem("jwtToken") != null) {
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
        userCurrentId = data.data.id;
        const enroll = {
          UserId: userCurrentId,
          CourseId: id,
        };
        console.log(userCurrentId);

        fetch("/api/course/Course", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(enroll),
        })
          .then((response) => {
            console.log(response);
            if (!response.ok) {
              throw new Error("Nash Fail");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            enrollCourseMail(userCurrentId);
            //FETCH ZA PRAVLJENJE REDOVA U TABELI STATISTICS

            fetch(`/api/course/GetCourseById/${id}`, {
              method: "GET",
            })
              .then((response) => {
                //  console.log(response);
                return response.json();
              })
              .then((data) => {
                console.log(data.data);

                data.data.courseContents.forEach((material) => {
                  console.log(material);
                  const updateData = {
                    UserId: userCurrentId,
                    CourseId: id,
                    MaterialId: material.contentId,
                    Completed: false,
                    Week: material.weekNumber,
                  };
                  console.log(updateData);
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
                        console.log(response);
                        throw new Error("Network response was not ok");
                      }
                      return response.json();
                    })
                    .then((data) => {
                      // Uzmite ime korisnika iz podataka koje ste dobili
                      console.log(data);
                    })
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
        <div onclick="closeModal()">
          
          <p style="font-size:15pt; font-weight:bold; margin:auto;">You are enrolled in the course!</p>
          
        </div>
        </div>
        </div>
      `;
}
function closeModal() {
  console.log("k");
  var modal1 = document.getElementById("myModal1");
  var modal2 = document.getElementsByClassName("modal2")[0];
  if (modal2 != null) modal2.style.display = "none";
  modal1.style.display = "none";
  let mainmodal = document.getElementById("myModal");
  mainmodal.style.display = "none";
}
function joinCourse(id) {
  // getCurrentUserId();
  // console.log(userCurrentId);
  var modal1 = document.getElementById("myModal1");

  // Get the <span> element that closes the modal
  var span1 = document.getElementsByClassName("close1")[0];

  // When the user clicks on <span> (x), close the modal
  span1.onclick = function () {
    modal1.style.display = "none";
  };
  console.log(modal1);
  modal1.style.display = "block";
  enrollCourseId = id;
  console.log(enrollCourseId);
}

function enrollCourseMail(id) {
  fetch(
    `/api/email/send-email/${id}/You have been successfully enrolled in the course!`,
    {
      method: "POST",
    }
  )
    .then((response) => {
      // console.log(response);
      // return response.json;
    })
    .then((data) => {
      // console.log(data);
    })
    .catch((error) => {
      console.error("Error (enroll):", error);
    });
}

function deleteCourse(id) {
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
      //  console.log(formData);
      fetch(`/api/course/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          // console.log(response);
          // return response.json;
        })
        .then((data) => {
          // console.log(data);

          fetch(
            `/api/email/send-email/${creatorId}/Sorry, your course has been rejected! Try submitting again.`,
            {
              method: "POST",
            }
          )
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
        });

      alert("Course has been successfully deleted!");
      location.reload();
    })
    .catch((error) => {
      console.error("Error (enroll):", error);
    });
}
