import {
    startTimer,
    delayTimer,
    secondConverter,
    stopIteration,
    sideSaves,
    sideSavesSum,
} from "./timer.js";

const firstNumbers = document.querySelectorAll(".first-number");
const operations = document.querySelectorAll(".operation");
const secondNumbers = document.querySelectorAll(".second-number");
const inputs = document.querySelectorAll(".input");
const submitBtns = document.querySelectorAll(".submit-btn");
const sideHealthcircles = document.querySelectorAll(".health-bar__blocks");
const main = document.querySelector("main");
const sideHealthLost = [0, 0, 0];
const saveQuestions = [];

const endScreen = document.querySelector(".end-screen");
const endScreenRoundTimes = document.querySelectorAll(
    ".end-screen__round-timer"
);
const endScreenTotlaTimes = document.querySelector(".end-screen__total-timer");
const endScreenHealths = document.querySelectorAll(
    ".end-screen__health__block"
);
const endScreenTotalHealths = document.querySelector(
    ".end-screen__total-health"
);
const endScreenquestions = document.querySelectorAll(".end-screen__question");
const endScreenTotalquestions = document.querySelector(
    ".end-screen__total-question"
);
const endScreenBtns = document.querySelector(".end-screen-btns");

setTimeout(() => {
    setNumbers();
    startTimer();
}, 1000);

const answer = ["", "", ""];
function setNumbers() {
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
        calcStr += "  " + ransdNum;

        do {
            ransdNum = 100 - Math.ceil(Math.random() * 200);
        } while (ransdNum === "0");
        calcStr += "  " + ransdNum;
        secondNumbers[round].textContent = ransdNum;

        answer[round] = parseInt(calc(calcStr.replace("--", "+")));

        submitBtns[round].addEventListener("click", function () {
            let inputQstn = inputs[round].value;
            if (!inputs[round].value) {
                return;
            }
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

        console.log("-->", calcStr);
        saveQuestions.push(calcStrConverter(calcStr, answer[round]));
    }
}

function calc(str) {
    const tempFunc = new Function("return " + str);
    return tempFunc();
}

function changeSide(round) {
    console.log("=====================");
    switch (round) {
        case 0:
            main.style.transform = "rotateX(260deg) rotateZ(-179deg)";

            setTimeout(() => {
                main.style.transform = "rotateX(260deg) rotateZ(-170deg)";
                inputs[round].value = "";
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
                inputs[round].value = "";
                inputs[round + 1].focus();
            }, 700);

            disableEnableInputs(round);
            break;
        default:
            delayTimer(round);
            submitBtns[round].classList.remove("submit-btn-effects");
            submitBtns[round].disabled = true;
            inputs[round].disabled = true;
            setTimeout(() => {
                endGame(3);
            }, 700);
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
        setTimeout(() => {
            lostAllHealths(round);
        }, 100);
    }

    sideHealthLost[round]++;
    for (let health = 0; health < sideHealthLost[round]; health++) {
        sideHealthcircles[round * 3 + health].classList.add("lost-health");
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

setTimeout(() => {
    for (let round = 0; round < 3; round++) {
        inputs[round].value = answer[round];
    }
}, 1100);

function calcStrConverter(calcStr, answer) {
    calcStr = calcStr.replace("*", "×");
    calcStr = calcStr.replace("/", "÷");

    return calcStr + " = " + answer;
}

function lostAllHealths(round) {
    delayTimer(round);
    for (let roundCounter = round; roundCounter < 3; roundCounter++) {
        for (let healthBlock = 0; healthBlock < 3; healthBlock++) {
            sideHealthcircles[roundCounter * 3 + healthBlock].classList.add(
                "lost-health"
            );
        }
        sideHealthLost[roundCounter] = 3;
        endScreenquestions[roundCounter].style.textDecoration = "line-through";
    }

    setTimeout(() => {
        endGame(round);
    }, 700);
}

// endGame();
function endGame(passQustions) {
    stopIteration();
    endScreen.style.display = "grid";
    setTimeout(() => {
        endScreen.style.opacity = "1";
    }, 100);
    endScreenBtns.style.bottom = "3px";

    console.log("ENDGAME");

    document.querySelector(".headder").textContent = "Results";
    for (let round = 0; round < 3; round++) {
        endScreenRoundTimes[round].textContent = secondConverter(
            sideSaves[round]
        );
        endScreenTotlaTimes.textContent = secondConverter(sideSavesSum);

        for (
            let healthCont = 0;
            healthCont < sideHealthLost[round];
            healthCont++
        ) {
            endScreenHealths[3 * round + healthCont].classList.add(
                "lost-health"
            );
        }
        endScreenTotalHealths.textContent = `${
            9 - (sideHealthLost[0] + sideHealthLost[1] + sideHealthLost[2])
        } / 9`;

        endScreenquestions[round].textContent = saveQuestions[round];
        endScreenTotalquestions.textContent = `${passQustions} / 3`;
    }
}
