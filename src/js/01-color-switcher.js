const startButton = document.querySelector("[data-start]");
const stopButton = document.querySelector("[data-stop]");

let timerId = null;

startButton.addEventListener("click", onStartButtonClick);
stopButton.addEventListener("click", onStopButtonClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartButtonClick() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
  startButton.setAttribute("disabled", "");
}

function onStopButtonClick() {
  clearInterval(timerId);
  startButton.removeAttribute("disabled");
}
