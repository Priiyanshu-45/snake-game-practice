let snake = [
  {x: 15, y: 15 }
];
let direction = { x: snake[0].x, y: snake[0].y };
let board = document.querySelector(".board");



let now;
function main(current_time) {
  if (!now) {
    now = current_time;
  }
  let delta_time = current_time - now;
  let fps = 1000 / delta_time;
  if (fps < 10) {
    window.requestAnimationFrame(main);
    return;
  }
  else {
    now = current_time;
    // spawnSnake();
    gameLogic();
  }
  window.requestAnimationFrame(main);
}

function gameLogic() {
  //SNAKE
  //food
  //game-over
}


function spawnSnake() {
  let snake_spawn = document.createElement("div");
  snake_spawn.className = "head"
  snake_spawn.style.gridRowStart = snake[0].y;
  snake_spawn.style.gridRowStart = snake[0].x;
  board.appendChild(snake_spawn);
  console.log("Snake Spawn");
}

const head = document.querySelector(".head");

window.addEventListener("load", () => {
  spawnSnake();
})


window.requestAnimationFrame(main); 

window.addEventListener("keydown", (e) => {
    if (e.key == "w") {
      direction.y -= 1;
      direction.x = 0;
      console.log("Pressed: W");
    }
    else if (e.key == "s") {
      direction.y += 1;
      direction.x = 0;
      console.log("Pressed: S");
    }
    else if (e.key == "d") {
      direction.x += 1;
      direction.y = 0;
      console.log("Pressed: D");
    }
    else if (e.key == "a") {
      direction.x -= 1;
      direction.y = 0;
      console.log("Pressed: A");
  }
  head.style.gridArea = `${direction.x}`/`${direction.y}`
});