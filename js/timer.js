const sideTimer = document.querySelector(".timer-side span");
const gameTimer = document.querySelector(".timer-game span");
const sideSaves = ["0", "0", "0"];
let sideSavesSum = 0; //make it array and store each side timer

let startTime = 0;
let elapsedTime = 0;
let timerInterval;

function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(updateElapsedTime, 100);
}

function delayTimer(round) {
    // sideSaves.push((elapsedTime / 1000).toFixed(1) + " s");
    // sideSaves.push(elapsedTime);
    sideSaves[round] = elapsedTime;
    sideSavesSum += Number(elapsedTime);
    // console.log(round);
    console.log(sideSaves);
    console.log("=>", sideSavesSum);

    clearInterval(timerInterval);

    const pausedTime = elapsedTime;
    setTimeout(() => {
        startTime = new Date() - pausedTime;
        timerInterval = setInterval(updateElapsedTime, 100);
    }, 700);

    console.log("--------------");
}

function updateElapsedTime() {
    elapsedTime = new Date() - startTime;
    gameTimer.textContent = (elapsedTime / 1000).toFixed(1) + " s";

    sideTimer.textContent =
        ((elapsedTime - sideSavesSum) / 1000).toFixed(1) + " s";
}

export { startTimer, delayTimer };
