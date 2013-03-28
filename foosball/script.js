$(document).ready( function()  {
    var occupied = false;
    var arrayOfReadings = [0,0,0,0,0,0,0,0,0,0];
    var arrayOfReadingsIndex = 0;
    
    getJson();
    //setInterval (getJson, 1000);

    //searchReadings(42);
    //alert(searchReadings(42));

    var contentDiv = $('.tableStatus').html();
    $('.tableStatus').append( occupied.toString() );
    
    $('div').mouseenter(function() {
        $('div').fadeTo('fast',1);
        getJson("foosball_key");
    });

});

//https://api.cosm.com/v2/feeds/120687.json

//curl --request GET --header "X-ApiKey: -Ux_JTwgP-8pje981acMa5811-mSAKxpR3VRUHRFQ3RBUT0g" https://api.cosm.com/v2/feeds/120687/datastreams/sensor_reading

function getJson() {
    //$('#feed').html('<span><img src="/blog/images/lightbox-ico-loading.gif" alt=""></span>');
    $.ajax({
        type:'GET',
        url:"https://api.cosm.com/v2/feeds/120687/datastreams/sensor_reading",
        //data:"id="+flickrid+"&lang=en-us&format=json&jsoncallback=?",
        data:"X-ApiKey: -Ux_JTwgP-8pje981acMa5811-mSAKxpR3VRUHRFQ3RBUT0g",
        success:function(feed) {
         // alert(feed.current_value);
          $('#rawData').html(feed.current_value);
        },
        dataType:'jsonp'
    });
}

function addReading(reading) {
  arrayOfReadings.insert(arrayOfReadingsIndex, reading);
  arrayOfReadingsIndex++;

  if (arrayOfReadingsIndex >= arrayOfReadings.length) {
    arrayOfReadingsIndex = 0;
  }
  return;
}

function searchReadings(reading) {

  return arrayOfReadings.indexOf(reading);

}
