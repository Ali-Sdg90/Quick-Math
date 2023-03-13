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
    sideTimer.textContent = (elapsedTime / 1000).toFixed(1) + " s";

    gameTimer.textContent =
        ((elapsedTime + sideSavesSum) / 1000).toFixed(1) + " s";
}

function delayTimer(round) {
    sideSaves[round] = new Date() - startTime;
    sideSavesSum += sideSaves[round];

    // console.log(sideSaves);

    clearInterval(timerInterval);
    setTimeout(() => {
        startTime = new Date();
        timerInterval = setInterval(updateElapsedTime, 100);
    }, 700);
}

export { startTimer, delayTimer, sideSaves, sideSavesSum };
