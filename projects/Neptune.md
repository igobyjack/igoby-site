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

<img src="/assets/images/neptune/neptune_done.jpeg" alt="full system" style="max-width:50%;">

## Hardware details

I used an arduino for processing the analogue data from the moisture sensor, a raspberry pi 1 for the wifi and page, and a 3.3V capacitive soil moisture sensor. A case was made onshape and 3D printed to contain the arduino and raspberry pi in a nice container, as well as a case for protecting the moisture sensor once buried.  

<br>

<img src="/assets/images/neptune/computercase.png" alt="computer cad" style="max-width:50%;">

<br>

<img src="/assets/images/neptune/sensorcutaway.png" alt="cad cutaway" style="max-width:50%;">

<br>

## Software details

<br>

The arduino runs a C++ script, recieving the data from any sensors connected and printing it to its serial out, connected to the pi. A python script on the pi reads the data coming in, and sends it through a websocket, where it is recieved by the webpage, ensuring live updates of the sensor value across all connected clients. The webpage turns the incoming raw value and converts it into a percentage, which is displayed on a bar in the top header, and plotted every 30 minutes. It also makes a recommendation for if you should water your lawn or wait.

<br>

<img src="/assets/images/neptune/neptune.png" alt="web page" style="max-width:50%;">

<br>