 /**

Code derivded from Cosm's Arduino sensor client example code 
Full tutorial available here: https://cosm.com/docs/quickstart/arduino.html

 * Requirements
 *   * Arduino with Ethernet shield or Arduino Ethernet (board must use the
 *     Wiznet Ethernet chipset)
 *   * Arduino software with version >= 1.0
 *   * An account at Cosm (https://cosm.com)
 *   * A piezo electric transducer connected between Analog pin 2 and ground
 *
 * This code is in the public domain.
 */
 
 /*
 Revision 2.0
 2013-April-06
 spuder
   -Adds new functions purgeArray(), getAverage(), addReading()
   -Complete rewrite of the code to make it more cohesive and less tightly coupled
   -Increases the frequency of data uploads to every 1.5 seconds
 */

#include <SPI.h>
#include <Ethernet.h>
#include <HttpClient.h>
#include <Cosm.h>


/*********************************************************************************
**********************************************************************************
**
** DO NOT USE THESE VALUES!
** Instead go to cosm, create your own account, and place your key here:
**
**********************************************************************************
**********************************************************************************/
#define API_KEY "1QrIEwOdd5le4oNFrCtgGti9dEuSAKxobmlwQjRsd21CST0g" 
#define FEED_ID 120687                  
char sensorId[] = "sensor_reading"; //Datastream






// MAC address for your Ethernet shield
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0x44, 0x44 };

// Analog pin connected to sensor (0 and 1 are used by the Ethernet shield)
int sensorPin = 2;

unsigned long lastConnectionTime = 0;                // last time we connected to Cosm
const unsigned long connectionInterval = 1500;      // delay between connecting to Cosm in milliseconds

//Kocks don't always happen right when the knock sensor is polled. Causes readings to show 0 more often than it should
const int numberOfReadings = 15; //recomended that connectionInterval and numberOfReadings are multiples of each other
int readings[numberOfReadings]; // array of all analog reads
int readingsIndex = 0;


CosmDatastream datastreams[] = {
  CosmDatastream(sensorId, strlen(sensorId), DATASTREAM_FLOAT),
};

// Wrap the datastream into a feed
CosmFeed feed(FEED_ID, datastreams, 1 /* number of datastreams */);

EthernetClient client;
CosmClient cosmclient(client);

void setup() {
 
  // put your setup code here, to run once:
  Serial.begin(115200);

  Serial.println("Cosm Sensor Client Example");
  Serial.println("==========================");

  Serial.println("Initializing network");
  while (Ethernet.begin(mac) != 1) {
    Serial.println("Error getting IP address via DHCP, trying again...");
    delay(15000);
  }

  Serial.println("Network initialized");
  Serial.println();
  
  //Set all values of array to 0
  purgeArray();
}

void loop() {
  // main program loop
  if (millis() - lastConnectionTime > connectionInterval) {
    sendData( getAverage() );
    purgeArray();
    // update connection time so we wait before connecting again
    lastConnectionTime = millis();
  }
  int theReading = analogRead( sensorPin );
  addReading( theReading ); //Adds the reading to the array

  Serial.print("Sensor = ");
  Serial.println( theReading );
  delay(100);
}

/**
  Fills the entire array with 0's
*/
void purgeArray() {
    //Fill the array of sensor readings with 0's 
  for (int thisReading = 0; thisReading < numberOfReadings; thisReading++ ){
    readings[thisReading] = 0;
  }
  readingsIndex=0;
}
  
/**
  Appends the most recent sensor reading to the array of readings
  Array list is defined by "numberOfReadings*
*/
void addReading(int aReading) {
  readings[readingsIndex] = aReading;
  readingsIndex = readingsIndex + 1;
  if ( readingsIndex >= numberOfReadings ) {
    readingsIndex = 0;
  }
}

/**
  Returns the average value of the array
  See arduino "smoothing" example for more info
  Usefull if your sensor readings are too far appart to 
    always catch the trigger
*/
int getAverage() {
  int readingsTotal = 0;
  for (int i = 0; i < numberOfReadings; i++ ) {
    readingsTotal = readingsTotal + readings[i];
  }
  return readingsTotal / numberOfReadings ;
  
}

/**
  Send the reading Cosm, printing some debug information as we go
*/
void sendData(int sensorValue) {
  datastreams[0].setFloat(sensorValue);

  Serial.print("Read sensor value ");
  Serial.println(datastreams[0].getFloat());
  Serial.println(sensorValue);

  Serial.print("Uploading to Cosm ");
  Serial.println(sensorValue);
  int ret = cosmclient.put(feed, API_KEY);
  Serial.print("PUT return code: ");
  Serial.println(ret);

  Serial.println();
}

/*
  Get the value of the datastream from Cosm, printing out the value we received
  Not used in this particular sketch
 */
void getData() {
  Serial.println("Reading data from Cosm");

  int ret = cosmclient.get(feed, API_KEY);
  Serial.print("GET return code: ");
  Serial.println(ret);

  if (ret > 0) {
    Serial.print("Datastream is: ");
    Serial.println(feed[0]);

    Serial.print("Sensor value is: ");
    Serial.println(feed[0].getFloat());
  }

  Serial.println();
}

    
