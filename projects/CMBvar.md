---

title: CMB Variation Calculator
layout: project

---

---

<br>

# CMBverse

I worked with a team of 3 to build a website to provide an interactive way to explore our models of the Cosmic Microwave Background (CMB). I handled much of the plotting, done using a Boltzmann Solver, the Cosmic Linear Anisotropy Solving System (CLASS).

<br>

<img src="/assets/images/cmbsample1.png" alt="website sample" style="max-width:50%;">

<br>

## Cosmology explanation

The CMB is best described as the afterglow of the Big Bang, and one of the strongest pieces of evidence supporting the Big Bang theory. It's the leftover radiation from when the universe was so dense and small that it was just a sea of plasma, which we expected to be relatively equal in terms of density throughout, but isn't. By seeing where some parts of the CMB are stronger than others, we know that there were hot and cold spots in the early universe, with plasma being denser and hotter in some places than in others.  

<br>

CLASS is effectively used to compute what the Cosmic Microwave Background power spectrum (AKA the energy fluctuations) would look like as we change the variables of the function we use to model it. You've seen the CMB power spectrum before, represetned visually in the form of this iconic image:

<br>

<img src="/assets/images/spectrum.png" alt="power spectrum" style="max-width:50%;">

<br>

On the website, and in CLASS, I am just represeting it graphically, which is where our model of the CMB power spectrum comes in: the Lambda Cold Dark Matter model. It's our current (and best) understanding of the CMB power spectrum, and what we decided to base the website off of given how difficult its components can be to understand. 

<br>

## Details

The website itself is simple HTML, JavaScript, and CSS, and was my first real in to front end website development. It's currently in use in cosmology classes at Princeton and the University of Texas. 

<br>

CLASS: [https://github.com/lesgourg/class_public](https://github.com/igobyjack/CMB-variation-solver)
<br>

Check out the website here: [https://gabrielemontefalcone.com/CMBverse](https://gabrielemontefalcone.com/CMBverse/)
<br>

And the code for how I made some of the graphs at my repo: [https://github.com/igobyjack/CMB-variation-solver](https://github.com/igobyjack/CMB-variation-solver)
<br>

Textbook I used: [Introduction to Cosmology - Barbara Rayden](https://inspirehep.net/literature/639628)

<br>