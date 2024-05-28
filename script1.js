function changeLabelColor(val) {
  let labels = document.querySelectorAll(".labela");

  labels.forEach(function (label) {
    if (label.getAttribute("for") === val) {
      let radio = document.getElementById(val);

      if (radio.checked) {
        label.style.backgroundColor = "#ead7bb";
        label.style.color = "#113946";
      } else {
        label.style.backgroundColor = "#113946";
        label.style.color = "#ead7bb";
      }
    } else {
      label.style.backgroundColor = "#113946";
      label.style.color = "#ead7bb";
    }
  });
}

function redirectToPage(url) {
  window.location.href = url;
}

//MODALI

// Prikazivanje moda
function showModal(event, id) {
  document.getElementById("myModal").style.display = "block";
  courseInfo(id);
}

// Sakrivanje moda
function hideModal() {
  document.getElementById("myModal").style.display = "none";
}

// Dodeljivanje funkcija prikazivanja i sakrivanja modala dugmadima
// document.getElementById("mmmm").addEventListener("click", showModal);

setTimeout(function () {
  localStorage.removeItem("jwtToken");
}, 86400000);

function logUser(event) {
  event.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  const user = {
    email: email,
    password: password,
  };

  fetch("/api/auth/Login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error("Login failed");
      }

      return response.json();
    })
    .then((data) => {
      if (data.message == "User not approved") alert("Admin not approved!");
      else {
        // Čuvanje JWT tokena u lokalnom skladištu (LocalStorage)
        //localStorage.setItem("jwtToken", data.data);
        //alert("Uspjesno");
        localStorage.setItem("jwtToken", data.data); //ISPRAVNO JE OVO
        console.log(data);
        console.log(data.data);

        if (localStorage.getItem("jwtToken") != null)
          window.location = "index.html";
      }
    })
    .catch((error) => {
      var btn = document.getElementById("signup");
      btn.style.display = "block";
      console.error("Unable to log user.", error);
    });
}

function regUser(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const title = document.getElementById("title").value;
  // const type = document.querySelector('input[type="radio"]:checked').value;
  const date = document.getElementById("dateofbirth").value;

  const radioButtons = document.querySelectorAll(
    'input[type="radio"][name="type"]'
  );

  let selectedType = null;
  let approved = false;

  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      selectedType = radioButton.value;
    }
  });
  let type = "";
  console.log(selectedType);
  console.log(type);

  if (selectedType == 1) {
    type = "Admin";
    approved = false;
  } else if (selectedType == 0) {
    type = "User";
    approved = true;
  }

  console.log(type);

  const user = {
    email: email,
    password: password,
    usertype: type,
    firstname: firstname,
    lastname: lastname,
    dateofbirth: date,
    title: title,
    approved: approved,
  };

  if (
    email !== "" &&
    password !== "" &&
    type !== "" &&
    firstname !== "" &&
    lastname !== "" &&
    dateofbirth !== "" &&
    title !== ""
  ) {
    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        // Pređi na log.html samo ako je registracija uspješna
        window.location = "log.html";
      })
      .catch((error) => console.error("Unable to register user.", error));
  } else {
    alert("Popuni sva polja");
    event.preventDefault();
  }
}

function checkUserRole() {
  let userRole;
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
      userRole = data.data.userType;
      // Prikazivanje imena korisnika u HTML elementu
      // console.log(userRole);
      if (userRole != "Admin") {
        const el1 = document.getElementById("adminEl1");
        const el2 = document.getElementById("adminEl2");

        el1.style.display = "none";
        el2.style.display = "none";
      }
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

function displayName() {
  checkUserRole();
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
        //  console.log(data);
        const userName = data.data.firstName;
        // Prikazivanje imena korisnika u HTML elementu
        let usernameElement = document.getElementById("logUserName");
        usernameElement.innerHTML = "Welcome, " + userName + "!  |";

        let logoutElement = document.getElementById("logout");
        logoutElement.innerHTML = "Logout  |";
        //  console.log(logoutElement.innerHTML);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }
}

function logout() {
  localStorage.removeItem("jwtToken");
  // window.location.href = "index.html";
  let el = document.getElementById("navright");
  el.style.display = "none";
  location.reload();
}

function inputInfo() {
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
      console.log(data);
      const fname = data.data.firstName;
      const lname = data.data.lastName;
      const type = data.data.userType;
      const email = data.data.email;
      const title = data.data.title;
      const datepre = data.data.dateOfBirth;

      let fnameElement = document.getElementById("firstname");
      let emailElement = document.getElementById("email");
      let lnameElement = document.getElementById("lastname");
      let usertypeElement = document.getElementById("usertype");
      let titleElement = document.getElementById("title");
      let dateElement = document.getElementById("birth");

      let date = new Date(datepre);

      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let formattedDate = `${day}-${month}-${year}`;

      fnameElement.innerHTML = fname;
      lnameElement.innerHTML = lname;
      emailElement.innerHTML = email;
      usertypeElement.innerHTML = type;
      titleElement.innerHTML = title;
      dateElement.innerHTML = formattedDate;
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

function loadUsers() {
  fetch("/api/auth/getall")
    .then((response) => response.json())
    .then((data) => {
      data.data.forEach((user) => {
        if (!user.approved) {
          console.log(user);
          let name = user.firstName;
          let email = user.email;
          let userId = user.id;

          const div = document.getElementsByClassName("row")[0];
          div.innerHTML += `<div class="col-sm-6 mb-4">
              <div class="item mmm" style="margin-bottom:2rem";>
                
                  <h5 class="courseCardTitle loadVideo">${name}</h5>
                  <p class="card-text">
                  ${email}
                  </p>
                  <div class="authButtons">

                  <button class="popularCourse authButton" onclick="authorizeAdmin(${userId})">Authorize</button>
                  <button  class="popularCourse authButton" onclick="deleteUser(${userId})">Delete</button>
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

function showUsersForAuthorization() {
  window.location = "authorizeAdmin.html";
}

function authorizeAdmin(userid) {
  console.log(userid);

  fetch(`/api/auth/GetUserById/${userid}`, {
    method: "GET",
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const formData = {
        email: data.data.email,
        userType: data.data.userType,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        dateOfBirth: data.data.dateOfBirth,
        title: data.data.title,
        approved: true,
        id: data.data.id,
      };
      console.log(formData);

      fetch("api/auth", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("User updated successfully:", data);
          approveAdminMail(formData.id);

          showUsersForAuthorization();
        })
        .catch((error) => {
          console.error("Error updating course:", error);
        });
    })
    .catch((error) => {
      console.error("Error updating user:", error);
    });
}
function checkLocalStorage() {
  if (localStorage.getItem("jwtToken") == null) {
    // Ako postoji token, preusmeri na index.html
    window.location.href = "log.html";
  }
}

function approveAdminMail(id) {
  fetch(`/api/email/send-email/${id}/Your account has been approved!`, {
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
      console.error("Error updating admin:", error);
    });
}

function courseInfo(courseId) {
  fetch(`/api/course/GetCourseById/${courseId}`, {
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
      const title = data.data.title;
      const subtitle = data.data.subtitle;

      let titleEl = document.getElementById("modalTitle");
      let subtitleEl = document.getElementById("modalSubtitle");
      let bodyEl = document.getElementById("modalBody");
      let footEl = document.getElementById("modalFooterButtons");

      titleEl.innerHTML = title;
      subtitleEl.innerHTML = subtitle;
      bodyEl.innerHTML = `<div class="modalbodytop">
                <div class="category">Category: ${data.data.category}</div>
                <div class="price">Price: ${data.data.price} $</div>
                <div class="markk">Mark: ${data.data.courseMark}
                <div class="rating">
                  <span class="star">&#9733;</span>
                  <span class="star">&#9733;</span>
                  <span class="star">&#9733;</span>
                  <span class="star">&#9733;</span>
                  <span class="star">&#9733;</span>
                </div>
                </div>
              </div>
              <div class="modalbodybody">
                <div class="duration">Duration in weeks:  ${data.data.durationInWeeks}</div>
                <div class="weekly"> Weekly hours:  ${data.data.weeklyHours}</div>
              </div>
              <div class="modalbodybottom">
                <div class="highlights">Highlights: ${data.data.highlights}</div>
              </div>`;

      footEl.innerHTML = `<button
            type="button"
            class="btnn-secondary btn-close"
            data-bs-dismiss="modal"
            id="modalhide"
            onclick="hideModal()"
          >
            Close
          </button>
          <button type="button" class="btnn-primary btn-savee" id="enroll" onclick="joinCourse(${data.data.courseId})">
            Enroll
          </button>`;

      // console.log(data.data.courseMark);
      console.log(data.data.courseId);
      // document
      //   .getElementById("enroll")
      //   .addEventListener("click", joinCourse(`${data.data.courseId}`));
      // console.log(document.getElementById("enroll"));

      let stars = document.querySelectorAll(".star");
      for (let i = 0; i < data.data.courseMark; i++) {
        // Pretpostavimo da je ocjena 4
        stars[i].classList.add("filled");
      }
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

function openReview() {
  var element = document.getElementById("idReview");
  var elementToHide = document.getElementById("idOverview");
  elementToHide.style.display = "none";
  element.style.display = "block";
  element.innerHTML = `<div class="gridreviews"><div class="leftreview"><h2 id="title-course">Naslov kursa</h2>  
        <h3 id="subtitle-course">Podnaslov kursa</h3> 
        <p id="highlights-course">Highlights</p> 
        <p id="courseCreator">Creator33333</p>
        <p id=""></p> 
        </div>
        <div class="rightreview">
        <button class="addReview" onclick="showReviewInput()" id="addreviewbutton">Add Your Review</button>
        <div id="typereview"></div>
        </div>
        </div>
        `;
}
function showReviewInput() {
  let element = document.getElementById("typereview");
  let buttonToHide = document.getElementById("addreviewbutton");
  buttonToHide.style.display = "none";
  element.innerHTML = `<div class="inputReview"><textarea id="textareaid"></textarea>
                        <div class="rating-container">
        <span class="starR" data-value="5">&#9733;</span>
        <span class="starR" data-value="4">&#9733;</span>
        <span class="starR" data-value="3">&#9733;</span>
        <span class="starR" data-value="2">&#9733;</span>
        <span class="starR" data-value="1">&#9733;</span>
    </div>
    <div id="rating-value" value="">Ocena: 0</div>
    <button class="addReview" onclick="submitReview()" id="submitreview">Submit Review</button>
    </div>`;

  // const stars = document.querySelectorAll(".starR");
  // const ratingValue = document.getElementById("rating-value");

  // stars.forEach((star) => {
  //   star.addEventListener("click", () => {
  //     const value = star.getAttribute("data-value");
  //     stars.forEach((s) => s.classList.remove("active"));
  //     star.classList.add("active");
  //     let nextStar = star.previousElementSibling; // Postavi na prethodni element
  //     while (nextStar) {
  //       nextStar.classList.add("active");
  //       nextStar = nextStar.previousElementSibling; // Pomeri se na sledeći prethodni element
  //     }
  //     ratingValue.innerText = `Ocena: ${value}`;
  //   });
  // });

  const stars = document.querySelectorAll(".starR");
  const ratingValue = document.getElementById("rating-value");

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const value = star.getAttribute("data-value");
      stars.forEach((s) => s.classList.remove("active"));
      star.classList.add("active");
      let previousStar = star.previousElementSibling; // Postavi na prethodni element

      while (previousStar) {
        console.log(previousStar);
        previousStar.classList.remove("active");
        previousStar = previousStar.previousElementSibling; // Pomeri se na sledeći prethodni element
      }
      ratingValue.innerText = `${value}`;
    });
  });
}
function openOverview() {
  var element = document.getElementById("idOverview");
  element.style.display = "block";

  var elementToHide = document.getElementById("idReview");
  elementToHide.style.display = "none";
}

function submitReview() {
  const urlParams = new URLSearchParams(window.location.search);

  const courseId = urlParams.get("parametar");
  console.log(courseId);
  console.log(window.location.href);
  let oldLoc = window.location.href;

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

        // NOVI FETCH
        let reviewText = document.getElementById("textareaid").value;
        // let markel = document.getElementById("textareaid").value;
        let ratingValue = document.getElementById("rating-value").innerHTML;

        // console.log(ratingValue);
        const review = {
          UserId: userCurrentId,
          CourseId: courseId,
          ReviewText: reviewText,
          Mark: ratingValue,
        };
        fetch("/api/course/AddReview", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(review),
        })
          .then((response) => {
            console.log(response);
            if (!response.ok) {
              throw new Error("Adding review failed");
            }

            return response.json();
          })
          .then((data) => {
            console.log(data);
            // window.location.href = oldLoc; //NE VALJA
          })
          .catch((error) => {
            console.error("Unable to add review.", error);
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

function deleteUser(id) {
  fetch(
    `/api/email/send-email/${id}/Sorry, your request has been rejected! Try again or register as user.`,
    {
      method: "POST",
    }
  )
    .then((response) => {
      //  console.log(response);
      //return response.json;
    })
    .then((data) => {
      fetch(`/api/auth/delete/${id}`, {
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
          //console.log(data);
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
      alert("User has been successfully deleted!");
      location.reload();
    })
    .catch((error) => {
      console.error("Error (delete):", error);
    });
}
