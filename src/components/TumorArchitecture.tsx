import React, { useState, useEffect, useRef } from 'react';
import './TumorArchitecture.css';

/* ─────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────── */
interface ArchNode {
  id: string;
  label: string;
  sublabel?: string;
  dim?: string;
  color: string;
  icon: string;
  witty: string;
  detail: string;
}

interface ArchStep {
  stepNum: number;
  title: string;
  icon: string;
  nodes: ArchNode[];
  description: string;
  wittyQuote: string;
}

/* ─────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────── */
const ARCH_STEPS: ArchStep[] = [
  {
    stepNum: 1,
    title: 'EfficientNet-B0',
    icon: '',
    description:
      'Branch 1 uses EfficientNet-B0 to capture fine-grained local CNN features like texture, tumor edges, and small abnormalities.',
    wittyQuote:
      '"EfficientNet is excellent at extracting local CNN features."',
    nodes: [
      {
        id: 'efficientnet',
        label: 'EfficientNet-B0',
        sublabel: 'Local Features',
        color: '#2EC4B6',
        icon: '',
        witty: 'Captures the tiny details.',
        detail:
          'Extracts local features such as texture, tumor edges, small local abnormalities, and fine-grained MRI patterns.',
      },
      {
        id: 'local-embed',
        label: 'Local Embedding',
        sublabel: 'CNN Features',
        color: '#FFD700',
        icon: '',
        witty: 'The pixel-perfect representation.',
        detail:
          'Deep convolutional features representing the local, fine-grained structure of the MRI.',
      },
    ],
  },
  {
    stepNum: 2,
    title: 'Swin Transformer',
    icon: '',
    description:
      'Branch 2 uses Swin-Tiny to capture global tumor structure, brain-wide context, and long-range spatial relationships.',
    wittyQuote:
      '"Transformers excel at understanding overall image structure."',
    nodes: [
      {
        id: 'swin',
        label: 'Swin-Tiny',
        sublabel: 'Global Context',
        color: '#6c5ce7',
        icon: '',
        witty: 'Sees the big picture.',
        detail:
          'A Vision Transformer that understands global tumor structure and long-range spatial relationships.',
      },
      {
        id: 'global-embed',
        label: 'Global Embedding',
        sublabel: 'Transformer Features',
        color: '#FFD700',
        icon: '',
        witty: 'The structural map of the brain.',
        detail:
          'Dense vector encoding the overall shape and brain-wide context of the tumor.',
      },
    ],
  },
  {
    stepNum: 3,
    title: 'SE-Gated Fusion',
    icon: '',
    description:
      'Fuses the representations using a Squeeze-and-Excitation style gate to intelligently balance local vs. global feature importance.',
    wittyQuote:
      '"If texture is important → EfficientNet weight ↑. If spatial structure is important → Swin weight ↑."',
    nodes: [
      {
        id: 'se-gate',
        label: 'SE-Gate',
        sublabel: 'Fusion Layer',
        color: '#e17055',
        icon: '',
        witty: 'The ultimate decider.',
        detail:
          'Learns which branch should be trusted more on a per-image basis. Balances CNN vs Transformer features dynamically.',
      },
      {
        id: 'unified-vector',
        label: 'Unified Feature Vector',
        sublabel: 'Fused Representation',
        color: '#FFD700',
        icon: '',
        witty: 'The best of both worlds.',
        detail:
          'The final multimodal vector incorporating both local tumor edges and global brain context.',
      },
    ],
  },
  {
    stepNum: 4,
    title: 'Prototype Memory Module',
    icon: '',
    description:
      'Compares the unified feature vector against learned class prototypes (Glioma, Meningioma, Pituitary, No Tumor) using Cosine Similarity.',
    wittyQuote:
      '"Higher similarity means the MRI resembles that class prototype."',
    nodes: [
      {
        id: 'memory-bank',
        label: 'Prototype Bank',
        sublabel: 'P1, P2, P3, P4',
        color: '#0B1F3B',
        icon: '',
        witty: 'The memory of past tumors.',
        detail:
          'Each tumor class learns a prototype vector during training, acting as a representative anchor for that class.',
      },
      {
        id: 'cosine-sim',
        label: 'Cosine Similarity',
        sublabel: 'x • p / ||x||||p||',
        color: '#2EC4B6',
        icon: '',
        witty: 'Math measuring how close two vectors are.',
        detail:
          'Calculates the angle between the image feature vector and each class prototype to determine the highest likelihood.',
      },
    ],
  },
  {
    stepNum: 5,
    title: 'Grad-CAM Explainability',
    icon: '',
    description:
      'Generates a heatmap overlay highlighting the MRI regions responsible for the model\'s prediction to ensure clinical trust.',
    wittyQuote:
      '"Medical explainability, doctor trust, regulatory friendliness."',
    nodes: [
      {
        id: 'prediction',
        label: 'Tumor Prediction',
        sublabel: 'Confidence Scores',
        color: '#6c5ce7',
        icon: '',
        witty: 'The final call.',
        detail:
          'Example: Glioma 96.4%, Pituitary 2.1%, Meningioma 1.2%, No Tumor 0.3%. Ranked for display.',
      },
      {
        id: 'grad-cam',
        label: 'Grad-CAM Head',
        sublabel: 'Heatmap Overlay',
        color: '#e17055',
        icon: '',
        witty: 'Showing its work.',
        detail:
          'Visualizes the gradients of the target concept flowing into the final convolutional layer to produce a coarse localization map.',
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────── */

interface NodeCardProps {
  node: ArchNode;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const NodeCard: React.FC<NodeCardProps> = ({ node, index, isActive, onClick }) => {
  return (
    <div
      className={`arch-node-card ${isActive ? 'arch-node-active' : ''}`}
      onClick={onClick}
      style={{ animationDelay: `${index * 0.1}s` }}
      id={`arch-node-${node.id}`}
    >
      <div className="arch-node-icon">{node.icon}</div>
      <div className="arch-node-body">
        <div className="arch-node-label">{node.label}</div>
        {node.sublabel && <div className="arch-node-sublabel">{node.sublabel}</div>}
        {node.dim && (
          <div className="arch-node-dim">
            <span className="arch-dim-badge">{node.dim}</span>
          </div>
        )}
        <div className="arch-node-witty">{node.witty}</div>
        {isActive && (
          <div className="arch-node-expanded">
            <div className="arch-node-detail">{node.detail}</div>
          </div>
        )}
      </div>
    </div>
  );
};

interface StepCardProps {
  step: ArchStep;
  isActive: boolean;
  onActivate: () => void;
}

const StepCard: React.FC<StepCardProps> = ({ step, isActive, onActivate }) => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div
      className={`arch-step-card ${isActive ? 'arch-step-active' : ''}`}
      id={`arch-step-${step.stepNum}`}
    >
      <div className="arch-step-header" onClick={onActivate}>
        <div className="arch-step-num-badge">
          <span className="arch-step-num-text">
            {String(step.stepNum).padStart(2, '0')}
          </span>
        </div>
        <div className="arch-step-header-content">
          <div className="arch-step-icon">{step.icon}</div>
          <h3 className="arch-step-title">
            STEP {step.stepNum}: {step.title.toUpperCase()}
          </h3>
        </div>
        <div className={`arch-step-chevron ${isActive ? 'arch-chevron-open' : ''}`}>▼</div>
      </div>

      {isActive && (
        <div className="arch-step-body">
          <p className="arch-step-description">{step.description}</p>
          <div className="arch-witty-quote">
            <span className="arch-quote-mark">❝</span>
            {step.wittyQuote}
            <span className="arch-quote-mark">❞</span>
          </div>

          <div className="arch-nodes-grid">
            {step.nodes.map((node, i) => (
              <NodeCard
                key={node.id}
                node={node}
                index={i}
                isActive={activeNode === node.id}
                onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
              />
            ))}
          </div>
          {step.nodes.length > 1 && (
            <div className="arch-tap-hint">
              ↑ Click any block to inspect it
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   Flow Diagram — SVG-based top-level architecture
───────────────────────────────────────────────────────── */

const FlowDiagram: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const flowNodes = [
    { id: 'mri', label: 'MRI IMAGE', x: 200, y: 30, w: 160, h: 50, color: '#0B1F3B', textColor: '#F8F4EC' },
    { id: 'cnn-in', label: 'EFFICIENTNET\nB0 (Local)', x: 40, y: 130, w: 140, h: 45, color: '#2EC4B6', textColor: '#0B1F3B' },
    { id: 'swin-in', label: 'SWIN-TINY\n(Global)', x: 380, y: 130, w: 140, h: 45, color: '#2EC4B6', textColor: '#0B1F3B' },
    { id: 'cnn-emb', label: 'Local\nEmbedding', x: 40, y: 230, w: 140, h: 45, color: '#FFD700', textColor: '#0B1F3B' },
    { id: 'swin-emb', label: 'Global\nEmbedding', x: 380, y: 230, w: 140, h: 45, color: '#FFD700', textColor: '#0B1F3B' },
    { id: 'fusion', label: 'SE-GATED\nFUSION', x: 200, y: 330, w: 160, h: 50, color: '#e17055', textColor: '#fff' },
    { id: 'unified', label: 'UNIFIED\nFEATURE VECTOR', x: 200, y: 430, w: 160, h: 50, color: '#6c5ce7', textColor: '#fff' },
    { id: 'memory', label: 'PROTOTYPE\nMEMORY MODULE', x: 200, y: 530, w: 160, h: 50, color: '#0B1F3B', textColor: '#FFD700' },
    { id: 'cosine', label: 'COSINE\nSIMILARITY', x: 200, y: 630, w: 160, h: 45, color: '#2EC4B6', textColor: '#0B1F3B' },
    { id: 'predict', label: 'TUMOR PREDICTION', x: 200, y: 730, w: 160, h: 45, color: '#FFD700', textColor: '#0B1F3B' },
    { id: 'gradcam', label: 'GRAD-CAM\nHEATMAP', x: 200, y: 830, w: 160, h: 50, color: '#e17055', textColor: '#fff' },
  ];

  const arrows = [
    { from: { x: 280, y: 80 }, to: { x: 110, y: 130 } },
    { from: { x: 280, y: 80 }, to: { x: 450, y: 130 } },
    { from: { x: 110, y: 175 }, to: { x: 110, y: 230 } },
    { from: { x: 450, y: 175 }, to: { x: 450, y: 230 } },
    { from: { x: 110, y: 275 }, to: { x: 230, y: 330 } },
    { from: { x: 450, y: 275 }, to: { x: 330, y: 330 } },
    { from: { x: 280, y: 380 }, to: { x: 280, y: 430 } },
    { from: { x: 280, y: 480 }, to: { x: 280, y: 530 } },
    { from: { x: 280, y: 580 }, to: { x: 280, y: 630 } },
    { from: { x: 280, y: 675 }, to: { x: 280, y: 730 } },
    { from: { x: 280, y: 775 }, to: { x: 280, y: 830 } },
  ];

  return (
    <div className="arch-flow-wrapper">
      <div className="arch-flow-scroll">
        <svg
          viewBox="0 0 560 900"
          width="100%"
          style={{ minWidth: '340px', maxWidth: '560px' }}
          className="arch-flow-svg"
          aria-label="Tumor Architecture Flow Diagram"
        >
          {/* Arrow defs */}
          <defs>
            <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#0B1F3B" />
            </marker>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Arrows */}
          {arrows.map((a, i) => (
            <line
              key={i}
              x1={a.from.x}
              y1={a.from.y}
              x2={a.to.x}
              y2={a.to.y}
              stroke="#0B1F3B"
              strokeWidth="2"
              strokeDasharray="5,3"
              markerEnd="url(#arrowhead)"
              opacity="0.6"
            />
          ))}

          {/* Nodes */}
          {flowNodes.map((n) => {
            const isHovered = hoveredNode === n.id;
            const lines = n.label.split('\n');
            const yCenter = n.y + n.h / 2;
            return (
              <g
                key={n.id}
                onMouseEnter={() => setHoveredNode(n.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={n.h}
                  fill={n.color}
                  stroke={isHovered ? '#FFD700' : '#0B1F3B'}
                  strokeWidth={isHovered ? 3 : 2}
                  filter={isHovered ? 'url(#glow)' : undefined}
                  rx={0}
                />
                {lines.map((line, li) => (
                  <text
                    key={li}
                    x={n.x + n.w / 2}
                    y={yCenter + (li - (lines.length - 1) / 2) * 14}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={n.textColor}
                    fontSize="10"
                    fontFamily="'IBM Plex Mono', monospace"
                    fontWeight="bold"
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
      <p className="arch-flow-hint">↔ Scroll / zoom to explore the full pipeline</p>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   Stats Bar
───────────────────────────────────────────────────────── */

const StatsBanner: React.FC = () => {
  const stats = [
    { label: 'Accuracy', value: '99.03%', icon: '', color: '#2EC4B6' },
    { label: 'Precision', value: '98.84%', icon: '', color: '#6c5ce7' },
    { label: 'Recall', value: '98.95%', icon: '', color: '#FFD700' },
    { label: 'AUC', value: '0.9986', icon: '', color: '#e17055' },
    { label: 'CNN', value: 'EffNet-B0', icon: '', color: '#0B1F3B' },
    { label: 'Transformer', value: 'Swin-Tiny', icon: '', color: '#2EC4B6' },
  ];

  return (
    <div className="arch-stats-banner">
      {stats.map((s) => (
        <div className="arch-stat-item" key={s.label} style={{ borderColor: s.color }}>
          <div className="arch-stat-icon">{s.icon}</div>
          <div className="arch-stat-value" style={{ color: s.color }}>{s.value}</div>
          <div className="arch-stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   Comparison Table (Architecture Strengths)
───────────────────────────────────────────────────────── */

const ModelComparison: React.FC = () => (
  <div className="arch-compare-section">
    <div className="arch-section-label">
       Component Strengths
    </div>
    <div className="arch-compare-grid">
      <div className="arch-compare-card arch-compare-text">
        <div className="arch-compare-title">Feature Extractors</div>
        <table className="arch-compare-table">
          <thead>
            <tr>
              <th>Component</th>
              <th>Strength</th>
            </tr>
          </thead>
          <tbody>
            <tr className="arch-winner-row">
              <td>EfficientNet-B0</td>
              <td>Fast, lightweight CNN local feature extraction.</td>
            </tr>
            <tr className="arch-winner-row">
              <td>Swin Transformer</td>
              <td>Long-range attention, handles complex shapes globally.</td>
            </tr>
          </tbody>
        </table>
        <p className="arch-compare-note">
          By combining both, we get the fine texture analysis of CNNs alongside the structural understanding of Transformers.
        </p>
      </div>

      <div className="arch-compare-card arch-compare-image">
        <div className="arch-compare-title">Classification & Explainability</div>
        <table className="arch-compare-table">
          <thead>
            <tr>
              <th>Component</th>
              <th>Strength</th>
            </tr>
          </thead>
          <tbody>
            <tr className="arch-winner-row">
              <td>Prototype Memory</td>
              <td>Better class separation, interpretable with limited data.</td>
            </tr>
            <tr className="arch-winner-row">
              <td>Grad-CAM</td>
              <td>Medical explainability, doctor trust, regulatory friendly.</td>
            </tr>
          </tbody>
        </table>
        <p className="arch-compare-note">
          Transparent memory-bank classification paired with heatmap visualization makes predictions highly interpretable.
        </p>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────
   Main Export
───────────────────────────────────────────────────────── */

const TumorArchitecture: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(1);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('arch-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll('.arch-step-card') ?? [];
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="arch-root" ref={sectionRef}>
      {/* ── Header ── */}
      <div className="arch-header">
        <div className="arch-header-badge">HYBRID NEURAL NETWORK</div>
        <h2 className="arch-main-title">
          TUMOR<br />
          <span className="arch-title-accent">GRAD-CAM CLASSIFIER</span>
        </h2>
        <p className="arch-header-sub">
          An advanced multi-representation visual model fusing EfficientNet-B0 (for local edges and texture) and Swin-Tiny (for global structure), powered by a Prototype Memory Module and Grad-CAM explainability.
        </p>
      </div>

      {/* ── Stats ── */}
      <StatsBanner />

      {/* ── Flow Diagram ── */}
      <div className="arch-section-label">
         Full Multimodal Pipeline
      </div>
      <FlowDiagram />

      {/* ── Core Idea ── */}
      <div className="arch-core-idea">
        <div className="arch-core-icon"></div>
        <div className="arch-core-content">
          <div className="arch-core-title">THE HYBRID-MEMORY CORE</div>
          <p className="arch-core-text">
            Standard medical image classifiers lack interpretability and struggle with either fine-grained local patterns or global structure. The <strong>HybridMemoryNet</strong> fuses CNN feature extraction with Transformer long-range attention using an SE-Gate. It classifies tumors by comparing the unified vector to learned <strong>Class Prototypes</strong>, visually confirming predictions via <strong>Grad-CAM</strong> heatmaps.
          </p>
          <div className="arch-core-examples">
            <div className="arch-example-card arch-ex-high">
              <span className="arch-ex-icon"></span>
              <div>
                <div className="arch-ex-label">If texture is important...</div>
                <div className="arch-ex-result arch-ex-high-text">↑ EfficientNet weight increases (via SE-Gate)</div>
              </div>
            </div>
            <div className="arch-example-card arch-ex-high">
              <span className="arch-ex-icon"></span>
              <div>
                <div className="arch-ex-label">If spatial structure is important...</div>
                <div className="arch-ex-result arch-ex-high-text">↑ Swin Transformer weight increases (via SE-Gate)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Step-by-step breakdown ── */}
      <div className="arch-section-label">
         Deep Dive: Architecture Steps
      </div>
      <div className="arch-steps-list">
        {ARCH_STEPS.map((step) => (
          <StepCard
            key={step.stepNum}
            step={step}
            isActive={activeStep === step.stepNum}
            onActivate={() =>
              setActiveStep(step.stepNum)
            }
          />
        ))}
      </div>

      {/* ── Model Comparison ── */}
      <ModelComparison />

      {/* ── End-to-end summary ── */}
      <div className="arch-e2e-summary">
        <div className="arch-section-label">
           Inference Data Flow
        </div>
        <div className="arch-e2e-flow">
          {[
            { label: 'User Uploads MRI', icon: '' },
            { label: 'Image Sent to Hugging Face Model', icon: '' },
            { label: 'Backend Returns Scores + Grad-CAM', icon: '' },
            { label: 'Frontend Parses & Ranks Probabilities', icon: '' },
            { label: 'Explainability Heatmap Overlay Rendered', icon: '' },
          ].map((item, i, arr) => (
            <React.Fragment key={item.label}>
              <div className="arch-e2e-node">
                <div className="arch-e2e-icon">{item.icon}</div>
                <div className="arch-e2e-label">{item.label}</div>
              </div>
              {i < arr.length - 1 && <div className="arch-e2e-arrow">↓</div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TumorArchitecture;
