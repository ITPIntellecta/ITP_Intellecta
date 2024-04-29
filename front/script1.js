const uri = "api/Login";

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
