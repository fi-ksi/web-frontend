arenaDebugLog("Arena-loadJS");

$( document ).ready(function() {
    arenaDebugLog( "Arena-documentReady");
    setInterval(placeArenaIframeInDiv, 5*1000);
    // debugger;
});

function arenaDebugLog(msg){
    var debugEnabled = false;
    if (!debugEnabled){
        return;
    }
    console.log(msg);
}

function placeArenaIframeInDiv(){
    var curPath = window.location.pathname;
    arenaDebugLog(curPath);
    if (curPath != "/ulohy/305"){
        return;
    }
    arenaDebugLog("Arena-rightPage");
    var divSelector = "#arena-iframe-to-replace";
    var iframeId = "arena-iframe-actual-iframe"; // ! not the selector
    var usedIDSelector = "#id-of-logged-in-user";

    if ($(divSelector).find("iframe")[0] === undefined){
        arenaDebugLog("Arena-iframeMissing");
        var userID = $(usedIDSelector).text().trim();
        var textPlacedWithin = '<iframe id="'+iframeId+'" src="https://ksi-api-html.borysek.eu/logPage.html?userId='+userID+'" style="width:100%; border:none; height: 600px;"></iframe>';
        $(divSelector).first().html(textPlacedWithin);
        /*
        $("#"+iframeSelector).on("load", function() {
            this.style.height=this.contentDocument.body.scrollHeight +'px'; // this won't work as it's cross site
        });
        */

    } else{
        arenaDebugLog("Arena-iframeFound");
    }
}


