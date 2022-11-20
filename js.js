const mainCube = document.querySelector(".main__cube");
const inputValue = document.querySelector(".input__text");
const inputButton = document.querySelector(".input__btn");
const showResult = document.querySelector(".result");

let cubeGame = {
  cube: [
    ["R", "R", "W"],
    ["G", "C", "W"],
    ["G", "B", "B"],
  ],
  inputArray: [],
};

mainCube.innerHTML = `${cubeGame.cube[0]} <br> ${cubeGame.cube[1]} <br> ${cubeGame.cube[2]}`;

cubeGame.getInputValue = function (event) {
  event.preventDefault();
  const inputText = inputValue.value;
  this.inputArray = inputText.split("");
  this.filterInputValue();
  inputValue.value = "";
};

cubeGame.filterInputValue = function () {
  for (let i = 0; i < this.inputArray.length; i++) {
    if (this.inputArray[i] === "'") {
      this.inputArray[i - 1] = this.inputArray[i - 1] + "'";
      this.inputArray.splice(i, 1);
    }
  }
  this.selectCmd();
};

cubeGame.selectCmd = function () {
  for (let i = 0; i < this.inputArray.length; i++) {
    switch (this.inputArray[i]) {
      case "U":
        this.topLeft();
        this.getResult(this.inputArray[i]);
        break;
      case "U'":
        this.topRight();
        this.getResult(this.inputArray[i]);
        break;
      case "R":
        this.rightUp();
        this.getResult(this.inputArray[i]);
        break;
      case "R'":
        this.rightDoun();
        this.getResult(this.inputArray[i]);
        break;
      case "L":
        this.leftDown();
        this.getResult(this.inputArray[i]);
        break;
      case "L'":
        this.leftUp();
        this.getResult(this.inputArray[i]);
        break;
      case "B":
        this.bottomRight();
        this.getResult(this.inputArray[i]);
        break;
      case "B'":
        this.bottomLeft();
        this.getResult(this.inputArray[i]);
        break;
      case "Q":
        this.endGame();
        break;
      default:
        alert("U, U', R, R', L, L', B, B', Q 만 입력하세요.");
        return;
    }
  }
};

cubeGame.topLeft = function () {
  let value = this.cube[0][0];
  this.cube[0].splice(0, 1);
  this.cube[0].push(value);
};
cubeGame.topRight = function () {
  let value = this.cube[0][2];
  this.cube[0].splice(2, 1);
  this.cube[0].unshift(value);
};
cubeGame.rightUp = function () {
  let value = this.cube[0].pop();
  this.cube[0].push(this.cube[1].pop());
  this.cube[1].push(this.cube[2].pop());
  this.cube[2].push(value);
};
cubeGame.rightDoun = function () {
  let value = this.cube[2].pop();
  this.cube[2].push(this.cube[1].pop());
  this.cube[1].push(this.cube[0].pop());
  this.cube[0].push(value);
};
cubeGame.leftDown = function () {
  let value = this.cube[2].shift();
  this.cube[2].unshift(this.cube[1].shift());
  this.cube[1].unshift(this.cube[0].shift());
  this.cube[0].unshift(value);
};
cubeGame.leftUp = function () {
  let value = this.cube[0].shift();
  this.cube[0].unshift(this.cube[1].shift());
  this.cube[1].unshift(this.cube[2].shift());
  this.cube[2].unshift(value);
};
cubeGame.bottomRight = function () {
  let value = this.cube[2][2];
  this.cube[2].splice(2, 1);
  this.cube[2].unshift(value);
};
cubeGame.bottomLeft = function () {
  let value = this.cube[2][0];
  this.cube[2].splice(0, 1);
  this.cube[2].push(value);
};
cubeGame.endGame = function () {
  document.write("BYE~");
};

cubeGame.getResult = function (cmd) {
  let div = document.createElement("div");
  div.className = "result__column";
  div.innerHTML = `${cmd} <br> ${this.cube[0]} <br> ${this.cube[1]} <br> ${this.cube[2]}`;
  showResult.appendChild(div);
};

inputButton.addEventListener("click", cubeGame.getInputValue.bind(cubeGame));
