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

function showModal(id, userId) {
  document.getElementById("myModal").style.display = "block";
  courseInfo(id, userId);
}

function hideModal() {
  document.getElementById("myModal").style.display = "none";
}

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
      if (!response.ok) {
        throw new Error("Login failed");
      }

      return response.json();
    })
    .then((data) => {
      if (data.message == "User not approved")
        alert("Nalog još uvijek nije odobren!");
      else {
        localStorage.setItem("jwtToken", data.data);

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

  if (selectedType == 1) {
    type = "Admin";
    approved = false;
  } else if (selectedType == 0) {
    type = "Korisnik";
    approved = true;
  }

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
    if (password.length < 4) {
      alert("Lozinka mora biti dužine minimalno 4 karaktera!");
    } else {
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
          window.location = "log.html";
        })
        .catch((error) => console.error("Unable to register user.", error));
    }
  } else {
    alert("Popunite sva polja");
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
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      userRole = data.data.userType;
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
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const userName = data.data.firstName;
        let usernameElement = document.getElementById("logUserName");
        usernameElement.innerHTML = "Dobro došli, " + userName + "!  |";

        let logoutElement = document.getElementById("logout");
        logoutElement.innerHTML = "Odjava  |";
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
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
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
      let usertypeImg = document.getElementById("profile-img");

      let titleElement = document.getElementById("title");
      let dateElement = document.getElementById("birth");

      let date = new Date(datepre);

      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let formattedDate = `${day}-${month}-${year}`;

      if (type == "Admin") usertypeImg.src = "admin.png";
      else usertypeImg.src = "user1.png";

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
          let name = user.firstName;
          let lastname = user.lastName;

          let email = user.email;
          let userId = user.id;
          let title = user.title;

          const div = document.getElementsByClassName("row")[0];
          div.innerHTML += `<div class="col-sm-6 mb-4">
              <div class="item mmm" style="margin-bottom:2rem; background-image:url('authAdmin.png')";>
                
                  <h5 class="courseCardTitle loadVideo">${name} &nbsp; ${lastname}</h5>
                  <p class="card-text" style="background-color: #c0dbea63;
                    backdrop-filter: blur(2px);
                    border-radius: 15pt;
                    line-height: 150%;
                    padding: 5px 10px;
                    font-weight:700;
                    color:#113946 ">
                  ${email}
                  <br>
                  Zvanje: ${title}
                  </p>
                  <div class="authButtons">
                  <button class="popularCourse authButton" onclick="authorizeAdmin(${userId})">Odobri admina</button>
                  <button  class="popularCourse authButton" onclick="deleteUser(${userId})">Obriši admina</button>
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
  fetch(`/api/auth/GetUserById/${userid}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
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

      fetch("api/auth", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
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
  // if (localStorage.getItem("jwtToken") == null) {
  //   window.location.href = "log.html";
  // }
}

function approveAdminMail(id) {
  fetch(
    `/api/email/send-email/${id}/Vaš nalog je odobren, sada možete da se prijavite kao admin!`,
    {
      method: "POST",
    }
  )
    .then((response) => {})
    .then((data) => {})
    .catch((error) => {
      console.error("Error updating admin:", error);
    });
}

function courseInfo(courseId, userId) {
  fetch(`/api/course/GetCourseById/${courseId}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const title = data.data.title;
      const subtitle = data.data.subtitle;

      let titleEl = document.getElementById("modalTitle");
      let subtitleEl = document.getElementById("modalSubtitle");
      let bodyEl = document.getElementById("modalBody");
      let footEl = document.getElementById("modalFooterButtons");

      let headerEl = document.getElementById("modalHeader");

      let category = data.data.category;
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
          background = "lang.png";
          break;
        case "Prirodne nauke":
          background = "science-eng.jpg";
          break;
        case "Društvene nauke":
          background = "soc2.jpg";
          break;
        case "Lični razvoj":
          background = "person.png";
          break;
        case "Nauka o podacima":
          background = "data1jpg.jpg";
          break;
        case "Edukacija i podučavanje":
          background = "edu.jpg";
          break;
        case "Pravne studije i pravo":
          background = "law.webp";
          break;
        case "Psihologija i savjetovanje":
          background = "psih.png";
          break;
        case "Umjetnost":
          background = "art.jpg";
          break;
        case "Sport":
          background = "sport.jpg";
          break;
        case "Zdravstvo i medicina":
          background = "medicine.jpg";
          break;
        case "Modni dizajn":
          background = "moda.jpg";
          break;
        default:
          background = "other.jpg";
          break;
      }
      if (headerEl != null)
        headerEl.style.backgroundImage = "url(" + background + ")";
      let creator = data.data.creatorId;
      titleEl.innerHTML = title;
      subtitleEl.innerHTML = subtitle;
      bodyEl.innerHTML = `<div class="modalbodytop">
                <div class="category">Kategorija: ${data.data.category}</div>
                <div class="price">Cijena: ${data.data.price} KM</div>
                <div class="markDiv"> <p classs="markk">Ocjena: ${data.data.courseMark}</p>
                <div class="rating">
                  <span class="starr">&#9733;</span>
                  <span class="starr">&#9733;</span>
                  <span class="starr">&#9733;</span>
                  <span class="starr">&#9733;</span>
                  <span class="starr">&#9733;</span>
                </div>
                </div>
              </div>
              <div class="modalbodybody">
                <div class="duration">Trajanje u sedmicama:  ${data.data.durationInWeeks}</div>
                <div class="weekly"> Sedmično opterećenje:  ${data.data.weeklyHours}</div>
              </div>
              <div class="modalbodybottom">
                <div class="highlights">Najvažnije o kursu: <br>${data.data.highlights}</div>
              </div>`;

      footEl.innerHTML = `<button
            type="button"
            class="btnn-secondary btn-close"
            data-bs-dismiss="modal"
            id="modalhide"
            onclick="hideModal()"
          >
            Zatvori
          </button>
       `;
      fetch(`/api/course/getmylearning/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          data.data.forEach((course) => {
            if (course.courseId == courseId && creator != userId)
              footEl.innerHTML = `<button
            type="button"
            class="btnn-secondary btn-close"
            data-bs-dismiss="modal"
            id="modalhide"
            onclick="hideModal()"
          >
            Zatvori
          </button>
                  <button class="btnn-primary btn-savee" onclick="loadVideo(${courseId})">Pogledaj kurs</button>`;
          });
        })

        .catch((error) => {
          console.error("There was an error:", error);
        });

      if (creator == userId) {
        footEl.innerHTML = `
        <button
            type="button"
            class="btnn-secondary btn-close"
            data-bs-dismiss="modal"
            id="modalhide"
            onclick="hideModal()"
          >
            Zatvori
          </button>
                  <button class=" btnn-primary btn-savee" onclick="loadVideo(${courseId})">Pogledaj kurs</button>`;
      } else {
        footEl.innerHTML = `
        <button
            type="button"
            class="btnn-secondary btn-close"
            data-bs-dismiss="modal"
            id="modalhide"
            onclick="hideModal()"
          >
            Zatvori
          </button><button
        type="button"
        class="btnn-primary btn-savee"
        id="enroll"
        onclick="joinCourse(${courseId})"
      >
        Upiši se
      </button>`;
      }

      let stars = document.querySelectorAll(".starr");
      for (let i = 0; i < data.data.courseMark; i++) {
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
          var elementIdReview = document.getElementById("idReview");
          elementIdReview.innerHTML = `<div class="gridreviews">
          <div class="leftreview" id="idleftreview">
            <div class="addReview" onclick="showReviewInput()" id="addreviewbutton">Dodaj svoju recenziju</div>
            <div id="typereview"></div>
          </div>

          <div class="rightreview">
            <div id="carouselExample" class="carousel slide">  
              <div class="carousel-inner" id="carInnerReview"> 
                
              </div>
                  
               
              </div>   

          </div>
        </div>
  `;

          userCurrentId = data.data.id;
          if (userCurrentId === creatorId || admin === "true") {
            var el = document.getElementById("addreviewbutton");
            el.style.display = "none";
          }
          fetch(`/api/course/GetReviewsByCourseId/${id}`, {
            method: "GET",
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              data.data.forEach((review) => {
                var ee = document.getElementById("carInnerReview");
                ee.innerHTML += `<div class="carousel-item" id="carousel-item${review.id}">      
        <div class="cardReview d-block w-100">
          <div class="cardReview-header">${review.user.firstName} &nbsp; ${review.user.lastName}</div>
          <div class="cardReview-body">
            <h5 class="cardReview-title ct"><div class="ratingMarksDiv">
                <span class="staar staar${review.id}">&#9733;</span>
                <span class="staar staar${review.id}">&#9733;</span>
                <span class="staar staar${review.id}">&#9733;</span>
                <span class="staar staar${review.id}">&#9733;</span>
                <span class="staar staar${review.id}">&#9733;</span>
              </div></h5>
            <p class="cardReview-text">O<i id="reviewCardTitle"> ${review.course.title}<br> </i>
            ${review.reviewText}
            </p>
            <br />
          </div>
        </div>    
    </div>    `;
                document.getElementById(
                  "carouselExample"
                ).innerHTML += ` <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev"> 
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>    
                  <span class="visually-hidden">Prethodno</span> 
                </button>  
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">    
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>    
                  <span class="visually-hidden">Sljedeće</span>  
                </button>`;

                let stars = document.querySelectorAll(`.staar${review.id}`);
                for (let i = 0; i < review.mark; i++) {
                  if (i < stars.length) {
                    stars[i].classList.add("filled");
                  }
                }
              });

              var prva = document.getElementsByClassName("carousel-item")[0];
              if (prva != null) prva.classList.add("active");
            })
            .catch((error) => {
              console.error(
                "There has been a problem with your fetch operation:",
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
    });
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
    <div id="rating-value" value="">Ocjena: 0</div>
    <button class="addReviewBtn" onclick="submitReview()" id="submitreview">Potvrdi recenziju</button>
    </div>`;

  const stars = document.querySelectorAll(".starR");
  const ratingValue = document.getElementById("rating-value");

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const value = star.getAttribute("data-value");
      stars.forEach((s) => s.classList.remove("active"));
      star.classList.add("active");
      let previousStar = star.previousElementSibling;

      while (previousStar) {
        previousStar.classList.remove("active");
        previousStar = previousStar.previousElementSibling;
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
  let oldLoc = window.location.href;

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

        let reviewText = document.getElementById("textareaid").value;
        let ratingValue = document.getElementById("rating-value").innerHTML;

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
            if (!response.ok) {
              throw new Error("Adding review failed");
            }

            return response.json();
          })
          .then((data) => {
            location.reload();
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
    `/api/email/send-email/${id}/Izvinjavamo se, Vaš zahtjev za kreiranje naloga za admina je odbijen! Pokušajte ponovo ili se registrujte kao korisnik.`,
    {
      method: "POST",
    }
  )
    .then((response) => {})
    .then((data) => {
      fetch(`/api/auth/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {})
        .then((data) => {})
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
      alert("Korisnik je uspješno obrisan!");
      location.reload();
    })
    .catch((error) => {
      console.error("Error (delete):", error);
    });
}
