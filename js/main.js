var slideIndex=1;
window.onload=setTimeout(history,3000);
// This method change the section
// This method has 2 parameters:
//      pageOut: The section ID that you go out
//      pageIn: The section ID that you go in
function page(pageOut, pageIn){
    document.getElementById(pageOut).className += "invisible";
    document.getElementById(pageIn).classList.remove("invisible");
    window.scroll(0,document.getElementById(pageIn).scrollTop);

}

function history(){
   
    page('initial-menu','map');
}


showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("slides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}
    

function credits(){

    document.getElementById("initial-menu").style.backgroundImage="url('img/PANTALLACREDITOS.svg')";
    document.getElementById("btn1").style.display="none";
}


