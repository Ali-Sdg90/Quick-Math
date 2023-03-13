import {
    secondConverter,
    stopIteration,
    sideSaves,
    sideSavesSum,
} from "./timer.js";

import { sideHealthLost } from "./script.js";

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

// endGameWin();
function endGameWin() {
    stopIteration();
    endScreen.style.display = "grid";
    console.log("ENDGAME-WIN");
    document.querySelector(".headder").textContent = "Results";
    for (let round = 0; round < 3; round++) {
        endScreenRoundTimes[round].textContent = secondConverter(
            sideSaves[round]
        );
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

        endScreenTotlaTimes.textContent = secondConverter(sideSavesSum);
    }
}

export default endGameWin();
