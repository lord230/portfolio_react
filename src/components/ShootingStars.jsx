import React, { useEffect, useState } from 'react';

/* ── Static twinkling stars ── */
const makeTwinklers = (count) =>
    Array.from({ length: count }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() < 0.6 ? 1 : Math.random() < 0.85 ? 2 : 3,
        duration: (2.5 + Math.random() * 4).toFixed(2),
        delay: (Math.random() * 6).toFixed(2),
        opacity: (0.4 + Math.random() * 0.6).toFixed(2),
    }));

/* ── Shooting stars ── */
const makeShooters = (count) =>
    Array.from({ length: count }, (_, i) => ({
        id: i,
        /* start anywhere across the top 70% of the screen */
        top: `${Math.random() * 70}%`,
        left: `${Math.random() * 100}%`,
        /* each shooter has its own travel time and staggered start */
        duration: (3 + Math.random() * 5).toFixed(2),   // 3s – 8s
        delay: (Math.random() * 12).toFixed(2),           // 0s – 12s
        length: Math.floor(80 + Math.random() * 120),      // tail length px
    }));

const TWINKLERS = makeTwinklers(80);
const SHOOTERS = makeShooters(12);

const ShootingStars = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (window.matchMedia('(max-width: 768px)').matches) return;

        const handleMouseMove = (e) => {
            // Calculate mouse position relative to center of screen (-1 to 1)
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            className="star-canvas"
            style={{
                transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`,
                transition: 'transform 0.1s ease-out'
            }}
        >
            {/* static twinkling field */}
            {TWINKLERS.map((s) => (
                <span
                    key={`tw-${s.id}`}
                    className="twinkle-star"
                    style={{
                        top: s.top,
                        left: s.left,
                        width: `${s.size}px`,
                        height: `${s.size}px`,
                        '--twinkle-duration': `${s.duration}s`,
                        '--twinkle-delay': `${s.delay}s`,
                        '--base-opacity': s.opacity,
                    }}
                />
            ))}

            {/* shooting streaks */}
            {SHOOTERS.map((s) => (
                <span
                    key={`sh-${s.id}`}
                    className="shooting-streak"
                    style={{
                        top: s.top,
                        left: s.left,
                        '--shoot-duration': `${s.duration}s`,
                        '--shoot-delay': `${s.delay}s`,
                        '--tail-length': `${s.length}px`,
                    }}
                />
            ))}
        </div>
    );
};

export default ShootingStars;
