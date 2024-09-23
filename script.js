let gamebackgroundImg, backgroundImg, shark, rock, rock2, bomb, sharkImg, loseImg, shoeImg, restartButton, directionImg;
let startButton, directionButton, directionBoard, exitButton;
var screen = 0;
let playTime = 0;
var x = 0;

function preload(){
  gamebackgroundImg = loadImage("assets/gamebackground.png");
  backgroundImg = loadImage("assets/bgg.png");
  sharkImg = loadImage("assets/shark.png");
  rockImg = loadImage("assets/rock1.png");
  bombImg = loadImage("assets/Subject.png");
  loseImg = loadImage("assets/lose.png");
  shoeImg = loadImage("assets/shoe.png");
}
function setup() {
  createCanvas(415,500);
  background(gamebackgroundImg);
  //frameRate(60);
  textAlign(CENTER);

  // Create buttons for main screen
  directionButton = new Sprite(145, 400);
  directionButton.w = 100;
  directionButton.h = 50;
  directionButton.collider = 'k';
  directionButton.color = 'lightblue';
  directionButton.text = "DIRECTIONS";

  //Create startButton
  startButton = new Sprite(285, 400);
  startButton.w = 100;
  startButton.h = 50;
  startButton.collider = 'k';
  startButton.color = 'lightblue';
  startButton.text = "PLAY";

  // Create direction board for directions
  directionBoard = new Sprite(-145, -400);
  directionBoard.w = 300;
  directionBoard.h = 350;
  directionBoard.collider = 'k';
  directionBoard.color = 'lightblue';
  directionBoard.text = "DIRECTIONS\n\nAvoid all the obstacles\nby moving the shark horizontally.\n\nPoints will be calculated by\nthe number of seconds you survive.\n\n\n";

  // Create exit button after losing
  exitButton = new Sprite(width/2, -350);
  exitButton.w = 100;
  exitButton.h = 50;
  exitButton.collider = 'k';
  exitButton.color = 'lightgray';
  exitButton.text = "EXIT";

  //Create restartButton
  restartButton = new Sprite(-200, 300);
  restartButton.w = 100;
  restartButton.h = 50;
  restartButton.collider = 'k';
  restartButton.color = 'gray';
  restartButton.text = "RESTART"; 

  //Create rock1 
  rockImg.resize(50,30)
  rock = new Sprite(rockImg, -120, 0, 20);
  rock.collider = "k";
  rock.vel.y = 5;

  //Create rock2
  shoeImg.resize(60,43);
  rock2 = new Sprite(shoeImg, -120, 0, 20);
  rock2.collider = "k";
  rock2.vel.y = 5;

  //Create bomb
  bombImg.resize(50,50);
  bomb = new Sprite(bombImg, 450, 0, 20);
  bomb.collider = 'k';
  bomb.vel.y = 15;

  //Create shark   
  sharkImg.resize(35,70);
  shark = new Sprite(sharkImg,200,448,10,10,"d");
  shark.pos = { x: -100, y: 900};
  shark.rotationLock = true;
    screen = 0;
}

/* LOOP REPEATS */
function draw() {
  world.gravity.y = 10;
  //let currentTime = int(millis() / 1000);

  // Player click directions
  if (directionButton.mouse.presses()){
    showScreen1();
      screen = 1;
  }
    if (screen == 1){
      if (exitButton.mouse.presses()){
        showScreen4();
          screen = 4;
      }
    }  

  //Player click play
  if (startButton.mouse.presses()){
    //shark.pos = {x:207, y:448};
    screen = 2;
    // Shark's motion rule
    shark.pos = {x:207, y:448};
    shark.moveTowards(mouse.x, 448, 1);
    if (shark.x < 30) {
      shark.x = 30;
    } else if (shark.x > 385) {
      shark.x = 385;
    }
  }
  if (screen == 2){
    showScreen2();
    shark.moveTowards(mouse.x, 448, 1);
    //shark.pos = {x:207, y:448};
    if (shark.x > 0){
    startTimer();
    }

  // Shark's motion rule
  shark.moveTowards(mouse.x, 448, 1);
  if (shark.x < 30) {
    shark.x = 30;
  } else if (shark.x > 385) {
    shark.x = 385;
  }

  //If rock reaches bottom, move back to random position at top
  if (rock.y >= 600) {
    rock.y = 0;
    rock.x = random(10,405);
    rock.vel.y = random(9,17);
      loop = loop + 1;
  }

  //If rock2 reaches bottom, move back to random position at top
  if (rock2.y >= 600) {
    rock2.y = 0;
    rock2.x = random(-10,405);
    rock2.vel.y = random(8,17);
      loop = loop + 1;
  }

  //If bomb reaches bottom, you lose
  if (bomb.y >= 600) {
    bomb.y = 0;
    bomb.x = random(-990,990);
    bomb.vel.y = random(10,17);
  }
    // Draw the time to screen
    fill(0);
    textSize(16);
    text("TIME : "  + round(playTime / 1000, 0) + "s", 207, 55);

  // If rock collides with shark, you lose
  if (rock.collides(shark)||rock2.collides(shark)||bomb.collides(shark)) {
    showScreen3();
      screen = 3;
  }
}
  if (screen == 3){ 
    if(restartButton.mouse.presses()){
      playTime -= playTime;
      showScreen4();
    }
  }
}

//Functions
function startTimer(){
  console.log(deltaTime);
  playTime += deltaTime;
}
function showScreen1(){
  background(gamebackgroundImg);
  directionBoard.pos = {x: 207.5, y: 250}
  startButton.pos = {x:-100, y:400};
  directionButton.pos = {x:-100, y:400};  
  exitButton. pos = {x: 207.5, y: 370};
}
function showScreen2(){
  background(backgroundImg);
  directionButton.pos = { x:-100, y:-100};
  startButton.pos = {x: -200, y:-100};
}
function showScreen3(){
  background(loseImg); 
  rock.pos = {x:-100, y:900};
  rock2.pos = {x:-100, y: 900};
  bomb.pos = {x:-100, y: 900};
  shark.pos = {x: -100, y: 900};
  textSize(16);
  text("Time Scored: " + round(playTime / 1000, 0) + "s", 207, 111);
  restartButton.pos = {x: 207.5, y: 330};
}
function showScreen4(){
  background(gamebackgroundImg);
  directionBoard.pos = {x:-145, y:-400};
  startButton.pos = {x:285, y:400};
  directionButton.pos = {x:145, y:400};   
  exitButton.pos = {x:-145, y:-400};
  shark.pos = {x:-30, y:900}; 
  restartButton.pos = {x:-100, y: 330};
}