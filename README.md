# 1단계: 단어 밀어내기 구현하기

<details>
<summary> 문제 설명 및 요구사항 </summary>

## 문제 설명

1. 입력: 사용자로부터 단어 하나, 정수 숫자 하나( -100 <= N < 100) , L 또는 R을 입력받는다. L 또는 R은 대소문자 모두 입력 가능하다.
2. 주어진 단어를 L이면 주어진 숫자 갯수만큼 왼쪽으로, R이면 오른쪽으로 밀어낸다.
3. 밀려나간 단어는 반대쪽으로 채워진다.

## 입력 및 출력 예시

홀수 줄은 입력, 짝수 줄은 출력이다.

```
> apple 3 L
leapp

> banana 6 R
banana

> carrot -1 r
arrotc

> cat -4 R
atc
```

## 1단계 코딩 요구사항

- 컴파일 및 실행되지 않을 경우 불합격
- 자기만의 기준으로 최대한 간결하게 코드를 작성한다.
</details>

<br/>

# 구조

사용자의 입력 내용을 받아 프로그래밍으로 내용을 변경하고 호출하는 함수로 구현했다.

### 📑 목차

[1. 입력값 받는 함수](#getInputValue)

[2. 입력값 변경하는 함수](#changeInputValue)

[3. 조건에 따라 왼쪽으로 이동 시키는 함수](#pushLeft)

[4. 조건에 따라 오른쪽으로 이동 시키는 함수](#pushRight)

[5. 변경된 입력값 보여주는 함수]($showInputValue)

<br/>

## getInputValue

1. Button event로 입력값을 함수로 보낸다.

```JS
inputBtn.addEventListener("click", moveStr.getInputValue.bind(moveStr));
```

2. 스페이스를 기준으로 입력값을 배열로 전달한다.

```JS
this.arrayWord = stringWord.split(" ");
this.userWord = this.arrayWord[0];
this.userNumber = Number(this.arrayWord[1]);
this.userOrder = this.arrayWord[2].toUpperCase();
```

3. 사용자 입력 정수, 명령어를 입력값 변경 함수의 인자로 전달한다.

```JS
this.changeInputValue(this.userNumber, this.userOrder);
```

<br/>

## changeInputValue

1. 전달 받은 입력값 N과 명령어에 따라 문자열 순서를 바꿔주는 pushLeft, pushRight함수를 실행한다.

```JS
  if ((n >= 0 && option === "L") || (n < 0 && option === "R")) {
    this.pushLeft(Math.abs(n));
  }
  if ((n >= 0 && option === "R") || (n < 0 && option === "L")) {
    this.pushRight(Math.abs(n));
  }
```

<br/>

## pushLeft

1. wordArray의 첫번째 인덱스를 제거하고 push를 이용해 배열 제일 끝으로 이동시킨다.

```JS
  for (let i = 0; i < n; i++) {
    let firstAl = wordArray[0];
    wordArray.splice(0, 1);
    wordArray.push(firstAl);
  }
```

2. 순서가 바뀐 wordArray를 showInputValue함수에 전달 한다.

```JS
this.showInputValue(wordArray);
```

<br/>

## pushRight

1. wordArray의 마지막 인덱스를 제거하고 unshift를 이용해 배열 처음으로 이동시킨다.

```JS
  for (let i = 0; i < n; i++) {
    let lastAl = wordArray[wordArray.length - 1];
    wordArray.splice(wordArray.length - 1, 1);
    wordArray.unshift(lastAl);
  }
```

2. 순서가 바뀐 wordArray를 showInputValue함수에 전달 한다.

```JS
this.showInputValue(wordArray);
```

<br/>

## showInputValue

1. pushLeft, pushRight에서 전달 받은 배열 인자를 문자열로 바꿔준다.

```JS
const changedStr = word.join("");
```

2. 변경된 문자열을 span으로 호출한다.

```JS
const span = document.createElement("span");
span.innerHTML = changedStr + "</br>";
showResult.appendChild(span);
```
