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

function draw(){
    ctx.fillStyle =" #70c5ce";
    ctx.fillRect(0, 0, cvs.width, cvs.height);    
    bg.draw();
}

function update(){

}

function loop(){
    update();
    draw();
    frames++;
    requestAnimationFrame(loop);
}
loop();