var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running,monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup

var Score
var SurvivalTime;
var ground,invisibleGround;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  monkey_collided=loadAnimation("sprite_1.png");
 
}



function setup() { 
  createCanvas(600, 300);
  monkey = createSprite(50,260,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided",monkey_collided)
  monkey .scale=0.12;
  
   
  ground = createSprite(1500,300,1200,20);
 fill("blue")
  ground.x = ground.width /2;
 
  invisibleGround = createSprite(200,300,400,10);
  invisibleGround.visible = false;
  
 
  
  obstacleGroup = createGroup();
  FoodGroup=createGroup();
  
  SurvivalTime=0;
  Score=0;
 
  

  
}


function draw() {
  background(" lightblue");
  text("Score: "+ Score, 500,50);
  text("Survival Time: "+ SurvivalTime, 50,50);
  
  if(gameState === PLAY){
    ground.velocityX = -4;
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
    SurvivalTime = SurvivalTime + Math.round(getFrameRate()/60);
    if(keyDown("space")&& monkey.y >= 200) {
        monkey.velocityY = -12;
        
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    
    spawnObstacles();
    spawnFood() ;
    if (monkey.isTouching(FoodGroup)){
       FoodGroup.destroyEach();
      Score=Score+1
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
       FoodGroup.destroyEach();
       obstacleGroup.destroyEach();
      gameState = END;
      }
}
  
  else if (gameState === END) {
    monkey.changeAnimation("collided",monkey_collided);
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
    fill("Blue")
    stroke("white")
    textSize(30);
    text("GAMEOVER!!", 220, 170);
    fill("red");
    textSize(15);
    text("Press 'R' to play again", 240, 200);
    
    if (keyDown("r")){
      FoodGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("running", monkey_running);
      Score = 0;
      SurvivalTime = 0;
      gameState = PLAY; 
    }
    
      
      
      
    }
  
 monkey.collide(invisibleGround);   
drawSprites();
  
}
function spawnObstacles(){
 if (frameCount % 150 === 0){
   var obstacle = createSprite(600,270,10,40);
   obstacle.velocityX = -(6 + 3*SurvivalTime/100) ;
   
    obstacle.addImage(obstacleImage)
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.12;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}

function spawnFood() {
  if (frameCount%80 === 0){
    
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-4          
    banana.lifetime = 220;
    FoodGroup.add(banana)
}

}




