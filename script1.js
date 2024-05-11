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
        // console.log(data);
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
              <div class="card" style="margin-bottom:2rem";>
                <div class="card-body">
                  <h5 class="card-title">${name}</h5>
                  <p class="card-text">
                  ${email}
                  </p>
                  <a href="#" class="btn btn-primary" onclick="authorizeAdmin(${userId})">Authorize</a>
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
