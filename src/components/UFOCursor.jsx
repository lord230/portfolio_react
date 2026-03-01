import React, { useEffect, useRef, useState } from 'react';

const UFOCursor = () => {
    const cursorRef = useRef(null);
    const beamRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const mousePos = useRef({ x: 0, y: 0 });
    const cursorPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (window.matchMedia('(max-width: 768px)').matches) return;

        const onMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            setIsVisible(true);

            // Check for interactive elements
            if (e.target) {
                const interactive = e.target.closest('a, button, input, textarea, select, .interactive, .project-card, .major-project-card, .exploratory-project-card, .contact-method-card');
                setIsHovering(!!interactive);
            }
        };
        const onMouseDown = () => setIsClicking(true);
        const onMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        const EASE = 0.12;
        let animId;

        const tick = () => {
            cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * EASE;
            cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * EASE;

            if (cursorRef.current) {
                const x = cursorPos.current.x;
                const y = cursorPos.current.y;
                cursorRef.current.style.transform = `translate3d(${x - 20}px, ${y - 20}px, 0)`;

                const dx = mousePos.current.x - cursorPos.current.x;
                const ufoEmoji = cursorRef.current.querySelector('.ufo-emoji');
                if (ufoEmoji) {
                    const tilt = Math.min(Math.max(dx * 0.3, -20), 20);
                    ufoEmoji.style.transform = `rotate(${tilt}deg)`;
                }
            }

            animId = requestAnimationFrame(tick);
        };

        tick();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            cancelAnimationFrame(animId);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div ref={cursorRef} className={`ufo-cursor ${isClicking ? 'beaming' : ''} ${isHovering ? 'hovering' : ''}`}>
            <div className="ufo-emoji">🛸</div>
            <div ref={beamRef} className="ufo-beam"></div>
        </div>
    );
};

export default UFOCursor;