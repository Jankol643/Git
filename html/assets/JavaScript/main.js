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

// changes first paragraph with class "changeColor" to color of color picker
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

// Reset color of paragraphs to black
function resetAll() {
	document.querySelectorAll(".changeColor").forEach(function(p) {
		p.style.color = "rgb(0,0,0)";
  });
}

function expColBtn() {
    let btn = document.getElementById("expColBtn");
	expandCollapse(btn);
}

//Accordeon button open/collapse all
function expandCollapse(btn) {
	document.querySelectorAll(".accordion-collapse").forEach(function(collapse) {
		if (collapse.classList.contains('show') ) { /* Accordion tab is open*/
			btn.innerHTML = "Close Accordion";
			collapse.classList.remove('show'); /* remove class "show" */
			/*Setting properties for open/close button*/
			document.querySelectorAll(".accordion-button").forEach(function(accButton) {
				accButton.classList.add('collapsed');
				/* Set aria-expanded to false */
				let x = accButton.getAttribute("aria-expanded"); 
				x = "true"
				accButton.setAttribute("aria-expanded", x);
			});
		}
		else { /* Accordion tab is closed*/
			btn.innerHTML = "Open Accordion";
			collapse.classList.add('show'); /* add class "show" */
			/*Setting properties for open/close button*/
			document.querySelectorAll(".accordion-button").forEach(function(accButton) {
				accButton.classList.remove('collapsed');
				/* Set aria-expanded to true */
				let x = accButton.getAttribute("aria-expanded"); 
				x = "false"
				accButton.setAttribute("aria-expanded", x);
			});
		}
	});
}