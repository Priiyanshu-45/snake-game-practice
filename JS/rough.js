let board = document.querySelector(".board");
let direction = { x: 0, y: 0 };
let snake = [
  { x: 12, y: 15 }
];
let score = 0;
let speed = 10;
let position = { x: snake[0].x, y: snake[0].y };
let foodPos = { x: 10, y: 10 };

let currentTime = 0;
function main(timestamp) {
  window.requestAnimationFrame(main);
  let deltaTime = (timestamp - currentTime) / 1000;
  if (deltaTime < 1 / speed) {
    return;
  }
  currentTime = timestamp;
  gameLogic();
}

let snakeSpawned = 0;
function gameLogic() {
  if (!snakeSpawned) {
    // For snake head and food
    Spawn();
    snakeSpawned = 1;
  }
  else {
    let head = document.querySelector(".head");
    head.style.gridRowStart = `${position.y}`;
    head.style.gridColumnStart = `${position.x}`;
    position.x += direction.x;
    position.y += direction.y;
    ValidatePosition(position);
    spawnfood();
  }
}

function Spawn(){
    board.innerHTML = " ";
    let head = document.createElement("div");
    head.className = "head";
    head.style.gridRowStart = `${position.y}`;
    head.style.gridColumnStart = `${position.x}`;
    board.appendChild(head);
    let food = document.createElement("div");
    food.className = "food";
    food.style.gridRowStart = `${foodPos.y}`;
    food.style.gridColumnStart = `${foodPos.x}`;
    board.appendChild(food);
}


window.addEventListener("keydown", (e) => {
    if (e.key == "w") {
      direction.y = -1;
      direction.x = 0;
    }
    else if (e.key == "s") {
      direction.y = 1;
      direction.x = 0;
    }
    else if (e.key == "d") {
      direction.y = 0;
      direction.x = 1;
    }
    else if (e.key == "a") {
      direction.y = 0;
      direction.x = -1;
  }
})



function spawnfood() {
  if (foodPos.x == position.x && foodPos.y == position.y) {
  let x = Math.floor(Math.random() * 20) + 1;
  let y = Math.floor(Math.random() * 20) + 1;
  console.log("food x " +  foodPos.x);
  console.log("food y " + foodPos.y);
  if (x == position.x && y == position.y) spawnfood();
  else {
    foodPos.x = x;
    foodPos.y = y;
    document.querySelector(".food").style.gridColumnStart = foodPos.x;
    document.querySelector(".food").style.gridRowStart = foodPos.y;
    speed += 0.1;
  }
  };
}

function ValidatePosition(pos) {
  if (!((1 <= pos.x && pos.x <= 20) && (1 <= pos.y && pos.y <= 20))) {
    Spawn();
  }
}

window.requestAnimationFrame(main);

