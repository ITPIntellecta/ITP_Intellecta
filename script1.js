const uri = "/api/auth";

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

function logUser() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const user = {
    email: email.value.trim(),
    password: password.value.trim(),
  };

  fetch(uri, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      // Čuvanje JWT tokena u lokalnom skladištu (LocalStorage)
      localStorage.setItem("jwtToken", data.token);
    })
    .catch((error) => console.error("Unable to log user.", error));
}

function regUser(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const title = document.getElementById("title").value;
  const usertypes = document.getElementsByName("type").value;
  const date = document.getElementById("dateofbirth").value;

  for (let i = 0; i < usertypes.length; i++) {
    if (usertypes[i].checked) var type = usertypes[i];
  }

  console.log(email, password, firstname, lastname, title, type, date);

  const user = {
    email: email.value,
    password: password.value,
    type: type,
    firstname: firstname.value,
    lastname: lastname.value,
    dateofbirth: date.value,
    title: title.value,
  };

  fetch(uri, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);

      // Čuvanje JWT tokena u lokalnom skladištu (LocalStorage)
      //localStorage.setItem("jwtToken", data.token);
    })
    .catch((error) => console.error("Unable to log user.", error));
}
