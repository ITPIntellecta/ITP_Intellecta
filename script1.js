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

function logUser(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = {
    email: email,
    password: password,
  };

  fetch(uri, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      response.json();
      console.log(response);
    })
    .then((data) => {
      // Čuvanje JWT tokena u lokalnom skladištu (LocalStorage)
      //localStorage.setItem("jwtToken", data.token);
      //alert("Uspjesno");
      window.location = "index.html";
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
  // const type = document.querySelector('input[type="radio"]:checked').value;
  const date = document.getElementById("dateofbirth").value;

  const radioButtons = document.querySelectorAll(
    'input[type="radio"][name="type"]'
  );

  let selectedType = null;

  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      selectedType = radioButton.value;
    }
  });
  let type = "";

  if (selectedType == 1) {
    type = "Admin";
  } else if (selectedType == 0) type = "User";

  console.log(type);
  //console.log(email, password, firstname, lastname, title, selectedType, date);

  const user = {
    email: email,
    password: password,
    type: type,
    firstname: firstname,
    lastname: lastname,
    dateofbirth: date,
    title: title,
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
        window.location = "log.html";
      })
      .catch((error) => console.error("Unable to register user.", error));
  } else {
    alert("Popuni sva polja");
    event.preventDefault();
  }
}
