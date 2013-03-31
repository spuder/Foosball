// http://jsfiddle.net/QT5WY/

    var occupied = false;
    var arrayOfReadings = [0,0,0,0,0,0,0,0,0,0];
    var arrayOfReadingsIndex = 0;

     



$(document).ready( function()  {

    var uri = 'https://api.cosm.com/v2/feeds/120687/datastreams/sensor_reading.png?',
        params = {
            width: 850,
            height: 250,
            colour: '#0055ff',
            duration: '5minutes',
            legend: 'Analog Value from 0 -> 1024 ',
            title: 'Table Vibration Values - 5 Minutes',
            show_axis_labels: 'true', 
            detailed_grid: 'true',
            scale: 'manual',
            max: 15,
            timezone: 'Mountain Time (US & Canada)'
        };
    var data = uri + $.param(params),
        graph = $('#graph'),
        obGraph = $('<img/>').prop({'id': 'graphObject'});
    var updateGraph = function() {
        var date = new Date(),
        src = data + '&' + date.getTime();
        obGraph.prop('src', '');
        obGraph.prop('src', src);
   };



    
    getJson();
    //setInterval (getJson, 1000);

    var avgReadings = averageReadings();
    //setInterval (averageReadings, 1000);

    graph.empty().append(obGraph);
    updateGraph();
    setInterval (updateGraph, 10000);




    if ( avgReadings > 0 ) {
      //http://www.andrewleeart.com/tutorials/animation.html
      var red1 = "#de0f0f";
      var red2 = "#fe8989";

      $('.tableStatus').css({"background-color":"red1" });
      $('.tableStatus').css({"background-image":"-webkit-gradient(linear, 0 0, 0 100%,from(#fe8989),to(#f62e2e),  color-stop(50%, #be0a0a), color-stop(50%, #a40606))" });
      $('.tableStatus').css({"background-image":"-moz-linear-gradient(top left 270deg, #fe8989, #be0a0a 50%,  #a40606 50%, #f62e2e);"  });
      $('.tableStatus').css({"background-image":"-o-linear-gradient(top left 270deg, #fe8989, #be0a0a 50%, #a40606 50%, #f62e2e);"    });



      $('.tableStatus').append( "Game in progress" ).fadeIn( 1, function() {
      // Animation complete.
      });
    }   
    else {
      $('.tableStatus').fadeIn(1000);
      $('.tableStatus').css({"background-color":"#78b12c" });
      $('.tableStatus').css({"background-image":"-webkit-gradient(linear, 0 0, 0 100%, from(#009900), to(#19A319), color-stop(50%, #2A802A), color-stop(50%, #266B26))" });
      //$('.tableStatus').css({"background-image":"-webkit-gradient(linear, 0 0, 0 100%, from(#009900), to(#19A319), color-stop(50%, #89c43a), color-stop(50%, #78b12c))" });

      $('.tableStatus').css({"background-image":"-moz-linear-gradient(top left 270deg, #009900, #89c43a 50%, #78b12c 50%, #19A319);"  });
      $('.tableStatus').css({"background-image":"-o-linear-gradient(top left 270deg, #009900, #89c43a 50%, #78b12c 50%, #19A319);"    });
    
      $('#tableAvailable').html( "Available" ).fadeIn('slow');

    }
     //alert(searchReadings(0).toString());

    // var contentDiv = $('.tableStatus').html();
    // $('.tableStatus').append( occupied.toString() );
    
    // $('div').mouseenter(function() {
    //     $('div').fadeTo('fast',1);
    //     getJson("foosball_key");
    // });

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
         var currentSensorValue = feed.current_value;
          $('#rawData').html( currentSensorValue );
        },
        dataType:'jsonp'
    });
}

function addReading(reading) {
  arrayOfReadings.insert(arrayOfReadingsIndex, parseInt(reading).toFixed(1) );
  arrayOfReadingsIndex++;

  if (arrayOfReadingsIndex >= arrayOfReadings.length) {
    arrayOfReadingsIndex = 0;
  }
}

function averageReadings() {
  var sum = 0;
  for(var i = 0; i < arrayOfReadings.length; i++){
    sum += parseInt(arrayOfReadings[i]);
  }

  return sum/arrayOfReadings.length;

}

// function updateGraph() {
//       $('#graph')attr.('data', "https://api.cosm.com/v2/feeds/120687/datastreams/sensor_reading.png?width=740&height=150&colour=%230055ff&duration=5minutes&legend=Vibrations%20measure%20%200%20-%3E%201024&title=Foosball%20Vibrations%20-%205%20Minutes&stroke_size=4&show_axis_labels=true&detailed_grid=true&scale=manual&max=75&timezone=Mountain%20Time%20(US%20%26%20Canada)");
  
// }
