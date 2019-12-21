console.log("Arena-loadJS");


$( document ).ready(function() {
    console.log( "Arena-documentReady");
    setInterval(placeArenaIframeInDiv, 5*1000);
    // debugger;
});


function placeArenaIframeInDiv(){
    console.log(window.location);
}


