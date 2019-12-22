arenaDebugLog("Arena-loadJS");

$( document ).ready(function() {
    arenaDebugLog( "Arena-documentReady");
    setInterval(place_single_user, 8*1000);
    setInterval(place_stats, 9*1000);
    // debugger;
});

function arenaDebugLog(msg){
    var debugEnabled = false;
    if (!debugEnabled){
        return;
    }
    console.log(msg);
}

function place_single_user(){
    var divSelector = "#arena-iframe-to-replace";
    var iframeId = "arena-iframe-actual-iframe"; // ! not the selector
    var url = 'https://ksi-api-html.borysek.eu/logPage.html?userId=';
    placeArenaIframeInDiv(divSelector, iframeId, url);
}

function place_stats(){
    var divSelector = "#arena-statistics-iframe-to-replace";
    var iframeId = "arena-iframe-actual-iframe2"; // ! not the selector
    var url = 'https://ksi-api-html.borysek.eu/arenaStats.html?userId=';
    placeArenaIframeInDiv(divSelector, iframeId, url);
}

function placeArenaIframeInDiv(divSelector, iframeId, url){
    var curPath = window.location.pathname;
    arenaDebugLog("Arena: " + divSelector);
    arenaDebugLog(curPath);
    if (curPath != "/ulohy/305"){
        return;
    }
    arenaDebugLog("Arena-rightPage");
    var usedIDSelector = "#id-of-logged-in-user";

    if ($(divSelector).find("iframe")[0] === undefined){
        arenaDebugLog("Arena-iframeMissing");
        var userID = $(usedIDSelector).text().trim();
        var textPlacedWithin = '<iframe id="'+iframeId+'" src="'+url+userID+'" style="width:100%; border:none; height: 600px;"></iframe>';
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


