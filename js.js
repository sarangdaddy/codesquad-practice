const mainCube = document.querySelector(".cube");
const cubeTop = mainCube.querySelector(".cube__top");
const cubeFront = mainCube.querySelector(".cube__front");
const cubeLeft = mainCube.querySelector(".cube__left");
const cubeRight = mainCube.querySelector(".cube__right");
const cubeBack = mainCube.querySelector(".cube__back");
const cubeBottom = mainCube.querySelector(".cube__bottom");

const inputValue = document.querySelector(".form__input");
const inputButton = document.querySelector(".form__btn__submit");
const mixButton = document.querySelector(".form__btn__mix");

let cube = {
  topFace: [
    ["T", "T", "T"],
    ["T", "T", "T"],
    ["T", "T", "T"],
  ],
  frontFace: [
    ["F", "F", "F"],
    ["F", "F", "F"],
    ["F", "F", "F"],
  ],
  leftFace: [
    ["L", "L", "L"],
    ["L", "L", "L"],
    ["L", "L", "L"],
  ],
  rightFace: [
    ["R", "R", "R"],
    ["R", "R", "R"],
    ["R", "R", "R"],
  ],
  backFace: [
    ["B", "B", "B"],
    ["B", "B", "B"],
    ["B", "B", "B"],
  ],
  bottomFace: [
    ["M", "M", "M"],
    ["M", "M", "M"],
    ["M", "M", "M"],
  ],
};

// 초기값 생성
cubeTop.innerHTML = `${cube.topFace[0]} </br> ${cube.topFace[1]} </br> ${cube.topFace[2]}`;
cubeFront.innerHTML = `${cube.frontFace[0]} </br> ${cube.frontFace[1]} </br> ${cube.frontFace[2]}`;
cubeLeft.innerHTML = `${cube.leftFace[0]} </br> ${cube.leftFace[1]} </br> ${cube.leftFace[2]}`;
cubeRight.innerHTML = `${cube.rightFace[0]} </br> ${cube.rightFace[1]} </br> ${cube.rightFace[2]}`;
cubeBack.innerHTML = `${cube.backFace[0]} </br> ${cube.backFace[1]} </br> ${cube.backFace[2]}`;
cubeBottom.innerHTML = `${cube.bottomFace[0]} </br> ${cube.bottomFace[1]} </br> ${cube.bottomFace[2]}`;

// 사용자 입력값 배열로 생성
cube.getInputValue = function (event) {
  event.preventDefault();
  const userInputValue = inputValue.value.toUpperCase();
  this.inputValueArray = userInputValue.split("");
  for (let i = 0; i < this.inputValueArray.length; i++) {
    if (this.inputValueArray[i] === "'") {
      this.inputValueArray[i - 1] = this.inputValueArray[i - 1] + "'";
      this.inputValueArray.splice(i, 1);
    }
  }
  this.selectCmdKey(this.inputValueArray);
};

cube.selectCmdKey = function (keyArray) {
  for (let i = 0; i < keyArray.length; i++) {
    switch (keyArray[i]) {
      case "T":
        this.topLeft90();
      case "T'":
        this.topRight90();
      case "M":
        this.middleLeft90();
      case "M'":
        this.middleRight90();
      case "B":
        this.bottomLeft90();
      case "B'":
        this.bottomRight90();
      case "L":
        this.leftLeft90();
      case "L'":
        this.leftRight90();
      case "C":
        this.centerLeft90();
      case "C'":
        this.centerRight90();
      case "R":
        this.rightLeft90();
      case "R'":
        this.rightRight90();
      case "F":
        this.frontLeft90();
      case "F'":
        this.frontRight90();
      case "S":
        this.secondLeft90();
      case "S'":
        this.secondRight90();
      case "L":
        this.lastLeft90();
      case "L'":
        this.kastRight90();
    }
  }
};

inputButton.addEventListener("click", cube.getInputValue.bind(cube));
