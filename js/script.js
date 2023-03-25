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
const sidelifecircles = document.querySelectorAll(".life-bar__blocks");
const main = document.querySelector("main");
const sidelifeLost = [0, 0, 0];
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
const endScreenlifes = document.querySelectorAll(".end-screen__life__block");
const endScreenTotallifes = document.querySelector(".end-screen__total-life");
const endScreenquestions = document.querySelectorAll(".end-screen__question");
const endScreenTotalquestions = document.querySelector(
    ".end-screen__total-question"
);
const endScreenBtns = document.querySelector(".end-screen-btns");

// localStorage.clear();

let showAns = false;
let alwaysReady = false;

// Check for localStorge
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

// This function is called multiple times when the state of showAns changes or on
// initial page load
function showAnsPlaceholders() {
    for (let round = 0; round < 3; round++) {
        if (showAns) {
            inputs[round].placeholder = answers[round];
        } else {
            inputs[round].placeholder = "";
        }
    }
}

// Remove readyScreen and start timer and if showAns was true, show placeholders
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

// Show or hide settingBtns by clicking on settingBtnsNav
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

// Works for show-ans and always-ready buttons and will change the state of showAns
// and alwaysReady, and update localStorage.
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

// Eventlisteners for show-ans and always-ready
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

// Called once and make 3 questions and save some of them for end-screen
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
                ransdNum = "×";
                break;
            default:
                ransdNum = "÷";
                break;
        }
        operations[round].textContent = ransdNum;
        calcStr += "  " + ransdNum;

        // If the calculation operator is *, then the second number is a multiple of
        // 10 so that calculations are not too difficult
        do {
            if (calcStr.charAt(calcStr.length - 1) === "×") {
                ransdNum = (10 - Math.ceil(Math.random() * 20)) * 10;
            } else {
                ransdNum = 100 - Math.ceil(Math.random() * 200);
            }
        } while (ransdNum === 0);
        calcStr += "  " + ransdNum;
        secondNumbers[round].textContent = ransdNum;

        answers[round] = parseInt(calc(calcStr.replace("--", "+")));

        // Each round submit button addEventListener
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
            `R${round + 1} : ${calcStr} = ${calc(calcStr).toFixed(2)} -> ${
                answers[round]
            }`
        );

        saveQuestions.push(calcStr + " = " + answers[round]);
    }
}

// Function to convert a string to a math expression and calculate it
function calc(str) {
    str = str.replace("×", "*");
    str = str.replace("÷", "/");
    const tempFunc = new Function("return " + str);
    return tempFunc();
}

// After a correct answer, the cube will rotate. For each round, the transform values
// are different
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

// After the changeSide transition, certain things get disabled and enabled
function disableEnableInputs(round) {
    delayTimer(round);
    submitBtns[round].classList.remove("submit-btn-effects");
    submitBtns[round + 1].classList.add("submit-btn-effects");
    submitBtns[round].disabled = true;
    submitBtns[round + 1].disabled = false;
    inputs[round].disabled = true;
    inputs[round + 1].disabled = false;
}

// If a wrong answer is submitted, the input will shake and one life will be lost. If
// three lives are lost on one side, the game is over
function wrongAnimation(round) {
    inputs[round].classList.add("shake");
    if (sidelifeLost[round] === 2) {
        setTimeout(() => {
            lostAllLifes(round);
        }, 100);
    }

    sidelifeLost[round]++;
    for (let life = 0; life < sidelifeLost[round]; life++) {
        sidelifecircles[round * 3 + life].classList.add("lost-life");
    }

    inputs[round].addEventListener("animationend", function () {
        inputs[round].value = "";
        inputs[round].classList.remove("shake");
        inputs[round].focus();
    });
}

// Pressing Enter will trigger the readyBtn or submitBtn click
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

// Click on change-color button
document
    .querySelector(".setting-btns__change-color")
    .addEventListener("click", function () {
        changeColor();
    });

// Change theme of page
// background-color = game-color * 2 = lineColor * 3
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

// Save the timer, burn other lives on the cube, and call endGame
function lostAllLifes(round) {
    delayTimer(round);
    for (let roundCounter = round; roundCounter < 3; roundCounter++) {
        for (let lifeBlock = 0; lifeBlock < 3; lifeBlock++) {
            sidelifecircles[roundCounter * 3 + lifeBlock].classList.add(
                "lost-life"
            );
        }
        sidelifeLost[roundCounter] = 3;
        endScreenquestions[roundCounter].style.textDecoration = "line-through";
    }

    setTimeout(() => {
        endGame(round);
    }, 700);
}

// Show the end screen and set the value of the result table
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

        for (let lifeCont = 0; lifeCont < sidelifeLost[round]; lifeCont++) {
            endScreenlifes[3 * round + lifeCont].classList.add("lost-life");
        }
        endScreenTotallifes.textContent = `${
            9 - (sidelifeLost[0] + sidelifeLost[1] + sidelifeLost[2])
        } / 9`;

        endScreenquestions[round].textContent = saveQuestions[round];
        endScreenTotalquestions.textContent = `${passQustions} / 3`;
    }
}
