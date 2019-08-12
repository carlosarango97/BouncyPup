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
    w : 275,
    h : 224,
    x : 0,
    ch : 59,
    y : cvs.height - 59,
    draw: function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.ch);       
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.ch);   
    }
}

const fg={
    sX: 0,
    sY: 281,
    w: 295,
    h: 170,
    x: 0,
    y: cvs.height - 40,
    ch: 45,
    draw: function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.ch);       
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.ch);   
    }
}

const character={
    animation:[
        {sX: 290, sY: 99, w: 98, h: 101, ch: 14, cw: 57},
        {sX: 292, sY: 207, w: 95, h: 62, ch: 12, cw: 57}
    ],   
    y: 40, 
    x:  50,
    frame: 0,
    speed: 0,
    jump: 4.6,
    gravity: 0.25,
    draw: function(){
        let charact = this.animation[this.frame];
        this.y += this.frame == 1 ? 2 :0;
        ctx.drawImage(sprite, charact.sX, charact.sY, charact.w, charact.h, this.x, this.y, charact.cw, charact.ch);       
        this.y -= this.frame == 1 ? 2 :0;
    },

    flap: function(){
        this.speed -= this.jump;
    },

    update: function(){
        this.frame += frames % 10 == 0 ? 1:0;
        this.frame = this.frame % this.animation.length;
        if(state.current == state.getReady){

        }else{
            this.speed += this.gravity;
            this.y += this.speed;
            if(this.y+this.animation[this.frame].ch/2>=cvs.height-fg.ch){
                this.y=cvs.height-fg.ch-this.animation[this.frame].ch/2;
                if(state.current==state.game){
                    state.current = state.gameOver;
                }
            }
        }
    }
}

const over={
    sX: 0,
    sY: 480,
    w: 231,
    h: 53,
    x: 70,
    y: 50,
    ch: 14,
    cw: 171,
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
    fg.draw();
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