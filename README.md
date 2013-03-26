Foosball
========

Arduino Sensors detect if someone is playing foosball and shows the status in a web interface

Arduino ethernet
(+)piezo transducer -> Analog Pin 2
(-)piezo transducer -> Ground

1 MegaOhm resistor between Analog Pin 2 & ground to prevent overloads of the transducer from destroying arduino


The analog readings of the transducer are uploaded to cosm (formerly called pachube) at a regular interval. 
Cosm provides API's to query the history of the sensors. 

https://cosm.com/feeds/120687



https://github.com/spudstud/Foosball/
