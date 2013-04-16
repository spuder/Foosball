Foosball
========


##Hardware
Arduino Sensors detect if someone is playing foosball and shows the status in a web interface

Arduino ethernet
(+)piezo transducer -> Analog Pin 2
(-)piezo transducer -> Ground

1 MegaOhm resistor between Analog Pin 2 & ground to prevent overloads of the transducer from destroying arduino

#Hardware Firmware

The analog readings of the transducer are uploaded to cosm (formerly called pachube) at a regular interval. 
Cosm provides API's to query the history of the sensors. 

https://cosm.com/feeds/120687

##HTML/CSS
The webpage is written using html5 and css3 standards
The webpage uses the cosm java script library to query the sensor feed

No images are used on the page. 
Icons are created with the "font icon" technique

##Credits
Idea / Implementation - Spencer Owen
*spuder.wordpress.com

Web development - Jade Rigby
*http://www.monkeybyte.net
Contract work Available 

https://github.com/spudstud/Foosball/

##License
This content is in the public domain
Fair use with credits cited

#No table movement for about 60 seconds
![Available](https://raw.github.com/spudstud/Foosball/master/img/available.png)
#Recent table movement
![Unavailable](https://raw.github.com/spudstud/Foosball/master/img/unavailable.png)
#Video in Action
![Youtube](https://raw.github.com/spudstud/Foosball/master/img/youtube.png)
