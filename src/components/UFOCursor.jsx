import React, { useEffect, useRef, useState } from 'react';

const UFOCursor = () => {
    const cursorRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const cursorPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    useEffect(() => {
        if (window.matchMedia('(max-width: 768px)').matches) return;

        const onMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            setIsVisible(true);

            if (e.target) {
                const interactive = e.target.closest('a, button, input, textarea, select, .interactive, .project-card, .major-project-card, .exploratory-project-card, .contact-method-card');
                setIsHovering(!!interactive);
            }
        };

        window.addEventListener('mousemove', onMouseMove);

        let animId;
        let baseAngle = 0;
        let lastTime = performance.now();

        // Animation State
        let currentAnim = null;
        let animTimer = 0;
        let animPhase = 0;
        let savedOffset = { x: 0, y: 0 };
        let nextAnimTime = performance.now() + 2000 + Math.random() * 3000; // 2 to 5 seconds

        // Particle System Container
        const container = document.createElement('div');
        container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9998;';
        document.body.appendChild(container);

        const spawnParticle = (x, y, color) => {
            const p = document.createElement('div');
            p.style.cssText = `
                position: absolute;
                left: ${x}px; top: ${y}px;
                width: 6px; height: 6px;
                background: ${color};
                border-radius: 50%;
                box-shadow: 0 0 10px ${color};
                transition: all 0.6s cubic-bezier(0.1, 0.8, 0.3, 1);
                transform: translate(-50%, -50%) scale(1);
                opacity: 0.8;
            `;
            container.appendChild(p);

            const angle = Math.random() * Math.PI * 2;
            const dist = 30 + Math.random() * 50;
            const tx = x + Math.cos(angle) * dist;
            const ty = y + Math.sin(angle) * dist;

            // Trigger animation next frame
            requestAnimationFrame(() => {
                p.style.transform = `translate(${tx - x}px, ${ty - y}px) scale(0)`;
                p.style.opacity = '0';
            });

            setTimeout(() => {
                if (container.contains(p)) container.removeChild(p);
            }, 600);
        };

        const EASE = 0.08;

        const tick = (now) => {
            const dt = Math.min(now - lastTime, 50); // cap delta time
            lastTime = now;

            // Base hovering logic (constant slow orbit)
            baseAngle += 0.002 * dt;
            const orbitRadius = 45;
            let targetX = mousePos.current.x + Math.cos(baseAngle) * orbitRadius;
            let targetY = mousePos.current.y + Math.sin(baseAngle) * orbitRadius;

            // Trigger new random animation between 2 and 5 seconds
            if (!currentAnim && now > nextAnimTime) {
                const anims = ['zap', 'spin', 'abduct', 'dart'];
                currentAnim = anims[Math.floor(Math.random() * anims.length)];
                animTimer = 0;
                animPhase = 0;
                nextAnimTime = now + 2000 + Math.random() * 3000;
            }

            let extraScale = 1;
            let extraRotation = 0;

            if (currentAnim) {
                animTimer += dt;

                if (currentAnim === 'zap') {
                    // Phase 0: shrink and spin
                    if (animPhase === 0) {
                        extraScale = Math.max(0, 1 - animTimer / 300);
                        extraRotation = animTimer * 2;
                        if (animTimer > 300) {
                            animPhase = 1;
                            for (let i = 0; i < 10; i++) spawnParticle(cursorPos.current.x, cursorPos.current.y, '#0ff');
                            // teleport somewhere random nearby
                            const a = Math.random() * Math.PI * 2;
                            cursorPos.current.x = mousePos.current.x + Math.cos(a) * 150;
                            cursorPos.current.y = mousePos.current.y + Math.sin(a) * 150;
                        }
                    }
                    // Phase 1: stay invisible briefly
                    else if (animPhase === 1) {
                        extraScale = 0;
                        if (animTimer > 600) {
                            animPhase = 2;
                            for (let i = 0; i < 10; i++) spawnParticle(cursorPos.current.x, cursorPos.current.y, '#a78bfa');
                        }
                    }
                    // Phase 2: pop back in
                    else if (animPhase === 2) {
                        const t = (animTimer - 600) / 300;
                        extraScale = Math.min(1, t);
                        extraRotation = (1 - t) * 720;
                        if (t >= 1) currentAnim = null;
                    }
                }

                else if (currentAnim === 'spin') {
                    // Fast barrel rolls while doing a wider orbit
                    extraRotation = (animTimer / 800) * 1440; // 4 spins
                    targetX = mousePos.current.x + Math.cos(baseAngle + animTimer * 0.01) * orbitRadius * 2.5;
                    targetY = mousePos.current.y + Math.sin(baseAngle + animTimer * 0.01) * orbitRadius * 2.5;
                    if (Math.random() < 0.1) spawnParticle(cursorPos.current.x, cursorPos.current.y, '#f0a500');
                    if (animTimer > 800) currentAnim = null;
                }

                else if (currentAnim === 'dart') {
                    // Dart away quickly then ease back
                    if (animPhase === 0) {
                        savedOffset = { x: (Math.random() - 0.5) * 400, y: (Math.random() - 0.5) * 400 };
                        animPhase = 1;
                    }
                    targetX = mousePos.current.x + savedOffset.x;
                    targetY = mousePos.current.y + savedOffset.y;
                    extraRotation = Math.sin(animTimer * 0.05) * 45; // wobble during dart

                    if (Math.random() < 0.15) spawnParticle(cursorPos.current.x, cursorPos.current.y, '#3b82f6');
                    if (animTimer > 1000) currentAnim = null;
                }

                else if (currentAnim === 'abduct') {
                    // Hover aggressively above the cursor and trigger beaming
                    targetX = mousePos.current.x;
                    targetY = mousePos.current.y - 70; // 70px above cursor

                    if (animTimer > 300 && animTimer < 1500) {
                        if (cursorRef.current) cursorRef.current.classList.add('beaming');
                        extraRotation = (Math.random() - 0.5) * 15; // shaky wobble
                    } else {
                        if (cursorRef.current) cursorRef.current.classList.remove('beaming');
                    }

                    if (animTimer > 1800) currentAnim = null;
                }
            } else {
                if (cursorRef.current) cursorRef.current.classList.remove('beaming');
            }

            // Move the cursor towards the target with easing
            const ease = currentAnim === 'dart' ? 0.2 : EASE;
            cursorPos.current.x += (targetX - cursorPos.current.x) * ease;
            cursorPos.current.y += (targetY - cursorPos.current.y) * ease;

            // Apply transforms visually
            if (cursorRef.current) {
                const x = cursorPos.current.x;
                const y = cursorPos.current.y;
                // Center the 40x40 UFO div
                cursorRef.current.style.transform = `translate3d(${x - 20}px, ${y - 20}px, 0)`;

                // Tilt based on horizontal velocity
                const dx = targetX - cursorPos.current.x;
                const emoji = cursorRef.current.querySelector('.ufo-emoji');
                if (emoji) {
                    const tilt = Math.min(Math.max(dx * 0.6, -35), 35);
                    emoji.style.transform = `rotate(${tilt + extraRotation}deg) scale(${extraScale})`;
                }
            }

            animId = requestAnimationFrame(tick);
        };

        animId = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animId);
            if (container.parentNode) container.parentNode.removeChild(container);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div ref={cursorRef} className={`ufo-cursor ${isHovering ? 'hovering' : ''}`}>
            <div className="ufo-emoji">🛸</div>
            <div className="ufo-beam"></div>
        </div>
    );
};

export default UFOCursor;