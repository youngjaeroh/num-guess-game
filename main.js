let computerNum = 0;
let chances = 5;

let playButton = document.getElementById("play-button");
let userInput = document.querySelector("#user-input");
let resetButton = document.querySelector(".button-reset");

let resultAreaImg = document.querySelector(".main-img");

let resultText = document.querySelector(".result-text");
let chanceArea = document.getElementById("chance-area");
let questionArea = document.getElementById("question-area");

let history = [];
let gameOver = false;
let question = [
  "EBS 세계테마기행 중 '술탄의 맛 터키에 빠지다'의 방영 날짜는? 2013년 9월 00일",
  "터키 이스타불 지하철 중 가장 오래된 지하철인 튀넬의 최초 개통 날짜는? 1875년 1월 00일",
  "대한민국과 터키의 관계는 일명 형제의 나라라고 불리는데, 한국의 작곡가 용감한 형제의 생일은? 5월 00일",
  "터키와 한국의 국교수립일은 언제일까요? 1957년 3월 00일",
  "터키석 목걸이를 부적처럼 사용한다는 산악인 엄홍길 대장님이 에베레스트를 등반한 날짜는 언제일까요? 1998년 9월 00일",
];
let answer = [23, 17, 1, 8, 26];
let quest = "";

function pickRandomNum() {
  let randomNum = Math.floor(Math.random() * 10) % 4;
  quest = question[randomNum];
  computerNum = answer[randomNum];
  console.log("정답", randomNum, computerNum);
}
pickRandomNum();

chanceArea.innerHTML = `남은 기회:${chances}`;
questionArea.innerHTML = `${quest}`;
playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = "";
});

function play() {
  if (userInput.value < 1 || userInput.value > 31) {
    resultText.textContent = "1부터 31 사이의 값을 입력해주세요.";
    return;
  }

  if (history.includes(userInput.value)) {
    resultText.textContent =
      "이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요";
    return;
  }

  history.push(userInput.value);

  if (userInput.value < computerNum) {
    resultAreaImg.src =
      "https://media1.giphy.com/media/3o7TKHVU0xsgGDCyPu/giphy.gif?cid=ecf05e47crkx1t8ny9dywqev0290tjolcpemorc21tja4fnv&rid=giphy.gif&ct=g";
    resultText.textContent = "UP!!!";
  } else if (userInput.value > computerNum) {
    resultAreaImg.src =
      "https://media0.giphy.com/media/26n6V5D3LWkDxj5GE/giphy.gif?cid=ecf05e47vaj3y5zndxt6agruh7cebaqdaicnev8yfpvs1xbx&rid=giphy.gif&ct=g";
    resultText.textContent = "DOWN!!!";
  } else {
    resultAreaImg.src =
      "https://media2.giphy.com/media/ummeQH0c3jdm2o3Olp/giphy.gif?cid=ecf05e47uzpxdj6pkymphovbncjgfwyga4id4jht398ussio&rid=giphy.gif&ct=g";
    resultText.textContent = "CORRECT!!!";
    gameOver = true;
  }

  chances--;
  chanceArea.textContent = `남은기회 ${chances}`;

  if (chances < 1) {
    gameOver = true;
  }
  if (gameOver == true) {
    playButton.disabled = true;
  }
}

function reset() {
  pickRandomNum();
  userInput.value = "";
  resultAreaImg.src =
    "https://opgg-com-image.akamaized.net/attach/images/20190421115348.377976.gif";
  resultText.textContent = "up down으로 드립니다";
  gameOver = false;
  chances = 5;
  playButton.disabled = false;
  questionArea.innerHTML = `${quest}`;
  chanceArea.innerHTML = `남은 기회:${chances}`;
  history = [];
}
