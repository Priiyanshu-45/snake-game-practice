let Score = 0;
let HiScore = 0;
let direction = { x: 0, y: 0 };
let snakePosition = [
  { x: 12, y: 14 }
]
let foodPosition = { x : 5, y : 12 };
let song = new Audio("assets/song.mp3");


let speed = 6;
let timeMsr = 0;
function main(timestamp) {
  window.requestAnimationFrame(main);
  let timeElapsed = (timestamp - timeMsr) / 1000;
  if (timeElapsed < 1 / speed) {
    return;
  }
  timeMsr = timestamp;
  gameLogic();
  render();
}

let isSpawned = 0;
function gameLogic() {
  if (!isSpawned) {
    spawning();
    return;
  }
  move();
  if (isCollide()) restart();
}


function spawning() {
  //spawning snake 
  snakePosition[0].x = Math.floor(Math.random() * (10)) + 1;
  snakePosition[0].y = Math.floor(Math.random() * (10)) + 10;
  //spawning food
  foodPosition.x = Math.floor(Math.random() * (10)) + 10;
  foodPosition.y = Math.floor(Math.random() * (10)) + 1;
  isSpawned = 1;
}

function spawnfood() {
    Score += 1;
    let flag = 0;
    let newX;
    let newY;
    while(!flag) {
    newX = Math.floor(Math.random() * (20)) + 1;
    newY = Math.floor(Math.random() * (20)) + 1;
    flag = 1;
    for (let i = 0; i < snakePosition.length; i++){
      if (newX == snakePosition[i].x && newY == snakePosition[i].y) {
        flag = 0;
        break;
      }
      }
    }
    foodPosition.x = newX;
    foodPosition.y = newY;
    speed += 0.2;
}

function move() {
  if (direction.x === 0 && direction.y === 0) return;
  snakePosition.unshift({ x: (snakePosition[0].x + direction.x), y: (snakePosition[0].y + direction.y) })
  if ((snakePosition[0].x == foodPosition.x) && (snakePosition[0].y == foodPosition.y)) {
    spawnfood();
   }
  else {
    snakePosition.pop();
  }
}

function isCollide() {
  //self collision
  if (snakePosition.length > 1 && (direction.x !== 0 || direction.y !== 0)) { 
    for (let i = 1; i < snakePosition.length; i++) {
        if (snakePosition[i].x == snakePosition[0].x && snakePosition[i].y == snakePosition[0].y) {
            return true;
        }
    }
  } 
  // boundry collision 
  if (snakePosition[0].x < 1 || snakePosition[0].x > 20 || 
      snakePosition[0].y < 1 || snakePosition[0].y > 20) {
    return true;
  }
  return false;
}

function restart() {
  console.log("Game Over!");
  direction = { x: 0, y: 0 };
  Score = 0;
  speed = 6;
  snakePosition = [{ x: 4, y: 8 }];
  foodPosition = { x: 1, y: 1 };
  isSpawned = 0;
  song.pause();
}


window.addEventListener("keydown", (e) => {
  if (song.paused) {
    song.play();
    song.loop = true; 
  }
  if ((e.key == "ArrowUp" || e.key == "w" || e.key == "W") && direction.y != 1) {
    direction.y = -1;
    direction.x = 0;
  }
  else if ((e.key == "ArrowDown" || e.key == "s" || e.key == "S") && direction.y != -1) {
    direction.y = 1;
    direction.x = 0;
  }
  else if ((e.key == "ArrowLeft" || e.key == "a" || e.key == "A") && direction.x != 1) {
    direction.y = 0;
    direction.x = -1;
  }
  else if ((e.key == "ArrowRight" || e.key == "d" || e.key == "D") && direction.x != -1) {
    direction.y = 0;
    direction.x = +1;
  }
})

function gamePad() {
  let Gamepad = document.querySelector(".GamePad");
  Gamepad.addEventListener("pointerdown", (e) => {
    if (song.paused) {
    song.play();
    song.loop = true; 
    }
    if (e.target.tagName == "BUTTON") {
    if (e.target.id == "w" && direction.y != 1) {
    direction.y = -1;
    direction.x = 0;
    }
    else if (e.target.id == "s" && direction.y != -1) {
      direction.y = 1;
      direction.x = 0;
    }
    else if (e.target.id == "a" && direction.x != 1) {
      direction.y = 0;
      direction.x = -1;
    }
    else if (e.target.id == "d" && direction.x != -1) {
      direction.y = 0;
      direction.x = +1;
    }     
}
  })
}
gamePad();

function render() {
  let score = document.querySelector("#score");
  let hiscore = document.querySelector("#hiscore");
  score.textContent = `Score: ${Score}`;
  if (Score > HiScore) {
    hiscore.textContent = `HiScore: ${Score}`;
    HiScore = Score;
  }
  saveScore();
  let board = document.querySelector(".board")
  board.innerHTML = "";
  let food = document.createElement("div");
  food.className = "food";
  food.style.gridRowStart = foodPosition.y;
  food.style.gridColumnStart = foodPosition.x;
  board.appendChild(food);
  for (let i = 0; i < snakePosition.length; i++){
    let div = document.createElement("div");
    if (i == 0) div.className = "head";
    else div.className = "body";
    div.style.gridRowStart = snakePosition[i].y;
    div.style.gridColumnStart = snakePosition[i].x;
    board.appendChild(div);
  }
}

function saveScore() {
  localStorage.setItem("hiScore", HiScore);
}

window.addEventListener("load", () => {
  let hiscore = document.querySelector("#hiscore");
  hiscore.textContent = `HiScore: ${localStorage.getItem("hiScore")}`;
});


window.requestAnimationFrame(main);



