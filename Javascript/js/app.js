const keyData = [
  {
    value: "sqrt",
    symbol: "√",
    formula: "Math.sqrt",
    type: "math",
  },
  {
    value: "sqr",
    symbol: "^(2)",
    formula: "POWER_2",
    type: "math",
  },
  {
    value: "frac",
    symbol: "1÷",
    formula: "1/",
    type: "math",
  },
  {
    value: "abs",
    symbol: "abs",
    formula: "Math.abs",
    type: "math",
  },
  {
    value: "floor",
    symbol: "floor",
    formula: "Math.floor",
    type: "math",
  },
  {
    value: "ceil",
    symbol: "ceil",
    formula: "Math.ceil",
    type: "math",
  },
  {
    value: "mod",
    symbol: "mod",
    formula: "%",
    type: "math",
  },
  {
    value: "(",
    symbol: "(",
    formula: "(",
    type: "number",
  },
  {
    value: ")",
    symbol: ")",
    formula: ")",
    type: "number",
  },
  {
    value: "clear",
    symbol: "C",
    formula: false,
    type: "key",
  },
  {
    value: "delete",
    symbol: "⌫",
    formula: false,
    type: "key",
  },
  {
    value: "pi",
    symbol: "π",
    formula: "Math.PI",
    type: "number",
  },
  {
    value: "cos",
    symbol: "cos",
    formula: "trigo(Math.cos,",
    type: "trigo",
  },
  {
    value: "sin",
    symbol: "sin",
    formula: "trigo(Math.sin,",
    type: "trigo",
  },
  {
    value: "tan",
    symbol: "tan",
    formula: "trigo(Math.tan,",
    type: "trigo",
  },
  {
    value: "7",
    symbol: 7,
    formula: 7,
    type: "number",
  },
  {
    value: "8",
    symbol: 8,
    formula: 8,
    type: "number",
  },
  {
    value: "9",
    symbol: 9,
    formula: 9,
    type: "number",
  },
  {
    value: "division",
    symbol: "÷",
    formula: "/",
    type: "operator",
  },
  {
    value: "e",
    symbol: "e",
    formula: "Math.E",
    type: "number",
  },
  {
    value: "acos",
    symbol: "acos",
    formula: "inv_trigo(Math.acos,",
    type: "trigo",
  },
  {
    value: "asin",
    symbol: "asin",
    formula: "inv_trigo(Math.asin,",
    type: "trigo",
  },
  {
    value: "atan",
    symbol: "atan",
    formula: "inv_trigo(Math.atan,",
    type: "trigo",
  },
  {
    value: "4",
    symbol: 4,
    formula: 4,
    type: "number",
  },
  {
    value: "5",
    symbol: 5,
    formula: 5,
    type: "number",
  },
  {
    value: "6",
    symbol: 6,
    formula: 6,
    type: "number",
  },
  {
    value: "multi",
    symbol: "×",
    formula: "*",
    type: "operator",
  },
  {
    value: "fact",
    symbol: "!",
    formula: "FACTORIAL",
    type: "math",
  },
  {
    value: "exp",
    symbol: "exp",
    formula: "Math.exp",
    type: "math",
  },
  {
    value: "ln",
    symbol: "ln",
    formula: "Math.log",
    type: "math",
  },
  {
    value: "log",
    symbol: "log",
    formula: "Math.log10",
    type: "math",
  },
  {
    value: "1",
    symbol: 1,
    formula: 1,
    type: "number",
  },
  {
    value: "2",
    symbol: 2,
    formula: 2,
    type: "number",
  },
  {
    value: "3",
    symbol: 3,
    formula: 3,
    type: "number",
  },
  {
    value: "sub",
    symbol: "–",
    formula: "-",
    type: "operator",
  },
  {
    value: "power",
    symbol: "^(",
    formula: "POWER",
    type: "math",
  },
  {
    value: "dot",
    symbol: ".",
    formula: ".",
    type: "number",
  },
  {
    value: "0",
    symbol: 0,
    formula: 0,
    type: "number",
  },
  {
    value: "equal",
    symbol: "=",
    formula: "=",
    type: "calculate",
  },
  {
    value: "add",
    symbol: "+",
    formula: "+",
    type: "operator",
  },
  {
    value: "mc",
    symbol: "",
    formula: "",
    type: "memory",
  },
  {
    value: "mr",
    symbol: "",
    formula: "",
    type: "memory",
  },
  {
    value: "m+",
    symbol: "",
    formula: "",
    type: "memory",
  },
  {
    value: "m-",
    symbol: "",
    formula: "",
    type: "memory",
  },
  {
    value: "ms",
    symbol: "",
    formula: "",
    type: "memory",
  },
];

const OPERATORS = ["+", "-", "/", "*"];

let data = {
  operation: [],
  formula: [],
};

// calculators buttons
const inputKeys = document.querySelectorAll(".calc_btn");
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

class Display {
  // Display input
  static input(operation) {
    let inputBox = document.querySelector(".history .upper_value");
    inputBox.innerHTML = operation;
  }

  // Display Output
  static output(result) {
    let outputBox = document.querySelector(".output .lower_value");
    outputBox.innerHTML = result;
    data.output = result;
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
      console.log(POWER_2_SEARCH_RESULT);
      const POWER_2_BASES = Extractor.powerBase(
        data.formula,
        POWER_2_SEARCH_RESULT
      );
      POWER_2_BASES.forEach((base) => {
        let toReplace = base + "POWER_2";
        let replacement = "Math.pow(" + base + ",2)";

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
