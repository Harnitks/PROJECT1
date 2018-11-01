var canvas = document.querySelector(".canvas");

canvas.style.visibility = "hidden";

var startBtn = document.querySelector(".start");
var startScreen = document.querySelector(".game-start");
var header = document.querySelector("header");
startBtn.onclick = function() {
  canvas.style.visibility = "visible";
  startScreen.style.display = "none";
  header.style.display = "block";
};

var ctx = canvas.getContext("2d");

var penguinImg = new Image();
penguinImg.src = "./images/jumping-penguin.png";

var penguin = {
  height: 90,
  jumping: true,
  width: 90,
  x: 144, // center of the canvas
  x_velocity: 0,
  y: 0,
  y_velocity: 0,
  ground: 275,
  isStart: true,
  firstPlatform: null,

  drawMe: function() {
    ctx.drawImage(penguinImg, this.x, this.y, this.width, this.height);
  }
};
penguinImg.onload = function() {
  ctx.drawImage(penguinImg, this.x, this.y, this.width, this.height);
};

class Pipe {
  constructor(pipeX, pipeY, pipeWidth, pipeHeight) {
    this.x = pipeX;
    this.y = pipeY;
    this.targetY = pipeY;
    this.width = pipeWidth;
    this.height = pipeHeight;
  }
  drawMe() {
    if (this.y < this.targetY) {
      this.y += 2;
    }
    ctx.fillRect(this.x, this.y, this.width, this.height);

    if (this.y > 550) {
      this.x = Math.floor(Math.random() * canvas.width);
      this.y = Math.floor(Math.random() * -canvas.height);
      this.targetY = this.y;
    }
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

new Pipe(970, 0, 30, 250);

var collisionObj = new Collision();
var restartBtn = document.querySelector(".restart");
function drawingLoop() {
  ctx.clearRect(0, 0, 1200, 550);
  drawEverything();

  if (penguin.y > 550) {
    gameOverSection();
  }
  if (score === 1000) {
    gameEndSection();
  }
  requestAnimationFrame(function() {
    drawingLoop();
  });
}

function drawEverything() {
  penguin.drawMe();
  allPipes.forEach(function(onePipe) {
    onePipe.drawMe();
  });

  var allStopped = allPipes.every(function(pipe) {
    return pipe.y >= pipe.targetY;
  });
  if (allStopped) {
    penguin.ground = 275;
  }
}

allPipes = [
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height),
    80,
    16
  ),

  //----------------
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * -canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * -canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * -canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * -canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * -canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * -canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * -canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * -canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * -canvas.height),
    80,
    16
  ),
  new Pipe(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * -canvas.height),
    80,
    16
  )
];
ctx.fillRect(970, 200, 330, 10);

drawingLoop();

controller = {
  left: false,
  right: false,
  up: false,
  keyListener: function(event) {
    var key_state = event.type == "keydown" ? true : false;

    switch (event.keyCode) {
      case 37: // left key
        controller.left = key_state;

        break;
      case 38: // up key
        controller.up = key_state;

        console.log("hey");

        break;
      case 39: // right key
        controller.right = key_state;

        break;
    }
  }
};

var loop = function() {
  if (controller.up && penguin.jumping == false) {
    penguin.y_velocity -= 30;
    penguin.jumping = true;
  }

  if (controller.left) {
    penguin.x_velocity -= 0.5;
  }

  if (controller.right) {
    penguin.x_velocity += 0.5;
  }

  penguin.y_velocity += 0.3; // gravity
  penguin.x += penguin.x_velocity;
  penguin.y += penguin.y_velocity;
  penguin.x_velocity *= 0.9; // friction
  penguin.y_velocity *= 0.9; // friction

  collisionObj.checkCollisionOfPlayerPlatforms(penguin, allPipes);

  // if rectangle is going off the left of the screen
  if (penguin.x < -50) {
    penguin.x = 1200;
  } else if (penguin.x > 1200) {
    // if penguingoes past right boundary

    penguin.x = -100;
  }

  ctx.beginPath();
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, 164);
  ctx.stroke();

  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controller, controller.keyListener);
window.addEventListener("keyup", controller, controller.keyListener);
window.requestAnimationFrame(loop);

/*Collision Detection of Two Objects*/
function Collision() {
  /*Check if Object A reaches on top of Object B*/
  this.checkTopCollision = function(objectA, objectB) {
    // console.log({ objectA, objectB });
    if (
      objectA.x + objectA.width > objectB.x &&
      objectA.x < objectB.x + objectB.width
    ) {
      /*if Object A is in X-axis region of Object B*/
      if (
        objectA.y + objectA.height >= objectB.y &&
        objectA.y < objectB.y &&
        objectA.y + objectA.height < objectB.y + objectB.height
      ) {
        /*if Object A bottom is on top of Object B*/
        return true;
      }
    }
    return false;
  };

  /*Check if Object A collides with Object B in any direction*/
  this.checkCollision = function(objectA, objectB) {
    if (
      objectA.x + objectA.width > objectB.x &&
      objectA.x < objectB.x + objectB.width
    ) {
      /*if Object A is in X-axis region of Object B*/
      if (
        objectA.y + objectA.height > objectB.y &&
        objectA.y < objectB.y + objectB.height
      ) {
        /*if Object A bottom is besides of Object B*/
        return true;
      }
    }
    return false;
  };

  /*check collision of player and platforms (top collision)*/
  this.checkCollisionOfPlayerPlatforms = function(player, platforms) {
    for (var i = 0; i < platforms.length; i++) {
      if (this.checkTopCollision(player, platforms[i])) {
        // player.animation.resetYValueAfterCollision(platforms[i].y);

        player.y = platforms[i].y - 90;
        player.y_velocity = 0;
        player.jumping = false;
        // player.platformType = platforms[i].type;
        // platforms[i].changeSpringSprite();
        if (player.y < player.ground) {
          if (player.isStart) {
            player.isStart = false;
            player.firstPlatform = player.y;
          }

          if (player.y !== player.firstPlatform) {
            var yDifference = player.ground - player.y;
            player.ground = player.y;
            movePlatforms(yDifference);
            score += 50;
            scoreCounter.innerHTML = score;
            console.log(score);
          }
        }

        return true;
      }
    }
    return false;
  };
}

var score = 0;
var scoreCounter = document.querySelector(".score");

function movePlatforms(difference) {
  allPipes.forEach(function(onePipe) {
    onePipe.targetY += difference;
  });
}

var gameOverScreen = document.querySelector(".game-over");
function gameOverSection() {
  gameOverScreen.style.display = "flex";
}

var gameEndScreen = document.querySelector(".game-end");
function gameEndSection() {
  gameEndScreen.style.display = "flex";
}

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
