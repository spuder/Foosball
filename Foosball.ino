/**
*Program to detect if someone is playing foosball
*Uses an Arduino and a Piezo element to detect vibrations
*
*

Revision 0.1 
2013-3-15 initial commit
Spencer Owen

**/

int ledPin = 13;
int sensorPin = 2;
byte sensorValue = 0;

float lastMovement = 0;



void setup() {
  
  pinMode(ledPin, OUTPUT);
  Serial.begin(115200);
	
}

void loop() {
	
  sensorValue = analogRead(sensorPin);
  Serial.print(sensorValue);
  if (sensorValue >=10) {
    lastMovement = millis();
    digitalWrite(ledPin, HIGH);
  }
  
  if ( (millis() - lastMovement) > 500) {
    digitalWrite(ledPin, LOW);
  }
  Serial.print("\t :");
  Serial.println(lastMovement);
  delay(50);
  
}
