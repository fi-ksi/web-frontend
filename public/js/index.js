/**
 * Created by Henrich Lauko on 7/5/2015.
 */

var logged = false;

$(window).load(function() {

    var theWindow        = $(window),
        $bi              = $("#background-image"),
        aspectRatio      = $bi.width() / $bi.height();

    function resizeBackgroundImage() {

        if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
            $bi
                .removeClass()
                .addClass('bgheight');
        } else {
            $bi
                .removeClass()
                .addClass('bgwidth');
        }

    }

    theWindow.resize(resizeBackgroundImage).trigger("resize");

});