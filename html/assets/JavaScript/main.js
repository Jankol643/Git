//adapted from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color

var colorWell;
var defaultColor = "#0000ff";

window.addEventListener('load', (event) => {
    console.log('The page has fully loaded');
	startup();
	
});

function startup() {
	console.log("This comes from startup!");
	console.log("Calling colorPicker()");
	colorPicker();
}

function colorPicker() {
	colorWell = document.querySelector("#colorWell");
	console.log(colorWell);
	colorWell.value = defaultColor;
	colorWell.addEventListener("input", updateFirst, false);
	colorWell.addEventListener("change", updateAll, false); // triggered when color picker changes

	colorWell.select();
}

// changes first paragraph with class "changeColor" to color picker color
function updateFirst(event) {
  var p = document.querySelector(".changeColor");

  if (p) {
    p.style.color = event.target.value;
  }
}

// changes all paragraphs with class "changeColor" to color picker color
function updateAll(event) {
  document.querySelectorAll(".changeColor").forEach(function(p) {
    p.style.color = event.target.value;
  });
}

function resetAll() {
  document.querySelectorAll(".changeColor").forEach(function(p) {
    p.style.color = black; //black
  });
}

