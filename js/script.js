var canvas = document.querySelector(".canvas");

var ctx = canvas.getContext("2d");

var penguinImg = new Image();
penguinImg.src = "./images/jumping-penguin.jpg";

var penguin = {
  height: 100,
  jumping: true,
  width: 100,
  x: 144, // center of the canvas
  x_velocity: 0,
  y: 0,
  y_velocity: 0,

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
    this.width = pipeWidth;
    this.height = pipeHeight;
  }
  drawMe() {
    this.y += 2;
    if (this.y > 550) {
      this.y = 0;
    }
    ctx.fillRect(this.x, this.y, this.width, this.height);

    if (this.x < this.width) {
      this.x = 1200;
    }
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

new Pipe(970, 0, 30, 250);

// document.onkeydown = function(event) {
//   event.preventDefault();
//   switch (event.keyCode) {
//     case 37: //left arrow
//       penguin.x -= 10;
//       break;
//     case 38: //up arrow
//       penguin.y -= 10;
//       break;
//     case 39: //right arrow
//       penguin.x += 10;
//       break;
//     case 40: //down arrow
//       penguin.y += 10;
//       break;
//   }
// };

function drawingLoop() {
  ctx.clearRect(0, 0, 1200, 550);
  // penguin.y += 2;
  // if (penguin.y > 550) {
  //   penguin.y = 0;
  // }

  drawEverything();

  requestAnimationFrame(function() {
    drawingLoop();
  });
}

function drawEverything() {
  penguin.drawMe();
  allPipes.forEach(function(onePipe) {
    onePipe.drawMe();
  });
}

allPipes = [
  new Pipe(Math.floor(Math.random() * canvas.width), 15, 80, 16),
  new Pipe(Math.floor(Math.random() * canvas.width), 60, 80, 16),
  new Pipe(Math.floor(Math.random() * canvas.width), 90, 80, 16),
  new Pipe(Math.floor(Math.random() * canvas.width), 130, 80, 16),
  new Pipe(Math.floor(Math.random() * canvas.width), 170, 80, 16),
  new Pipe(Math.floor(Math.random() * canvas.width), 200, 80, 16),
  new Pipe(Math.floor(Math.random() * canvas.width), 250, 80, 16),
  new Pipe(Math.floor(Math.random() * canvas.width), 300, 80, 16),
  new Pipe(Math.floor(Math.random() * canvas.width), 350, 80, 16),
  new Pipe(Math.floor(Math.random() * canvas.width), 400, 80, 16),
  new Pipe(Math.floor(Math.random() * canvas.width), 450, 80, 16)
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
    penguin.y_velocity -= 20;
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
  // if rectangle is falling below floor line
  if (penguin.y > 550 - 50 - 100) {
    penguin.jumping = false;
    penguin.y = 550 - 50 - 100;
    penguin.y_velocity = 0;
  }

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


function Collision(rectA, rectB) {
  return (
    rectA.y + rectA.height >= rectB.y &&
    rectA.y <= rectB.y + rectB.height &&
    rectA.x + rectA.width >= rectB.x &&
    rectA.x <= rectB.x + rectB.width
  );
}


// allPipes.forEach(function(p, i) {
//   if (
//     penguin.y > 0 &&
//     p.state === 0 &&
//     penguin.x < p.x + p.width &&
//     penguin.x + penguin.width > p.x &&
//     penguin.y + penguin.height > p.y &&
//     penguin.y + penguinr.height < p.y + p.height
//   ) {
//     if (p.type == 3 && p.flag === 0) {
//       p.flag = 1;
//       jumpCount = 0;
//       return;
//     } else if (p.type == 4 && p.state === 0) {
//       penguin.jump();
//       p.state = 1;
//     } else if (p.flag == 1) return;
//     else {
//       penguin.jump();
//     }
//   }
// });

// EXAMPLE

// var context, controller, rectangle, loop;

// context = document.querySelector("canvas").getContext("2d");

// context.canvas.height = 180;
// context.canvas.width = 320;

// rectangle = {
//   height: 32,
//   jumping: true,
//   width: 32,
//   x: 144, // center of the canvas
//   x_velocity: 0,
//   y: 0,
//   y_velocity: 0
// };

// controller = {
//   left: false,
//   right: false,
//   up: false,
//   keyListener: function(event) {
//     var key_state = event.type == "keydown" ? true : false;

//     switch (event.keyCode) {
//       case 37: // left key
//         controller.left = key_state;
//         break;
//       case 38: // up key
//         controller.up = key_state;
//         break;
//       case 39: // right key
//         controller.right = key_state;
//         break;
//     }
//   }
// };

// loop = function() {
//   if (controller.up && rectangle.jumping == false) {
//     rectangle.y_velocity -= 20;
//     rectangle.jumping = true;
//   }

//   if (controller.left) {
//     rectangle.x_velocity -= 0.5;
//   }

//   if (controller.right) {
//     rectangle.x_velocity += 0.5;
//   }

//   rectangle.y_velocity += 1.5; // gravity
//   rectangle.x += rectangle.x_velocity;
//   rectangle.y += rectangle.y_velocity;
//   rectangle.x_velocity *= 0.9; // friction
//   rectangle.y_velocity *= 0.9; // friction

//   // if rectangle is falling below floor line
//   if (rectangle.y > 180 - 16 - 32) {
//     rectangle.jumping = false;
//     rectangle.y = 180 - 16 - 32;
//     rectangle.y_velocity = 0;
//   }

//   // if rectangle is going off the left of the screen
//   if (rectangle.x < -32) {
//     rectangle.x = 320;
//   } else if (rectangle.x > 320) {
//     // if rectangle goes past right boundary

//     rectangle.x = -32;
//   }

//   context.fillStyle = "#202020";
//   context.fillRect(0, 0, 320, 180); // x, y, width, height
//   context.fillStyle = "#ff0000"; // hex for red
//   context.beginPath();
//   context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
//   context.fill();
//   context.strokeStyle = "#202830";
//   context.lineWidth = 4;
//   context.beginPath();
//   context.moveTo(0, 164);
//   context.lineTo(320, 164);
//   context.stroke();

//   // call update when the browser is ready to draw again
//   window.requestAnimationFrame(loop);
// };

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
