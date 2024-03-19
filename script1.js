function changeLabelColor(val) {
  let labels = document.querySelectorAll(".labela");

  labels.forEach(function (label) {
    if (label.getAttribute("for") === val) {
      let radio = document.getElementById(val);

      if (radio.checked) {
        label.style.backgroundColor = "lightpink";
        label.style.color = "#904159";
      } else {
        label.style.backgroundColor = "#904159";
        label.style.color = "lightpink";
      }
    } else {
      label.style.backgroundColor = "#904159";
      label.style.color = "lightpink";
    }
  });
}
