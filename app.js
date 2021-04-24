const display = document.querySelector(".output");
const mainDisplay = document.querySelector(".main-display");
const prevDisplay = document.querySelector(".previous-display");
const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear-all");
const deleteBtn = document.querySelector(".delete");

let upperNum = "";
let displayNum = "";
let result = null;
let lastOp = "";
let decimal = false;

//DECIMAL 
numbers.forEach(number => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !decimal) {
      decimal = true;
    } else if (e.target.innerText === "." && decimal) {
      return;
    }
    displayNum += e.target.innerText;
    mainDisplay.innerText = displayNum;
  })
});


// FUNCTIONS 

operators.forEach(operator => {
  operator.addEventListener("click", (e) => {
    if (!displayNum) return;
    decimal = false;
    const operatorType = e.target.innerText;
    if (upperNum && displayNum && lastOp) {
      operate();
    } else {
      result = parseFloat(displayNum);
      result = result.toFixed(3);
      
    }
    clearDisplay(operatorType);
    lastOp = operatorType;
    })
});

function clearDisplay(name = "") {
  upperNum += `${displayNum} ${name}`;
  prevDisplay.innerText = upperNum;
  mainDisplay.innerText = "";
  displayNum = "";
}

function operate() {
  if (lastOp === "x") {
    result = parseFloat(result) * parseFloat(displayNum);
    result = result.toFixed(3);
  } else if (lastOp === "+") {
    result = parseFloat(result) + parseFloat(displayNum);
  } else if (lastOp === "-") {
    result = parseFloat(result) - parseFloat(displayNum);
  } else if (lastOp === "/") {
    result = parseFloat(result) / parseFloat(displayNum);
    result = result.toFixed(3);
  } 
}

//BUTTONS - EVENT LISTENERS

equalBtn.addEventListener("click", (e)=>{
  if(!displayNum || !upperNum) return;
  decimal = false;
  operate();
  clearDisplay();
  mainDisplay.innerText = result;
  prevDisplay.innerText = "";
  displayNum = result;
  upperNum = "";
})
  
clearBtn.addEventListener("click", (e)=>{
  location.reload(); 
})

deleteBtn.addEventListener("click", (e)=>{
  if(displayNum > 0){
  displayNum = displayNum.substring(0, displayNum.length -1);
  mainDisplay.innerText = displayNum;
}
});
