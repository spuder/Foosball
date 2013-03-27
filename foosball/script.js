$(document).ready( function()  {
    var occupied = false;
    var feed_120687 = "https://api.cosm.com/v2/feeds/120687.json";

    $.getJSON( feed_120687 ,function(data){alert(data.msg); });

    var contentDiv = $('.tableStatus').html();
    $('.tableStatus').append( occupied.toString() );
    

  //    $(function() {
  //   $( "#graph" ).accordion();
  // });
    // $('div').mouseenter(function() {
    //     $('div').fadeTo('fast',1);
    // });
    //  $('div').mouseleave(function() {
    //     $('div').fadeTo('fast', 0.10);
    // });
});

/*
http://www.jquery4u.com/dynamic-css-2/change-css-jquery/
//change all elements with class .bg-red to have a red background
$('.bg-red').css({"background-color":"red"});
*/

//https://api.cosm.com/v2/feeds/120687.json