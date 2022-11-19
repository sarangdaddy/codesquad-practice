const inputForm = document.querySelector(".input__form");
const inputValue = document.querySelector(".input__value");
const inputBtn = document.querySelector(".input__btn");
const showResult = document.querySelector(".main__result");

let moveStr = {};

moveStr.getInputValue = function (event) {
  event.preventDefault();
  const stringWord = inputValue.value;
  this.arrayWord = stringWord.split(" ");
  this.userWord = this.arrayWord[0];
  this.userNumber = Number(this.arrayWord[1]);
  this.userOrder = this.arrayWord[2].toUpperCase();
  this.changeInputValue(this.userNumber, this.userOrder);
  inputValue.value = "";
};

moveStr.changeInputValue = function (n, option) {
  if ((n >= 0 && option === "L") || (n < 0 && option === "R")) {
    this.pushLeft(Math.abs(n));
  }
  if ((n >= 0 && option === "R") || (n < 0 && option === "L")) {
    this.pushRight(Math.abs(n));
  }
};

moveStr.pushLeft = function (n) {
  let wordArray = this.userWord.split("");

  for (let i = 0; i < n; i++) {
    let firstAl = wordArray[0];
    wordArray.splice(0, 1);
    wordArray.push(firstAl);
  }
  this.showInputValue(wordArray);
};

moveStr.pushRight = function (n) {
  let wordArray = this.userWord.split("");

  for (let i = 0; i < n; i++) {
    let lastAl = wordArray[wordArray.length - 1];
    wordArray.splice(wordArray.length - 1, 1);
    wordArray.unshift(lastAl);
  }
  this.showInputValue(wordArray);
};

moveStr.showInputValue = function (word) {
  const changedStr = word.join("");
  const span = document.createElement("span");
  span.innerHTML = changedStr + "</br>";
  showResult.appendChild(span);
};

inputBtn.addEventListener("click", moveStr.getInputValue.bind(moveStr));
