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
    draw: function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.ch);       
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.ch);   
    }
}

const character={
    sX: 290,
    sY: 99,
    w: 98,
    h: 101,
    ch: 14,
    cw: 57, 
    y: 20, 
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
            this.y = 20;
            this.speed = 0;
        }else{
            if(this.y+this.ch/2>=110){
                this.y=cvs.height-40;
                if(state.current==state.game){
                    state.current = state.gameOver;
                }
            }else{                
                this.speed += this.gravity;
                this.y += this.speed;
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
    character.draw();    
    over.draw();
}

function update(){
    character.update();
}

function loop(){
    update();
    draw();
    frames++;
    requestAnimationFrame(loop);
}
loop();