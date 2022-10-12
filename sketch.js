
var flappy, flappyImg;

var topPipe, botPipe;
var topPipeImg, botPipeImg;

var back, backImg;

var gameOver, gameOverImg;

var score = 0;

var playing = true;

function preload() {

  flappyImg = loadImage("flappyBirdTest.png");
  backImg = loadImage("background.png");
  botPipeImg = loadImage("botPipe.png");
  topPipeImg = loadImage("topPipe.png");
  gameOverImg = loadImage("GameOver.png");

}


function setup() {
  
  createCanvas(1536,768);

  gameOver = createSprite(768,384,1000,1000);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  back = createSprite(1536/2, 768/2 ,1,1);
  back.addImage(backImg);
  back.scale = 1.2;
  back.velocity.x = -10;
  back.depth = -200;

  flappy = createSprite(300,200,60,20);
  
  flappy.addImage(flappyImg);
  flappy.scale = 0.2;
  flappy.setCollider("circle",flappy.position.x-320,flappy.position.y-175,150);
  // flappy.debug = true;
  flappy.depth = -100;
  
  botPipe = createSprite(1300,700,10,10);
  botPipe.addImage(botPipeImg);
  botPipe.velocity.x = -10;
  botPipe.setCollider("rectangle",botPipe.position.x-1300,botPipe.position.y-520,100,1000);
  // botPipe.debug = true;
  botPipe.depth = -100;
  
  topPipe = createSprite(1300,-100,10,10);
  topPipe.addImage(topPipeImg);
  topPipe.velocity.x = -10;
  topPipe.setCollider("rectangle",topPipe.position.x-1300,topPipe.position.y-80,100,1000);
  // topPipe.debug = true;
  topPipe.depth = -100;



}


function draw() {
  
  background("grey");

  if(playing){

    // flappy.velocity.x = 4;
    flappy.velocity.y = 12;

    if (keyDown("space") || touches[0]){
      flappy.velocity.y = -9;
    }

    if(back.position.x<=620){
      back.position.x = 900;
      console.log("Crossed");
    }


    textSize(30);
    text("Score: "+score,flappy.x-200,flappy.y+50).depth = flappy.depth+1;
    
      

    if(topPipe.position.x<=-55){
      // createPipes();
      topPipe.position.x = 1595;
      botPipe.position.x = 1595;

      topPipe.position.y = Math.round(random(-300, 100));
      botPipe.position.y = topPipe.position.y+800;

      console.log("Pipe Crossed\n");
    }

    textSize(30);
    text("Score: "+score,768,384)

    // flappy.collide(topPipe);

    if (flappy.isTouching(topPipe) || flappy.isTouching(botPipe) || flappy.position.y>=690 || flappy.position.y<=20) {
      flappy.velocity.x = 0;
      flappy.velocity.y = 0;
      topPipe.velocity.x = 0;
      botPipe.velocity.x = 0;
      back.velocity.x = 0;
      gameOver.visible = true;
      playing = false;
    }

    if(flappy.x>=topPipe.x+10){
      score += 1;
    }
  }
  else{
    if(keyWentDown("space") || touches[0]){
      topPipe.velocity.x = -10;
      botPipe.velocity.x = -10;
      back.velocity.x = -10;
      gameOver.visible = false;
      playing = true;
      flappy.y = 200;
      botPipe.x = 1300;
      topPipe.x = 1300;
    }
  }
    

  drawSprites();

}


function createPipes() {
  topPipe = createSprite(1000,-150,10,10);
}