import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  inputDate: document.querySelector("#datetime-picker"),
  startButton: document.querySelector("[data-start]"),
  daysCounter: document.querySelector("[data-days]"),
  hoursCounter: document.querySelector("[data-hours]"),
  minutesCounter: document.querySelector("[data-minutes]"),
  secondsCounter: document.querySelector("[data-seconds]"),
};

let timerId = null;
let selectedDate = null;
refs.startButton.setAttribute("disabled", true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      alert("Please choose a date in the future");
      refs.startButton.setAttribute("disabled", true);
      return;
    }
    selectedDate = selectedDates[0];
    refs.startButton.removeAttribute("disabled");
  },
};

const timer = {
  start() {
    timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedDate - currentTime;
      if (deltaTime < 1000) {
        clearInterval(timerId);
      }
      const timeComponents = convertMs(deltaTime);
      updateCounter(timeComponents);
    }, 1000);
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function updateCounter({ days, hours, minutes, seconds }) {
  refs.daysCounter.textContent = days;
  refs.hoursCounter.textContent = hours;
  refs.minutesCounter.textContent = minutes;
  refs.secondsCounter.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

refs.startButton.addEventListener("click", timer.start.bind(timer));

flatpickr(refs.inputDate, options);
