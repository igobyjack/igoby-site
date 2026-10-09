---

title: Atlas Autonomous Truck
layout: project

---

# Atlas Autonomy

<img src="/assets/images/atlas/platform_complete.png">

## Overview

Atlas Autonomy is a compact autonomous-vehicle research platform built on a Traxxas 1/10-scale Slash RC truck. I designed the system to preserve as much of the original vehicle as possible while adding an onboard computer, sensor interfaces, and a ROS 2 control stack. The result is a practical platform for developing and testing autonomous driving software without the cost and risk of a full-size vehicle.

An NVIDIA Jetson Orin Nano Super serves as the primary computer. It runs ROS 2 Humble in an Ubuntu 22.04 and interfaces with the truck's electronic speed controller, steering servo, radio receiver, and sensors. A PCA9685 PWM controller converts software commands into physical steering and throttle outputs, while an Arduino reads the existing Traxxas radio receiver and forwards normalized driver commands to the Jetson.

## The Challenge

The central challenge was not simply making the truck drive from software, it was integrating autonomous control without removing the operator's ability to intervene. The platform needed to translate commands across several hardware and software layers, handle stale or missing data safely, and give manual input unambiguous priority over autonomy.

This required a control path that could:

- Accept standard Ackermann steering commands from ROS 2.
- Map normalized speed and steering requests to calibrated servo and ESC signals.
- Read the stock radio controller through the Traxxas receiver.
- Switch safely between autonomous and manual control.
- Stop and center the vehicle when commands or the radio link are lost.
- Prevent autonomy from immediately resuming after a human takeover.

<!-- IMAGE: Place a close-up photo of the electronics installation here. Label the Jetson, Arduino, PCA9685, receiver, and power conversion hardware with subtle callouts. A clean overhead shot works best. -->

## System Design

The control software is organized as a ROS 2 Python package. A receiver node reads comma-separated throttle and steering values from the Arduino and publishes them as `AckermannDriveStamped` messages. The driver node subscribes to both manual and autonomous command topics, selects the active source, and drives the steering servo and ESC through the PCA9685.

Manual input acts as a high-priority, latched override. Any deliberate movement of the transmitter controls disables autonomous output and returns control to the operator. Autonomy remains locked out until it is explicitly re-armed through a ROS 2 service, and the service refuses to arm the vehicle while the operator is still moving the controls. Timeouts provide an additional fail-safe as stale autonomous commands or a lost manual-control link return the throttle to neutral and center the steering.

<img src="/assets/images/atlas/wiring_diagram.drawio.png" alt="diagram" style="max-width:80%;">

*The power, control, and sensor connections between the Jetson, radio receiver, PWM controller, steering servo, ESC, and LiDAR.*

## Control Flow

<img src="/assets/images/atlas/ROS2%20Stack%20Atlas.drawio.png" alt="diagram" style="max-width:80%;">


The common Ackermann message interface keeps the hardware layer independent from any future planner or autonomy stack. A controller only needs to publish steering angle and speed requests; calibration, source selection, and actuator limits remain inside the driver.

<!-- IMAGE: Add a screenshot or short looping GIF immediately after this section showing the ROS 2 nodes running while the wheels respond to manual and autonomous commands. Include the terminal output when the source changes from AUTONOMOUS to MANUAL. Avoid a large wall of terminal text. -->

## Engineering Highlights

- Built a ROS 2 hardware driver for steering and throttle control on embedded Linux.
- Implemented a priority multiplexer for manual and autonomous drive commands.
- Added a sticky manual-override latch with an explicit, guarded re-arm service.
- Added command freshness checks and safe neutral behavior for dropped connections.
- Calibrated asymmetric steering limits and forward/reverse throttle response through ROS parameters.
- Converted raw PWM pulse widths from the stock receiver into normalized serial commands with deadband compensation.
- Created a single launch entry point and a system service for repeatable vehicle bring-up.
- Kept the interface compatible with standard Ackermann-based ROS 2 controllers.

## Gallery

For the demos, the I mainly used the onboard camera, LiDAR, RF2O laser odometry, slam_toolbox, and NAV2.

<img src="/assets/images/atlas/map.png" alt="diagram" style="max-width:80%;">

LiDAR map of Anna Hiss Gym mock apartment

<video controls preload="auto" width="100%" style="max-height:400px;" muted playsinline>
    <source src="/assets/videos/atlas/atlas_onboard_vid.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>

onboard demo footage

<video controls preload="auto" width="100%" style="max-height:400px;" muted playsinline>
    <source src="/assets/videos/atlas/atlas_maxcam.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>

## Repository

<a href="https://github.com/igobyjack/atlas_autonomy">https://github.com/igobyjack/atlas_autonomy</a>
