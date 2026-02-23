import React, { useEffect, useRef, useState } from 'react';

const UFOCursor = () => {
    const cursorRef = useRef(null);
    const beamRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    // Mouse position state
    const mousePos = useRef({ x: 0, y: 0 });
    const cursorPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Hide on mobile
        if (window.matchMedia("(max-width: 768px)").matches) return;

        const onMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
        };

        const onMouseDown = () => setIsClicking(true);
        const onMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        // Animation Loop
        let animationFrameId;

        const updateCursor = () => {
            // Linear Interpolation (Lerp) for smooth following
            // adjust 0.1 for speed/delay (lower = slower/smoother)
            const ease = 0.15;

            cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * ease;
            cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * ease;

            if (cursorRef.current) {
                const x = cursorPos.current.x;
                const y = cursorPos.current.y;
                // Center the cursor (adjust based on size)
                cursorRef.current.style.transform = `translate3d(${x - 20}px, ${y - 20}px, 0)`;
            }

            // Rotate UFO slightly based on movement direction
            if (cursorRef.current) {
                const dx = mousePos.current.x - cursorPos.current.x;
                const rotation = dx * 0.5; // simple tilt
                const ufoEmoji = cursorRef.current.querySelector('.ufo-emoji');
                if (ufoEmoji) {
                    ufoEmoji.style.transform = `rotate(${Math.min(Math.max(rotation, -20), 20)}deg)`;
                }
            }

            animationFrameId = requestAnimationFrame(updateCursor);
        };

        updateCursor();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div ref={cursorRef} className={`ufo-cursor ${isClicking ? 'beaming' : ''}`}>
            <div className="ufo-emoji">🛸</div>
            <div ref={beamRef} className="ufo-beam"></div>
        </div>
    );
};

export default UFOCursor;
