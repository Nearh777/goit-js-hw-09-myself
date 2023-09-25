import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const date = document.querySelector('#datetime-picker');
const btn = document.querySelector('[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const min = document.querySelector('[data-minutes]');
const sec = document.querySelector('[data-seconds]');
const spans = document.querySelectorAll('.value');

let timerId = null;
btn.disabled = true;

flatpickr(date, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {

    if (selectedDates[0] <= Date.now()) {
      Notify.failure('Please choose a date in the future');

    } else {
      btn.disabled = false;
      Notify.success('Let`s go?');
      
      const startTime = selectedDates[0];

      btn.addEventListener('click', () => {
        timerId = setInterval(() => {
          const currentTime = Date.now();
          const deltaTime = startTime - currentTime;
          const { days, hours, minutes, seconds } = convertMs(deltaTime);

          updateClockface({ days, hours, minutes, seconds } );

          if (deltaTime < 1000) {
            clearInterval(timerId);
            date.disabled = false;
          }
        }, 1000);
      });
    }
  },
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockface({ days, hours, minutes, seconds }) {
          day.textContent = days;
          hour.textContent = hours;
          min.textContent = minutes;
          sec.textContent = seconds;
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
