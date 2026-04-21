import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PixelCard = ({ children, isMajor = false, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [nodes, setNodes] = useState([]);
  const cardRef = useRef(null);

  // Generate random neural nodes when hovered
  useEffect(() => {
    if (isHovered && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const newNodes = Array.from({ length: 5 }).map((_, i) => ({
        id: i,
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        val: (Math.random() * 2 - 1).toFixed(2),
        bias: Math.random() > 0.5 ? '+b' : '-b'
      }));
      setNodes(newNodes);
    } else {
      setNodes([]);
    }
  }, [isHovered]);

  const borderColor = isMajor ? 'var(--accent-color)' : 'var(--secondary-accent)';
  const glowColor = isMajor ? 'var(--glow-color)' : 'rgba(46, 196, 182, 0.4)';

  return (
    <motion.div
      ref={cardRef}
      className={`pixel-card ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-card)',
        border: `3px solid var(--border-color)`,
        padding: '1.5rem',
        overflow: 'hidden',
        cursor: 'none',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      whileHover={{
        borderColor: borderColor,
        boxShadow: `8px 8px 0px ${glowColor}`,
        y: -4,
      }}
    >
      {/* Grid overlay that appears on hover to give "pixel breakdown" feel */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />
        )}
      </AnimatePresence>

      {/* SVG lines connecting nodes randomly to simulate neural graph */}
      {isHovered && (
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
          {nodes.map((n1, i) =>
            nodes.slice(i + 1, i + 2).map((n2, j) => (
              <motion.line
                key={`${i}-${j}`}
                x1={n1.x}
                y1={n1.y}
                x2={n2.x}
                y2={n2.y}
                stroke={borderColor}
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            ))
          )}
        </svg>
      )}

      {/* Neural Nodes / Weights */}
      <AnimatePresence>
        {isHovered && nodes.map((node) => (
          <motion.div
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, x: node.x, y: node.y }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundColor: 'var(--text-primary)',
              border: `2px solid ${borderColor}`,
              padding: '2px 4px',
              fontSize: '0.65rem',
              color: 'var(--bg-primary)',
              fontFamily: 'var(--font-sans)',
              fontWeight: 'bold',
              pointerEvents: 'none',
              zIndex: 2,
              whiteSpace: 'nowrap'
            }}
          >
            {node.val} {node.bias}
          </motion.div>
        ))}
      </AnimatePresence>

      <div style={{ position: 'relative', zIndex: 3, flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
};

export default PixelCard;
