$(document).ready( function()  {
    $('div').mouseenter(function() {
        $('div').fadeTo('fast',1);
    });
    $('div').mouseleave(function() {
        $('div').fadeTo('fast', 0.10);
    });
    $('#green').mouseenter(function() {
        $('div').fadeTo('fast',1);
    });
    $('#green').mouseleave(function() {
        $('div').fadeTo('fast', 0.10);
    });
});