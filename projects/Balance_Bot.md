---

title: Balancer Robot Project
layout: project

---

---

# Balancer Robot

## What it is

This is a robot that functions like an inverse pendulum, a system that is inherently unstable and needs constant correction to remain upright. A lot of people do these projects with a literal rod on an axle and a rail capable of moving it left and right, but I thought it would be more interesting to build a robot where the entire system is the pendulum.

## Hardware

The hardware for this project was relatively simple, and I tried to keep it that way since it was my first experience using microcontrollers for something like this.

-Arduino Uno as the main microcontroller

-MPU6050 accelerometer/gyroscope

-Two DC motors

-Motor controller

-Battery case with two 18650 lithium-ion cells to power everything

I designed the chassis in Onshape and had a friend print the base parts for me (Thanks Scott).

<div style="display: flex; gap: 10px;">
    <img src="/assets/images/pidbot/bennycad2.png" alt="robot cad" style="max-width:50%;">
    <img src="/assets/images/pidbot/bennycad1.png" alt="robot cad" style="max-width:50%;">
</div>

## PID Control 

The main goal of this project was to teach myself some beginning control theory, specifically PID control and filtering methods.

PID (Proportional–Integral–Derivative) is a method used to manage machines and robots that requires constant adjustment. It works by starting with an error value: the difference between where you are and where you want to be. For me, that was the difference between the observed angle of inclination and the target angle where the robot stays balanced (which turned out to be 1.9°, since the robot was a bit front heavy).

Once the error is calculated, three things happen:

1. Proportional: Multiply the error by a proportional gain value.

2. Integral: Take the sum (integral) of past errors and multiply it by an integral gain value.

3. Derivative: Take the rate of change (derivative) of the error and multiply it by a derivative gain value.

The three results are summed into the PID value, which controls the motor speed. The sign of the value determines direction (leaning forward vs. backward).

<img src="/assets/images/pidbot/PIDexplain.png" alt="robot cad" style="max-width:50%;">

Where it gets interesting is tuning the gain values.

1. With only proportional gain, the robot oscillates back and forth, never fully settling.

2. Adding integral gain helps it return to center faster and deal with steady offsets.

3. Adding derivative gain corrects overshoots and reduces oscillations.

## Filters

The MPU6050 doesn’t give you absolute angle data. Instead, it measures changes in inclination and acceleration. To estimate the actual angle, you have to integrate these changes over time — but each measurement has weaknesses:

1. Gyroscope (angle change): Accurate in the short term, but drifts over time.

2. Accelerometer (acceleration): Stable in the long term, but noisy and unreliable in the short term (jolts throw it off).

This creates a useful pairing, that one measurement is good short term but degrades long term, while the other is the opposite. By combining them with a filter, you can reconcile their weaknesses into a much more accurate measurement of inclination.

<img src="/assets/images/pidbot/filterequation.png" alt="complimentary filter" style="max-width:80%;">

## Demonstration

After tuning the PID values and applying filtering, the robot was able to balance on its own for extended periods. At first it wobbled a lot and would fall quickly, but after experimenting with gain values the motion became much smoother. The robot can now recover from small pushes and maintain an upright position without constant manual adjustment.

It isn’t perfect, if the batteries are low or the motors don’t respond quickly enough, it still tips over, and the design is very bottom heavy. But for a first attempt at using microcontrollers, sensors, and control theory together, it worked better than I expected. 

<video controls preload="auto" width="100%" style="max-height:400px;" muted playsinline>
    <source src="/assets/vids/balancer_demo.mp4" type="video/mp4">
    <source src="/assets/vids/balancer_demo.webm" type="video/webm">
    Your browser does not support the video tag. <a href="/assets/vids/balancer_demo.mp4">Download the video instead.</a>
</video>
<br>

