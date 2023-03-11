const sideTimer = document.querySelector(".timer-side span");
const gameTimer = document.querySelector(".timer-game span");
const firstNumbers = document.querySelectorAll(".first-number");
const operations = document.querySelectorAll(".operation");
const secondNumbers = document.querySelectorAll(".second-number");
const inputs = document.querySelectorAll(".input");
const submitBtns = document.querySelectorAll(".submit-btn");
let answer = ["", "", ""];

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
        case 4:
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

    calcStr = calcStr.replace("--", "-");
    answer[round] = calc(calcStr).toFixed(0);
    // console.log(calcStr, calc(calcStr), calc(calcStr).toFixed(0));
}

function calc(str) {
    const tempFunc = new Function("return " + str);
    return tempFunc();
}


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
