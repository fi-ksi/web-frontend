function displaySliders(){
  var handle = $( "#custom-handle" );
  $( "#test-slider" ).slider({
    value:3,
    min: 1,
    max: 5,
    step: 1,
    slide: function( event, ui ) {
      $(this).siblings("input").val(ui.value)
    }
  });
}

function displayStars(){ // https://codepen.io/depy/pen/vEWWdw?editors=1000
    /* 1. Visualizing things on Hover - See next part for action on click */
    $('#stars li').on('mouseover', function(){
      var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
     
      // Now highlight all the stars that's not after the current hovered star
      $(this).parent().children('li.star').each(function(e){
        if (e < onStar) {
          $(this).addClass('hover');
        }
        else {
          $(this).removeClass('hover');
        }
      });
      
    }).on('mouseout', function(){
      $(this).parent().children('li.star').each(function(e){
        $(this).removeClass('hover');
      });
    });
    
    
    /* 2. Action to perform on click */
    $('#stars li').on('click', function(){
      var onStar = parseInt($(this).data('value'), 10); // The star currently selected
      var stars = $(this).parent().children('li.star');
      
      for (i = 0; i < stars.length; i++) {
        $(stars[i]).removeClass('star-selected');
      }
      
      for (i = 0; i < onStar; i++) {
        $(stars[i]).addClass('star-selected');
      }
      
      // JUST RESPONSE (Not needed)
      var ratingValue = parseInt($('#stars li.star-selected').last().data('value'), 10);
      $(this).parent().siblings("input").val(ratingValue);
      
    });
    
    
  }
  
  
  function responseMessage(msg) {
    $('.success-box').fadeIn(200);  
    $('.success-box div.text-message').html("<span>" + msg + "</span>");
  }

setTimeout(displaySliders, 3000);
setTimeout(displayStars, 3000);