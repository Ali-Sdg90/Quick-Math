const sideTimer = document.querySelector(".timer-side span");
const gameTimer = document.querySelector(".timer-game span");
const sideSaves = [0, 0, 0];
let sideSavesSum = 0;

let startTime = 0;
let elapsedTime = 0;
let timerInterval;

function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(updateElapsedTime, 100);
}

function updateElapsedTime() {
    elapsedTime = new Date() - startTime;
    sideTimer.textContent = secondConverter(elapsedTime);
    gameTimer.textContent = secondConverter(elapsedTime + sideSavesSum);
}

function secondConverter(second) {
    return (second / 1000).toFixed(1) + " s";
}

function stopIteration() {
    clearInterval(timerInterval);
    sideTimer.textContent = "--";
    gameTimer.textContent = "--";
}

function delayTimer(round) {
    sideSaves[round] = new Date() - startTime;
    sideSavesSum += sideSaves[round];

    clearInterval(timerInterval);
    setTimeout(() => {
        startTime = new Date();
        timerInterval = setInterval(updateElapsedTime, 100);
    }, 700);
}

export {
    startTimer,
    delayTimer,
    stopIteration,
    secondConverter,
    sideSavesSum,
    sideSaves,
};
