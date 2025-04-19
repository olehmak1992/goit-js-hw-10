import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minElement = document.querySelector('[data-minutes]');
const secElement = document.querySelector('[data-seconds]');
const button = document.querySelector('[data-start]');

button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
    if (userSelectedDate <= Date.now()) {
      button.disabled = true;
      iziToast.error({ message: 'Please choose a date in the future' });
    } else {
      button.disabled = false;
    }
  },
};

let userSelectedDate;
let intervalId;

flatpickr(input, options);

// Виклик таймера

button.addEventListener('click', startTimer);

function startTimer() {
  input.disabled = true;
  button.disabled = true;

  timerUpdater();
  intervalId = setInterval(timerUpdater, 1000);
}

function timerUpdater() {
  const currentTime = Date.now();
  const time = userSelectedDate - currentTime;

  if (time <= 0) {
    clearInterval(intervalId);
    daysElement.textContent = '00';
    hoursElement.textContent = '00';
    minElement.textContent = '00';
    secElement.textContent = '00';
    button.disabled = false;
    input.disabled = false;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(time);
  daysElement.textContent = pad(days);
  hoursElement.textContent = pad(hours);
  minElement.textContent = pad(minutes);
  secElement.textContent = pad(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
