console.log("Arena-loadJS");

$( document ).ready(function() {
    console.log( "Arena-documentReady");
    setInterval(placeArenaIframeInDiv, 5*1000);
    // debugger;
});


function placeArenaIframeInDiv(){
    var curPath = window.location.path;
    console.log(curPath);
    if (curPath != "/ulohy/137"){
        return;
    }
    console.log("Arena-rightPage");
    if ($("#collapse1").find("iframe")[0] === undefined){
        console.log("Arena-iframeMissing");
        var userID = $("#id-of-logged-in-user").text().trim();
        // $("#collapse1").first().html('<iframe src="https://ksi-api-html.borysek.eu/logPage.html?userId='+userID+'" style="width:100%; border:none;"></iframe>');
        // $("#arena-iframe-to-replace").first().html('<iframe src="https://ksi-api-html.borysek.eu/logPage.html?userId='+userID+'" style="width:100%; border:none;"></iframe>');
    } else{
        console.log("Arena-iframeFound");
    }
}


