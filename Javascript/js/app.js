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
