import {
    startTimer,
    delayTimer,
    stopIteration,
    secondConverter,
    sideSavesSum,
    sideSaves,
} from "./timer.js";

const readyScreen = document.querySelector(".ready-screen");
const firstNumbers = document.querySelectorAll(".first-number");
const operations = document.querySelectorAll(".operation");
const secondNumbers = document.querySelectorAll(".second-number");
const inputs = document.querySelectorAll(".input");
const submitBtns = document.querySelectorAll(".submit-btn");
const sideHealthcircles = document.querySelectorAll(".health-bar__blocks");
const main = document.querySelector("main");
const sideHealthLost = [0, 0, 0];
const answers = ["", "", ""];
const saveQuestions = [];

const readyBtn = document.querySelector(".ready-screen__ready");
const showAnsInput = document.querySelector("#show-ans");
const alwaysReadyInput = document.querySelector("#always-ready");
const settingBtns = document.querySelector(".setting-btns");
const settingBtnsNav = document.querySelector(".setting-btns__nav");
const settingBtnsNavChar = document.querySelector(".setting-btns__nav div");
let settingBtnsNavCharOpen = false;

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

// localStorage.clear();

let showAns = false;
showAns = false;

let alwaysReady = false;

if (localStorage.getItem("showAns") === "true") {
    showAns = true;
    showAnsInput.checked = showAns;
    showAnsPlaceholders();
}
if (localStorage.getItem("alwaysReady") === "true") {
    alwaysReady = true;
    alwaysReadyInput.checked = alwaysReady;
    readyScreen.style.display = "none";
    setTimeout(() => {
        setNumbers();
        startTimer();
        showAnsPlaceholders();
        inputs[0].focus();
    }, 100);
}

function showAnsPlaceholders() {
    for (let round = 0; round < 3; round++) {
        if (showAns) {
            inputs[round].placeholder = answers[round];
        } else {
            inputs[round].placeholder = "";
        }
    }
}

readyBtn.addEventListener("click", function () {
    readyScreen.style.opacity = 0;
    setTimeout(() => {
        readyScreen.style.display = "none";
        setTimeout(() => {
            setNumbers();
            startTimer();
            showAnsPlaceholders();
            readyBtn.disabled = true;
            inputs[0].focus();
        }, 400);
    }, 300);
});

settingBtnsNav.addEventListener("click", function () {
    if (settingBtnsNavCharOpen) {
        settingBtnsNavCharOpen = false;
        settingBtns.style.bottom = "-300px";
        settingBtnsNavChar.style.transform = `rotate(-90deg)`;
    } else {
        settingBtnsNavCharOpen = true;
        settingBtns.style.bottom = "-200px";
        settingBtnsNavChar.style.transform = `rotate(90deg)`;
    }
});

// Dosn't work for some reason ...
function showAnsAndAlwaysReady(checkfor, input, localStorageName) {
    if (checkfor) {
        input.checked = false;
        localStorage.setItem(localStorageName, !checkfor);
        return false;
    } else {
        input.checked = true;
        localStorage.setItem(localStorageName, !checkfor);
        return true;
    }
}

document
    .querySelector(".setting-btns__show-ans")
    .addEventListener("click", function () {
        showAns = showAnsAndAlwaysReady(showAns, showAnsInput, "showAns");
        showAnsPlaceholders();
    });

document
    .querySelector(".setting-btns__always-ready")
    .addEventListener("click", function () {
        alwaysReady = showAnsAndAlwaysReady(
            alwaysReady,
            alwaysReadyInput,
            "alwaysReady"
        );
    });

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
            if (calcStr.charAt(calcStr.length - 1) === "*") {
                ransdNum = (10 - Math.ceil(Math.random() * 20)) * 10;
            } else {
                ransdNum = 100 - Math.ceil(Math.random() * 200);
            }
        } while (ransdNum === 0);
        calcStr += "  " + ransdNum;
        secondNumbers[round].textContent = ransdNum;

        answers[round] = parseInt(calc(calcStr.replace("--", "+")));

        submitBtns[round].addEventListener("click", function () {
            let inputQstn = inputs[round].value;
            if (!inputs[round].value) {
                return;
            }
            if (Number(inputQstn) === Number(answers[round])) {
                console.log("Correct Answer!");
                changeSide(round);
            } else {
                console.log("Wrong Answer!");
                wrongAnimation(round);
            }
        });

        console.log(
            `R${round} : ${calcStr} = ${calc(calcStr).toFixed(2)} -> ${
                answers[round]
            }`
        );

        saveQuestions.push(calcStrConverter(calcStr, answers[round]));
    }
}

function calc(str) {
    const tempFunc = new Function("return " + str);
    return tempFunc();
}

function changeSide(round) {
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

// if spam enter timer will broke ...
document.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        if (!saveQuestions.length) {
            readyBtn.dispatchEvent(new Event("click"));
        } else {
            submitBtns.forEach(function (submitBtn) {
                submitBtn.dispatchEvent(new Event("click"));
            });
        }
    }
});

document
    .querySelector(".setting-btns__change-color")
    .addEventListener("click", function () {
        changeColor();
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

function calcStrConverter(calcStr, answers) {
    calcStr = calcStr.replace("*", "×");
    calcStr = calcStr.replace("/", "÷");

    return calcStr + " = " + answers;
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
    endScreenBtns.style.bottom = "-200px";

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
