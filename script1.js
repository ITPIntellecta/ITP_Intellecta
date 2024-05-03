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

  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const firstname = document.getElementById("firstname");
  const lastname = document.getElementById("lastname");
  const title = document.getElementById("title");
  const usertypes = document.getElementsByName("type");
  const date = document.getElementById("dateofbirth");

  for (let i = 0; i < usertypes.length; i++) {
    if (usertypes[i].checked) var type = usertypes[i].value;
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

/*
function regUser() {
  // Prikupi podatke iz formulara
  var formData = new FormData(document.querySelector("form"));

  // Napravi Fetch POST zahtev ka serveru
  fetch("/Account/Register", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      // Obradi odgovor sa servera
      if (response.ok) {
        // Uspesno obradjen zahtev
        // Mozes izvrsiti neku akciju kao sto je redirekcija
      } else {
        // U slucaju greske
        console.error("Error:", response);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
    
}*/
