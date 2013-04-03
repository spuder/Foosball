// http://jsfiddle.net/QT5WY/
//http://jsfiddle.net/spuder/nvxQ2/5/ Working example using cosm's library 
    
    //var arrayOfReadings = [0,0,0,0,0,0,0,0,0,0];
    var arrayOfReadings = [1,1,1,1,1,1,1,1,1,1];

    cosm.setKey("-Ux_JTwgP-8pje981acMa5811-mSAKxpR3VRUHRFQ3RBUT0g");
    var local_sensor_value = 0;

     



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

    cosm.datastream.subscribe( "120687", "sensor_reading", function( event, data ) {  


      //local_sensor_value = data.current_value;
      console.log("data.current_value is: " + data.current_value);
      //console.log(local_sensor_value);

      addReading(data.current_value);
      //addReading(local_sensor_value);

      var local_average = averageReadings();
      updateColor(local_average);

    });


    graph.empty().append(obGraph);
    updateGraph();
    setInterval (updateGraph, 10000);

    


}); //end $(document).ready( function()

//https://api.cosm.com/v2/feeds/120687.json

//curl --request GET --header "X-ApiKey: -Ux_JTwgP-8pje981acMa5811-mSAKxpR3VRUHRFQ3RBUT0g" https://api.cosm.com/v2/feeds/120687/datastreams/sensor_reading

// http://stackoverflow.com/questions/15732034/jsonp-pass-api-key

// function getJson() {
// $.ajax({
//         type:'GET',
//         url:'https://api.cosm.com/v2/feeds/120687/datastreams/sensor_reading',

//         //header:{"X-ApiKey": "-Ux_JTwgP-8pje981acMa5811-mSAKxpR3VRUHRFQ3RBUT0g"},
//         headers:{"Accept": "*/*",
//                   "X-ApiKey": "-Ux_JTwgP-8pje981acMa5811-mSAKxpR3VRUHRFQ3RBUT0g"},
//         //headers:{"-Ux_JTwgP-8pje981acMa5811-mSAKxpR3VRUHRFQ3RBUT0g"},
//         success:function(feed) {
//          // alert(feed.current_value);
//          var currentSensorValue = feed.current_value;
//           $('#rawData').html( currentSensorValue );
//         },
//         dataType:'jsonp'
//     });
// }

function addReading(reading) {
  console.log("addReading(reading) is: " + reading);
  reading = Math.round(reading);
  console.log("Math.round(reading) is: " + reading);

  console.log("Add " + reading +" to array");

  //http://www.w3schools.com/jsref/jsref_unshift.asp
  arrayOfReadings.unshift(reading);
  console.log("The array is now " + arrayOfReadings.length + " long");

  arrayOfReadings.pop();
  console.log("arrayOfReadings.pop(), The array is now " + arrayOfReadings.length + " long");


}

function averageReadings() {
  var sum = 0;
  for(var i = 0; i < arrayOfReadings.length; i++){
    sum += parseInt(arrayOfReadings[i]);
  }

  return sum/arrayOfReadings.length;

}

function updateColor(currentAverage) {
  console.log("The current Average is :" + currentAverage)
  if ( currentAverage > 0 ) {
      //http://www.andrewleeart.com/tutorials/animation.html
      var red1 = "#de0f0f";
      var red2 = "#fe8989";

      //gradient strings
      var webkitGradient = "-webkit-gradient(linear, 0 0, 0 100%,from("+red2+"),to(#f62e2e),  color-stop(50%, #be0a0a), color-stop(50%, #a40606))";

      $('.tableStatus').css({"background-color":red1 });
      $('.tableStatus').css({ webkitGradient });
      $('.tableStatus').css({"background-image":"-moz-linear-gradient(top left 270deg, #fe8989, #be0a0a 50%,  #a40606 50%, #f62e2e);"  });
      $('.tableStatus').css({"background-image":"-o-linear-gradient(top left 270deg, #fe8989, #be0a0a 50%, #a40606 50%, #f62e2e);"    });

      $('.tableStatus').html( "Game in progress" );
    }   
    else {
      $('.tableStatus').fadeIn(1000);
      $('.tableStatus').css({"background-color":"#78b12c" });
      $('.tableStatus').css({"background-image":"-webkit-gradient(linear, 0 0, 0 100%, from(#009900), to(#19A319), color-stop(50%, #2A802A), color-stop(50%, #266B26))" });
      //$('.tableStatus').css({"background-image":"-webkit-gradient(linear, 0 0, 0 100%, from(#009900), to(#19A319), color-stop(50%, #89c43a), color-stop(50%, #78b12c))" });

      $('.tableStatus').css({"background-image":"-moz-linear-gradient(top left 270deg, #009900, #89c43a 50%, #78b12c 50%, #19A319);"  });
      $('.tableStatus').css({"background-image":"-o-linear-gradient(top left 270deg, #009900, #89c43a 50%, #78b12c 50%, #19A319);"    });
    
      $('#tableAvailable').html( "Available" );

    }
}

