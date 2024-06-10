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
function showModal(id, userId) {
  document.getElementById("myModal").style.display = "block";
  console.log(document.getElementById("myModal").style);
  courseInfo(id, userId);
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

function courseInfo(courseId, userId) {
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

      let headerEl = document.getElementById("modalHeader");

      let category = data.data.category;
      let background;

      switch (category) {
        case "Engineering":
          background = "science-eng.jpg";
          break;
        case "Business Development":
          background = "business.jpg";
          break;
        case "IT and Technology":
          background = "it.jpg";
          break;
        case "Health & Fitness":
          background = "fitness.jpg";
          break;
        case "Languages":
          background = "lang.jpg";
          break;
        case "Science":
          background = "science-eng.jpg";
          break;
        case "Personal Development":
          background = "fitness.jpg";
          break;
        case "Data Science":
          background = "data1jpg.jpg";
          break;
        case "Legal Studies and Law":
          background = "law.webp";
          break;
        case "Psychology and Counseling":
          background = "medicine.jpg";
          break;
        case "Healthcare and Medicine":
          background = "medicine.jpg";
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
                <div class="category">Category: ${data.data.category}</div>
                <div class="price">Price: ${data.data.price} $</div>
                <div class="markDiv"> <p classs="markk">Mark: ${data.data.courseMark}</p>
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
       `;
      console.log("prolazaj");
      fetch(`/api/course/getmylearning/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          // let filteredCourses = filteredCategory(data.data, category);
          // console.log(filteredCourses);
          console.log(data);
          data.data.forEach((course) => {
            // console.log(course);
            if (course.courseId == courseId && creator != userId)
              footEl.innerHTML = `<button
            type="button"
            class="btnn-secondary btn-close"
            data-bs-dismiss="modal"
            id="modalhide"
            onclick="hideModal()"
          >
            Close
          </button>
                  <button class="btnn-primary btn-savee" onclick="loadVideo(${courseId})">View Course</button>`;
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
            Close
          </button>
                  <button class=" btnn-primary btn-savee" onclick="loadVideo(${courseId})">View Course</button>`;
      } else {
        footEl.innerHTML = `
        <button
            type="button"
            class="btnn-secondary btn-close"
            data-bs-dismiss="modal"
            id="modalhide"
            onclick="hideModal()"
          >
            Close
          </button><button
        type="button"
        class="btnn-primary btn-savee"
        id="enroll"
        onclick="joinCourse(${courseId})"
      >
        Enroll
      </button>`;
      }

      // console.log(data.data.courseMark);
      console.log(data.data.courseId);
      // document
      //   .getElementById("enroll")
      //   .addEventListener("click", joinCourse(`${data.data.courseId}`));
      // console.log(document.getElementById("enroll"));

      let stars = document.querySelectorAll(".starr");
      console.log(data.data.courseMark);
      for (let i = 0; i < data.data.courseMark; i++) {
        // Pretpostavimo da je ocjena 4
        stars[i].classList.add("filled");
        console.log(stars[i].classList);
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
  // OVDJE DODATI UCITAVANJE RECENZIJA

  // element.innerHTML = `<div class="gridreviews"><div class="leftreview" id="idleftreview">
  // <div id="carouselExample" class="carousel slide">
  // <div class="carousel-inner" id="carInnerReview">

  //   <div class="carousel-item active" id="carousel-item">
  //       <img src="back.jpg" class="d-block w-100" alt="...">
  //   </div>
  //   <div class="carousel-item">
  //       <img src="back.jpg" class="d-block w-100" alt="...">
  //   </div>
  //   <div class="carousel-item">
  //       <img src="back.jpg" class="d-block w-100" alt="...">
  //   </div>

  // </div>

  // <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
  // <span class="carousel-control-prev-icon" aria-hidden="true"></span>    <span class="visually-hidden">Previous</span>
  // </button>  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">    <span class="carousel-control-next-icon" aria-hidden="true"></span>    <span class="visually-hidden">Next</span>  </button></div>

  // </div>
  // <div class="rightreview">
  // <button class="addReview" onclick="showReviewInput()" id="addreviewbutton">Add Your Review</button>
  // <div id="typereview"></div>
  // </div>
  // </div>
  // `;

  //var bigEl = document.getElementById("carInnerReview");
  //bigEl.innerHTML = ``;
  //var oneReviewElement = document.getElementById("carousel-item");
  // oneReviewElement.innerHTML = `<div class="cardReview d-block w-100">
  //         <div class="cardReview-header">IVANA &nbsp; JUGOVIC</div>
  //         <div class="cardReview-body">
  //           <h5 class="cardReview-title ct"><div class="ratingMarksDiv">
  //               <span class="staar">&#9733;</span>
  //               <span class="staar">&#9733;</span>
  //               <span class="staar">&#9733;</span>
  //               <span class="staar">&#9733;</span>
  //               <span class="staar">&#9733;</span>
  //             </div></h5>
  //           <span class="quoteR">&#10077;</span><br />
  //           <p class="cardReview-text">About <i>:<br> </i>
  //           </p>
  //           <br />
  //           <span class="quoteR">&#10078;</span>
  //         </div>
  //       </div>`;
  // oneReviewElement.style.color = "yellow";

  //var carEl = document.getElementById("carInnerReview");
  // carEl.innerHTML = `<div class="carousel-item active" id="carousel-item">
  //       <div class="cardReview d-block w-100">
  //         <div class="cardReview-header">IVANA &nbsp; JUGOVIC</div>
  //         <div class="cardReview-body">
  //           <h5 class="cardReview-title ct"><div class="ratingMarksDiv">
  //               <span class="staar">&#9733;</span>
  //               <span class="staar">&#9733;</span>
  //               <span class="staar">&#9733;</span>
  //               <span class="staar">&#9733;</span>
  //               <span class="staar">&#9733;</span>
  //             </div></h5>
  //           <span class="quoteR">&#10077;</span><br />
  //           <p class="cardReview-text">About <i id="reviewCardTitle">:<br> </i>
  //           </p>
  //           <br />
  //           <span class="quoteR">&#10078;</span>
  //         </div>
  //       </div>
  //   </div>    `;
  const urlParams = new URLSearchParams(window.location.search);

  const id = urlParams.get("parametar");
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
      // var e1 = document.getElementById("reviewCardTitle");
      // e1.innerHTML = title;

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
          //AKO ZATREBA
          //       <div class="carousel-item active" id="carousel-item">
          //     <img src="back.jpg" class="d-block w-100" alt="...">
          // </div>
          // <div class="carousel-item">
          //     <img src="back.jpg" class="d-block w-100" alt="...">
          // </div>
          // <div class="carousel-item">
          //     <img src="back.jpg" class="d-block w-100" alt="...">
          // </div>
          var elementIdReview = document.getElementById("idReview");
          elementIdReview.innerHTML = `<div class="gridreviews"><div class="leftreview" id="idleftreview">
  <div id="carouselExample" class="carousel slide">  
  <div class="carousel-inner" id="carInnerReview"> 
     
    
          
  </div>
         
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev"> 
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>    <span class="visually-hidden">Previous</span> 
  </button>  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">    <span class="carousel-control-next-icon" aria-hidden="true"></span>    <span class="visually-hidden">Next</span>  </button></div>   


  </div>
  <div class="rightreview">
  <button class="addReview" onclick="showReviewInput()" id="addreviewbutton">Add Your Review</button>
  <div id="typereview"></div>
  </div>
  </div>
  `;
          // Uzmite ime korisnika iz podataka koje ste dobili
          //console.log(data);
          userCurrentId = data.data.id;
          if (userCurrentId == creatorId) {
            var el = document.getElementById("addreviewbutton");
            el.style.display = "none";
          }
          console.log(id);
          //FETCH ZA DOBIJANJE RECENZIJA ZA KURS SA ID id
          fetch(`/api/course/GetReviewsByCourseId/${id}`, {
            method: "GET",
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              console.log(data.data);

              data.data.forEach((review) => {
                console.log(review);
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
            <span class="quoteR">&#10077;</span><br />
            <p class="cardReview-text">About<i id="reviewCardTitle">:${review.course.title}<br> </i>
            ${review.reviewText}
            </p>
            <br />
            <span class="quoteR">&#10078;</span>
          </div>
        </div>    
    </div>    `;

                //OVO NE IDE OVDJE ALI SE TREBA ISKORISTITI!!!!!!!
                //------------------------------------------------

                let stars = document.querySelectorAll(`.staar${review.id}`);
                // Array.from(stars).forEach((star) => {
                //   star.classList.add("filled");
                // });

                for (let i = 0; i < review.mark; i++) {
                  if (i < stars.length) {
                    stars[i].classList.add("filled");
                  }
                }
              });

              var prva = document.getElementsByClassName("carousel-item")[0];
              prva.classList.add("active");
            })
            .catch((error) => {
              console.error(
                "There has been a problem with your fetch operation:",
                error
              );
            });

          //OVO NE IDE OVDJE ALI SE TREBA ISKORISTITI!!!!!!!
          //------------------------------------------------
          // let stars = document.querySelectorAll(".staar");
          // console.log(stars);
          // for (let i = 0; i < courseMark; i++) {
          //   stars[i].classList.add("filled");
          // }
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
    <div id="rating-value" value="">Mark: 0</div>
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
