// http://jsfiddle.net/QT5WY/
//http://jsfiddle.net/spuder/nvxQ2/5/ Working example using cosm's library 
    
    //var arrayOfReadings = [0,0,0,0,0,0,0,0,0,0];
    var arrayOfReadings = [];

    cosm.setKey("-Ux_JTwgP-8pje981acMa5811-mSAKxpR3VRUHRFQ3RBUT0g");

    var local_sensor_value = 0;
    var cosmFeed1 = 120687;
    var cosmDataStream1 = "sensor_reading";
     



$(document).ready( function()  {
  console.log("document.ready");


  
  var getHistory = function(data){

    console.log("*** getHistory() ****");

        for(var datapoint in data.datapoints){

            var dp = data.datapoints[datapoint];
            console.log("dp is " + dp);
            arrayOfReadings.push( Math.round( dp.value) );
            console.log("arrayOfReadings[]" + dp.value + " At: " + dp.at );
        }
    }

  cosm.datastream.history( cosmFeed1, cosmDataStream1, {duration:'60seconds', interval:0}, getHistory );



    var uri = 'https://api.cosm.com/v2/feeds/'+cosmFeed1+'/datastreams/'+cosmDataStream1+'.png?',
        params = {
            width: 850,
            height: 250,
            colour: '#0055ff',
            duration: '5minutes',
            legend: 'Analog Value from 0 -> 1024 ',
            title: 'Table Vibration Values - 5 Minutes',
            show_axis_labels: 'true', 
            detailed_grid: 'false',
            scale: 'manual',
            max: 35,
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



function addReading(reading) {
  console.log("function addReading(reading) appending: " + reading);
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

      //Table is red
      $('#status-light').attr('id','status-light-red');
      $('#status-light-orange').attr('id','status-light-red');
      $('#status-light-green').attr('id','status-light-red');
      $('#status-message-h1').html( "Unavailable" );

    }   
    else {

      //Table is green
      $('#status-light').attr('id','status-light-green');
      $('#status-light-orange').attr('id','status-light-green');
      $('#status-light-red').attr('id','status-light-green');
      $('#status-message-h1').html( "Available" );

    }
}



