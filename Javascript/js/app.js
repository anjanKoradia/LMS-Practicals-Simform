let keyData;

var xhr = new XMLHttpRequest();
xhr.onload = function () {
  keyData = JSON.parse(this.responseText);
};
xhr.open("GET", "../data/keys.json", false);
xhr.send();

const OPERATORS = ["+", "-", "/", "*"];
let data = {
  operation: [],
  formula: [],
};

// calculators buttons
const inputKeys = document.getElementsByClassName("calc_btn");

for (let key of inputKeys) {
  key.addEventListener("click", (e) => {
    let target_btn = e.target;

    keyData.forEach((btn) => {
      if (btn.value == target_btn.value) {
        calculate(btn);
      }
    });
  });
}

// Angle config
let deg_rad_btn = document.querySelector(".deg_rad");
let RADIAN = true;
deg_rad_btn.addEventListener("click", (e) => {
  if (e.target.value == "rad") {
    deg_rad_btn.innerText = "DEG";
    e.target.value = "deg";
    RADIAN = false;
  } else {
    deg_rad_btn.innerText = "RAD";
    e.target.value = "rad";
    RADIAN = true;
  }
});

// Trigonometric function
function trigo(formula, angle) {
  if (!RADIAN) {
    angle = (angle * Math.PI) / 180;
  }
  return formula(angle);
}
function inv_trigo(formula, angle) {
  angle = formula(angle);
  if (!RADIAN) {
    angle = (angle * 180) / Math.PI;
  }
  return angle;
}

// use to search given keyword in array
function search(array, keyword) {
  let searchResult = [];

  array.forEach((ele, index) => {
    if (ele == keyword) searchResult.push(index);
  });

  return searchResult;
}

// factorial
function factorial(number) {
  if (number == 0 || number == 1) {
    return 1;
  } else {
    return number * factorial(number - 1);
  }
}

class Display {
  // Display input
  static input(operation) {
    let inputBox = document.querySelector(".history .upper_value");
    // inputBox.value = operation;
    inputBox.innerText = operation;
  }

  // Display Output
  static output(result) {
    let outputBox = document.querySelector(".output .lower_value");
    outputBox.innerHTML = result;
  }
}

class Extractor {
  // power base extractor
  static powerBase(formula, POWER_SEARCH_RESULT) {
    let powerBase = []; // save all bases

    POWER_SEARCH_RESULT.forEach((index) => {
      let base = []; // save current bases
      let count = 0; // parenthesis counter
      let prevIndex = index - 1;

      while (prevIndex >= 0) {
        if (formula[prevIndex] == "(") count--;
        if (formula[prevIndex] == ")") count++;

        let isOperator = false;
        OPERATORS.forEach((operator) => {
          if (formula[prevIndex] == operator) isOperator = true;
        });

        let isPower =
          formula[prevIndex] == "POWER" || formula[prevIndex] == "POWER_2";

        if ((isOperator && count == 0) || isPower) break;

        base.unshift(formula[prevIndex]);
        prevIndex--;
      }
      powerBase.push(base.join(""));
    });
    return powerBase;
  }

  // factorial number extractor
  static factNumber(formula, FACTORIAL_SEARCH_RESULT) {
    let numbers = []; // save all numbers

    FACTORIAL_SEARCH_RESULT.forEach((index) => {
      let number = []; // save current index

      let count = 0; // parenthesis counter
      let prevIndex = index - 1;

      while (prevIndex >= 0) {
        if (formula[prevIndex] == "(") count--;
        if (formula[prevIndex] == ")") count++;

        let isOperator = false;
        OPERATORS.forEach((operator) => {
          if (formula[prevIndex] == operator) isOperator = true;
        });

        if (isOperator && count == 0) break;

        number.unshift(formula[prevIndex]);
        prevIndex--;
      }
      numbers.push(number.join(""));
    });
    return numbers;
  }
}

// Perform all calculations
function calculate(btn) {
  switch (btn.type) {
    case "operator":
      data.operation.push(btn.symbol);
      data.formula.push(btn.formula);
      break;

    case "number":
      data.operation.push(btn.symbol);
      data.formula.push(btn.formula);
      break;

    case "trigo":
      data.operation.push(btn.symbol + "(");
      data.formula.push(btn.formula);
      break;

    case "math":
      let symbol, formula;

      if (
        btn.value == "sqr" ||
        btn.value == "fact" ||
        btn.value == "power" ||
        btn.value == "mod"
      ) {
        symbol = btn.symbol;
        formula = btn.formula;
      } else {
        symbol = btn.symbol + "(";
        formula = btn.formula + "(";
      }

      data.operation.push(symbol);
      data.formula.push(formula);
      break;

    case "key":
      if (btn.value == "clear") {
        data.operation = [];
        data.formula = [];
        Display.output(0);
      } else if (btn.value == "delete") {
        data.operation.pop();
        data.formula.pop();
      }
      break;

    case "memory":
      let memory = localStorage.getItem("calculator-memory");

      if (btn.value == "ms") {
        let result = Number(eval(data.formula.join("")));
        localStorage.setItem("calculator-memory", result);
        data.operation = [];
        data.formula = [];
        Display.input(0);
        Display.output(result);
      } else if (btn.value == "m+") {
        let result = Number(eval(data.formula.join(""))) + Number(memory);
        localStorage.setItem("calculator-memory", result);
        data.operation = [];
        data.formula = [];
        Display.input(0);
        Display.output(result);
      } else if (btn.value == "m-") {
        let result = Number(memory) - Number(eval(data.formula.join("")));
        localStorage.setItem("calculator-memory", result);
        data.operation = [];
        data.formula = [];
        Display.input(0);
        Display.output(result);
      } else if (btn.value == "mr") {
        data.formula.push(memory);
        data.operation.push(memory);
      } else if (btn.value == "mc") {
        localStorage.setItem("calculator-memory", 0);
      }
      break;

    case "calculate":
      let formula_str = data.formula.join("");

      // For power x^y
      let POWER_SEARCH_RESULT = search(data.formula, "POWER");
      const POWER_BASES = Extractor.powerBase(
        data.formula,
        POWER_SEARCH_RESULT
      );
      POWER_BASES.forEach((base) => {
        let toReplace = base + "POWER";
        let replacement = "Math.pow(" + base + ",";

        formula_str = formula_str.replace(toReplace, replacement);
      });

      // For power X^2
      let POWER_2_SEARCH_RESULT = search(data.formula, "POWER_2");
      const POWER_2_BASES = Extractor.powerBase(
        data.formula,
        POWER_2_SEARCH_RESULT
      );
      POWER_2_BASES.forEach((base) => {
        let toReplace = base + "POWER_2";
        let replacement = "Math.pow(" + base + ",2)";

        formula_str = formula_str.replace(toReplace, replacement);
      });

      // For factorial
      let FACTORIAL_SEARCH_RESULT = search(data.formula, "FACTORIAL");
      const NUMBERS = Extractor.factNumber(
        data.formula,
        FACTORIAL_SEARCH_RESULT
      );
      NUMBERS.forEach((number) => {
        let toReplace = number + "FACTORIAL";
        let replacement = "factorial(" + number + ")";

        formula_str = formula_str.replace(toReplace, replacement);
      });

      // calculate result
      let result;
      try {
        result = eval(formula_str);
      } catch (error) {
        if (error instanceof SyntaxError) {
          result = "Syntax Error";
          Display.output(result);
          return;
        }
      }
      Display.output(result);
      break;

    default:
      break;
  }

  Display.input(data.operation.join(""));
}

// Dark Mode
let checkbox = document.querySelector('input[name="theme"]');
checkbox.addEventListener("change", function () {
  if (this.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
});

// Set Current Time in mobile notch
setInterval(function () {
  var currentTime = new Date().toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
  document.querySelector(".time").innerHTML = currentTime;
}, 1000);
