//adapted from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color

let colorWell;

window.addEventListener('load', () => {
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
	colorWell.addEventListener("input", updateFirst, false);
	colorWell.addEventListener("change", updateAll, false); // triggered when color picker changes

	colorWell.select();
}

// changes first paragraph with class "changeColor" to color of color picker
function updateFirst(event) {
	let p = document.querySelector(".changeColor");

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
				x = accButton.getAttribute("aria-expanded");
				x = "false"
				accButton.setAttribute("aria-expanded", x);
			});
		}
	});
}

function calc() {
	let inputX = document.querySelector("#inputX").value;
	inputX = parseFloat(inputX);
	let inputY = document.querySelector("#inputY").value;
	inputY = parseFloat(inputY);
	let operation = document.querySelector('#arithoper option:checked').value;
	let round = document.querySelector("#range").value;
	round = parseInt(round);
	console.log("X is " + inputX);
	console.log("Y is " + inputY);
	console.log("Arithmetic is " + operation);
	console.log("Rounding to " + round + " digits");
	let test = errorCheck(inputX,inputY,operation);
	if (test === undefined) {
		alert("Aborting");
		return;
	}
	calcResult(inputX,inputY,operation, round);
}

function errorCheck(x,y,operation) {
	if ( (x === 0) && (y === 0) ) {
		alert("Both fields must contain values!");
		return undefined;
	}
	if ( (y === 0) && (operation === 'divide') ) {
		alert("Cannot divide through zero!");
		return undefined;
	}
	if ( (x < Number.MIN_SAFE_INTEGER) || (x > Number.MAX_SAFE_INTEGER) || (y < Number.MIN_SAFE_INTEGER) || (y > Number.MAX_SAFE_INTEGER) ) {
		alert("The given numbers are too big to calculate with!");
		return undefined;
	}
	if ( ((x*y < Number.MIN_SAFE_INTEGER) || (x*y > Number.MAX_SAFE_INTEGER)) && (operation === 'multiply') ) {
		alert("Numbers are too big. Cannot multiply.");
		return undefined;
	}
	if ( ((x/y < Number.MIN_SAFE_INTEGER) || (x/y > Number.MAX_SAFE_INTEGER)) && (operation === 'multiply') ) {
		alert("Numbers are too big. Cannot divide.");
		return undefined;
	}
	return x,y;
}

function calcResult(x,y,operation,round) {
	round = round - 1;
	let result;
	switch (operation) {
		case "add":
			result = x + y;
			result = +(result).toPrecision(round); // used https://stackoverflow.com/a/43351469/
			console.log(x + " plus " + y + " is " + result);
			break;
		case "subtract":
			result = x - y;
			result = +(result).toPrecision(round);
			console.log(x + " minus " + y + " is " + result);
			break;
		case "multiply":
			result = x * y;
			result = +(result).toPrecision(round);
			console.log(x + " multiplied by " + y + " is " + result);
			break;
		case "divide":
			result = x / y;
			result = +(result).toPrecision(round);
			console.log(x + " divided by " + y + " is " + result);
			break;
		case "squareRoot":
			result = Math.sqrt(x);
			result = +(result).toPrecision(round);
			console.log("The square root of " + x + " is " + result);
	}
}