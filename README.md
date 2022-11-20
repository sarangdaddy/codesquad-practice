# 2단계: 평면 큐브 구현하기

<details>
<summary> 문제 설명 및 요구사항 </summary>

## 문제 설명

3 X 3의 2차원 배열이 아래처럼 있다.

```
R R W
G C W
G B B
```

사용자 입력을 받아서 아래의 동작을 하는 프로그램을 구현하시오

```
> U  가장 윗줄을 왼쪽으로 한 칸 밀기 RRW -> RWR
> U' 가장 윗줄을 오른쪽으로 한 칸 밀기 RRW -> WRR
> R  가장 오른쪽 줄을 위로 한 칸 밀기 WWB -> WBW
> R' 가장 오른쪽 줄을 아래로 한 칸 밀기 WWB -> BWW
> L  가장 왼쪽 줄을 아래로 한 칸 밀기 RGG -> GRG (L의 경우 R과 방향이 반대임을 주의한다.)
> L' 가장 왼쪽 줄을 위로 한 칸 밀기 RGG -> GGR
> B  가장 아랫줄을 오른쪽으로 한 칸 밀기 GBB -> BGB (B의 경우도 U와 방향이 반대임을 주의한다.)
> B' 가장 아랫줄을 왼쪽으로 한 칸 밀기 GBB -> BBG
> Q  Bye~를 출력하고 프로그램을 종료한다.
```

## 요구사항

- 처음 시작하면 초기 상태를 출력한다.
- 간단한 프롬프트 (CLI에서 키보드 입력받기 전에 표시해주는 간단한 글자들 - 예: CUBE> )를 표시해 준다.
- 한 번에 여러 문자를 입력받은 경우 순서대로 처리해서 매 과정을 화면에 출력한다.

## 동작 예시

```
R R W
G C W
G B B

CUBE> UUR

U
R W R
G C W
G B B

U
W R R
G C W
G B B

R
W R W
G C B
G B R

CUBE> Q
Bye~
```

## 2단계 코딩 요구사항

- 너무 크지 않은 함수 단위로 구현하려고 노력할 것
- 전역변수의 사용을 자제할 것
- 객체와 배열을 적절히 활용할 것

</details>

<br/>

# 구조

기본 큐브 구조는 2차원 배열을 호출하여 간단히 불러온다.
input 값을 구분하여 입력 순서대로 함수를 실행시킨 후 결과값을 호출하는 구조로 구현했다.

### 📑 목차

[1. 입력값 받는 함수](#getInputValue)

[2. 입력값을 각 실행값으로 구분하는 함수](#filterInputValue)

[3. 각 실행값에 따라 결과값을 생성하고 호출하는 함수](#selectCmd)

[4. 살행값에 따라 결과값을 생성(변동)하는 함수](#cmd)

[5. 변경된 결과값을 보여주는 함수]($getResult)

<br/>

## getInputValue

1. button 이벤트로 입력된 값들을 배열로 구분하고 filterInputValue 함수를 실행한다.

```JS
cubeGame.getInputValue = function (event) {
  event.preventDefault();
  const inputText = inputValue.value;
  this.inputArray = inputText.split("");
  this.filterInputValue();
  inputValue.value = "";
};
```

<br/>

## filterInputValue

1. inputArray 값중 "'" 가 존재한다면 "'" 인덱스 앞 인덱스 값에 포함시키고 "'"의 인덱스를 제거한다.

```JS
cubeGame.filterInputValue = function () {
  for (let i = 0; i < this.inputArray.length; i++) {
    if (this.inputArray[i] === "'") {
      this.inputArray[i - 1] = this.inputArray[i - 1] + "'";
      this.inputArray.splice(i, 1);
    }
  }
```

2. inputArray 각 값을 구분하고 결과값을 만들어 주는 selectCmd함수를 실행 한다.

```JS
this.selectCmd();
```

<br/>

## selectCmd

1. inputArray 각 값들의 경우를 switch & case로 판명하여 각 값에 해당하는 cmd함수를 실행한다.

```JS
cubeGame.selectCmd = function () {
  for (let i = 0; i < this.inputArray.length; i++) {
    switch (this.inputArray[i]) {
      case "U":
        this.topLeft();
        break;
      case "U'":
        this.topRight();
        break;
      case "R":
        this.rightUp();
        break;
      case "R'":
        this.rightDoun();
        break;
      case "L":
        this.leftDown();
        break;
      case "L'":
        this.leftUp();
        break;
      case "B":
        this.bottomRight();
        break;
      case "B'":
        this.bottomLeft();
        break;
      case "Q":
        this.endGame();
        break;
    }
  }
};
```

2. 사용자가 입력한 값이 해당 cmd에 존재하지 않는 값이라면 입력 안내 메시지를 뛰운다.

```JS
default:
alert("U, U', R, R', L, L', B, B', Q 만 입력하세요.");
return;
```

3. cmd 실행 후 결과값을 인자로 보내준다.

```JS
this.getResult(this.inputArray[i]);
```

<br/>

## cmd (커멘드)

1. 해당 실행값에 따라 배열위 위치를 바꿔주는 cmd를 실행한다.

```JS
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
```

<br/>

## getResult

1. selectCmd 함수에서 받은 인자 값을 "div" 엘리먼트를 생성하여 화면에 호출한다.

```JS
cubeGame.getResult = function (cmd) {
  let div = document.createElement("div");
  div.className = "result__column";
  div.innerHTML = `${cmd} <br> ${this.cube[0]} <br> ${this.cube[1]} <br> ${this.cube[2]}`;
  showResult.appendChild(div);
};
```
