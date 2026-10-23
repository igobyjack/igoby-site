---

title: Neptune Systems Engineering Project
layout: project

---

---

<br>

# Neptune Systems Lawncare Project

<br>



## Overview

This was what I made for my Engineering Design and Development capstone project. I got the idea from a statstic about american water usage: about half the water american households use is for their lawn, and of that, half is considered wasted due to overwatering. All the moisture sensors I found were either designed for large scale industrial agriculture, or simple plant pots, so this project was an attempt at a solution that not only can cover lawns, but could also be scaled up/down. 

The system would consist of one or more buried moisture detectors connected to a central computer. The computer would organize and process the moisture sensor data coming in, and host a webpage that a homeowner could connect to over wifi, where they'd find information about their lawn's moisture, weather forecast, and a recommendation for watering their lawn that considers the current moisture level and any upcoming rain in the forecast.  

<br>

<img alt="Assembled Neptune soil moisture monitoring prototype" src="/assets/images/neptune/neptune_done.webp" style="max-width:50%;" loading="lazy" decoding="async" width="1400" height="1050">

## Hardware details

I used an arduino for processing the analogue data from the moisture sensor, a raspberry pi 1 for the wifi and page, and a 3.3V capacitive soil moisture sensor. A case was made onshape and 3D printed to contain the arduino and raspberry pi in a nice container, as well as a case for protecting the moisture sensor once buried.  

<br>

<img alt="CAD model of the Neptune computer enclosure" src="/assets/images/neptune/computercase.webp" style="max-width:50%;" loading="lazy" decoding="async" width="1400" height="866">

<br>

<img alt="Cross section of the buried soil moisture sensor enclosure" src="/assets/images/neptune/sensorcutaway.webp" style="max-width:50%;" loading="lazy" decoding="async" width="853" height="1306">

<br>

## Software details

<br>

The arduino runs a C++ script, recieving the data from any sensors connected and printing it to its serial out, connected to the pi. A python script on the pi reads the data coming in, and sends it through a websocket, where it is recieved by the webpage, ensuring live updates of the sensor value across all connected clients. The webpage turns the incoming raw value and converts it into a percentage, which is displayed on a bar in the top header, and plotted every 30 minutes. It also makes a recommendation for if you should water your lawn or wait.

<br>

<img alt="Neptune dashboard with moisture history and watering guidance" src="/assets/images/neptune/neptune.webp" style="max-width:50%;" loading="lazy" decoding="async" width="1080" height="1294">

<br>