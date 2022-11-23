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
const resultValue = document.querySelector(".result");

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
cube.cubeLocation = function () {
  cubeTop.innerHTML = `${this.topFace[0]} </br> ${this.topFace[1]} </br> ${this.topFace[2]}`;
  cubeFront.innerHTML = `${this.frontFace[0]} </br> ${this.frontFace[1]} </br> ${this.frontFace[2]}`;
  cubeLeft.innerHTML = `${this.leftFace[0]} </br> ${this.leftFace[1]} </br> ${this.leftFace[2]}`;
  cubeRight.innerHTML = `${this.rightFace[0]} </br> ${this.rightFace[1]} </br> ${this.rightFace[2]}`;
  cubeBack.innerHTML = `${this.backFace[0]} </br> ${this.backFace[1]} </br> ${this.backFace[2]}`;
  cubeBottom.innerHTML = `${this.bottomFace[0]} </br> ${this.bottomFace[1]} </br> ${this.bottomFace[2]}`;
};

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
  inputValue.value = "";
  this.selectCmdKey();
};

//입력값에 따라 cmd실행
cube.selectCmdKey = function () {
  for (let i = 0; i < this.inputValueArray.length; i++) {
    switch (this.inputValueArray[i]) {
      case "T":
        this.topLeft90();
        break;
      case "T'":
        this.topRight90();
        break;
      case "M":
        this.bottomLeft90();
        break;
      case "M'":
        this.bottomRight90();
        break;
      case "L":
        this.leftLeft90();
        break;
      case "L'":
        this.leftRight90();
        break;
      case "R":
        this.rightLeft90();
        break;
      case "R'":
        this.rightRight90();
        break;
      case "F":
        this.frontLeft90();
        break;
      case "F'":
        this.frontRight90();
        break;
      case "B":
        this.backLeft90();
        break;
      case "B'":
        this.backRight90();
        break;
      case "Q":
        this.endCude();
        break;
      default:
        alert("T, T', M, M', L, L', R, R',F,F',B,B',Q 를 입력하세요.");
        return;
    }
  }
};

//TOP 왼쪽으로 90도 회전
cube.topLeft90 = function () {
  const selFront = this.frontFace.shift();
  const selLeft = this.leftFace.shift();
  const selRight = this.rightFace.shift();
  const selBack = this.backFace.shift();
  this.leftFace.unshift(selFront);
  this.backFace.unshift(selLeft);
  this.rightFace.unshift(selBack);
  this.frontFace.unshift(selRight);
  this.cubeLocation();
};

//TOP 오른쪽으로 90도 회전
cube.topRight90 = function () {
  const selFront = this.frontFace.shift();
  const selLeft = this.leftFace.shift();
  const selRight = this.rightFace.shift();
  const selBack = this.backFace.shift();
  this.leftFace.unshift(selBack);
  this.backFace.unshift(selRight);
  this.rightFace.unshift(selFront);
  this.frontFace.unshift(selLeft);
  this.cubeLocation();
};

//BOTTOM 왼쪽으로 90도 회전
cube.bottomLeft90 = function () {
  const selFront = this.frontFace.pop();
  const selLeft = this.leftFace.pop();
  const selRight = this.rightFace.pop();
  const selBack = this.backFace.pop();
  this.leftFace.push(selFront);
  this.backFace.push(selLeft);
  this.rightFace.push(selBack);
  this.frontFace.push(selRight);
  this.cubeLocation();
};

//BOTTOM 오른쪽으로 90도 회전
cube.bottomRight90 = function () {
  const selFront = this.frontFace.pop();
  const selLeft = this.leftFace.pop();
  const selRight = this.rightFace.pop();
  const selBack = this.backFace.pop();
  this.leftFace.push(selBack);
  this.backFace.push(selRight);
  this.rightFace.push(selFront);
  this.frontFace.push(selLeft);
  this.cubeLocation();
};

//Left 왼쪽으로 90도 회전
cube.leftLeft90 = function () {
  const selFront = [];
  const selTop = [];
  const selBottom = [];
  const selBack = [];

  for (let i = 0; i < 3; i++) {
    selFront.push(this.frontFace[i].shift());
    selTop.push(this.topFace[i].shift());
    selBottom.push(this.bottomFace[i].shift());
    selBack.push(this.backFace[i].shift());
    this.frontFace[i].unshift(selTop[i]);
    this.bottomFace[i].unshift(selFront[i]);
    this.backFace[i].unshift(selBottom[i]);
    this.topFace[i].unshift(selBack[i]);
  }

  this.cubeLocation();
};
//Left 오른쪽으로 90도 회전
cube.leftRight90 = function () {
  const selFront = [];
  const selTop = [];
  const selBottom = [];
  const selBack = [];

  for (let i = 0; i < 3; i++) {
    selFront.push(this.frontFace[i].shift());
    selTop.push(this.topFace[i].shift());
    selBottom.push(this.bottomFace[i].shift());
    selBack.push(this.backFace[i].shift());
    this.frontFace[i].unshift(selBottom[i]);
    this.bottomFace[i].unshift(selBack[i]);
    this.backFace[i].unshift(selTop[i]);
    this.topFace[i].unshift(selFront[i]);
  }

  this.cubeLocation();
};

//Right 왼쪽으로 90도 회전
cube.rightLeft90 = function () {
  const selFront = [];
  const selTop = [];
  const selBottom = [];
  const selBack = [];

  for (let i = 0; i < 3; i++) {
    selFront.push(this.frontFace[i].pop());
    selTop.push(this.topFace[i].pop());
    selBottom.push(this.bottomFace[i].pop());
    selBack.push(this.backFace[i].pop());
    this.frontFace[i].push(selTop[i]);
    this.bottomFace[i].push(selFront[i]);
    this.backFace[i].push(selBottom[i]);
    this.topFace[i].push(selBack[i]);
  }

  this.cubeLocation();
};

//Right 오른쪽으로 90도 회전
cube.rightRight90 = function () {
  const selFront = [];
  const selTop = [];
  const selBottom = [];
  const selBack = [];

  for (let i = 0; i < 3; i++) {
    selFront.push(this.frontFace[i].pop());
    selTop.push(this.topFace[i].pop());
    selBottom.push(this.bottomFace[i].pop());
    selBack.push(this.backFace[i].pop());
    this.frontFace[i].push(selBottom[i]);
    this.bottomFace[i].push(selBack[i]);
    this.backFace[i].push(selTop[i]);
    this.topFace[i].push(selFront[i]);
  }

  this.cubeLocation();
};

//Front 왼쪽으로 90도 회전
cube.frontLeft90 = function () {
  const selTop = [];
  const selLeft = [];
  const selBottom = [];
  const selRight = [];

  for (let i = 0; i < 3; i++) {
    selTop.push(this.topFace[i].shift());
    selLeft.push(this.leftFace[i].shift());
    selBottom.push(this.bottomFace[i].shift());
    selRight.push(this.rightFace[i].shift());
    this.topFace[i].unshift(selRight[i]);
    this.leftFace[i].unshift(selTop[i]);
    this.bottomFace[i].unshift(selLeft[i]);
    this.rightFace[i].unshift(selBottom[i]);
  }

  this.cubeLocation();
};

//Front 오른쪽으로 90도 회전
cube.frontRight90 = function () {
  const selTop = [];
  const selLeft = [];
  const selBottom = [];
  const selRight = [];

  for (let i = 0; i < 3; i++) {
    selTop.push(this.topFace[i].shift());
    selLeft.push(this.leftFace[i].shift());
    selBottom.push(this.bottomFace[i].shift());
    selRight.push(this.rightFace[i].shift());
    this.topFace[i].unshift(selLeft[i]);
    this.leftFace[i].unshift(selBottom[i]);
    this.bottomFace[i].unshift(selRight[i]);
    this.rightFace[i].unshift(selTop[i]);
  }

  this.cubeLocation();
};

//Back 왼쪽으로 90도 회전
cube.backLeft90 = function () {
  const selTop = [];
  const selLeft = [];
  const selBottom = [];
  const selRight = [];

  for (let i = 0; i < 3; i++) {
    selTop.push(this.topFace[i].pop());
    selLeft.push(this.leftFace[i].pop());
    selBottom.push(this.bottomFace[i].pop());
    selRight.push(this.rightFace[i].pop());
    this.topFace[i].push(selRight[i]);
    this.leftFace[i].push(selTop[i]);
    this.bottomFace[i].push(selLeft[i]);
    this.rightFace[i].push(selBottom[i]);
  }

  this.cubeLocation();
};

//Back 오른쪽으로 90도 회전
cube.backRight90 = function () {
  const selTop = [];
  const selLeft = [];
  const selBottom = [];
  const selRight = [];

  for (let i = 0; i < 3; i++) {
    selTop.push(this.topFace[i].pop());
    selLeft.push(this.leftFace[i].pop());
    selBottom.push(this.bottomFace[i].pop());
    selRight.push(this.rightFace[i].pop());
    this.topFace[i].push(selLeft[i]);
    this.leftFace[i].push(selBottom[i]);
    this.bottomFace[i].push(selRight[i]);
    this.rightFace[i].push(selTop[i]);
  }
  this.cubeLocation();
};

// Cube 종료 "Q" 입력시 실행 함수
cube.endCude = function () {
  const span = document.createElement("span");
  span.innerHTML = `입력 : ${this.inputValueArray} </br> 경과시간 :  </br> 조작갯수 :  </br> 이용해주셔서 감사합니다. 뚜뚜뚜.`;
  resultValue.appendChild(span);
};

inputButton.addEventListener("click", cube.getInputValue.bind(cube));

cube.init = function () {
  this.cubeLocation();
};

cube.init();
