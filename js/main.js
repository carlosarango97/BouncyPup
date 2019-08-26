var xBackground = 0;
var gravity = 0.1;
var speed = 60;
var jump = 8;
var idBackground;
var idCharacter;
var idObstacles;
var document_character = document.getElementById("character");
var game = document.getElementById("game");
var topObstacle = document.getElementById("top");
var bottomObstacle = document.getElementById("bottom");
var top2Obstacle = document.getElementById("top2");
var bottom2Obstacle = document.getElementById("bottom2");
var xObstacles = 4;
function animation_game(){  
    idBackground = setInterval("background()",5);
    idCharacter = setInterval("character()",0);
    idObstacles = setInterval("obstacles()",10);
}

function background(){
    game.style.backgroundPositionX = xBackground + "px";
    xBackground--;
}

function obstacles(){
    if(xObstacles == 222){
        xObstacles = -68;
    }
    topObstacle.style.right = xObstacles + "%";
    bottomObstacle.style.right = xObstacles + "%";
    top2Obstacle.style.right = (xObstacles-120) + "%";
    bottom2Obstacle.style.right = (xObstacles-120) + "%";
    xObstacles++;
}

function character(){    
    speed -= gravity;
    document_character.style.bottom = speed + "%";
    if(parseInt(document_character.style.bottom.split("%")[0])<8){
        state.current = state.getReady;
        clearInterval(idBackground);
        clearInterval(idCharacter);
        clearInterval(idObstacles);
    }
    if(parseInt(document_character.style.bottom.split("%")[0])>85){
        speed = 85;
    }
}

function flap(){
    speed += jump;
}

const state = {
    current : 2,
    ingame: 1,
    getReady: 2
}

document.getElementById("game").addEventListener("click", function() {
    if(state.current == state.getReady){
        state.current = state.ingame;
        animation_game();
    }else{
        flap();
    }
});

//The first game version start here
// var slideIndex=1;
// window.onload=setTimeout(history,3000);
// // This method change the section
// // This method has 2 parameters:
// //      pageOut: The section ID that you go out
// //      pageIn: The section ID that you go in
// function page(pageOut, pageIn){
//     document.getElementById(pageOut).className += "invisible";
//     document.getElementById(pageIn).classList.remove("invisible");
//     window.scroll(0,document.getElementById(pageIn).scrollTop);
// }

// function history(){
   
//     page('initial-menu','map');
// }


// showDivs(slideIndex);

// function plusDivs(n) {
//   showDivs(slideIndex += n);
// }

// function showDivs(n) {
//   var i;
//   var x = document.getElementsByClassName("slides");
//   if (n > x.length) {slideIndex = 1}
//   if (n < 1) {slideIndex = x.length}
//   for (i = 0; i < x.length; i++) {
//     x[i].style.display = "none";  
//   }
//   x[slideIndex-1].style.display = "block";  
// }
    
// function nivel(lev){
//     level.current = lev==1?level.first:lev==2?level.second:level.third;
// }

// function credits(){

//     document.getElementById("initial-menu").style.backgroundImage="url('img/PANTALLACREDITOS.svg')";
//     document.getElementById("btn1").style.display="none";
// }

// const cvs = document.getElementById("game-canvas");
// const ctx = cvs.getContext("2d");
// var stage = new createjs.Stage("game-canvas");

// let frames = 0;
// let cantObstacles = 0;

// // const sprite = new Image();
// // sprite.src = "img/level1.png";

// // const background = new Image();
// // background.src = "img/fondo.svg";

// // const dog = new Image();
// // dog.src = "img/perroniv3.png";

// const imgObstacles23 = new Image();
// imgObstacles23.src = "img/obstaculosniv3.png";
// const imgObstacles1 = new Image();
// imgObstacles1.src = "img/OBSTACULOSNIVEL1.png";
// const botones = new Image();
// botones.src = "img/BOTONESPANTALLAS.png"

// var background1 = new createjs.Bitmap("img/FONDONIVEL1.svg");
// var background2 = new createjs.Bitmap("img/FONDONIVEL22.svg");
// var background3 = new createjs.Bitmap("img/FONDONIVEL33.svg");
// var background12 = new createjs.Bitmap("img/FONDONIVEL1.svg");
// var background22 = new createjs.Bitmap("img/FONDONIVEL22.svg");
// var background32 = new createjs.Bitmap("img/FONDONIVEL33.svg");
// var dog1 = new createjs.Bitmap("img/PERRONIVEL1.svg");
// var dog2 = new createjs.Bitmap("img/PERRONIVEL2.svg");
// var dog3 = new createjs.Bitmap("img/PERRONIVEL3.svg");
// var gameOver = new createjs.Bitmap("img/PANTALLAGAMEOVER.svg");
// var winScreen = new createjs.Bitmap("img/PANTALLASIGNIVEL.svg");
// const bg={   
//     back: null,    
//     dx: 2,
//     x: 0,
//     x2: 0,
//     scale: 3,
//     draw: function(){ 
//         var back2;   
//         if(level.current == 1){
//             this.back = background1;
//             back2 = background12;
//         } else if(level.current == 2){
//             this.back = background2;
//             back2 = background22;
//         } else{
//             this.back = background3;
//             back2 = background32;
//         }
//         var scale_ = 1.1;
//         this.back.x = this.x;
//         this.back.y = 0;
//         this.back.scale = scale_;
//         this.back.scaleX = this.scale;
//         back2.x = this.x2;
//         back2.y = 0;
//         back2.scale = scale_;
//         back2.scaleX = this.scale;
//         stage.addChild(this.back);
//         stage.addChild(back2);
//         stage.update();
//     },
//     update: function(){
//         if(level.current == 1){
//             this.back = background1;
//         } else if(level.current == 2){
//             this.back = background2;
//         } else{
//             this.back = background3;
//         }
//         if(state.current == state.game){
//             this.x = (this.x - this.dx) % (this.back.getBounds().width*this.scale);
//             this.x2 = this.back.getBounds().width*this.scale + this.x;
//             // this.back.x = pos;
//             // stage.addChild(this.back);
//             // stage.update();
//         }
//     }
// }

// const character={
//     charac: null,    
//     y: 15, 
//     x: -40,
//     w: 0,
//     speed: 0,
//     // jump: 2.3, // Hard
//     jump: 1, // Easy
//     gravity: 0.08,
//     draw: function(){
//         if(level.current == 1){
//             this.charac = dog1;
//         } else if(level.current == 2){
//             this.charac = dog2;
//             // this.w = dog2.getBounds().width;
//         } else{
//             this.charac = dog3;
//             // this.w = dog3.getBounds().width;
//         }
//         this.charac.x = this.x;
//         this.charac.y = this.y;
//         this.charac.scale = 0.7;
//         this.charac.scaleX = 2; 
//         // this.w = this.charac.getBounds().width;            
//         stage.addChild(this.charac);
//         stage.update();
//     },

//     flap: function(){
//         this.speed -= this.jump;
//     },

//     update: function(){
//         if(level.current == 1){
//             this.charac = dog1;       
//         } else if(level.current == 2){
//             this.charac = dog2;
//         } else{
//             this.charac = dog3;
//         }
//         if(state.current == state.getReady){
//             this.y = 15;
//             this.speed = 0;
//         }else if(state.current == state.BeforeGameOver){
//             this.speed += this.gravity;
//             this.y += this.speed;
//             if(this.y>cvs.height){
//                 obstacles.clear();
//                 cantObstacles = 0;
//                 page('game-section','game-over');
//                 state.current = state.gameOver;
//             }
//         }else{
//             var nivel = level.current==level.first?150:135;
//             if(this.charac.y+this.charac.getBounds().height/2>=nivel){
//                 this.y=cvs.height- 20;
//                 if(state.current==state.game){
//                     state.current = state.BeforeGameOver;
//                 }
//             }if(state.current==state.beforeWin){
//                 this.x +=2;  
//                 if(this.x > cvs.width) {             
//                     state.current = state.win;
//                     if(level.current == 1){
//                         level.current = level.second;
//                     } else if(level.current == 2){                        
//                         level.current = level.third;
//                     } else{
                        
//                         level.current = level.first;
//                     }
//                 }
//             }else{                
//                 this.speed += this.gravity;
//                 this.y += this.speed;
//                 if(this.y<-40){
//                     this.y = -40;
//                     this.speed = 0;
//                 }
//             }
//         }
//     }
// }

// const level = {
//     current : 1,
//     first : 1,
//     second: 2,
//     third : 3
// }

// const btns = {
//     nextLevel: function(){
//         var sY = 371;
//         var sX = 331;
//         var h = 257;
//         var w = 658;         
//         ctx.drawImage(botones,sX,sY,w,h,75,70,150,25);
//     }
// }

// /* ¡¡¡PENDIENTE!!! */
// const over={    
//     // draw: function(){
//     //     gameOver.x = 0;
//     //     gameOver.y = 0;
//     //     gameOver.scale = 1;
//     //     gameOver.scaleX = 3;
//     //     if(state.current == state.gameOver){
//     //         stage.addChild(gameOver);
//     //         stage.update();
//     //     }        
//     // }    
// }


// /* ¡¡¡PENDIENTE!!! */
// const win = {    
//     draw: function(){
//         winScreen.x = 0;
//         winScreen.y = 0;
//         winScreen.scale = 1;
//         winScreen.scaleX = 3;
//         if(state.current == state.win){
//             stage.addChild(winScreen);
//             stage.update();              
//             btns.nextLevel();
//         }  
//     }
// }

// /* ¡¡¡PENDIENTE!!! */
// const obstacles = {
//     position : [],
//     bottom: {
//         sX: level.current==level.first?2113:7,
//         sY: level.current==level.first?2539:1843,
//         w: level.current==level.first?2807:412,
//         h: level.current==level.first?1444:466,
//         ch: 40,
//         cw: level.current==level.first?200:100
//     },
//     top: {
//         sX: level.current==level.first?321:0, 
//         sY: level.current==level.first?41:539, 
//         w: level.current==level.first?984:1205, 
//         h: level.current==level.first?1365:619, 
//         ch: 33,
//         cw: level.current==level.first?80:150
//     },
//     gap: 50,
//     maxYPos: 2,
//     dx: 2,
//     draw: function(){
//         this.bottom.sX = level.current==level.first?2113:7;
//         this.bottom.sY = level.current==level.first?2539:1843;
//         this.bottom.w = level.current==level.first?2807:412;
//         this.bottom.h = level.current==level.first?1444:466;
//         this.bottom.cw = level.current==level.first?200:100;
//         this.top.sX = level.current==level.first?321:0;
//         this.top.sY = level.current==level.first?41:539;
//         this.top.w = level.current==level.first?984:1205;
//         this.top.h = level.current==level.first?1365:619;
//         this.top.cw = level.current==level.first?80:150;
//         var imgObstacles;        
//         if(level.current == level.first){
//             imgObstacles = imgObstacles1;
//         } else {
//             imgObstacles = imgObstacles23;
//         }
//         for(let i = 0; i<this.position.length; i++){
//             let p = this.position[i];
//             if(level.current==level.first){
//                 let bottomYPos = this.top.ch + this.gap;
//                 p.bh = 150 - bottomYPos;
//                 ctx.drawImage(imgObstacles, this.top.sX, this.top.sY, this.top.w, this.top.h, p.x, 0, this.top.cw, this.top.ch);     
//                 ctx.drawImage(imgObstacles, this.bottom.sX, this.bottom.sY, this.bottom.w, this.bottom.h, (p.x-40), bottomYPos, this.bottom.cw, p.bh);               
//             }else{
//                 let topYPos = p.y;
//                 let bottomYPos = p.y + this.top.ch + this.gap;
//                 p.bh = 135 - bottomYPos;
//                 ctx.drawImage(imgObstacles, this.top.sX, this.top.sY, this.top.w, this.top.h, (p.x-30), topYPos, this.top.cw, this.top.ch);       
//                 ctx.drawImage(imgObstacles, this.bottom.sX, this.bottom.sY, this.bottom.w, this.bottom.h, p.x, bottomYPos, this.bottom.cw, p.bh);             
//             }
//         }
//     },

//     clear: function(){
//         this.position = [];
//     },

//     update: function(){
//         if(state.current !== state.game) return;
//         if(frames%150 == 0){
//             this.position.push({
//                 x: cvs.width,                
//                 y: Math.random()*30+5,
//                 bh: 0
//             });
//         }        
//         for(let i = 0; i<this.position.length; i++){
//             let p = this.position[i];
//             p.x -= this.dx;
//             if(level.current==level.first){
//                 let bottomObstacleYPos = this.top.ch + this.gap;
//                 if(character.x + character.charac.getBounds().width/2 > p.x && character.x + character.charac.getBounds().width/2 < p.x + this.top.cw && character.y + character.charac.getBounds().height*0.7/2 > 0 && character.y + character.charac.getBounds().height*0.7/2 <0 + this.top.ch){
//                     state.current = state.BeforeGameOver;                   
//                 }
//                 if(character.charac.x  + character.charac.getBounds().width/2 > (p.x-40) && character.x - character.charac.getBounds().width/2 < (p.x-40)+this.bottom.cw && character.y + character.charac.getBounds().height*0.7/2 >bottomObstacleYPos && character.y - character.charac.getBounds().height*0.7/2< bottomObstacleYPos + p.bh){
//                     state.current = state.BeforeGameOver;
//                 }
//             }else{
//                 let bottomObstacleYPos = p.y + this.top.ch + this.gap;
//                 if(character.x + character.charac.getBounds().width > (p.x-30) && character.x< (p.x-30) + this.top.cw && character.y + character.charac.getBounds().height*0.6/2 > p.y && character.y + character.charac.getBounds().height*0.6/2 <p.y + this.top.ch){
//                     state.current = state.BeforeGameOver;
//                 }
//                 if(character.charac.x  + character.charac.getBounds().width > p.x && character.x - character.charac.getBounds().width < p.x+this.bottom.cw && character.y + character.charac.getBounds().height*0.7/2 >bottomObstacleYPos && character.y - character.charac.getBounds().height/2< bottomObstacleYPos + p.bh){
//                     state.current = state.BeforeGameOver;
//                 }
//             }            
//             if(level.current==level.first && p.x + this.bottom.cw + 40 <= 0){
//                 this.position.shift();
//                 cantObstacles++;
//                 document.getElementById("ladrido").play();
//                 var nivel = level.current==level.first?5:level.current==level.second?7:10;
//                 if(cantObstacles==nivel){
//                     state.current = state.beforeWin;
//                 }
//             }
//             if(level.current!=level.first && p.x + this.top.cw + 40 <= 0){
//                 this.position.shift();
//                 cantObstacles++;
//                 document.getElementById("ladrido").play();
//                 var nivel = level.current==level.first?5:level.current==level.second?7:10;
//                 if(cantObstacles==nivel){
//                     state.current = state.beforeWin;
//                 }
//             }
//         }
//     }
// }

// const state = {
//     current : 0,
//     getReady: 0,
//     game: 1,
//     gameOver: 2,
//     beforeWin: 3,
//     win: 4,
//     beforeGameOver: 5
// }


// cvs.addEventListener("click",function(evt){
//     switch(state.current){
//         case state.getReady:
//             state.current = state.game;
//             break;
//         case state.game:
//             character.flap();
//             break;
//         case state.gameOver:
//             state.current = state.getReady;
//             break;
//         case state.win:
//             state.current = state.getReady;
//             obstacles.clear();
//             cantObstacles = 0;
//             character.x = -40;
//             bg.x = 0;           
//     }
// });

// cvs.addEventListener("touchstart",function(evt){
//     switch(state.current){
//         case state.getReady:
//             state.current = state.game;
//             break;
//         case state.game:
//             character.flap();
//             break;
//         case state.gameOver:
//             state.current = state.getReady;
//             break;
//         case state.win:
//             state.current = state.getReady;
//             obstacles.clear();
//             cantObstacles = 0;
//             character.x = -40;
//             bg.x = 0;
//     }
// });

// document.getElementById("game-over").addEventListener("touchstart", function(evt){
//     page('game-over','game-section');
// });

// function draw(){
//     ctx.fillStyle =" #70c5ce";
//     ctx.fillRect(0, 0, cvs.width, cvs.height);    
//     bg.draw();
//     character.draw();     
//     obstacles.draw();   
//     //over.draw();
//     win.draw();  
// }

// function update(){
//     character.update();
//     bg.update();
//     obstacles.update();
// }

// function loop(){
//     update();
//     draw();
//     frames++;
//     requestAnimationFrame(loop);
// }
// loop();
