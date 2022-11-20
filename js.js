const cubeTop = document.querySelector(".cube__top");
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

cubeTop.innerHTML = `${cube.topFace[0]} </br> ${cube.topFace[1]} </br> ${cube.topFace[2]}`;
