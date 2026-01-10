import React, { useEffect, useRef, useState } from 'react';
const NeuralNetwork = () => {
    const canvasRef = useRef(null);
    const [outputs, setOutputs] = useState(['1']);

    // Configuration
    const layers = [4, 6, 4, 1]; // 3 Input, 4 Hidden, 2 Hidden, 1 Output
    const nodeRadius = 20; // Increased size
    const layerSpacing = 117; // Horizontal spacing
    const nodeSpacing = 50;  // Vertical spacing

    // Theme colors
    const [themeColors, setThemeColors] = useState({
        primary: '#ffffff',
        accent: '#00ffcc',
        dim: 'rgba(255, 255, 255, 0.1)',
        nodeBg: '#000000'
    });

    useEffect(() => {
        const updateColors = () => {
            const isLight = document.body.getAttribute('data-theme') === 'light';
            const style = getComputedStyle(document.body);
            const primary = style.getPropertyValue('--text-primary').trim() || (isLight ? '#000000' : '#ffffff');
            const bg = style.getPropertyValue('--bg-primary').trim() || (isLight ? '#ffffff' : '#000000');

            setThemeColors({
                primary: primary,
                accent: isLight ? '#00aaaa' : '#00ffcc', // Darker accent for light mode
                dim: isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                nodeBg: bg
            });
        };

        updateColors();

        const observer = new MutationObserver(updateColors);
        observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        const width = 400;
        const height = 300;

        // State
        let signals = [];
        let nodes = [];

        // Initialize nodes with activation state
        const networkWidth = (layers.length - 1) * layerSpacing;
        const startX = (width - networkWidth) / 2;

        layers.forEach((count, layerIndex) => {
            const layerNodes = [];
            const layerHeight = (count - 1) * nodeSpacing;
            const startY = (height - layerHeight) / 2;

            for (let i = 0; i < count; i++) {
                layerNodes.push({
                    x: startX + layerIndex * layerSpacing,
                    y: startY + i * nodeSpacing,
                    activation: 0, // 0 to 1
                    targetActivation: 0
                });
            }
            nodes.push(layerNodes);
        });

        const spawnSignal = () => {
            const startNodeIndex = Math.floor(Math.random() * layers[0]);
            const targetNodeIndex = Math.floor(Math.random() * layers[1]);

            // Activate input node
            nodes[0][startNodeIndex].activation = 1;

            signals.push({
                layerIndex: 0,
                fromNodeIndex: startNodeIndex,
                toNodeIndex: targetNodeIndex,
                progress: 0,
                speed: 0.04,
                trace: [] // History of visited paths
            });
        };

        const updateState = () => {
            // Update node activation decay
            nodes.forEach(layer => {
                layer.forEach(node => {
                    if (node.activation > 0) {
                        node.activation -= 0.05;
                        if (node.activation < 0) node.activation = 0;
                    }
                });
            });

            // Update signals
            for (let i = signals.length - 1; i >= 0; i--) {
                const signal = signals[i];
                signal.progress += signal.speed;

                if (signal.progress >= 1) {
                    // Reached target node
                    const currentLayer = signal.layerIndex + 1;

                    // Activate target node
                    if (nodes[currentLayer] && nodes[currentLayer][signal.toNodeIndex]) {
                        nodes[currentLayer][signal.toNodeIndex].activation = 1;
                    }

                    // Add current segment to trace history
                    signal.trace.push({
                        layerIndex: signal.layerIndex,
                        fromNodeIndex: signal.fromNodeIndex,
                        toNodeIndex: signal.toNodeIndex
                    });

                    if (currentLayer < layers.length - 1) {
                        // Move to next layer
                        const nextLayerCount = layers[currentLayer + 1];
                        signal.layerIndex++;
                        signal.fromNodeIndex = signal.toNodeIndex;
                        signal.toNodeIndex = Math.floor(Math.random() * nextLayerCount);
                        signal.progress = 0;
                    } else {
                        // Reached output
                        const val = Math.random() > 0.5 ? '1' : '0';
                        setOutputs([val]);
                        signals.splice(i, 1);
                    }
                }
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw Base Connections (Dim)
            ctx.lineWidth = 1;
            ctx.strokeStyle = themeColors.dim;
            for (let l = 0; l < layers.length - 1; l++) {
                const currentLayer = nodes[l];
                const nextLayer = nodes[l + 1];

                currentLayer.forEach(n1 => {
                    nextLayer.forEach(n2 => {
                        ctx.beginPath();
                        ctx.moveTo(n1.x, n1.y);
                        ctx.lineTo(n2.x, n2.y);
                        ctx.stroke();
                    });
                });
            }

            // Draw Active Traces & Current Paths
            ctx.lineWidth = 2;
            ctx.strokeStyle = themeColors.accent;

            signals.forEach(signal => {
                // Draw history (trace)
                signal.trace.forEach(seg => {
                    const n1 = nodes[seg.layerIndex][seg.fromNodeIndex];
                    const n2 = nodes[seg.layerIndex + 1][seg.toNodeIndex];
                    ctx.beginPath();
                    ctx.moveTo(n1.x, n1.y);
                    ctx.lineTo(n2.x, n2.y);
                    ctx.stroke();
                });

                // Draw current segment
                const n1 = nodes[signal.layerIndex][signal.fromNodeIndex];
                const n2 = nodes[signal.layerIndex + 1][signal.toNodeIndex];
                ctx.beginPath();
                ctx.moveTo(n1.x, n1.y);
                // Draw line only up to current progress if we want it to "grow"
                // Or draw whole line? User said "continuous path", usually means the line grows.
                // Let's draw the full connection as "lit" or just the part travelled?
                // "light up the path" usually means the connection glows. 
                // But "grow" looks nicer for continuity.

                const currentX = n1.x + (n2.x - n1.x) * signal.progress;
                const currentY = n1.y + (n2.y - n1.y) * signal.progress;

                ctx.lineTo(currentX, currentY);
                ctx.stroke();
            });

            // Draw Signals DOTS
            ctx.fillStyle = themeColors.accent;
            signals.forEach(signal => {
                const fromNode = nodes[signal.layerIndex][signal.fromNodeIndex];
                const toNode = nodes[signal.layerIndex + 1][signal.toNodeIndex];

                const x = fromNode.x + (toNode.x - fromNode.x) * signal.progress;
                const y = fromNode.y + (toNode.y - fromNode.y) * signal.progress;

                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw Nodes
            nodes.forEach(layer => {
                layer.forEach(node => {
                    // Hollow circle background
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
                    ctx.fillStyle = themeColors.nodeBg;
                    ctx.fill();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = themeColors.primary;
                    ctx.stroke();

                    // Fill based on activation
                    if (node.activation > 0) {
                        ctx.beginPath();
                        ctx.arc(node.x, node.y, nodeRadius - 2, 0, Math.PI * 2);
                        ctx.fillStyle = themeColors.primary;
                        ctx.globalAlpha = node.activation;
                        ctx.fill();
                        ctx.globalAlpha = 1.0;
                    }
                });
            });
        };

        const animate = () => {
            updateState();
            draw();
            animationFrameId = requestAnimationFrame(animate);
        };

        const intervalId = setInterval(spawnSignal, 800);
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearInterval(intervalId);
        };
    }, [themeColors]); // Re-init if theme changes

    return (
        <div className="neural-network-container">
            <canvas
                ref={canvasRef}
                width={400}
                height={300}
            />
            <div className="nn-output-labels">
                {outputs.map((out, idx) => (
                    <div key={idx} className="nn-output">
                        {out}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NeuralNetwork;


