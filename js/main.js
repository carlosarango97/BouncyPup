// This method change the section
// This method has 2 parameters:
//      pageOut: The section ID that you go out
//      pageIn: The section ID that you go in
function page(pageOut, pageIn){
    document.getElementById(pageOut).className += "ocultar";
    document.getElementById(pageIn).classList.remove("ocultar");
    window.scroll(0,document.getElementById(pageIn).scrollTop);
}

const cvs = document.getElementById("game-canvas");
const ctx = cvs.getContext("2d");
var stage = new createjs.Stage("game-canvas");

let frames = 0;
let level = 1;
let cantObstacles = 0;

// const sprite = new Image();
// sprite.src = "img/level1.png";

// const background = new Image();
// background.src = "img/fondo.svg";

// const dog = new Image();
// dog.src = "img/perroniv3.png";

const imgObstacles23 = new Image();
imgObstacles.src = "img/obstaculosniv3.png";
const imgObstacles1 = new Image();
imgObstacles1.src = "img/obtaculosniv3.png";

var background1 = new createjs.Bitmap("img/FONDONIVEL1.svg");
var background2 = new createjs.Bitmap("img/FONDONIVEL2.svg");
var background3 = new createjs.Bitmap("img/FONDONIVEL3.svg");
var dog1 = new createjs.Bitmap("img/PERRONIVEL1.svg");
var dog2 = new createjs.Bitmap("img/PERRONIVEL2.svg");
var dog3 = new createjs.Bitmap("img/PERRONIVEL3.svg");


const bg={   
    back : level=1?background1:level=2?background2:background3,
    dx: 2,
    draw: function(){        
        this.back.x = 0;
        this.back.y = 0;
        this.back.scale = 1;
        this.back.scaleX = 3;
        stage.addChild(this.back);
        stage.update();
    },
    update: function(){
        if(state.current == state.game){
            this.back.x = (this.back.x - this.dx) % this.back.width;
        }
    }
}

const character={
    charac : level=1?dog1:level=2?dog2:dog3,
    sX: 0,
    sY: 0,
    w: 1097,
    h: 991,
    ch: 20,
    cw: 80, 
    y: 65, 
    x:  50,
    speed: 0,
    // jump: 2.3, // Hard
    jump: 1.4, // Easy
    gravity: 0.08,
    draw: function(){
        // ctx.drawImage(dog, this.sX, this.sY, this.w, this.h, this.x, this.y, this.cw, this.ch);  
        this.charac.x = 50;
        this.charac.y = 65;
        this.charac.scale = 0.02;
        this.charac.scaleX = 0.07;        
        stage.addChild(this.charac);
        stage.update();
    },

    flap: function(){
        this.speed -= this.jump;
    },

    update: function(){
        if(state.current == state.getReady){
            this.charac.y = 65;
            this.speed = 0;
        }else{
            if(this.charac.y+this.charac.height/2>=130){
                this.charac.y=cvs.height- 20;
                if(state.current==state.game){
                    state.current = state.gameOver;
                    obstacles.clear();
                }
            }if(state.current==state.beforeWin){
                this.charac.x +=2;  
                if(this.charac.x > cvs.width) {             
                    state.current = state.win;
                    if(level<3){
                        level++;
                    } else
                        level = 1;
                }
            }else{                
                this.speed += this.gravity;
                this.charac.y += this.speed;
                if(this.charac.y<0){
                    this.charac.y = 0;
                    this.speed = 0;
                }
            }
        }
    }
}

/* ¡¡¡PENDIENTE!!! */
const over={
    sX: 882.5,
    sY: 0,
    w: 320,
    h: 570,
    x: 0,
    y: 0,
    ch: 150,
    cw: 320,
    draw: function(){
        if(state.current == state.gameOver)
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.cw, this.ch);       
    }
}

/* ¡¡¡PENDIENTE!!! */
const win = {
    sX: 882.5,
    sY: 0,
    w: 320,
    h: 570,
    x: 0,
    y: 0,
    ch: 150,
    cw: 320,
    draw: function(){
        if(state.current == state.win)
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.cw, this.ch);       
    }
}

/* ¡¡¡PENDIENTE!!! */
const obstacles = {
    position : [],
    bottom: {
        sX: 7,
        sY: 1843,
        w: 412,
        h: 466,
        ch: 40,
        cw: 100
    },
    top: {
        sX: 0,
        sY: 539,
        w: 1205,
        h: 619,
        ch: 33,
        cw: 150
    },
    gap: 50,
    maxYPos: 2,
    dx: 2,
    draw: function(){
        for(let i = 0; i<this.position.length; i++){
            let p = this.position[i];
            let topYPos = p.y;
            let bottomYPos = p.y + this.top.ch + this.gap;
            p.bh = 135 - bottomYPos;
            ctx.drawImage(imgObstacles, this.top.sX, this.top.sY, this.top.w, this.top.h, (p.x-30), topYPos, this.top.cw, this.top.ch);       
            ctx.drawImage(imgObstacles, this.bottom.sX, this.bottom.sY, this.bottom.w, this.bottom.h, p.x, bottomYPos, this.bottom.cw, p.bh); 
            ctx.drawImage(imgObstacles, this.top.sX, this.top.sY, this.top.w, this.top.h, (p.x+40), (topYPos-50), this.top.cw, this.top.ch);          
        }
    },

    clear: function(){
        this.position = [];
    },

    update: function(){
        if(state.current !== state.game) return;
        if(frames%150 == 0){
            this.position.push({
                x: cvs.width,                
                y: Math.random()*30+5,
                bh: 0
            });
        }        
        for(let i = 0; i<this.position.length; i++){
            let p = this.position[i];
            p.x -= this.dx;
            let bottomObstacleYPos = p.y + this.top.ch + this.gap;
            if(character.charac.x + character.charac.width/2 > (p.x-30) && character.charac.x< (p.x-30) + this.top.cw && character.charac.y + character.charac.height/2 > p.y && character.charac.y<p.y + this.top.ch){
                state.current = state.gameOver;
                this.clear();
                cantObstacles = 0;
            }
            if(character.charac.x + character.charac.width/2 > (p.x+40) && character.charac.x - character.charac.width/2 < (p.x+40) + this.top.cw && character.charac.y + character.charac.height/2 > (p.y-50) && character.charac.y<(p.y-50) + this.top.ch){
                state.current = state.gameOver;
                this.clear();
                cantObstacles = 0;
            }
            if(character.charac.x  + character.charac.width/2 > p.x && character.charac.x - character.charac.width/2 < p.x+this.bottom.cw && character.charac.y + character.charac.height >bottomObstacleYPos && character.charac.y - character.charac.height/2< bottomObstacleYPos + p.bh){
                state.current = state.gameOver;
                this.clear();
                cantObstacles = 0;
            }
            if(p.x + this.top.cw + 40 <= 0){
                this.position.shift();
                cantObstacles++;
                if(cantObstacles==10){
                    state.current = state.beforeWin;
                }
            }
        }
    }
}

const state = {
    current : 0,
    getReady: 0,
    game: 1,
    gameOver: 2,
    beforeWin: 3,
    win: 4
}

cvs.addEventListener("click",function(evt){
    switch(state.current){
        case state.getReady:
            state.current = state.game;
            break;
        case state.game:
            character.flap();
            break;
        case state.gameOver:
            state.current = state.getReady;
            break;
        case state.win:
            state.current = state.getReady;
            obstacles.clear();
            cantObstacles = 0;
            character.charac.x = 50;
    }
});

cvs.addEventListener("touchstart",function(evt){
    switch(state.current){
        case state.getReady:
            state.current = state.game;
            break;
        case state.game:
            character.flap();
            break;
        case state.gameOver:
            state.current = state.getReady;
            break;
        case state.win:
            state.current = state.getReady;
            obstacles.clear();
            cantObstacles = 0;
            character.charac.x = 50;
    }
});

function draw(){
    ctx.fillStyle =" #70c5ce";
    ctx.fillRect(0, 0, cvs.width, cvs.height);    
    bg.draw();    
    obstacles.draw();
    character.draw();    
    over.draw();
    win.draw();
}

function update(){
    character.update();
    bg.update();
    obstacles.update();
}

function loop(){
    update();
    draw();
    frames++;
    requestAnimationFrame(loop);
}
loop();