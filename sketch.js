var bg, bgImg, bulletimgright, bulletimgleft, bulletimgdown, bulletimgup;
var player, shooterImg, shooter_shooting;
var walls, wall, wall1, wall2, wall3, wall4, wall5, wall6, wall7, wall8
var edges
var playerimg
var keyCheck;
var opLeftImg, opRightImg, opDownImg, opUpImg
var min, sec, timer = 61
var bomb,bombimg,explosionimg
function preload() {

  bulletimgright = loadImage("./assets/bullet_right.png")
  bulletimgleft = loadImage("./assets/bullet_left.png")
  bulletimgup = loadImage("./assets/bullet_up.png")
  bulletimgdown = loadImage("./assets/bullet_down.png")
  opLeftImg = loadImage("./assets/operator_left.png")
  opRightImg = loadImage("./assets/operator_right.png")
  opDownImg = loadImage("./assets/operator_down.png")
  opUpImg = loadImage("./assets/operator_up.png")
  bombimg=loadImage("./assets/the_bomb.png")
  explosionimg=loadImage("./assets/explosion.png")
  bgImg = loadImage("./assets/map.png")

}

function setup() {


  createCanvas(windowWidth, windowHeight);
  edges = createEdgeSprites()
  //adding the background image
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20)
  bg.addImage(bgImg)
  bg.scale = 1.2

bomb=createSprite(630,350)
bomb.addImage(bombimg)
bomb.scale=0.3

  //creating the player sprite
  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage(opUpImg)

  player.scale = 0.12
  player.debug = true
  player.setCollider("rectangle", 20, 0, 700, 500);
  player.shapeColor = "green"
  wall = new Group()
}
function gamewalls() {
  wall1 = createSprite(450, 40, 150, 7)
  wall2 = createSprite(370, 120, 7, 170)
  wall3 = createSprite(600, 45, 140, 7)
  wall4 = createSprite(700, 45, 155, 7)
  wall5 = createSprite(850, 45, 200, 7)
  wall6 = createSprite(535, 116, 7, 15)
  wall7 = createSprite(702, 80, 7, 80)
  wall8 = createSprite(618, 191, 150, 7)
  wall.add(wall1)
  wall.add(wall2)
  wall.add(wall3)
  wall.add(wall4)
  wall.add(wall5)
  wall.add(wall6)
  wall.add(wall7)
  wall.add(wall8)

}
function draw() {
  background(0);
  angleMode(DEGREES)

  gamewalls()
  player.collide(wall1)
  player.collide(wall2)
  player.collide(wall3)
  player.collide(wall4)
  player.collide(wall5)
  player.collide(wall6)
  player.collide(wall7)
  player.collide(wall8)
  player.collide(edges[0])
  player.collide(edges[1])
  player.collide(edges[2])

  player.collide(edges[3])
  //moving the player up and down and making the game mobile compatible using touches
  if (keyDown("UP_ARROW") || touches.length > 0) {
    player.y = player.y - 10
    keyCheck = 1
    player.addImage(opUpImg)
  }
  if (keyDown("DOWN_ARROW") || touches.length > 0) {
    player.y = player.y + 10
    keyCheck = 2
    player.addImage(opDownImg)
  }
  if (keyDown("LEFT_ARROW") || touches.length > 0) {
    player.x = player.x - 10
    keyCheck = 3
    player.addImage(opLeftImg)
  }
  if (keyDown("RIGHT_ARROW") || touches.length > 0) {
    player.x = player.x + 10
    keyCheck = 4
    player.addImage(opRightImg)
  }

  //release bullets and change the image of shooter to shooting position when space is pressed
  if (keyWentDown("space")) {
    bullet = createSprite(player.x, player.y, 20, 20)
    bullet.shapeColor = "grey";
    //bullet.addImage(bulletimg)
    bullet.scale = 0.05
    switch (keyCheck) {
      case 1: bullet.velocityY = -22;
        bullet.x = player.x + 13
        bullet.addImage(bulletimgup); break;
      case 2: bullet.velocityY = 22;
        bullet.x = player.x - 13
        bullet.addImage(bulletimgdown); break;
      case 3: bullet.velocityX = -22;
        bullet.y -= 11.5;
        bullet.x = player.x - 30;

        bullet.addImage(bulletimgleft); break;
      case 4: bullet.velocityX = 22;
        bullet.y -= 11.5;
        bullet.x = player.x + 30;

        bullet.addImage(bulletimgright); break;

      default:
        break;
    }

  }

  //player goes back to original standing image once we stop pressing the space bar




  drawSprites();

  textSize(17)
  fill("white")
  text("X: " + mouseX + " y: " + mouseY, mouseX, mouseY)
  //setTimeout(() => {
  if (timer <= 61) {
    min = Math.floor(timer / 60)
    sec = Math.floor(timer % 60)
    setTimeout(function(){
      timer = timer - 1
    }, 1000)
  }
  textSize(25)
  fill("white")
  console.log(timer)
  if (timer > 0) {
    text(min + " : " + sec, 1000, 100)
  }
  else {
    text("Game Over", 1000, 100);
   wall.destroyEach()
   wall.setVisibleEach(false);
    bomb.addImage(explosionimg)
   
    bomb.scale = 1
  }

  // }, 1000);





}
function gametimer() {

  textSize(25)
  fill("white")



  while (timer > 0) {

    min = Math.floor(timer / 60)
    sec = Math.floor(timer % 60)
    timer = timer - 1
    text(min + " : " + sec, 1000, 100)
  }

}