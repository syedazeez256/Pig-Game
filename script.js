"use strict";

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

const score0 = document.querySelector("#score--0");
const score1 = document.getElementById("score--1");

const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

score0.textContent = 0;
score1.textContent = 0;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// hiding the dice
diceEl.classList.add("hidden");

// rolling dice functonality //

btnRoll.addEventListener("click", function () {
  const diceNum = Math.trunc(Math.random() * 6) + 1;

  // Removing the hidden class

  if (playing) {
    diceEl.classList.remove("hidden");

    //   display dice

    diceEl.src = `dice-${diceNum}.png`;
    if (diceNum !== 1) {
      //   Adding points //
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //   Switched to other player //
      switchPlayer();
    }
  }
});
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1.Add current score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check wheather greater than 100 //

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player-active");
      diceEl.classList.add("hidden");
    } else {
      // 3.switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", function () {
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceEl.classList.add("hidden");
  current0.textContent = currentScore;
  current1.textContent = currentScore;
  score0.textContent = currentScore;
  score1.textContent = currentScore;
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
});
