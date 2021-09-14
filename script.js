const lights = document.querySelectorAll('.light');
const action = document.querySelector('.action');
const label = document.querySelector('.label');
var delay;
var isStarting = false;
var isAwaiting = false;
var isBreaking = false;
var startTime;
var reactionTime;
var lightsTime;
var breakingTime;

const end = (startTime) => {
  var endTime = new Date().getTime();
  reactionTime = endTime - startTime;
  label.innerHTML = `Your reaction time is ${reactionTime} milliseconds!<br>Click to start again.`;
  isAwaiting = false;
  return;
};

const falseStart = () => {
  label.innerHTML = 'False start!<br>Wait for a few seconds to try again.';
  lights.forEach((light) => {
    light.style.setProperty('--current-color', '#777');
  });
  isStarting = false;
  isAwaiting = false;
  isBreaking = true;
  breakingTime = delay - new Date().getTime() + lightsTime;
  setTimeout(() => {
    isBreaking = false;
    label.innerHTML = 'Click here to start countdown!';
  }, breakingTime);
};

const start = () => {
  isStarting = true;
  lightsTime = new Date().getTime();
  label.innerHTML = 'Click when the lights go out!';
  lights.forEach((light, index) => {
    setTimeout(() => {
      if (!isStarting || isBreaking) return;
      light.style.setProperty('--current-color', '#d6281d');
    }, (index + 1) * 1000);
  });
  delay = Math.floor(Math.random() * 3000 + 5800);
  console.log('delay before out:', delay - 5000);
  setTimeout(() => {
    if (!isStarting) return;
    lights.forEach((light) => {
      light.style.setProperty('--current-color', '#777');
    });
    startTime = new Date().getTime();
    isStarting = false;
    isAwaiting = true;
    return startTime;
  }, delay);
};

action.addEventListener('click', () => {
  isAwaiting
    ? end(startTime)
    : isStarting
    ? falseStart()
    : isBreaking
    ? ''
    : start();
});
