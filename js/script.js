import { startTimer, delayTimer, getElapsedTime } from "./timer.js";

// setTimeout(() => {
//     console.log(getElapsedTime(), "s1");
// }, 500);

// setTimeout(() => {
//     delayTimer();
// }, 600);

// setTimeout(() => {
//     startTimer();
// }, 1000);

// setTimeout(() => {
//     console.log(getElapsedTime(), "s2");
// }, 1100);

const firstNumbers = document.querySelectorAll(".first-number");
const operations = document.querySelectorAll(".operation");
const secondNumbers = document.querySelectorAll(".second-number");
const inputs = document.querySelectorAll(".input");
const submitBtns = document.querySelectorAll(".submit-btn");
const sideHealthcircles = document.querySelectorAll(".health-bar__blocks");
const main = document.querySelector("main");
const sideHealthLost = [0, 0, 0];

setTimeout(() => {
    setNumbers();
    startTimer();
}, 1000);

function setNumbers() {
    const answer = ["", "", ""];

    for (let round = 0; round < 3; round++) {
        let ransdNum = "0";
        let calcStr = "";
        do {
            ransdNum = 100 - Math.ceil(Math.random() * 200);
        } while (ransdNum === 0);
        calcStr += ransdNum;
        firstNumbers[round].textContent = ransdNum;

        ransdNum = Math.ceil(Math.random() * 4);
        switch (ransdNum) {
            case 1:
                ransdNum = "+";
                break;
            case 2:
                ransdNum = "-";
                break;
            case 3:
                ransdNum = "*";
                break;
            default:
                ransdNum = "/";
                break;
        }
        operations[round].textContent = ransdNum;
        calcStr += ransdNum;

        do {
            ransdNum = 100 - Math.ceil(Math.random() * 200);
        } while (ransdNum === "0");
        calcStr += ransdNum;
        secondNumbers[round].textContent = ransdNum;

        calcStr = calc(calcStr.replace("--", "+"));
        answer[round] = parseInt(calcStr);

        submitBtns[round].addEventListener("click", function () {
            let inputQstn = inputs[round].value;
            // if (!inputs[round].value) {
            //     return;
            // }
            // console.log(inputQstn, answer[round]);
            if (Number(inputQstn) === Number(answer[round])) {
                // console.log("yea!");
                changeSide(round);
            } else {
                // console.log("NOO!");
                wrongAnimation(round);
            }
        });
        console.log(calc(calcStr), answer[round]);
    }
}

function calc(str) {
    const tempFunc = new Function("return " + str);
    return tempFunc();
}

function changeSide(round) {
    console.log("=====================")
    switch (round) {
        case 0:
            main.style.transform = "rotateX(260deg) rotateZ(-179deg)";

            setTimeout(() => {
                main.style.transform = "rotateX(260deg) rotateZ(-170deg)";
                inputs[round + 1].focus();
            }, 700);

            disableEnableInputs(round);
            break;
        case 1:
            main.style.transform =
                "rotateX(181deg) rotateZ(-179deg) rotateY(5deg) translate(0, -200px)";
            setTimeout(() => {
                main.style.transform =
                    "rotateX(185deg) rotateZ(-179deg) rotateY(5deg) translate(0, -200px)";
                inputs[round + 1].focus();
            }, 750);

            disableEnableInputs(round);
            break;
        default:
            endGameWin();
            break;
    }
}

function disableEnableInputs(round) {
    delayTimer(round);
    submitBtns[round].classList.remove("submit-btn-effects");
    submitBtns[round + 1].classList.add("submit-btn-effects");
    submitBtns[round].disabled = true;
    submitBtns[round + 1].disabled = false;
    inputs[round].disabled = true;
    inputs[round + 1].disabled = false;
}

function wrongAnimation(round) {
    inputs[round].classList.add("shake");
    if (sideHealthLost[round] === 2) {
        endGameLose();
    } else {
        sideHealthLost[round]++;
        console.log(sideHealthLost[round]);
        for (let health = 0; health < sideHealthLost[round]; health++) {
            sideHealthcircles[round * 3 + health].classList.add("lost-health");
        }
    }
    inputs[round].addEventListener("animationend", function () {
        inputs[round].value = "";
        inputs[round].classList.remove("shake");
        inputs[round].focus();
    });
}

document.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        submitBtns.forEach(function (submitBtn) {
            submitBtn.dispatchEvent(new Event("click"));
        });
    }
});

changeColor();
function changeColor() {
    let rgbSaver = [];
    for (let i = 0; i < 3; i++)
        rgbSaver.push(Math.floor(Math.random() * 226 + 70));
    document.querySelector(":root").style.cssText = `
    --background-color: rgb(${rgbSaver[0]}, ${rgbSaver[1]}, ${rgbSaver[2]});
    --game-color: rgb(${rgbSaver[0] / 2}, ${rgbSaver[1] / 2}, ${
        rgbSaver[2] / 2
    });
    --line-color: rgb(${rgbSaver[0] / 3}, ${rgbSaver[1] / 3}, ${
        rgbSaver[2] / 3
    });
    `;
}

function endGameWin() {
    console.log("ENDGAME-WIN");
}
