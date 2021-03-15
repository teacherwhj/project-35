var balloon, balImage,bgImage;
var data, db;
function preload(){
bgImage=loadImage("Hot Air Ballon-01.png");
balImage=loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png")
}


function setup() {
  createCanvas(1400,600);
  db = firebase.database();
  balloon= createSprite(150, 400, 10, 10);
  balloon.addAnimation("balloon",balImage);
  balloon.scale=0.8;

  var balloonPos = db.ref('balloon/position');
  balloonPos.on("value",readPosition,showError);
}

function draw() {
  background(bgImage);  
  
  if(keyDown(LEFT_ARROW)){
    
    updatePosition(-10,0);
    balloon.scale = balloon.scale - 0.01;
   
  }
 else if(keyDown(RIGHT_ARROW)){
    
    updatePosition(10,0);
    balloon.scale = balloon.scale + 0.01;
  
  }
  else if(keyDown(UP_ARROW)){
    
    updatePosition(0,-10);
    balloon.scale = balloon.scale - 0.01;
   
  }
  else if(keyDown(DOWN_ARROW)){
   
    updatePosition(0,10);
    balloon.scale = balloon.scale + 0.01;
 
  }

  textSize(20);
  fill("black");
  text("Use arrow keys to move hot air balloon",500,40);
  drawSprites();
}

function readPosition(data){
position = data.val();
balloon.x = position.x;
balloon.y = position.y;
}

function showError(){
  console.log("Error occurred");
}

function updatePosition(x,y){
db.ref('balloon/position').set({
  x : position.x + x,
  y : position.y + y,
 
})
}

