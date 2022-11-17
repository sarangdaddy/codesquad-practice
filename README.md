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
[3. 변경된 입력값 보여주는 함수]($showInputValue)

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

3. 사용자 입력 단어, 정수, 명령어를 입력값 변경 함수의 인자로 전달한다.

```JS
this.changeInputValue(this.userWord, this.userNumber, this.userOrder);
```

<br/>

## changeInputValue

1. 사용자 입력 단어의 순서를 바꾸기 위해 문자열을 배열로 바꿔주는 변수를 만든다.

```JS
let wordArray = word.split("");
```

2. 명령어 값이 "L" 인 경우 정수 N 만큼 wordArray[0]을 제거하고 배열 끝에 집어넣는다.

```JS
if (option === "L") {
    let i = 1;
    while (i <= n) {
        let firstAl = wordArray[0];
        wordArray.splice(0, 1);
        wordArray.push(firstAl);
        ㅑ++;
    }
}
```

3. 명령어 값이 "R" 인 경우 정수 N 만큼 wordArray[wordArray.length -1]를 제거하고 배열 맨 앞에 집어넣는다.

```JS
if (option === "R") {
    let i = 1;
    while (i <= n) {
        let lastAl = wordArray[wordArray.length - 1];
        wordArray.splice(wordArray.length - 1, 1);
        wordArray.unshift(lastAl);
        i++;
    }
   }
```

<br/>

## showInputValue

1. changeInputValue에서 전달 받은 배열 인자를 문자열로 바꿔준다.

```JS
const changedStr = word.join("");
```

2. 변경된 문자열을 span으로 호출한다.

```JS
const span = document.createElement("span");
span.innerHTML = changedStr + "</br>";
showResult.appendChild(span);
```
