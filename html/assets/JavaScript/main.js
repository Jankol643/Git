var colorWell;
var defaultColor = "#0000ff";

window.addEventListener("load", startup, false);

function startup() {
	colorPicker();
}

function colorPicker() {
	colorWell = document.querySelector("#colorWell");
	colorWell.value = defaultColor;
	colorWell.addEventListener("input", updateFirst, false);
	colorWell.addEventListener("change", updateAll, false);
	colorWell.select();
}

function updateFirst(event) {
  var p = document.querySelector(".changeColor");

  if (p) {
    p.style.color = event.target.value;
  }
}

function updateAll(event) {
  document.querySelectorAll(".changeColor").forEach(function(p) {
    p.style.color = event.target.value;
  });
}