// This method change the section
// This method has 2 parameters:
//      pageOut: The section ID that you go out
//      pageIn: The section ID that you go in
function page(pageOut, pageIn){
    document.getElementById(pageOut).className += "ocultar";
    document.getElementById(pageIn).classList.remove("ocultar");
    window.scroll(0,document.getElementById(pageIn).scrollTop);
}

const cvs = document.getElementById("level-1-canvas");
const ctx = cvs.getContext("2d");

let frames = 0;

let cantObstacles = 0;

const sprite = new Image();
sprite.src = "img/level1.png";

const background = new Image();
background.src = "img/fondoniv3.png";

const dog = new Image();
dog.src = "img/perroniv3.png";

const imgObstacles = new Image();
imgObstacles.src = "img/obstaculosniv3.png";

const bg={
    sX : 5,
    sY : 0,
    w : 6395,
    h : 2782,
    x : 0,
    ch : 150,
    cw: 1080,
    y : 0,
    dx: 2,
    draw: function(){
        ctx.drawImage(background, this.sX, this.sY, this.w, this.h, this.x, this.y, this.cw, this.ch);
        ctx.drawImage(background, this.sX, this.sY, this.w, this.h, this.x+this.cw, this.y, this.cw, this.ch);
    },
    update: function(){
        if(state.current == state.game){
            this.x = (this.x - this.dx) % this.cw;
        }
    }
}

const character={
    sX: 0,
    sY: 0,
    w: 1097,
    h: 991,
    ch: 20,
    cw: 80, 
    y: 55, 
    x:  50,
    speed: 0,
    // jump: 2.3, // Hard
    jump: 1.4, // Easy
    gravity: 0.08,
    draw: function(){
        ctx.drawImage(dog, this.sX, this.sY, this.w, this.h, this.x, this.y, this.cw, this.ch);  
    },

    flap: function(){
        this.speed -= this.jump;
    },

    update: function(){
        if(state.current == state.getReady){
            this.y = 55;
            this.speed = 0;
        }else{
            if(this.y+this.ch/2>=130){
                this.y=cvs.height- 20;
                if(state.current==state.game){
                    state.current = state.gameOver;
                    obstacles.clear();
                }
            }if(state.current==state.beforeWin){
                this.x +=2;  
                if(this.x > cvs.width)              
                    state.current = state.win;
            }else{                
                // this.speed += this.gravity;
                // this.y += this.speed;
            }
        }
    }
}

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
            if(character.x + character.cw/2 > (p.x-30) && character.x - character.cw/2 < (p.x-30) + this.top.cw && character.y + character.ch/2 > p.y && character.y<p.y + this.top.ch){
                // state.current = state.gameOver;
                // this.clear();
            }
            if(character.x + character.cw/2 > (p.x+40) && character.x - character.cw/2 < (p.x+40) + this.top.cw && character.y + character.ch/2 > (p.y-50) && character.y<(p.y-50) + this.top.ch){
                // state.current = state.gameOver;
                // this.clear();
            }
            if(character.x  + character.cw/2 > p.x && character.x - character.cw/2 < p.x+this.bottom.cw && character.y + character.ch >bottomObstacleYPos && character.y - character.ch/2< bottomObstacleYPos + p.bh){
                // state.current = state.gameOver;
                // this.clear();
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
    }
});

function draw(){
    ctx.fillStyle =" #70c5ce";
    ctx.fillRect(0, 0, cvs.width, cvs.height);    
    bg.draw();    
    obstacles.draw();
    character.draw();    
    over.draw();
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