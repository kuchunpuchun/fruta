const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var fruit;
var sound = true;

function preload(){
  conejoIMG = loadImage("conejo.png")
  backIMG = loadImage("background.png")
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");



  eatS = loadSound("eating_sound.mp3")
  sadS = loadSound("sad.wav")
  soundS = loadSound("sound1.mp3")
  cutS = loadSound("rope_cut.mp3")
  airS = loadSound("air.wav")


blink.playing = true;
eat.playing= true;
sad.playing = true;
eat.looping = false;
sad.looping = false;



}




function setup() 
{
  
  createCanvas(1000,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(500,700,1000,20);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  rope = new Rope(9,{x:250, y:100});
  rope2 = new Rope(9,{x:400, y:100});
  fruit = Bodies.circle(250,283,20)
  Matter.Composite.add(rope.body,fruit)
  fruitLink = new link(rope,fruit)
  Matter.Composite.add(rope2.body,fruit)
  fruitLink2 = new link(rope2,fruit)
  conejo = createSprite(800,625)
  conejo.scale=0.2
  btn = createImg("boton.png")
  btn.position(230,100)
  btn.size(50,57)
  btn.mouseClicked(a)

  btn4 = createImg("boton.png")
  btn4.position(370,100)
  btn4.size(50,57)
  btn4.mouseClicked(f)

  btn2 = createImg("balloon.png")
  btn2.position(30,250)
  btn2.size(150,110)
  btn2.mouseClicked(d)

  btn5 = createImg("balloon2.png")
  btn5.position(400,560)
  btn5.size(110,150)
  btn5.mouseClicked(g)

  btn3 = createImg("mute.png")
  btn3.position(50,50)
  btn3.size(40,40)
  btn3.mouseClicked(e)

blink.frameDelay = 15
sad.frameDelay = 15
eat.frameDelay = 15
conejo.addAnimation("blink",blink)
conejo.addAnimation("eat",eat)
conejo.addAnimation("sad",sad)

conejo.changeAnimation("blink",blink)

soundS.setVolume(0)
}

function draw() 
{

  background(backIMG);
  drawSprites()
  ground.show();
  b()
  c()
  Engine.update(engine);
  
  //mostrar cuerda
  rope.show()
  rope2.show()

  //mostrar fruta
  if (fruit){
    ellipse(fruit.position.x,fruit.position.y,20,20)
  }
  
  if (sound == true){
  if (soundS.isPlaying() == false){
    soundS.play()
  }
  }
  //console.log(fruit.position.y);
  //console.log(fruit.position.x);
   
}


function a(){
 rope.break()
 fruitLink.detach()
 fruitLink = null
 btn.position(100000000,100000000000)
 cutS.play()
}

function f(){
  rope2.break()
  fruitLink2.detach()
  fruitLink2 = null
  btn4.position(100000000,100000000000)
  cutS.play()
 }

function b(){
 if (fruit != null){
  if (fruit.position.y >= 570 && fruit.position.y <= 670){
    if(fruit.position.x >= 750 && fruit.position.x <= 850){
      console.log("siii")
        Matter.World.remove(world,fruit);
        conejo.changeAnimation("eat")
        fruit = null;
       eatS.play()
    }
  }
 }
}

function c(){
  if (fruit != null){
    var collision = Matter.SAT.collides(fruit,ground.body);
      if (collision.collided){
       console.log("nooooo")
         Matter.World.remove(world,fruit);
         conejo.changeAnimation("sad")
         fruit = null;
        sadS.play()
      }
  }
 
 }

function d(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.05,y:0})
  airS.play()
}
function g(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0,y:-0.03})
  airS.play()
}

function e(){
if (soundS.isPlaying() == true){
  sound = false
  soundS.stop()
  eatS.setVolume(0)
  airS.setVolume(0)
  sadS.setVolume(0)
  cutS.setVolume(0)
}
else{
  sound = true
  soundS.play()
  eatS.setVolume(0.5)
  airS.setVolume(0.5)
  sadS.setVolume(0.5)
  cutS.setVolume(0.5)
}

}
 
 

