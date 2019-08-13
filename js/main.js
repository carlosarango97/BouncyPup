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

const sprite = new Image();
sprite.src = "img/level1.png";

const bg={
    sX : 0,
    sY : 0,
    w : 278,
    h : 570,
    x : 0,
    ch : 150,
    y : 0,
    dx: 2,
    draw: function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.ch);       
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.ch);   
    },
    update: function(){
        if(state.current == state.game){
            this.x = (this.x - this.dx) % this.w;
        }
    }
}

const character={
    sX: 290,
    sY: 99,
    w: 98,
    h: 101,
    ch: 14,
    cw: 57, 
    y: 55, 
    x:  50,
    speed: 0,
    jump: 1.4,
    gravity: 0.08,
    draw: function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.cw, this.ch);  
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
                }
            }else{                
            //     this.speed += this.gravity;
            //     this.y += this.speed;
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

const obstacles = {
    position : [],
    bottom: {
        sX: 557,
        sY: 259,
        w: 75,
        h: 133,
        ch: 35
    },
    top: {
        sX: 488,
        sY: 472,
        w: 230,
        h: 125,
        ch: 33
    },
    gap: 40,
    maxYPos: 10,
    dx: 2,
    draw: function(){
        for(let i = 0; i<this.position.length; i++){
            let p = this.position[i];
            let topYPos = p.y;
            let bottomYPos = p.y + this.top.ch + this.gap;
            let bottomH = 130 - bottomYPos;
            ctx.drawImage(sprite, this.top.sX, this.top.sY, this.top.w, this.top.h, (p.x-30), topYPos, this.top.w, this.top.ch);       
            ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.bottom.w, this.bottom.h, p.x, bottomYPos, this.bottom.w, bottomH); 
        }
    },

    update: function(){
        if(state.current !== state.game) return;
        if(frames%150 == 0){
            this.position.push({
                x: cvs.width,
                y: this.maxYPos * (Math.random() + 1)
            });
        }        
        for(let i = 0; i<this.position.length; i++){
            let p = this.position[i];
            p.x -= this.dx;
            let bottomObstacleYPos = p.y + this.top.ch + this.gap;
            if(character.x + character.w/2 > (p.x-30) && character.x - character.w/2 < (p.x-30) + this.top.w && character.y + character.ch/2 >p.y && character.y - character.ch/4<p.y + this.top.ch){
                state.current = state.gameOver;
            }
            if(character.x  + character.w/2 > p.x && character.x - character.w/2 < p.x+this.bottom.w && character.y + character.ch/2 >bottomObstacleYPos && character.y - character.ch/2< bottomObstacleYPos + this.bottom.ch){
                //state.current = state.gameOver;
            }
            if(p.x + this.top.w <= 0){
                this.position.shift();
            }
        }
    }
}

const state = {
    current : 0,
    getReady: 0,
    game: 1,
    gameOver: 2
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