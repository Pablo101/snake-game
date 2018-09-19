var vx=10;
var vy=10;
var snakeX = 50;
var snakeY = 50;
// var snakeSpeed = 750;
var canvas;
var canvasContext;
var appleX = 100;
var appleY = 100;
var leftKey = false;
var rightKey = true;
var upKey = false;
var downKey = true;
var blockSize = 15;
var ateApple = false;

var snakeTail = 0;
var snakeThickness = 20;
var snakeHeight = 20;
var appleThickness = 20;
var appleHeight = 20;
var monster = new Image()
monster.src = "monster.png"
var monsterX = 162;
var monsterY = 162;

window.onload = function() {
  console.log("HELLO")
  canvas= document.getElementById('gameCanvas')
  canvasContext = canvas.getContext('2d')
  var framesPerSecond = 20;
  setInterval(function() {
    drawFrame();
    eatFood();
    drawBorder();
    collision();
    apple();
    monsterCollision();
  }, 1000/framesPerSecond)

document.addEventListener('keydown', userInput)
}
function monsterCollision() {
  if (snakeX === monsterX && snakeY === monsterY) {
    console.log('dead')
window.location.reload();
  }
}
function drawFrame() {
  var speed = 8;
  if (leftKey === true) {
    snakeX -= speed;
  } else if (rightKey === true) {
    snakeX += speed;
  }
  if (upKey === true) {
    snakeY -= speed;
  } else if (downKey === true) {
    snakeY += speed;
  }

//draws out canvas
  canvasContext.fillStyle = 'pink'
  canvasContext.fillRect(0,0, canvas.width, canvas.height)
  canvasContext.strokeStyle = 'black';
  canvasContext.strokeRect(0, 0, canvas.width, canvas.height)

  //draws out snake
  canvasContext.fillStyle = 'green';
  canvasContext.fillRect(snakeX,snakeY, snakeThickness, snakeHeight)
  canvasContext.strokeStyle = 'black';
  canvasContext.strokeRect(0, 0, canvas.width, canvas.height)

var pat = canvasContext.createPattern(monster, "repeat")
  canvasContext.fillStyle = pat;
  // canvasContext.fillStyle = 'pink';
  canvasContext.fillRect(monsterX,monsterY, snakeThickness, snakeHeight)
  canvasContext.strokeStyle = 'black';
  canvasContext.strokeRect(0, 0, canvas.width, canvas.height)
//
//
// this checks whether the top left corner of appleX is more left than snakeX
//and if the right top corner of appleX is more right than snakeX
  if (snakeTail > 0 ) {
    // console.log( snakeTail );
    for (var i = 0; i < snakeTail; i++) {
// draw one snake tail section
      canvasContext.fillStyle = 'green';
      canvasContext.fillRect(snakeX - snakeThickness*i,snakeY, snakeThickness, snakeHeight)
      canvasContext.strokeStyle = 'black';
      canvasContext.strokeRect(0, 0, canvas.width, canvas.height)
    }
  }
}


var drawBorder = function() {
  //top border
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0,0, 400, 3);
  //bottom border
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0,397,400, 3);
  //left border
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0,0,3, 400);
  //right border
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(397,0,3, 400);
}

function userInput(event) {
  console.log('movement keypress', event.keyCode)

if (event.keyCode === 40 ) {
// console.log('press down key')
  downKey = true;
  upKey = false;
  // rightKey = false;
  // leftKey = false;
}
if (event.keyCode === 39 ) {
// console.log('press down key')
  // snakeX += 10;
  rightKey = true;
  leftKey = false;
  // upKey = false;
  // downKey = false;

}
if (event.keyCode === 38 ) {
// console.log('press down key')
  // snakeY -= 10;
  upKey = true;
  // downKey = false;
  // rightKey = false;
  // leftKey = false
}
if (event.keyCode === 37 ) {
  leftKey = true;
  // rightKey = false;
  // downKey = false;
  // upKey = false;
 }
}
//collision against walls
function collision() {
  // console.log(snakeX, snakeY
  // debugger;
  if (snakeX < 0){
    // console.log('collide left wall')
      window.location.reload();
  }
  if (snakeX > canvas.width) {
    // console.log('collide right wall')
      window.location.reload();
  }
  if (snakeY < 0) {
    // console.log('collide top wall')
      window.location.reload();
  }
  if (snakeY > canvas.height ) {
    // console.log('collide bottom wall')
      window.location.reload();
  }
};

function eatFood() {
// this checks whether the top left corner of appleX is more left than snakeX
//and if the right top corner of appleX is more right than snakeX
  if (appleY < snakeY && appleY + 12 > snakeY && appleX < snakeX && appleX + 12 > snakeX) {
    ateApple = false;
    snakeTail++;
    appleX = Math.random()*canvas.width
    appleY = Math.random()*canvas.height
    console.log('you ate food')
  }
}

function apple() {
  if (ateApple === false) {
    canvasContext.fillStyle = 'red';
    canvasContext.fillRect(appleX,appleY, appleThickness, appleHeight)
    canvasContext.strokeStyle = 'black';
    canvasContext.strokeRect(appleX, appleY, appleThickness, appleHeight)
  }
}
