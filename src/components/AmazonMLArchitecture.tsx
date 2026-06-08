import React, { useState, useEffect, useRef } from 'react';
import './AmazonMLArchitecture.css';


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
    title: 'Text Branch',
    icon: '📝',
    description:
      'Product Title + Description → MiniLM-L6-H384 Transformer → 384-dimensional semantic embedding. Because "Apple AirPods Pro" means more than just three words.',
    wittyQuote:
      '"Words are just pixels on a screen — until MiniLM turns them into 384 dimensions of pure meaning."',
    nodes: [
      {
        id: 'text-input',
        label: 'Text Input',
        sublabel: 'Title + Description',
        color: '#0B1F3B',
        icon: '✏️',
        witty: 'Raw text, straight from the listing.',
        detail:
          'Product title and description are concatenated and tokenized. Example: "Apple AirPods Pro 2 – Wireless earbuds with ANC, USB-C Charging".',
      },
      {
        id: 'minilm',
        label: 'MiniLM-L6-H384',
        sublabel: 'Transformer (22M params)',
        dim: 'vs BERT 110M',
        color: '#2EC4B6',
        icon: '🤖',
        witty: "BERT's slim, gym-going younger sibling.",
        detail:
          'microsoft/MiniLM-L6-H384-uncased: 6 layers, 384 hidden dims, 22M parameters. Same semantic power as BERT at 1/5th the cost. The frugal genius of NLP.',
      },
      {
        id: 'text-embed',
        label: 'Text Embedding',
        sublabel: '384-D Vector',
        dim: '384',
        color: '#FFD700',
        icon: '📊',
        witty: '384 floats that somehow know "Rolex" > "generic watch".',
        detail:
          'The [CLS] token output is used as the sentence embedding — a dense 384-dimensional vector encoding semantic meaning, brand signals, and product category context.',
      },
    ],
  },
  {
    stepNum: 2,
    title: 'Image Branch',
    icon: '🖼️',
    description:
      'Product JPEG (224×224 RGB) → EfficientNet-B0 CNN → 1280-dimensional visual embedding. The model literally looks at the product and judges it (respectfully).',
    wittyQuote:
      '"EfficientNet doesn\'t just see a watch — it sees a luxury watch. Context matters, even to a CNN."',
    nodes: [
      {
        id: 'image-input',
        label: 'Product Image',
        sublabel: '224×224 RGB JPEG',
        color: '#0B1F3B',
        icon: '📷',
        witty: 'A photo worth a thousand price points.',
        detail:
          'Images are resized to 224×224 and normalized with ImageNet mean/std. Missing images are downloaded on-the-fly during dataset instantiation.',
      },
      {
        id: 'efficientnet',
        label: 'EfficientNet-B0',
        sublabel: 'CNN Backbone (ImageNet)',
        dim: 'Compound Scaling',
        color: '#2EC4B6',
        icon: '🔭',
        witty: 'The Marie Kondo of CNNs — efficient by design.',
        detail:
          'Pretrained EfficientNet-B0 uses compound scaling (depth × width × resolution) instead of just stacking more layers. Result: better accuracy per FLOP. The global average pooling output gives 1280 features.',
      },
      {
        id: 'image-embed',
        label: 'Visual Embedding',
        sublabel: '1280-D Vector',
        dim: '1280',
        color: '#FFD700',
        icon: '🎨',
        witty: '1280 features that can spot a fake luxury bag from pixels.',
        detail:
          'Deep features encode textures, shapes, object categories, and quality signals. Early layers learn edges/corners; deep layers learn "premium gaming laptop" vs "budget plastic box".',
      },
    ],
  },
  {
    stepNum: 3,
    title: 'Projection Layer',
    icon: '🎯',
    description:
      'Linear projections bring both 384-D and 1280-D embeddings into a shared 256-D space. Making text and images speak the same language — diplomacy at the tensor level.',
    wittyQuote:
      '"384D meets 1280D. The diplomatic solution: both get compressed to 256D. Nobody wins, everybody wins."',
    nodes: [
      {
        id: 'text-proj',
        label: 'Text Projection',
        sublabel: '384 → 256',
        dim: 'Linear Layer',
        color: '#6c5ce7',
        icon: '↘️',
        witty: 'Text squeezes into the shared space.',
        detail:
          'nn.Linear(384, 256) projects text embeddings into a common feature space. Without this, you\'d be trying to add apples and aircraft carriers.',
      },
      {
        id: 'image-proj',
        label: 'Image Projection',
        sublabel: '1280 → 256',
        dim: 'Linear Layer',
        color: '#6c5ce7',
        icon: '↗️',
        witty: 'Images squeeze into the same shared space.',
        detail:
          'nn.Linear(1280, 256) maps visual features into the identical 256-D space. Now text and image vectors can be meaningfully combined — they\'re literally in the same room.',
      },
    ],
  },
  {
    stepNum: 4,
    title: 'Feature Fusion',
    icon: '⚡',
    description:
      'Text (256-D) + Image (256-D) = Concatenated 512-D vector. This is early feature fusion — no attention, no gates, just a good old-fashioned "let\'s put it all together" moment.',
    wittyQuote:
      '"Text says \'Rolex\'. Image confirms \'Gold Watch\'. The model says: \'ka-ching\'."',
    nodes: [
      {
        id: 'text-256',
        label: 'Text Feature',
        sublabel: '256-D',
        color: '#0B1F3B',
        icon: '📝',
        witty: 'Text knows what things are called.',
        detail: 'Projected text embedding — 256 dimensions of semantic signal.',
      },
      {
        id: 'image-256',
        label: 'Image Feature',
        sublabel: '256-D',
        color: '#0B1F3B',
        icon: '🖼️',
        witty: 'Image knows what things look like.',
        detail: 'Projected visual embedding — 256 dimensions of visual signal.',
      },
      {
        id: 'fusion',
        label: 'Concatenation',
        sublabel: '512-D Fused Vector',
        dim: '256 + 256 = 512',
        color: '#FFD700',
        icon: '🔗',
        witty: 'F = [Text || Image]. That\'s it. Beautiful simplicity.',
        detail:
          'torch.cat([text_feat, image_feat], dim=1) → 512-D. Early feature fusion. Both modalities contribute equally. A mismatch between text and image? The MLP will figure it out.',
      },
    ],
  },
  {
    stepNum: 5,
    title: 'MLP Fusion Head',
    icon: '🧠',
    description:
      '512-D → 1024 → 512 → 256 → 1. A 3-layer MLP with BatchNorm, GELU activations, and Dropout. The part that actually learns price from the chaos.',
    wittyQuote:
      '"BatchNorm: because neurons, like humans, need to be told to calm down sometimes."',
    nodes: [
      {
        id: 'mlp-input',
        label: 'Fusion Vector',
        sublabel: '512-D',
        color: '#0B1F3B',
        icon: '⬇️',
        witty: 'The starting gun of the regression race.',
        detail: '512-dimensional fused multimodal vector enters the MLP head.',
      },
      {
        id: 'batchnorm',
        label: 'BatchNorm + GELU',
        sublabel: 'Normalize → Activate',
        color: '#2EC4B6',
        icon: '⚖️',
        witty: 'Calm the activations, sharpen the gradients.',
        detail:
          'BatchNorm stabilizes training by normalizing layer inputs. GELU (x·Φ(x)) is smoother than ReLU — Transformers love it, and so does this MLP.',
      },
      {
        id: 'dropout',
        label: 'Dropout',
        sublabel: 'Regularization',
        color: '#e17055',
        icon: '🎲',
        witty: 'Randomly killing neurons so the model gets stronger.',
        detail:
          'Randomly zeroes neuron outputs during training, forcing the network to learn redundant representations. Classic but effective regularization.',
      },
      {
        id: 'fc-out',
        label: 'Fully Connected',
        sublabel: '256 → 1 output',
        color: '#FFD700',
        icon: '🎯',
        witty: 'One neuron to rule them all.',
        detail:
          'Final linear layer: 256 → 1 scalar output. This single neuron outputs the predicted log-price.',
      },
    ],
  },
  {
    stepNum: 6,
    title: 'Log-Price Regression',
    icon: '📈',
    description:
      'Predicts log(price+1), then inverse-transforms via exp(pred)-1. Because Amazon sells $5 phone cases and $50,000 servers — and the model shouldn\'t panic about either.',
    wittyQuote:
      '"log1p is the great equalizer. It doesn\'t care if you\'re a $2 pen or a $20,000 laptop."',
    nodes: [
      {
        id: 'log-pred',
        label: 'Log Prediction',
        sublabel: 'log(price + 1)',
        color: '#6c5ce7',
        icon: '📉',
        witty: 'The math that tames the wild price distribution.',
        detail:
          'Target: y = log1p(price). Prices are heavily right-skewed ($10 → $50,000+). Log transform compresses this into a manageable ~0–11 range. Training becomes 10× more stable.',
      },
      {
        id: 'smooth-l1',
        label: 'Smooth L1 Loss',
        sublabel: 'Huber-style Loss',
        color: '#e17055',
        icon: '⚡',
        witty: 'Softer than MSE, tougher than MAE. The Goldilocks loss.',
        detail:
          'SmoothL1Loss = MSE for small errors, MAE for large ones. Robust to outlier prices (someone always lists a yacht) while being smooth near the optimum.',
      },
      {
        id: 'inverse',
        label: 'Inverse Transform',
        sublabel: 'exp(pred) - 1',
        color: '#2EC4B6',
        icon: '💰',
        witty: 'Math goes in, dollars come out.',
        detail:
          'expm1(pred) converts the log-space output back to real price. Validation metric: SMAPE (Symmetric Mean Absolute Percentage Error) — scale-invariant and competition-friendly.',
      },
    ],
  },
  {
    stepNum: 7,
    title: 'Training Optimizations',
    icon: '🚀',
    description:
      'Mixed Precision (FP16), differential learning rates, and Cosine Annealing with Warm Restarts. Speed, stability, and escaping local minima — the trifecta.',
    wittyQuote:
      '"FP16: train faster, use less memory, impress your GPU. Differential LRs: don\'t break what\'s already working."',
    nodes: [
      {
        id: 'fp16',
        label: 'Mixed Precision',
        sublabel: 'FP16 AutoCast',
        color: '#6c5ce7',
        icon: '⚡',
        witty: 'Half the bits, double the speed (roughly).',
        detail:
          'torch.cuda.amp.autocast() switches between FP16 and FP32 automatically. FP16 halves memory, accelerates matrix ops. GradScaler prevents underflow. Net result: ~2× faster training.',
      },
      {
        id: 'diff-lr',
        label: 'Differential LRs',
        sublabel: 'Encoders: 1e-5 | Head: 1e-3',
        color: '#FFD700',
        icon: '🎛️',
        witty: 'Pretrained models need therapy, not surgery.',
        detail:
          'MiniLM & EfficientNet encoders: lr=1e-5 (fine-tune gently — they already know stuff). Fusion MLP: lr=1e-3 (train aggressively — it knows nothing yet). Smart.',
      },
      {
        id: 'cosine',
        label: 'Cosine Annealing',
        sublabel: 'Warm Restarts (SGDR)',
        color: '#2EC4B6',
        icon: '🌊',
        witty: 'LR oscillates like a sine wave — because flat minima are better.',
        detail:
          'CosineAnnealingWarmRestarts: LR starts high → decays to near-zero → restarts. Each restart explores different loss landscape regions. Escapes local minima. Better generalization.',
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
    { id: 'listing', label: 'PRODUCT\nLISTING', x: 200, y: 30, w: 160, h: 50, color: '#0B1F3B', textColor: '#F8F4EC' },
    { id: 'text-in', label: 'TEXT\n(Title+Desc)', x: 40, y: 130, w: 140, h: 45, color: '#2EC4B6', textColor: '#0B1F3B' },
    { id: 'img-in', label: 'IMAGE\n(224×224)', x: 380, y: 130, w: 140, h: 45, color: '#2EC4B6', textColor: '#0B1F3B' },
    { id: 'minilm', label: 'MiniLM\nTransformer', x: 40, y: 230, w: 140, h: 45, color: '#6c5ce7', textColor: '#fff' },
    { id: 'effnet', label: 'EfficientNet\n-B0 CNN', x: 380, y: 230, w: 140, h: 45, color: '#6c5ce7', textColor: '#fff' },
    { id: 'text-emb', label: 'Embedding\n384-D', x: 40, y: 330, w: 140, h: 45, color: '#FFD700', textColor: '#0B1F3B' },
    { id: 'img-emb', label: 'Embedding\n1280-D', x: 380, y: 330, w: 140, h: 45, color: '#FFD700', textColor: '#0B1F3B' },
    { id: 'proj-t', label: 'Linear\n384→256', x: 40, y: 430, w: 140, h: 45, color: '#e17055', textColor: '#fff' },
    { id: 'proj-i', label: 'Linear\n1280→256', x: 380, y: 430, w: 140, h: 45, color: '#e17055', textColor: '#fff' },
    { id: 'concat', label: 'CONCAT\n512-D', x: 200, y: 530, w: 160, h: 50, color: '#0B1F3B', textColor: '#FFD700' },
    { id: 'mlp', label: 'MLP HEAD\nBN+GELU+Drop', x: 200, y: 630, w: 160, h: 50, color: '#2EC4B6', textColor: '#0B1F3B' },
    { id: 'logprice', label: 'log(price+1)', x: 200, y: 730, w: 160, h: 45, color: '#6c5ce7', textColor: '#fff' },
    { id: 'price', label: '💰 FINAL PRICE', x: 200, y: 830, w: 160, h: 50, color: '#FFD700', textColor: '#0B1F3B' },
  ];

  const arrows = [
    { from: { x: 280, y: 80 }, to: { x: 110, y: 130 } },
    { from: { x: 280, y: 80 }, to: { x: 450, y: 130 } },
    { from: { x: 110, y: 175 }, to: { x: 110, y: 230 } },
    { from: { x: 450, y: 175 }, to: { x: 450, y: 230 } },
    { from: { x: 110, y: 275 }, to: { x: 110, y: 330 } },
    { from: { x: 450, y: 275 }, to: { x: 450, y: 330 } },
    { from: { x: 110, y: 375 }, to: { x: 110, y: 430 } },
    { from: { x: 450, y: 375 }, to: { x: 450, y: 430 } },
    { from: { x: 110, y: 475 }, to: { x: 230, y: 530 } },
    { from: { x: 450, y: 475 }, to: { x: 330, y: 530 } },
    { from: { x: 280, y: 580 }, to: { x: 280, y: 630 } },
    { from: { x: 280, y: 680 }, to: { x: 280, y: 730 } },
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
          aria-label="Amazon ML Architecture Flow Diagram"
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
    { label: 'Val SMAPE', value: '20.68%', icon: '📉', color: '#2EC4B6' },
    { label: 'Train SMAPE', value: '18.59%', icon: '📊', color: '#6c5ce7' },
    { label: 'Text Params', value: '22M', icon: '🤖', color: '#FFD700' },
    { label: 'Image Params', value: '5.3M', icon: '🔭', color: '#e17055' },
    { label: 'Fusion Vector', value: '512-D', icon: '⚡', color: '#0B1F3B' },
    { label: 'Loss Fn', value: 'SmoothL1', icon: '🎯', color: '#2EC4B6' },
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
   Comparison Table
───────────────────────────────────────────────────────── */

const ModelComparison: React.FC = () => (
  <div className="arch-compare-section">
    <div className="arch-section-label">
      <span>📐</span> Model Comparison
    </div>
    <div className="arch-compare-grid">
      <div className="arch-compare-card arch-compare-text">
        <div className="arch-compare-title">Text Branch</div>
        <table className="arch-compare-table">
          <thead>
            <tr>
              <th>Model</th>
              <th>Params</th>
              <th>Chosen?</th>
            </tr>
          </thead>
          <tbody>
            <tr className="arch-winner-row">
              <td>MiniLM-L6</td>
              <td>22M</td>
              <td>✅ YES</td>
            </tr>
            <tr>
              <td>BERT-Base</td>
              <td>110M</td>
              <td>❌ Too Heavy</td>
            </tr>
            <tr>
              <td>DistilBERT</td>
              <td>66M</td>
              <td>❌ Slower</td>
            </tr>
          </tbody>
        </table>
        <p className="arch-compare-note">
          MiniLM = BERT's lean, mean, efficient machine. 5× fewer params, nearly identical performance.
        </p>
      </div>

      <div className="arch-compare-card arch-compare-image">
        <div className="arch-compare-title">Image Branch</div>
        <table className="arch-compare-table">
          <thead>
            <tr>
              <th>Model</th>
              <th>Strategy</th>
              <th>Chosen?</th>
            </tr>
          </thead>
          <tbody>
            <tr className="arch-winner-row">
              <td>EfficientNet-B0</td>
              <td>Compound Scale</td>
              <td>✅ YES</td>
            </tr>
            <tr>
              <td>ResNet-50</td>
              <td>Depth Only</td>
              <td>❌ Heavier</td>
            </tr>
            <tr>
              <td>VGG-16</td>
              <td>Width Only</td>
              <td>❌ Ancient</td>
            </tr>
          </tbody>
        </table>
        <p className="arch-compare-note">
          EfficientNet scales depth, width AND resolution simultaneously. Other CNNs pick one. Amateurs.
        </p>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────
   Main Export
───────────────────────────────────────────────────────── */

const AmazonMLArchitecture: React.FC = () => {
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
        <div className="arch-header-badge">🏆 AMAZON ML CHALLENGE 2025</div>
        <h2 className="arch-main-title">
          MULTIMODAL<br />
          <span className="arch-title-accent">PRICE PREDICTOR</span>
        </h2>
        <p className="arch-header-sub">
          A dual-branch Transformer + CNN fusion system that reads listings like a human,
          looks at photos like a connoisseur, and outputs a price prediction faster than you
          can say "add to cart".
        </p>
      </div>

      {/* ── Stats ── */}
      <StatsBanner />

      {/* ── Flow Diagram ── */}
      <div className="arch-section-label">
        <span>🗺️</span> Complete Architecture Pipeline
      </div>
      <FlowDiagram />

      {/* ── Core Idea ── */}
      <div className="arch-core-idea">
        <div className="arch-core-icon">🧠</div>
        <div className="arch-core-content">
          <div className="arch-core-title">THE CENTRAL IDEA</div>
          <p className="arch-core-text">
            Humans don't determine product value using only text or only images.
            We use <strong>both</strong>. The model follows the same principle.
            A "Rolex Watch" in the title confirmed by a luxury gold watch in the image
            = high price. A "Leather Bag" listing with an image of cheap synthetic material
            = the model learns the mismatch and adjusts accordingly.
          </p>
          <div className="arch-core-examples">
            <div className="arch-example-card arch-ex-high">
              <span className="arch-ex-icon">⌚</span>
              <div>
                <div className="arch-ex-label">Text: "Rolex Watch" + Image: Gold Watch</div>
                <div className="arch-ex-result arch-ex-high-text">↑ Price rises significantly</div>
              </div>
            </div>
            <div className="arch-example-card arch-ex-mid">
              <span className="arch-ex-icon">👜</span>
              <div>
                <div className="arch-ex-label">Text: "Leather Bag" + Image: Synthetic bag</div>
                <div className="arch-ex-result arch-ex-mid-text">↓ Model catches the mismatch</div>
              </div>
            </div>
            <div className="arch-example-card arch-ex-high">
              <span className="arch-ex-icon">💻</span>
              <div>
                <div className="arch-ex-label">Text: "Gaming Laptop RTX 4090" + Image: High-end PC</div>
                <div className="arch-ex-result arch-ex-high-text">↑↑ ka-CHING</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Step-by-step breakdown ── */}
      <div className="arch-section-label">
        <span>⚙️</span> Deep Dive: Architecture Steps
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
          <span>🏁</span> End-to-End Workflow
        </div>
        <div className="arch-e2e-flow">
          {[
            { label: 'Product Listing', icon: '🛍️' },
            { label: 'Text + Image', icon: '📝🖼️' },
            { label: 'MiniLM + EfficientNet', icon: '🤖🔭' },
            { label: 'Projection (256D each)', icon: '🎯' },
            { label: 'Concat (512D)', icon: '⚡' },
            { label: 'MLP Regressor', icon: '🧠' },
            { label: 'Log Price → Real Price', icon: '💰' },
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

export default AmazonMLArchitecture;
