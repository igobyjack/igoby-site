---
layout: default
title: My Projects
---

<div class="projects-intro">
  <h1>Selected Projects</h1>
  <p>Robotics, propulsion, and scientific computing: systems I have built, tested, and explored.</p>
</div>

<div class="projects-grid">
<article class="project-block">
  <img src="/assets/images/trel/havoc_2.webp" alt="Havoc-2 rocket engine" loading="eager" decoding="async" width="1400" height="593">
  <h2>TREL: Rocket Propulsion</h2>
  <p>Developing a torch igniter and fuel pump, with hands-on engine integration, hotfire instrumentation, and data review.</p>
  <a href="/projects/trel.html">Explore propulsion work &rarr;</a>
</article>
<article class="project-block">
  <img src="/assets/images/atlas/platform_complete.webp" alt="Atlas RC truck with onboard computer and LiDAR" loading="eager" decoding="async" width="776" height="491">
  <h2>Atlas Autonomous Truck</h2>
  <p>Built a ROS 2 vehicle platform with manual override, command timeouts, and calibrated steering and throttle control.</p>
  <a href="/projects/Atlas.html">Explore Atlas &rarr;</a>
</article>
<article class="project-block">
  <img src="/assets/images/cmbverse/Dl_Neff_damping.webp" alt="CMB power spectra showing the effect of changing cosmological parameters" loading="lazy" decoding="async" width="849" height="744">
  <h2>CMBverse</h2>
  <p>Created cosmology plots for a three-person educational project used in classes at Princeton and UT.</p>
  <a href="/projects/CMBvar.html">Explore CMBverse &rarr;</a>
</article>
<article class="project-block">
  <img src="/assets/images/scratch-net/scratchnet.webp" alt="Handwritten digit with its predicted classification" loading="lazy" decoding="async" width="640" height="480">
  <h2>MNIST Scratch Neural Net</h2>
  <p>A neural-network implementation for classifying handwritten digits from the MNIST dataset.</p>
  <a href="https://github.com/igobyjack/scratch-net">View neural-network code &rarr;</a>
</article>
<article class="project-block">
  <img src="/assets/images/pidbot/bennyhimself.webp" alt="Two-wheel self-balancing robot" loading="lazy" decoding="async" width="1395" height="1400">
  <h2>Balancer Robot</h2>
  <p>Designed and tuned an Arduino robot that balances using PID control and sensor filtering, and recovers from small pushes.</p>
  <a href="/projects/Balance_Bot.html">Explore the balancing robot &rarr;</a>
</article>
<article class="project-block">
  <img src="/assets/images/neptune/Neptunesensor.webp" alt="Neptune soil moisture sensor enclosure" loading="lazy" decoding="async" width="613" height="634">
  <h2>Neptune Lawncare</h2>
  <p>Built a soil-moisture monitoring prototype with live browser updates and watering recommendations.</p>
  <a href="/projects/Neptune.html">Explore Neptune &rarr;</a>
</article>
</div>

<section id="research" class="research-block" aria-labelledby="research-title">
  <h2 id="research-title">Research</h2>
  <article class="research-card">
    <h3>Optimal Multi-Spacecraft Refueling Planning for Cislunar Operations</h3>
    <p class="research-result"><strong>36% lower fuel consumption</strong> than a greedy strategy in the paper's simulations.</p>
    <p>The study combines orbital-transfer modeling with a Markov decision process to plan refueling across multiple spacecraft in the Earth–Moon system.</p>
    <img src="/assets/images/cislunar/cislunarpaper.webp" alt="Orbital trajectories considered in the cislunar refueling study" loading="lazy" decoding="async" width="672" height="511">
    <a href="/assets/papers/cislunar/Optimal_Multi-Spacecraft_Refueling_Planning_Cislunar.pdf">Read the research paper (PDF)</a>
    <details>
      <summary>Read the full abstract</summary>
<p>As space activities expand within the cislunar environment,
    developing efficient refueling strategies becomes essential
    for sustaining long-term missions. The multi-spacecraft
    refueling problem focuses on optimizing fuel consumption to
    extend mission lifetimes. A multi-fidelity modeling approach
    addresses varying levels of precision, using the two-body problem
    for initial trajectory estimation, the circular restricted
    three-body problem for reference orbits and transfers, and
    the bicircular restricted four-body problem with solar radiation
    pressure for realistic station-keeping costs. The refueling
    problem is formulated as an infinite-horizon Markov decision
    process (MDP), optimizing the refueling strategy while preventing
    fuel depletion. The refueling process consists of two
    phases: first, the refueler transfers into a temporary phasing
    orbit, followed by a final phasing maneuver to rendezvous with
    the target spacecraft. We map the available transfers between
    orbits using a fast sampling technique and select the phasing
    orbit to minimize fuel consumption within a limited synodic
    period. The case study samples orbits from the Lyapunov and
    Halo families around the Lagrange points of the Earth-Moon
    system, L1, L2, and L3. Simulations demonstrate that the MDP-based
    planning achieves a 36% reduction in fuel consumption
    compared to a greedy strategy.</p>
    </details>
  </article>
</section>
