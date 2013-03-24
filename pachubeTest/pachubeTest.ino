 /**
 * Cosm Arduino sensor client example.
 *
 * This sketch demonstrates connecting an Arduino to Cosm (https://cosm.com),
 * using the new Arduino library to send and receive data.
 *
 * Requirements
 *   * Arduino with Ethernet shield or Arduino Ethernet (board must use the
 *     Wiznet Ethernet chipset)
 *   * Arduino software with version >= 1.0
 *   * An account at Cosm (https://cosm.com)
 *
 * Optional
 *   * An analog sensor connected to pin 2 (note we can still read a value from
 *     the pin without this)
 *
 * Created 8th January, 2013 using code written by Adrian McEwen with
 * modifications by Sam Mulube
 *
 * Full tutorial available here: https://cosm.com/docs/quickstart/arduino.html
 *
 * This code is in the public domain.
 */

#include <SPI.h>
#include <Ethernet.h>
#include <HttpClient.h>
#include <Cosm.h>

#define API_KEY "1QrIEwOdd5le4oNFrCtgGti9dEuSAKxobmlwQjRsd21CST0g" // your Cosm API key
#define FEED_ID 120687 // your Cosm feed ID

// MAC address for your Ethernet shield
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0x44, 0x44 };

// Analog pin which we're monitoring (0 and 1 are used by the Ethernet shield)
int sensorPin = 2;

unsigned long lastConnectionTime = 0;                // last time we connected to Cosm
const unsigned long connectionInterval = 15000;      // delay between connecting to Cosm in milliseconds
/* Increase frequency of updates from 15 seconds to .5 seconds (for testing)*/
//const unsigned long connectionInterval = 500;      // delay between connecting to Cosm in milliseconds

//Kocks don't always happen right when the knock sensor is polled. Causes readings to show 0 more often than it should
const int numberOfReadings = 30; 
int readings[numberOfReadings]; // array of all analog reads
int readingsIndex = 0;
int readingsTotal = 0;
int readingsAverage = 0;


// Initialize the Cosm library

// Define the string for our datastream ID
char sensorId[] = "sensor_reading";

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
  
  //Fill the array of sensor readings with 0's 
  for (int thisReading = 0; thisReading < numberOfReadings; thisReading++ ){
    readings[thisReading] = 0;
  }
}

void loop() {
  // main program loop
  if (millis() - lastConnectionTime > connectionInterval) {
    // read a value from the pin
    ////int sensorValue = analogRead(sensorPin);
    // send it to Cosm
    //sendData(sensorValue);
    sendData(readingsAverage);
    // read the datastream back from Cosm
    //getData();
    // update connection time so we wait before connecting again
    lastConnectionTime = millis();
  }
  //Subtract the last reading
  readingsTotal = readingsTotal - readings[readingsIndex];
  readings[readingsIndex] = analogRead(sensorPin);
  readingsTotal = readingsTotal + readings[readingsIndex];
  readingsIndex = readingsIndex + 1;

  //if at the end of array, wrap to begining
  if (readingsIndex >= numberOfReadings) {
      readingsIndex = 0;
  }
  //Calculate the average reading in the array
  readingsAverage = readingsTotal / numberOfReadings;

  Serial.print("Sensor = ");
  Serial.println( analogRead(sensorPin) );
  delay(100);
}

// send the supplied value to Cosm, printing some debug information as we go
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

// get the value of the datastream from Cosm, printing out the value we received
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

    
