# 3단계: 루빅스 큐브 구현하기

<details>
<summary> 문제 설명 및 요구사항 </summary>

## 문제 설명

- 큐브는 W, B, G, Y, O, R의 6가지 색깔을 가지고 있다.
- 입력: 각 조작법을 한 줄로 입력받는다.
- 출력: 큐브의 6면을 펼친 상태로 출력한다.
- Q를 입력받으면 프로그램을 종료하고, 조작 받은 명령의 갯수를 출력시킨다.

<br/>

## 큐브의 초기 상태

```
                B B B
                B B B
                B B B

 W W W     O O O     G G G     Y Y Y
 W W W     O O O     G G G     Y Y Y
 W W W     O O O     G G G     Y Y Y

                R R R
                R R R
                R R R
```

## 프로그램 예시

```
(초기 상태 출력)

CUBE> FRR'U2R

F
(큐브상태)

R
(큐브상태)

...

R
(큐브상태)

CUBE> Q
경과시간: 00:31 //추가 구현 항목
조작갯수: 6
이용해주셔서 감사합니다. 뚜뚜뚜.
```

## 추가 구현 기능

- 프로그램 종료 시 경과 시간 출력
- 큐브의 무작위 섞기 기능
- 모든 면을 맞추면 축하 메시지와 함께 프로그램을 자동 종료

<br/>

## 3단계 코딩 요구사항

- 가능한 한 커밋을 자주 하고 구현의 의미가 명확하게 전달되도록 커밋 메시지를 작성할 것
- 함수나 메소드는 한 번에 한 가지 일을 하고 가능하면 20줄이 넘지 않도록 구현한다.
- 함수나 메소드의 들여쓰기를 가능하면 적게(3단계까지만) 할 수 있도록 노력해 본다.

```
function main() {
      for() { // 들여쓰기 1단계
          if() { // 들여쓰기 2단계
              return; // 들여쓰기 3단계
          }
      }
  }
```

</details>

<br/>

# 구조

최초 규브상태를 6면으로 보이게 불러오고 사용자의 입력내용에 따라 큐브가 움직이게 만들었다. 입력 내용 중 "Q"를 입력시 게임이 종료되고 실행 시간과 입력 횟수를 확인 할 수 있다. 사용자 입력 중 최초 규브 상태가 된다면 자동으로 게임이 종료 된다. 편의성을 위해 <"Reset" 버튼 : 게임을 초기화 해준다.> 과 <"Cube MIX" 버튼 : 큐브를 랜덤으로 섞어준다.> 기능을 구현 했다.

### 📑 목차

[1. 큐브 구현](#큐브-구현)
[2. 사용자 입력 내용을 CMD(커맨드)로 구현 ](#CMD-구현)
[3. 게임 강제 종료 & 자동 종료](#종료-구현)
[4. 추가 기능 <리셋>, <믹스> 구현](#추가-기능-구현)

<br/>

## 큐브 구현

1. 객체 cube에 각 면의 배열을 생성하고 각 면을 표현하는 "T", "F", "L", "R", "B", "M" 을 채워준다.
2. 입력 횟수를 도출하기 위해 최초 count : 0 을 생성한다.
3. 최초 큐브 생성시 시간을 체크 한다.

```js
let cube = {
  topFace: [],
  frontFace: [],
  leftFace: [],
  rightFace: [],
  backFace: [],
  bottomFace: [],
  count: 0,
};

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
```

4. 각 면을 innerHTML를 이용하여 웹브라우저에 나타낸다.

```js
cube.cubeLocation = function () {
  cubeTop.innerHTML = `${this.topFace[0]} </br> ${this.topFace[1]} </br> ${this.topFace[2]}`;
  cubeFront.innerHTML = `${this.frontFace[0]} </br> ${this.frontFace[1]} </br> ${this.frontFace[2]}`;
  cubeLeft.innerHTML = `${this.leftFace[0]} </br> ${this.leftFace[1]} </br> ${this.leftFace[2]}`;
  cubeRight.innerHTML = `${this.rightFace[0]} </br> ${this.rightFace[1]} </br> ${this.rightFace[2]}`;
  cubeBack.innerHTML = `${this.backFace[0]} </br> ${this.backFace[1]} </br> ${this.backFace[2]}`;
  cubeBottom.innerHTML = `${this.bottomFace[0]} </br> ${this.bottomFace[1]} </br> ${this.bottomFace[2]}`;
};
```

</br>

## CMD 구현

1. 사용자가 CMD키를 입력시 각 입력키를 구분하여 해당 기능 함수를 실행 시킨다.
2. 각 CMD 실행 마다 count++되고 큐브 배치를 확인한다. (최초 규브 배치 시 자동 종료)

| CMD 키| 기능 |
| T | Top면 왼쪽으로 90도 회전|
| T' | Top면 오른쪽으로 90도 회전|
| F | Front면 왼쪽으로 90도 회전|
| F' | Front면 오른쪽으로 90도 회전|
| L | Left면 왼쪽으로 90도 회전|
| L' | Left면 오른쪽으로 90도 회전|
| R | Right면 왼쪽으로 90도 회전|
| R' | Right면 오른쪽으로 90도 회전|
| B | Back면 왼쪽으로 90도 회전|
| B' | Back면 오른쪽으로 90도 회전|
| M | Botton면 왼쪽으로 90도 회전|
| M' | Bottom면 오른쪽으로 90도 회전|
| Q | 게임 종료|

</br>

```js
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
```

3. 커맨드 기능 함수는 배열의 shift, unshift, pop, push로 구현.

```js
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
```

</br>

## 종료 구현

1. 사용자 입력키 중 CMD "Q" 입력시 강제 종료.
2. 경과시간, 조작갯수 확인 기능 구현.

```js
cube.endCude = function () {
  this.endTime = Date.now();
  const totalCount = this.count;
  const recordTime = ((this.endTime - this.startTime) / 1000).toFixed(1);
  resultValue.innerHTML = `<div id="Myspan"> 입력 : ${this.inputValueArray} </br> 경과시간 : ${recordTime}초  </br> 조작갯수 : ${totalCount}번  </br> 이용해주셔서 감사합니다. 뚜뚜뚜.</br>`;
};
```

3. 사용자 조작 중 최초 큐브(정답) 확인 시 자동 종료.
4. 자동 종료 페이지로 넘어가며 경과 시간, 조작 갯수 확인 기능 구현.

```js
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
```

</br>

## 추가 기능 구현

1. <리셋> Reset 버튼 클릭 시 큐브 배치, 카운트, 타임 모두 초기화 된다.

```js
cube.gameReset = function (event) {
  event.preventDefault();
  this.count = 0;
  this.startTime = Date.now();
  resultValue.innerHTML = "";
  this.init();
};
```

2. <믹스> Cube-MIX 버튼 클릭 시 큐브가 랜덤으로 섞인다.
3. 시작 시간이 초기화 된다.
4. 랜덤으로 CMD키 순서를 구현하고 랜덤 횟수 만큼 작동한다.

```js
cube.doMixCube = function (event) {
  event.preventDefault();
  this.startTime = Date.now();
  let cmdArray = [
    "T",
    "T'",
    "F",
    "F'",
    "L",
    "L'",
    "R",
    "R'",
    "B",
    "B'",
    "M",
    "M'",
  ];

  let randomNum = Math.floor(Math.random() * 10 + 1);

  cmdArray.sort(function () {
    return Math.random() - 0.5;
  });

  for (let i = 1; i <= randomNum; i++) {
    cmdArray.forEach((keys) => this.mixCmdDo(keys));
  }
};

cube.mixCmdDo = function (keys) {
  switch (keys) {
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
  }
};
```
