var xBackground = 0;
var gravity = 0.1;
var speed = 60;
var jump = 8;
var idBackground;
var idCharacter;
var idObstacles;
var idDead;
var document_character = document.getElementById("character");
var game = document.getElementById("game");
var topObstacle = document.getElementById("top");
var bottomObstacle = document.getElementById("bottom");
var top2Obstacle = document.getElementById("top2");
var bottom2Obstacle = document.getElementById("bottom2");
var xObstacles = -90;

// This method change the section
// This method has 2 parameters:
//      pageOut: The section ID that you go out
//      pageIn: The section ID that you go in
function page(pageOut, pageIn){
    document.getElementById(pageOut).className += "invisible";
    document.getElementById(pageIn).classList.remove("invisible");
    window.scroll(0,document.getElementById(pageIn).scrollTop);
}

function pause(){
    if(state.current != state.beforeGameOver){
        clearInterval(idBackground);
        clearInterval(idCharacter);
        clearInterval(idObstacles);
        document.getElementById("game-section").className += "invisible";
        document.getElementById("pause-page").classList.remove("invisible");
        window.scroll(0,document.getElementById("pause-page").scrollTop);
    }
}

function continue_game(){
    document.getElementById("pause-page").className += "invisible";
    document.getElementById("game-section").classList.remove("invisible");
    window.scroll(0,document.getElementById("game-section").scrollTop);
    start();
}

function animation_game(){  
    idBackground = setInterval("background()",5);
    idCharacter = setInterval("character()",0);
    idObstacles = setInterval("obstacles()",10);
}

function start(){
    var title = document.getElementById("number");
    state.current = state.ingame;
    setTimeout(function(){title.innerHTML = 2;}, 1000);
    setTimeout(function(){title.innerHTML = 1;}, 2000);
    setTimeout(function(){title.innerHTML = "start!";title.className+="start-title"}, 3000);    
    setTimeout(function(){title.className += " invisible";title.innerHTML = 3;ok = true;state.current = state.ingame;animation_game();document.getElementById("btnPause").classList.remove("invisible");protect(true);},4000);
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

function restart(){
    xBackground = 0;
    game.style.backgroundPositionX = xBackground + "px";
    speed = 60;
    document_character.style.bottom = speed + "%";
    xObstacles = -90;
    topObstacle.style.right = xObstacles + "%";
    bottomObstacle.style.right = xObstacles + "%";
    top2Obstacle.style.right = (xObstacles-120) + "%";
    bottom2Obstacle.style.right = (xObstacles-120) + "%";
    document.getElementById("number").classList.remove("invisible","start-title");
}

function beforeGameOver(){
    clearInterval(idBackground);
    clearInterval(idObstacles);
}

function gameOver(){
    state.current = state.getReady;
    clearInterval(idBackground);
    clearInterval(idCharacter);
    clearInterval(idObstacles);
    restart();
    page("game-section","game-over");
}

function character(){    
    speed -= gravity;
    if(state.current == state.gameOver){            
        speed -= gravity;
    }
    document_character.style.bottom = speed + "%";
    if(parseInt(document_character.style.bottom.split("%")[0])<8){
        gameOver();
    }
    if(parseInt(document_character.style.bottom.split("%")[0])>85){
        speed = 85;
    }
    if(xObstacles>-7 && xObstacles<89 && speed>55.6 && speed<89){
        beforeGameOver();
        state.current = state.gameOver;
    }
    if(xObstacles>33 && xObstacles<85 && speed<34.6){
        beforeGameOver();
        state.current = state.gameOver;
    }
    if((xObstacles-120)>-7 && (xObstacles+120)<89 && speed>64.6){
        beforeGameOver();
        state.current = state.gameOver;
    }
    if((xObstacles-120)>33 && (xObstacles+120)<85 && speed<44.6){
        beforeGameOver();
        state.current = state.gameOver;
    }
}

function flap(){
    speed += jump;
}

const state = {
    current : 3,
    ingame: 1,
    getReady: 2,
    pause: 3,
    gameOver: 4
}

function protect(ok){
    if(ok){
        document.getElementById("protector").style.top = "100%";
        document.getElementById("protector").style.height = "0px";
    }else{
        document.getElementById("protector").style.top = "0%";
        document.getElementById("protector").style.height = "682px";
    }
}

function menu(){
    restart();
    state.current = state.getReady;
}

document.getElementById("game").addEventListener("click", function() {
    if(state.current == state.getReady){

    }else if(state.current == state.ingame){
        flap();
    }
});