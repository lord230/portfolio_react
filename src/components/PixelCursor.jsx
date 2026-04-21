import React, { useEffect, useRef } from 'react';

const PixelCursor = () => {
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);
  const trailsRef = useRef([]);

  useEffect(() => {
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isMobile) return;

    const cursor = cursorRef.current;
    const canvas = canvasRef.current;
    if (!cursor || !canvas) return;

    const ctx = canvas.getContext('2d');
    
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Update DOM cursor position
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      // Spawn trail particle
      trailsRef.current.push({
        x: mouseX,
        y: mouseY,
        life: 1,
        color: Math.random() > 0.5 ? '#FFD700' : '#2EC4B6' // Gold or Teal
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = trailsRef.current.length - 1; i >= 0; i--) {
        const p = trailsRef.current[i];
        p.life -= 0.05; // Fade out speed
        
        if (p.life <= 0) {
          trailsRef.current.splice(i, 1);
          continue;
        }

        // Draw pixel block
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        // Jitter slightly for AI effect
        const jitterX = p.x + (Math.random() - 0.5) * 4;
        const jitterY = p.y + (Math.random() - 0.5) * 4;
        
        const size = Math.max(2, 10 * p.life);
        ctx.fillRect(jitterX - size/2, jitterY - size/2, size, size);
      }
      
      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9998
        }}
      />
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '20px',
          height: '20px',
          backgroundColor: 'var(--text-primary)',
          border: '2px solid var(--accent-color)',
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: '0 0 10px var(--glow-color)',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform'
        }}
      />
    </>
  );
};

export default PixelCursor;
