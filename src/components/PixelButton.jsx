import React from 'react';
import { motion } from 'framer-motion';

const PixelButton = ({ children, onClick, isPrimary = true, className = '', ...props }) => {
  const bg = isPrimary ? 'var(--text-primary)' : 'transparent';
  const text = isPrimary ? 'var(--bg-primary)' : 'var(--text-primary)';
  const border = 'var(--text-primary)';
  const hoverBg = isPrimary ? 'transparent' : 'var(--text-primary)';
  const hoverText = isPrimary ? 'var(--text-primary)' : 'var(--bg-primary)';

  return (
    <motion.button
      className={`pixel-btn ${className}`}
      onClick={onClick}
      style={{
        backgroundColor: bg,
        color: text,
        border: `3px solid ${border}`,
        padding: '0.8rem 1.5rem',
        fontFamily: 'var(--font-serif)',
        fontSize: '0.8rem',
        textTransform: 'uppercase',
        cursor: 'none', // using custom PixelCursor
        position: 'relative',
        outline: 'none',
        display: 'inline-block'
      }}
      whileHover={{
        backgroundColor: hoverBg,
        color: hoverText,
        boxShadow: `4px 4px 0px var(--accent-color)`,
        y: -2,
        x: -2
      }}
      whileTap={{
        boxShadow: `0px 0px 0px var(--accent-color)`,
        y: 2,
        x: 2
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default PixelButton;
