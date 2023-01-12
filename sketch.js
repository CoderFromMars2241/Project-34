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
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3;

var bg_img;
var food;
var rabbit;

var button,button2,button3;
var frog;
var FrogIMG;
var blink,eat,sad;
var mute_btn;

var fr;

var star;
var star_img;



function preload()
{

  food = loadImage('food.jpeg');
  FrogIMG = loadImage('RealFrogHappy.jpeg');
  eat = loadImage("Yummy.jpeg");
  sad = loadImage("sad_1.jpeg");

}

function setup() 
{
  createCanvas(600,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  button = createImg('Button.jpeg');
  button.position(100,90);
  button.size(50,50);
  button.mouseClicked(drop);

   button2 = createImg('Button.jpeg');
   button2.position(450,90);
   button2.size(50,50);
   button2.mouseClicked(drop2);
 
   rope = new Rope(7,{x:120,y:90});
   rope2 = new Rope(7,{x:490,y:90});

  
  
  ground = new Ground(300,height,width,20);
  
  frog = createSprite(200,500,100,100);
  frog.scale = 0.2;
  frog.addImage('happy',FrogIMG);
  frog.addImage('eating',eat);
  frog.addImage('upset',sad);
  frog.changeImage('happy');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
 

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,frog,80)==true)
  {
    World.remove(engine.world,fruit);
    fruit = null;
    frog.changeAnimation('eating');
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    frog.changeAnimation('upset');
    fruit=null;
   }
   

}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function drop2()
{
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null;
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}


