import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [weight, setWeight] = useState('0.000');

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setWeight((Math.random() * 2 - 1).toFixed(4));
    }, 100);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(updateInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 50);

    return () => {
      clearInterval(updateInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={styles.content}
      >
        <h1 style={styles.title}>Initializing Neural Network...</h1>
        
        <div style={styles.dataRow}>
          <span>WEIGHT_OPT: {weight}</span>
          <span>EPOCH: {Math.floor(progress / 10)}/10</span>
        </div>

        <div style={styles.progressBarContainer}>
          <div style={{ ...styles.progressBar, width: `${progress}%` }} />
        </div>
        
        <div style={styles.percentage}>[{progress}%]</div>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "var(--font-sans)",
  },
  content: {
    width: '100%',
    maxWidth: '600px',
    padding: '2rem',
    border: '4px solid var(--border-color)',
    backgroundColor: 'var(--bg-secondary)',
    boxShadow: '8px 8px 0px var(--shadow-color)',
  },
  title: {
    fontFamily: "var(--font-serif)",
    fontSize: '1.2rem',
    marginBottom: '2rem',
    textTransform: 'uppercase',
  },
  dataRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
  },
  progressBarContainer: {
    width: '100%',
    height: '30px',
    border: '2px solid var(--text-primary)',
    padding: '2px',
    marginBottom: '1rem',
    backgroundColor: 'var(--bg-card)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'var(--accent-color)',
    transition: 'width 0.1s linear',
  },
  percentage: {
    textAlign: 'right',
    fontFamily: "var(--font-sans)",
    fontWeight: 'bold',
  }
};

export default LoadingScreen;
