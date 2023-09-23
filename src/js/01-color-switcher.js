const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
// }

// stopBtn.setAttribute('disabled', true);

// startBtn.addEventListener('click', onClickBtnStart);

// function onClickBtnStart() {
//      startBtn.setAttribute('disabled', true);
//  stopBtn.removeAttribute('disabled');
//     timerId = setInterval(() => {
//         body.style.backgroundColor = getRandomHexColor();
//     }, 1000)
// }

// stopBtn.addEventListener('click', onClickBtnStop);

// function onClickBtnStop() {
//     stopBtn.setAttribute('disabled', true);
//     startBtn.removeAttribute('disabled');
//     clearInterval(timerId);
// }



stopBtn.setAttribute('disabled', true);

body.addEventListener('click', onClickBtn);

function onClickBtn(e) {
  const clickBtn = e.target;
  if (clickBtn.textContent === 'Start') {
    startBtn.setAttribute('disabled', true);
    stopBtn.removeAttribute('disabled');
    timerId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  } else {
    stopBtn.setAttribute('disabled', true);
    startBtn.removeAttribute('disabled');
    clearInterval(timerId);
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}