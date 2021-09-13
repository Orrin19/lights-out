const lights = document.querySelectorAll('.light');
const action = document.querySelector('.action');
const label = document.querySelector('.label');
var delay;
var isStarting = false;
var isAwaiting = false;
var startTime;
var reactionTime;

const outLights = () => {
  lights.forEach((light) => {
    light.style.setProperty('--current-color', '#777');
  });
  startTime = new Date().getTime();
  isStarting = false;
  isAwaiting = true;
  return startTime;
};

const setResult = (reactionTime) => {
  label.innerHTML = `Your reaction time is ${reactionTime} milliseconds!<br>Click to start again.`;
  isAwaiting = false;
};

const endAwaiting = (startTime) => {
  var endTime = new Date().getTime();
  reactionTime = endTime - startTime;
  return setResult(reactionTime);
};

const falseStart = () => {
  label.innerHTML = 'False start!<br>Click in a few seconds to try again.';
  lights.forEach((light) => {
    light.style.setProperty('--current-color', '#777');
  });
  isStarting = false;
  isAwaiting = false;
};

const start = () => {
  isStarting = true;
  label.innerHTML = 'Click when the lights go out!';
  lights.forEach((light, index) => {
    setTimeout(() => {
      if (!isStarting) return;
      light.style.setProperty('--current-color', '#d6281d');
    }, (index + 1) * 1000);
  });
  var delay = Math.floor(Math.random() * 3000 + 5800);
  console.log('delay before out:', delay - 5000);
  setTimeout(() => {
    if (!isStarting) return;
    outLights(delay);
  }, delay);
};

action.addEventListener('click', () => {
  isAwaiting ? endAwaiting(startTime) : isStarting ? falseStart() : start();
});
