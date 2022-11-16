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

  this.moveUeserWord(this.userWord, this.userNumber, this.userOrder);
  inputValue.value = "";
};

moveStr.moveUeserWord = function (word, n, option) {
  console.log(word, n, option);
  let wordArray = word.split("");
  console.log(wordArray);
  if (option === "L") {
    let i = 1;
    while (i <= n) {
      let firstAl = wordArray[0];
      wordArray.splice(0, 1);
      wordArray.push(firstAl);
      i++;
    }
  } else if (option === "R") {
    let i = 1;
    while (i <= n) {
      let lastAl = wordArray[wordArray.length - 1];
      wordArray.splice(wordArray.length - 1, 1);
      wordArray.unshift(lastAl);
      i++;
    }
  }
  console.log(wordArray);
  this.getResult(wordArray);
};

moveStr.getResult = function (word) {
  const span = document.createElement("span");
  const changeToStr = word.join("");
  span.innerHTML = changeToStr + "</br>";
  showResult.appendChild(span);
};

inputBtn.addEventListener("click", moveStr.getInputValue.bind(moveStr));
