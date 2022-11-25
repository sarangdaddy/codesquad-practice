const mainCube = document.querySelector(".cube");
const cubeTop = mainCube.querySelector(".cube__top");
const cubeFront = mainCube.querySelector(".cube__front");
const cubeLeft = mainCube.querySelector(".cube__left");
const cubeRight = mainCube.querySelector(".cube__right");
const cubeBack = mainCube.querySelector(".cube__back");
const cubeBottom = mainCube.querySelector(".cube__bottom");

const inputValue = document.querySelector(".form__input");
const inputButton = document.querySelector(".form__btn__submit");
const resetButton = document.querySelector(".form__btn__reset");
const mixButton = document.querySelector(".form__btn__mix");
const resultValue = document.querySelector(".result");

let cube = {
  topFace: [],
  frontFace: [],
  leftFace: [],
  rightFace: [],
  backFace: [],
  bottomFace: [],
  count: 0,
};

// 최초 cube(정답) 셋팅
cube.baseSet = function () {
  this.startTime = Date.now();
  this.topFace = Array.from(Array(3), () => Array(3).fill("T"));
  this.frontFace = Array.from(Array(3), () => Array(3).fill("F"));
  this.leftFace = Array.from(Array(3), () => Array(3).fill("L"));
  this.rightFace = Array.from(Array(3), () => Array(3).fill("R"));
  this.backFace = Array.from(Array(3), () => Array(3).fill("B"));
  this.bottomFace = Array.from(Array(3), () => Array(3).fill("M"));
  this.cubeLocation();
};

// 각 면의 색깔 표시
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
        this.count++;
        this.checkCube();
        break;
      case "T'":
        this.topRight90();
        this.count++;
        this.checkCube();
        break;
      case "M":
        this.bottomLeft90();
        this.count++;
        this.checkCube();
        break;
      case "M'":
        this.bottomRight90();
        this.count++;
        this.checkCube();
        break;
      case "L":
        this.leftLeft90();
        this.count++;
        this.checkCube();
        break;
      case "L'":
        this.leftRight90();
        this.count++;
        this.checkCube();
        break;
      case "R":
        this.rightLeft90();
        this.count++;
        this.checkCube();
        break;
      case "R'":
        this.rightRight90();
        this.count++;
        this.checkCube();
        break;
      case "F":
        this.frontLeft90();
        this.count++;
        this.checkCube();
        break;
      case "F'":
        this.frontRight90();
        this.count++;
        this.checkCube();
        break;
      case "B":
        this.backLeft90();
        this.count++;
        this.checkCube();
        break;
      case "B'":
        this.backRight90();
        this.count++;
        this.checkCube();
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
  this.endTime = Date.now();
  const totalCount = this.count;
  const recordTime = ((this.endTime - this.startTime) / 1000).toFixed(1);
  const span = document.createElement("span");
  span.innerHTML = `<div id="Myspan"> 입력 : ${this.inputValueArray} </br> 경과시간 : ${recordTime}초  </br> 조작갯수 : ${totalCount}번  </br> 이용해주셔서 감사합니다. 뚜뚜뚜.</br>`;
  resultValue.appendChild(span.firstChild);
};

// Reset버튼 입력시 결과값 삭제 & 초기 셋팅값 불러오기
cube.gameReset = function (event) {
  event.preventDefault();
  this.count = 0;
  const span = document.getElementById("Myspan");
  resultValue.removeChild(span);
  this.init();
};

// Cube 입력 중 정답이면 게임 종료 실행
cube.checkCube = function () {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (this.topFace[i][j] !== "T") {
        return false;
      }
      if (this.frontFace[i][j] !== "F") {
        return false;
      }
      if (this.leftFace[i][j] !== "L") {
        return false;
      }
      if (this.rightFace[i][j] !== "R") {
        return false;
      }
      if (this.backFace[i][j] !== "B") {
        return false;
      }
      if (this.bottomFace[i][j] !== "M") {
        return false;
      }
    }
  }
  this.clearCube();
};

// 게임 종료 함수
cube.clearCube = function () {
  this.endTime = Date.now();
  const totalCount = this.count;
  const recordTime = ((this.endTime - this.startTime) / 1000).toFixed(1);
  if (this.checkCube) {
    document.write(
      `축하합니다. 정답입니다. </br> 경과시간 : ${recordTime}초  </br> 조작갯수 : ${totalCount}번  </br> 이용해주셔서 감사합니다. 뚜뚜뚜.</br>`
    );
  }
};

inputButton.addEventListener("click", cube.getInputValue.bind(cube));
resetButton.addEventListener("click", cube.gameReset.bind(cube));

cube.init = function () {
  this.baseSet();
};

cube.init();
