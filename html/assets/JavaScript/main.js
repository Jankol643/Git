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
  document.querySelectorAll(".changeColor").forEach(function (p) {
    p.style.color = event.target.value;
  });
}

// Reset color of paragraphs to black
function resetAll() {
  document.querySelectorAll(".changeColor").forEach(function (p) {
    p.style.color = "rgb(0,0,0)";
  });
}

function expColBtn() {
  let btn = document.getElementById("expColBtn");
  expandCollapse(btn);
}

//Accordeon button open/collapse all
function expandCollapse(btn) {
  document.querySelectorAll(".accordion-collapse").forEach(function (collapse) {
    if (collapse.classList.contains('show')) { /* Accordion tab is open*/
      btn.innerHTML = "Close Accordion";
      collapse.classList.remove('show'); /* remove class "show" */
      /*Setting properties for open/close button*/
      document.querySelectorAll(".accordion-button").forEach(function (accButton) {
        accButton.classList.add('collapsed');
        /* Set aria-expanded to false */
        let x = accButton.getAttribute("aria-expanded");
        x = "true"
        accButton.setAttribute("aria-expanded", x);
      });
    } else { /* Accordion tab is closed*/
      btn.innerHTML = "Open Accordion";
      collapse.classList.add('show'); /* add class "show" */
      /*Setting properties for open/close button*/
      document.querySelectorAll(".accordion-button").forEach(function (accButton) {
        accButton.classList.remove('collapsed');
        /* Set aria-expanded to true */
        x = accButton.getAttribute("aria-expanded");
        x = "false"
        accButton.setAttribute("aria-expanded", x);
      });
    }
  });
}

function initCalc() {
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
  let test = errorCheck(inputX, inputY, operation);
  if (test === undefined) {
    alert("Aborting");
    return;
  }
  calcResult(inputX, inputY, operation, round);
}

function errorCheck(x, y, operation) {
  if ((x === 0) && (y === 0)) {
    alert("Both fields must contain values!");
    return undefined;
  }
  if ((y === 0) && (operation === 'divide')) {
    alert("Cannot divide through zero!");
    return undefined;
  }
  if ((x < Number.MIN_SAFE_INTEGER) || (x > Number.MAX_SAFE_INTEGER) || (y < Number.MIN_SAFE_INTEGER) || (y > Number.MAX_SAFE_INTEGER)) {
    alert("The given numbers are too big to calculate with!");
    return undefined;
  }
  if (((x * y < Number.MIN_SAFE_INTEGER) || (x * y > Number.MAX_SAFE_INTEGER)) && (operation === 'multiply')) {
    alert("Numbers are too big. Cannot multiply.");
    return undefined;
  }
  if (((x / y < Number.MIN_SAFE_INTEGER) || (x / y > Number.MAX_SAFE_INTEGER)) && (operation === 'multiply')) {
    alert("Numbers are too big. Cannot divide.");
    return undefined;
  }
  return x, y;
}

function calcResult(x, y, operation, round) {
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
      break;
    case "sinus":
      result = Math.sin(x);
      result = +(result).toPrecision(round);
      console.log("The sinus of " + x + " is " + result);
      break;
    case "cosinus":
      result = Math.cos(x);
      result = +(result).toPrecision(round);
      console.log("The cosinus of " + x + " is " + result);
      break;
  }
}

function initGenerateRandom() {
  let rangeFrom = document.getElementById("rangeFrom").value;
  rangeFrom = parseInt(rangeFrom);
  let rangeTo = document.getElementById("rangeTo").value;
  rangeTo = parseInt(rangeTo);
  let quantity = document.getElementById("quantity").value;
  quantity = parseInt(quantity);
  
  let randomNumbers = generateRandom(rangeFrom, rangeTo, quantity);
  console.log(randomNumbers);
  alert(randomNumbers);
}

/**
 * Generates an array filled with random numbers
 * @param rangeFrom minimum random number
 * @param rangeTo maximum random number
 * @param quantity how many numbers to generate
 * @return {any[]} array with random numbers
 */
function generateRandom(rangeFrom, rangeTo, quantity) {
  let randomNumbers = new Array(quantity);
  for (let i = 0; i < quantity; i++) {
    randomNumbers[i] = getRandomInt(rangeFrom, rangeTo);
  }
  return randomNumbers;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 * @param min minimum of random number range
 * @param max maximum of random number range
 * @return random integer between specified values
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Copies the input of the text field to the clipboard
 */
function copyToClipboard() {
  async function copy() {
    let value = document.getElementById("inputToCopy").value;
    let copyText = await navigator.clipboard.writeText(value);
  }
  
  document.getElementById("copyBtn").addEventListener("click", copy);
}

function pasteFromClipboard() {
  async function paste() {
    let textAreaPaste = document.getElementById("textAreaPaste");
    let text = await navigator.clipboard.readText();
    textAreaPaste.value += text;
  }
  
  document.getElementById("pasteBtn").addEventListener("click", paste);
}

/**
 * Create and append canvas for balls to window
 * @type {{width: number, initialize: canvas.initialize, element: HTMLElement, height: number}}
 */
let canvas = {
  element: document.getElementById('canvas'),
  width: 800, //600,
  height: 600,//400,
  initialize: function () {
    this.element.style.width = this.width + 'px';
    this.element.style.height = this.height + 'px';
    
    document.body.appendChild(this.element);
  }
};

let colors = [];
n = 50;
generateRandomColors(n);

/**
 * Generates n random colors and adds them to the color array
 * @param n number of colors to generate
 */
function generateRandomColors(n) {
  for (let i = 0; i < n; i++) {
    let c = getRandomColor();
    colors.push(c);
  }
  
  /**
   * Generates a random hexadecimal color string
   * @return {string} hexadecimal color string
   */
  function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
console.log(colors);

for (let i = 0; i < 50; i++) {
  console.log(typeof colors[i]);
}

/**
 * Create and change direction of ball
 * @type {{changeDirectionIfNecessary: Ball.changeDirectionIfNecessary, create: (function(*, *, *): Ball), draw: Ball.draw, moveTo: Ball.moveTo}}
 */
let Ball = {
  /**
   * Creates a ball
   * @param color color of ball
   * @param dx
   * @param dy
   * @return {Ball} Ball to display on canvas
   */
  create: function (color, dx, dy) {
    let newBall = Object.create(this);
    newBall.dx = dx;
    newBall.dy = dy;
    newBall.width = 40;
    newBall.height = 40;
    newBall.element = document.createElement('div');
    newBall.element.style.backgroundColor = color;
    newBall.element.style.width = newBall.width + 'px';
    newBall.element.style.height = newBall.height + 'px';
    newBall.element.className += 'ball';
    newBall.width = parseInt(newBall.element.style.width);
    newBall.height = parseInt(newBall.element.style.height);
    canvas.element.appendChild(newBall.element);
    return newBall;
  },
  /**
   * Moves the ball to the coordinates in pixels
   * @param x x-Coordinate to move to
   * @param y y-Coordinate to move to
   */
  moveTo: function (x, y) {
    this.element.style.left = x + 'px';
    this.element.style.top = y + 'px';
  },
  /**
   * Changes the direction of the ball if it is on the border of the canvas
   * @param x x-coordinate of ball
   * @param y y-coordinate of ball
   */
  changeDirectionIfNecessary: function (x, y) {
    if (x < 0 || x > canvas.width - this.width) { //left and right border
      this.dx = -this.dx;
    }
    if (y < 0 || y > canvas.height - this.height) { //top and bottom border
      this.dy = -this.dy;
    }
  },
  draw: function (x, y) {
    this.moveTo(x, y);
    let ball = this;
    setTimeout(function () {
      ball.changeDirectionIfNecessary(x, y);
      ball.draw(x + ball.dx, y + ball.dy);
    }, 1000 / 60);
  }
};

/**
 * Creates a new ball on click
 */
canvas.element.addEventListener('click', function (e) {
  let xCoordinate = e.x - (window.innerWidth - canvas.width) / 2;
  let yCoordinate = e.y - (window.innerHeight - canvas.height) / 2;
  let randomNumber = getRandomInt(0,50);
  let selectedColor = colors[randomNumber];
  Ball.create(selectedColor, 4, 3).draw(xCoordinate, yCoordinate);
});

canvas.initialize();
