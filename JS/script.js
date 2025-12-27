let Score = 0;
let HiScore = 0;
let direction = { x: 0, y: 0 };
let snakePosition = [
  { x: 15, y: 16 }
]
let foodPosition = { x : 0, y : 0 };
let song = new Audio("assets/song.mp3");
function startGame() {
    alert("Welcome to Snake! Click OK to Start Music and Play.");
    song.play();
}

window.addEventListener("load", startGame);
