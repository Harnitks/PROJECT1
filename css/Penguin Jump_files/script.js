var canvas = document.querySelector(".canvas");

var ctx = canvas.getContext("2d");

var penguinImg = new Image();
penguinImg.src = "./images/jumping-penguin.jpg";

var penguinX = 850;
var penguinY = 250;

penguinImg.onload = function() {
  ctx.drawImage(penguinImg, penguinX, penguinY, 150, 150);
};
