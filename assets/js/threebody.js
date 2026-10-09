(() => {
    const canvas = document.getElementById('simulationCanvas');
    const ctx = canvas.getContext('2d');
    const pauseButton = document.getElementById('pause-button');
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const STEP = 1 / 120, G = 1080, SOFTENING = 24, RADIUS = 22, TRAIL_LIMIT = 360;
    const bodies = ['#228B22', '#4682B4', '#CD5C5C'].map(color => ({ color, mass: 250, trail: [] }));
    let width = 1, height = 1, paused = motion.matches;
    let frame = null, lastTime = null, accumulator = 0, ticks = 0, drag = null;

    function draw() {
        ctx.clearRect(0, 0, width, height);
        ctx.lineWidth = 1.5;
        for (const body of bodies) {
            ctx.strokeStyle = body.color;
            for (let i = 1; i < body.trail.length; i++) {
                const p = body.trail[i], prev = body.trail[i - 1];
                if (p.break) continue;
                ctx.globalAlpha = 0.65 * i / body.trail.length;
                ctx.beginPath();
                ctx.moveTo(prev.x, prev.y);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();
            }
            ctx.globalAlpha = 1;
            if (!Number.isFinite(body.x)) continue;
            ctx.beginPath();
            ctx.arc(body.x, body.y, RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = body.color;
            ctx.fill();
        }
    }

    function resize() {
        const rect = canvas.getBoundingClientRect();
        const oldWidth = width, oldHeight = height;
        width = Math.max(1, rect.width);
        height = Math.max(1, rect.height);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        endDrag();
        for (const body of bodies) {
            body.x *= width / oldWidth;
            body.y *= height / oldHeight;
            body.trail = [];
        }
        draw();
    }

    function reset() {
        endDrag();
        const offset = Math.min(200, width * 0.28, height * 0.28);
        const starts = [[0, -1, -18, 6], [1, 1, 0, -3], [-1, 1, 6, -6]];
        bodies.forEach((body, i) => {
            const [x, y, vx, vy] = starts[i];
            Object.assign(body, { x: width / 2 + x * offset, y: height / 2 + y * offset,
                vx, vy, trail: [], breakTrail: false });
        });
        accumulator = ticks = 0;
        lastTime = null;
        draw();
    }

    function accelerations() {
        const result = bodies.map(() => ({ x: 0, y: 0 }));
        for (let i = 0; i < bodies.length; i++) {
            for (let j = i + 1; j < bodies.length; j++) {
                const dx = bodies[j].x - bodies[i].x, dy = bodies[j].y - bodies[i].y;
                const factor = G / Math.pow(dx * dx + dy * dy + SOFTENING ** 2, 1.5);
                result[i].x += dx * factor * bodies[j].mass;
                result[i].y += dy * factor * bodies[j].mass;
                result[j].x -= dx * factor * bodies[i].mass;
                result[j].y -= dy * factor * bodies[i].mass;
            }
        }
        return result;
    }

    function step() {
        // Fixed-step kick-drift-kick leapfrog; softening bounds close-encounter forces.
        const before = accelerations();
        bodies.forEach((body, i) => {
            if (drag?.body === body) return;
            body.vx += before[i].x * STEP / 2;
            body.vy += before[i].y * STEP / 2;
            body.x += body.vx * STEP;
            body.y += body.vy * STEP;
            if (body.x < 0 || body.x >= width || body.y < 0 || body.y >= height) {
                body.x = ((body.x % width) + width) % width;
                body.y = ((body.y % height) + height) % height;
                body.breakTrail = true;
            }
        });
        const after = accelerations();
        bodies.forEach((body, i) => {
            if (drag?.body === body) return;
            body.vx += after[i].x * STEP / 2;
            body.vy += after[i].y * STEP / 2;
        });
        if (++ticks % 4 === 0) {
            for (const body of bodies) {
                body.trail.push({ x: body.x, y: body.y, break: body.breakTrail });
                body.breakTrail = false;
                if (body.trail.length > TRAIL_LIMIT) body.trail.shift();
            }
        }
    }

    function animate(time) {
        frame = null;
        if (paused || document.hidden) return;
        if (lastTime !== null) accumulator += Math.min((time - lastTime) / 1000, 0.1);
        lastTime = time;
        while (accumulator + 1e-12 >= STEP) {
            step();
            accumulator -= STEP;
        }
        draw();
        frame = requestAnimationFrame(animate);
    }

    function syncPlayback() {
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
        lastTime = null;
        accumulator = 0;
        pauseButton.textContent = paused ? 'Play' : 'Pause';
        pauseButton.setAttribute('aria-label', paused ? 'Play simulation' : 'Pause simulation');
        if (!paused && !document.hidden) frame = requestAnimationFrame(animate);
    }

    function point(event) {
        const rect = canvas.getBoundingClientRect();
        return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }
    function hitTest(p) {
        return [...bodies].reverse().find(body => Math.hypot(body.x - p.x, body.y - p.y) <= RADIUS + 6);
    }
    function endDrag() {
        if (!drag) return;
        const { pointerId, body } = drag;
        drag = null;
        body.breakTrail = true;
        if (canvas.hasPointerCapture(pointerId)) canvas.releasePointerCapture(pointerId);
        canvas.style.cursor = '';
    }
    canvas.addEventListener('pointerdown', event => {
        if (drag || !event.isPrimary || event.button !== 0) return;
        const p = point(event), body = hitTest(p);
        if (!body) return;
        drag = { body, pointerId: event.pointerId, dx: body.x - p.x, dy: body.y - p.y };
        body.vx = body.vy = 0;
        body.breakTrail = true;
        canvas.setPointerCapture(event.pointerId);
        canvas.style.cursor = 'grabbing';
    });
    canvas.addEventListener('pointermove', event => {
        const p = point(event);
        if (!drag) {
            canvas.style.cursor = hitTest(p) ? 'grab' : '';
            return;
        }
        if (event.pointerId !== drag.pointerId) return;
        drag.body.x = Math.max(0, Math.min(width, p.x + drag.dx));
        drag.body.y = Math.max(0, Math.min(height, p.y + drag.dy));
        draw();
    });
    // Cancel scrolling only when a touch starts on a body; the rest of the hero stays scrollable.
    canvas.addEventListener('touchstart', event => {
        if ([...event.changedTouches].some(touch => hitTest(point(touch)))) event.preventDefault();
    }, { passive: false });
    for (const name of ['pointerup', 'pointercancel', 'lostpointercapture']) {
        canvas.addEventListener(name, event => {
            if (drag?.pointerId === event.pointerId) endDrag();
        });
    }
    window.addEventListener('blur', endDrag);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', () => { endDrag(); syncPlayback(); });
    motion.addEventListener('change', event => { paused = event.matches; syncPlayback(); });
    pauseButton.addEventListener('click', () => { paused = !paused; syncPlayback(); });
    document.getElementById('reset-button').addEventListener('click', reset);
    resize();
    reset();
    syncPlayback();
})();
