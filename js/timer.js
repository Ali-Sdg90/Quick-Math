const sideTimer = document.querySelector(".timer-side span");
const gameTimer = document.querySelector(".timer-game span");
const sideSaves = [];

let startTime;
let elapsedTime = 0;
let timerInterval;

function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(updateElapsedTime, 100);
}

function delayTimer(round) {
    sideSaves.push((elapsedTime / 1000).toFixed(1) + " s");
    console.log(round);
    console.log(sideSaves);
    console.log("--------------");
    clearInterval(timerInterval);

    const pausedTime = elapsedTime;
    setTimeout(() => {
        startTime = new Date() - pausedTime;
        timerInterval = setInterval(updateElapsedTime, 100);
    }, 700);
}

function updateElapsedTime() {
    elapsedTime = new Date() - startTime;
    gameTimer.textContent = (elapsedTime / 1000).toFixed(1) + " s";
}

function getElapsedTime() {
    return elapsedTime;
}

export { startTimer, delayTimer, getElapsedTime };
