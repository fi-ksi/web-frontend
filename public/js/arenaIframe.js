arenaDebugLog("Arena-loadJS");

$( document ).ready(function() {
    arenaDebugLog( "Arena-documentReady");
    setInterval(placeArenaIframeInDiv, 5*1000);
    // debugger;
});

function arenaDebugLog(msg){
    var debugEnabled = true;
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
    var elementSearchString;
    elementSearchString = ".alert-danger";
    elementSearchString = "#arena-iframe-to-replace";
    if ($(elementSearchString).find("iframe")[0] === undefined){
        arenaDebugLog("Arena-iframeMissing");
        var userID = $("#id-of-logged-in-user").text().trim();
        var textPlacedWithin = '<iframe src="https://ksi-api-html.borysek.eu/logPage.html?userId='+userID+'" style="width:100%; border:none;"></iframe>';
        $(elementSearchString).first().html(textPlacedWithin);
    } else{
        arenaDebugLog("Arena-iframeFound");
    }
}


