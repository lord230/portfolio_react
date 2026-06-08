import React, { useState, useEffect, useRef } from 'react';
import './SentimentFusionArchitecture.css';

/* ─────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────── */
interface SFNode {
  id: string;
  label: string;
  sublabel?: string;
  dim?: string;
  icon: string;
  witty: string;
  detail: string;
}

interface SFStep {
  stepNum: number;
  title: string;
  icon: string;
  nodes: SFNode[];
  description: string;
  wittyQuote: string;
}

/* ─────────────────────────────────────────────────────────
   Architecture Steps Data
───────────────────────────────────────────────────────── */
const SF_STEPS: SFStep[] = [
  {
    stepNum: 1,
    title: 'XLM-RoBERTa Encoding',
    icon: '🌐',
    description:
      'Raw text → SentencePiece Tokenizer → XLM-RoBERTa (12 layers, 12 attn heads, 125M params) → Hidden States → CLS Embedding (768-D). The multilingual backbone that reads between the lines — literally.',
    wittyQuote:
      '"Most models see words. XLM-RoBERTa sees meaning, context, irony, and the quiet existential dread in \'Great! Another meeting that could have been an email.\'"',
    nodes: [
      {
        id: 'raw-text',
        label: 'Raw Text Input',
        sublabel: 'Any language welcome',
        icon: '📨',
        witty: 'Text walks in — chaos walks out as vectors.',
        detail:
          'Input: arbitrary natural language text. Could be English, French, Hindi, or passive-aggressive corporate speak. XLM-RoBERTa handles all of it.',
      },
      {
        id: 'tokenizer',
        label: 'SentencePiece Tokenizer',
        sublabel: 'BPE vocab ~250K tokens',
        dim: '250K vocab',
        icon: '✂️',
        witty: "Turns \"I'm fine.\" into a sequence of token IDs. Fine.",
        detail:
          'XLM-RoBERTa uses a SentencePiece tokenizer with ~250K BPE vocabulary. Handles multilingual text, subwords, and even emoji without crying.',
      },
      {
        id: 'xlmr',
        label: 'XLM-RoBERTa Base',
        sublabel: '12 Layers • 125M Params',
        dim: '100 Languages',
        icon: '🧬',
        witty: 'BERT went to Rosetta Stone and came back multilingual and jacked.',
        detail:
          'Pretrained on 2.5TB of multilingual text across 100 languages. 12 transformer layers, each with 12 attention heads (12×64=768-D). FFN: 768→3072→768 with GeLU. Residual + LayerNorm after every sub-layer.',
      },
      {
        id: 'cls-embed',
        label: '[CLS] Token Embedding',
        sublabel: '768-D Sentence Vector',
        dim: '768',
        icon: '📍',
        witty: 'One vector to rule the entire sentence. Very democratic.',
        detail:
          'The [CLS] token aggregates information from all tokens via attention. Its final hidden state is a 768-dimensional sentence-level representation — the "soul" of the input.',
      },
    ],
  },
  {
    stepNum: 2,
    title: 'Sarcasm Detection Head',
    icon: '🎭',
    description:
      '"Great, another exam tomorrow." → Sarcasm Probability: 0.93. The dedicated sarcasm head is what makes this architecture stand apart. Most models ignore sarcasm. This one hunts it.',
    wittyQuote:
      '"A standard sentiment model reads \'I love waiting 3 hours for support\' and says Positive. This architecture says: suspicious. Very suspicious."',
    nodes: [
      {
        id: 'cls-sarcasm',
        label: 'CLS → Sarcasm Linear',
        sublabel: 'nn.Linear(768, 1)',
        icon: '🔎',
        witty: 'A dedicated detective for linguistic irony.',
        detail:
          'A standalone linear layer projects the 768-D CLS embedding to a scalar logit. This head is trained independently to detect sarcasm — not as an afterthought, but as a primary task.',
      },
      {
        id: 'sigmoid',
        label: 'Sigmoid Activation',
        sublabel: 'σ(x) → [0, 1]',
        dim: 'Probability',
        icon: '📈',
        witty: '0 = sincere, 1 = definitely sarcastic, 0.5 = your average reply to a Zoom invite.',
        detail:
          'Sigmoid squashes the linear output to a probability in [0, 1]. 0 = completely sincere; 1 = dripping with sarcasm. This scalar then feeds into the gating mechanism.',
      },
      {
        id: 'sarc-prob',
        label: 'Sarcasm Probability',
        sublabel: 'p_sarcasm ∈ [0, 1]',
        dim: 'Scalar',
        icon: '🎯',
        witty: 'A single float that can completely flip the meaning of a sentence.',
        detail:
          "p_sarcasm is the model's confidence that the input is sarcastic. This gets passed directly into the gate projection to modulate sentiment understanding. One number. Big consequences.",
      },
    ],
  },
  {
    stepNum: 3,
    title: 'Gate Projection (The Magic)',
    icon: '⚡',
    description:
      'CLS (768-D) + Sarcasm Prob (1-D) → concatenated 769-D → Gate Projection Linear(769,768) → gate_output → ⊕ Residual Add with original CLS → LayerNorm → Sarcasm-Aware CLS (768-D).',
    wittyQuote:
      '"Concatenating a 768-D semantic vector with one tiny sarcasm scalar — and suddenly the model understands irony. One number changes everything."',
    nodes: [
      {
        id: 'concat-gate',
        label: 'Concatenate [CLS ‖ p_sarcasm]',
        sublabel: '768 + 1 = 769-D',
        dim: '769-D',
        icon: '🔗',
        witty: 'Making the sarcasm score part of the fabric of the representation.',
        detail:
          'torch.cat([cls_output, sarcasm_prob.unsqueeze(1)], dim=1) → 769-D vector. The sarcasm probability is now spatially fused with the semantic embedding. Elegant.',
      },
      {
        id: 'gate-proj',
        label: 'Gate Projection Layer',
        sublabel: 'nn.Linear(769, 768)',
        dim: 'gate_proj',
        icon: '🚪',
        witty: 'A learned filter: let the right meaning through.',
        detail:
          'A linear layer maps the 769-D input back to 768-D. It learns to weight semantic features based on sarcasm probability. When p_sarcasm ≈ 1, it inverts/dampens positive signals. Clever.',
      },
      {
        id: 'residual',
        label: '⊕ Residual Addition',
        sublabel: 'sarcasm_aware = CLS + gate_output',
        icon: '➕',
        witty: 'Keep the original meaning, add the sarcasm correction.',
        detail:
          'sarcasm_aware = cls_output + gate_output. Classic residual connection. Preserves the original 768-D representation while adding the learned sarcasm-gated correction on top. No information is lost.',
      },
      {
        id: 'layernorm',
        label: 'LayerNorm',
        sublabel: 'LN(x) = (x-μ)/σ · γ + β',
        icon: '⚖️',
        witty: "Stable gradients: because even sarcasm shouldn't crash training.",
        detail:
          'LayerNorm(sarcasm_aware_cls) normalizes across the feature dimension. Ensures stable gradient flow and prevents feature magnitude from exploding. Training convergence thanks you.',
      },
    ],
  },
  {
    stepNum: 4,
    title: 'Sentiment Classification',
    icon: '🎨',
    description:
      'Sarcasm-aware CLS (768-D) → Linear(768,3) → Softmax → {Positive, Neutral, Negative}. The final verdict, now armed with full sarcasm knowledge.',
    wittyQuote:
      '"Standard classifier: text → transformer → positive. This classifier: text → transformer → sarcasm-corrected → actually negative. Night and day."',
    nodes: [
      {
        id: 'sentiment-linear',
        label: 'Sentiment Classifier',
        sublabel: 'nn.Linear(768, 3)',
        icon: '🏷️',
        witty: 'Three classes, infinite nuance. Or so we hope.',
        detail:
          'A linear layer projects the 768-D sarcasm-aware representation to 3 logits: one each for Positive, Neutral, Negative. Trained with cross-entropy loss alongside the sarcasm binary cross-entropy.',
      },
      {
        id: 'softmax',
        label: 'Softmax',
        sublabel: '→ P(Pos), P(Neu), P(Neg)',
        dim: '3 Probs',
        icon: '🎲',
        witty: 'Makes probabilities out of logits. Democratic and differentiable.',
        detail:
          'Softmax converts raw logits into a probability distribution summing to 1. The argmax gives the predicted class. The full probability vector is stored — not just the argmax — for context vector construction.',
      },
      {
        id: 'sentiment-out',
        label: 'Sentiment Output',
        sublabel: 'Positive / Neutral / Negative',
        icon: '✅',
        witty: "The answer. But not the full story — that comes next.",
        detail:
          "The predicted polarity. But wait — Sentiment Fusion doesn't stop here. It takes the probabilities, builds a rich context vector, and goes hunting in the FAISS database for something more nuanced.",
      },
    ],
  },
  {
    stepNum: 5,
    title: 'Context Vector Construction',
    icon: '🧩',
    description:
      'torch.cat([cls_768, mean_pool_768, sentiment_probs_3, p_sarcasm_1]) = 1540-D. The richest representation of your text\'s emotional state. Every dimension matters.',
    wittyQuote:
      '"768 + 768 + 3 + 1 = 1540. The math is simple. What it represents — a complete emotional fingerprint of the input — is anything but."',
    nodes: [
      {
        id: 'cls-768',
        label: '[CLS] Representation',
        sublabel: '768-D',
        dim: '768',
        icon: '📍',
        witty: 'The sentence-level semantic summary.',
        detail: 'The sarcasm-aware, LayerNorm-ed CLS vector — 768 dimensions of processed meaning.',
      },
      {
        id: 'mean-pool',
        label: 'Mean Pooled Hidden States',
        sublabel: '768-D  mean(hidden[:, 1:, :])',
        dim: '768',
        icon: '📊',
        witty: 'Average of ALL token representations. Not just the CLS celebrity.',
        detail:
          'mean(hidden_states[:, 1:, :]) — averages all non-[CLS] token embeddings. Captures complementary token-level information that CLS alone might miss.',
      },
      {
        id: 'sent-probs',
        label: 'Sentiment Probabilities',
        sublabel: '3-D softmax output',
        dim: '3',
        icon: '📉',
        witty: 'P(Pos), P(Neu), P(Neg) — how confident the model is.',
        detail:
          'The 3 softmax probabilities from the sentiment head. P(Pos)=0.97 vs P(Pos)=0.52 are very different emotional fingerprints. Confidence matters.',
      },
      {
        id: 'sarc-score',
        label: 'Sarcasm Score',
        sublabel: '1-D scalar',
        dim: '1',
        icon: '🎭',
        witty: 'The final ingredient. The secret sauce. The twist ending.',
        detail:
          'p_sarcasm scalar from the sarcasm head. 1 dimension that can completely change the nearest-neighbor results in FAISS.',
      },
      {
        id: 'ctx-vector',
        label: '1540-D Context Vector',
        sublabel: '768 + 768 + 3 + 1',
        dim: '1540',
        icon: '🧠',
        witty: 'The complete emotional DNA of the input sentence.',
        detail:
          'torch.cat([cls, mean_pool, sentiment_probs, sarcasm_prob]) → 1540-D. This is the query sent to FAISS.',
      },
    ],
  },
  {
    stepNum: 6,
    title: 'FAISS Emotion Retrieval',
    icon: '🔍',
    description:
      '1540-D vector → Polarity Router → matching FAISS sub-index → k-NN search (L2 distance) → score normalization (1/(1+d)) → emotion aggregation → fine-grained profile.',
    wittyQuote:
      '"FAISS: because \'Positive\' is a terrible answer when someone just got promoted, fell in love, AND ate a great taco all in the same day."',
    nodes: [
      {
        id: 'polarity-route',
        label: 'Polarity Router',
        sublabel: 'Route to Pos/Neu/Neg Index',
        icon: '🚦',
        witty: 'First, we pick the right neighborhood to search.',
        detail:
          'The predicted sentiment class routes the 1540-D query to one of three FAISS sub-indexes: positive_index, negative_index, or neutral_index. Searching within the right polarity dramatically improves precision.',
      },
      {
        id: 'faiss-index',
        label: 'FAISS IndexFlatL2',
        sublabel: 'd(q,v) = ‖q − v‖²',
        dim: 'k-NN',
        icon: '🗄️',
        witty: 'Finding your emotional cousins in a 1540-dimensional family reunion.',
        detail:
          'IndexFlatL2 computes exact L2 (Euclidean) distance between the query and all stored vectors. Returns the k closest matches. Facebook AI Similarity Search — milliseconds at scale.',
      },
      {
        id: 'score-norm',
        label: 'Score Normalization',
        sublabel: 'sim = 1 / (1 + d)',
        icon: '📐',
        witty: 'd→0 means sim→1. d→∞ means sim→0. Beautiful.',
        detail:
          'Converts L2 distances to similarity scores in [0,1]. sim_i = 1/(1+d_i). Neighbors with distance 0 are exact matches (sim=1). Distant vectors approach 0.',
      },
      {
        id: 'emotion-labels',
        label: 'Emotion Aggregation',
        sublabel: 'Weighted by similarity',
        icon: '🎨',
        witty: '"Mild Joy", "Quiet Pride", "Elated Relief". Shakespeare would be impressed.',
        detail:
          'Groups neighbors by emotion label, averages their similarity scores per label, sorts descending. Returns top-k unique emotions with scores.',
      },
      {
        id: 'final-profile',
        label: 'Final Emotional Profile',
        sublabel: 'Rich emotion + intensity',
        icon: '🏆',
        witty: 'The output no other sentiment model gives you.',
        detail:
          'Final output: predicted polarity + top-k fine-grained emotions with intensities. "Positive: Joy(0.82), Pride(0.76), Relief(0.71)". This is what Sentiment Fusion delivers instead of just "Positive".',
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────
   Model Architecture SVG — Exact code match
   Source: SarcasmAwareSentimentTransformer.forward()

   Forward pass:
     encoder → CLS → Dropout(0.3)
       ├─ sarcasm_head Linear(768→1) → Sigmoid → sarcasm_prob
       └─ cat([cls, sarcasm_prob]) 769-D
              → gate_proj (Linear 769→768 + Tanh) → gate
              → gate_norm(cls + gate)              ← ⊕ residual
              → sentiment_head Linear(768→3)
              → returns (sentiment_logits, sarcasm_logits)
───────────────────────────────────────────────────────── */

const ModelArchDiagram: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  const RNode = ({
    id, x, y, w, h, color, tc, lines, sub = '',
  }: {
    id: string; x: number; y: number; w: number; h: number;
    color: string; tc: string; lines: string[]; sub?: string;
  }) => {
    const isH = hovered === id;
    const yc = y + h / 2;
    const total = sub ? lines.length + 1 : lines.length;
    return (
      <g onMouseEnter={() => setHovered(id)} onMouseLeave={() => setHovered(null)}
        style={{ cursor: 'pointer' }}>
        <rect x={x} y={y} width={w} height={h} fill={color}
          stroke={isH ? '#FFD700' : '#0B1F3B'} strokeWidth={isH ? 3 : 2}
          filter={isH ? 'url(#ma2-glow)' : undefined} />
        {lines.map((l, li) => (
          <text key={li} x={x + w / 2}
            y={yc + (li - (total - 1) / 2) * 13}
            textAnchor="middle" dominantBaseline="middle"
            fill={tc} fontSize="9" fontWeight="bold"
            fontFamily="'IBM Plex Mono', monospace">{l}</text>
        ))}
        {sub && (
          <text x={x + w / 2}
            y={yc + (lines.length - (total - 1) / 2) * 13}
            textAnchor="middle" dominantBaseline="middle"
            fill={tc} fontSize="8" opacity="0.8"
            fontFamily="'IBM Plex Mono', monospace">{sub}</text>
        )}
      </g>
    );
  };

  const DA = ({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0B1F3B" strokeWidth="2"
      markerEnd="url(#ma2-arr)" opacity="0.82" />
  );

  return (
    <div className="sf-diag-panel">
      <div className="sf-diag-title-bar">
        <span className="sf-diag-icon">🧠</span>
        MODEL ARCHITECTURE — EXACT CODE MATCH
      </div>
      <div style={{
        background: '#0B1F3B', color: '#2EC4B6',
        fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem',
        padding: '0.5rem 1rem', borderBottom: '2px solid #0B1F3B',
        lineHeight: 1.6,
      }}>
        <span style={{ color: '#6c5ce7' }}>class </span>
        <span style={{ color: '#FFD700' }}>SarcasmAwareSentimentTransformer</span>
        <span style={{ color: '#fff' }}>(nn.Module)</span>
      </div>
      <div className="sf-flow-scroll">
        <svg viewBox="0 0 640 1150" width="100%"
          style={{ minWidth: '360px', maxWidth: '660px', display: 'block' }}
          aria-label="SarcasmAwareSentimentTransformer architecture diagram">
          <defs>
            <marker id="ma2-arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#0B1F3B" />
            </marker>
            <marker id="ma2-arr-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#e17055" />
            </marker>
            <filter id="ma2-glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. INPUT */}
          <RNode id="input" x={200} y={30} w={240} h={42} color="#0B1F3B" tc="#F8F4EC"
            lines={['input_ids', 'attention_mask']} />
          <DA x1={320} y1={72} x2={320} y2={100} />

          {/* 2. ENCODER */}
          <RNode id="encoder" x={180} y={100} w={280} h={52} color="#2EC4B6" tc="#0B1F3B"
            lines={['outputs = self.encoder(...)']} sub="AutoModel: xlm-roberta-base" />
          <DA x1={320} y1={152} x2={320} y2={180} />

          {/* 3. CLS Extraction */}
          <RNode id="cls-extract" x={160} y={180} w={320} h={44} color="#0B1F3B" tc="#FFD700"
            lines={['cls = outputs.last_hidden_state[:, 0]']} sub="[CLS] Token Representation (768-D)" />
          <DA x1={320} y1={224} x2={320} y2={252} />

          {/* 4. Dropout */}
          <RNode id="dropout" x={200} y={252} w={240} h={44} color="#636e72" tc="#fff"
            lines={['cls = self.dropout(cls)']} sub="nn.Dropout(p=0.3)" />
          <DA x1={320} y1={296} x2={320} y2={330} />

          {/* CLS NODE AFTER DROPOUT */}
          <RNode id="cls-node" x={240} y={330} w={160} h={40} color="#FFD700" tc="#0B1F3B"
            lines={['cls']} sub="768-D" />

          {/* Split: Left to Sarcasm, Center down to Cat, Right for Skip Connection */}
          <line x1={240} y1={350} x2={160} y2={400} stroke="#e17055" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#ma2-arr-red)" opacity="0.8" />
          <DA x1={320} y1={370} x2={320} y2={690} />
          
          <polyline points="400,350 500,350 500,860 350,860" fill="none" stroke="#e17055" strokeWidth="2" strokeDasharray="5,3" opacity="0.8" />
          <polygon points="344,857 350,860 344,863" fill="#e17055" />
          <text x={510} y={585} textAnchor="middle" fill="#e17055" fontSize="8" fontFamily="'IBM Plex Mono', monospace" transform="rotate(90, 510, 585)">cls (residual skip)</text>

          {/* LEFT PATH: Sarcasm Head */}
          <RNode id="sarc-head" x={40} y={400} w={200} h={50} color="#e17055" tc="#fff"
            lines={['sarcasm_logits = self.sarcasm_head(cls)']} sub="nn.Linear(768 → 1)" />
          <line x1={140} y1={450} x2={140} y2={480} stroke="#e17055" strokeWidth="2" markerEnd="url(#ma2-arr-red)" opacity="0.8" />
          
          <RNode id="sarc-logits" x={40} y={480} w={200} h={40} color="#fab1a0" tc="#0B1F3B"
            lines={['sarcasm_logits']} sub="Raw scalar" />
          <line x1={140} y1={520} x2={140} y2={550} stroke="#e17055" strokeWidth="2" markerEnd="url(#ma2-arr-red)" opacity="0.8" />

          <RNode id="sigmoid" x={40} y={550} w={200} h={50} color="#d63031" tc="#fff"
            lines={['sarcasm_prob = self.sigmoid(...)']} sub="σ(x) → [0,1]" />
          <line x1={140} y1={600} x2={140} y2={630} stroke="#e17055" strokeWidth="2" markerEnd="url(#ma2-arr-red)" opacity="0.8" />

          <RNode id="sarc-prob" x={40} y={630} w={200} h={40} color="#e17055" tc="#fff"
            lines={['sarcasm_prob']} sub="scalar probability" />
          
          <line x1={240} y1={650} x2={270} y2={690} stroke="#e17055" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#ma2-arr-red)" opacity="0.8" />

          {/* CENTER: Concat */}
          <RNode id="concat" x={180} y={690} w={280} h={50} color="#2EC4B6" tc="#0B1F3B"
            lines={['gate_input = torch.cat([cls, sarcasm_prob], dim=-1)']} sub="769-D" />
          <DA x1={320} y1={740} x2={320} y2={770} />

          {/* GATE PROJ */}
          <RNode id="gate-proj" x={180} y={770} w={280} h={60} color="#6c5ce7" tc="#fff"
            lines={['gate = self.gate_proj(gate_input)']} sub="nn.Sequential(Linear(769→768), Tanh())" />
          <DA x1={320} y1={830} x2={320} y2={850} />

          {/* RESIDUAL ADD */}
          <circle cx={320} cy={860} r={20} fill="#e17055" stroke="#0B1F3B" strokeWidth="2" />
          <text x={320} y={862} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="18" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">⊕</text>
          <text x={290} y={860} textAnchor="end" fill="#e17055" fontSize="8" fontFamily="'IBM Plex Mono', monospace">gate +</text>
          
          <DA x1={320} y1={880} x2={320} y2={910} />

          {/* GATE NORM */}
          <RNode id="gate-norm" x={160} y={910} w={320} h={50} color="#00b894" tc="#fff"
            lines={['gated_representation = self.gate_norm(cls + gate)']} sub="nn.LayerNorm(768) → 768-D" />
          <DA x1={320} y1={960} x2={320} y2={990} />

          {/* SENTIMENT HEAD */}
          <RNode id="sent-head" x={160} y={990} w={320} h={50} color="#6c5ce7" tc="#fff"
            lines={['sentiment_logits = self.sentiment_head(gated_representation)']} sub="nn.Linear(768 → 3)" />
          <DA x1={320} y1={1040} x2={320} y2={1070} />

          {/* OUTPUT */}
          <RNode id="output" x={160} y={1070} w={320} h={50} color="#0B1F3B" tc="#FFD700"
            lines={['return sentiment_logits, sarcasm_logits']} sub="[B, 3] and [B, 1]" />
          
          <line x1={140} y1={670} x2={140} y2={1095} stroke="#e17055" strokeWidth="1" strokeDasharray="5,3" markerEnd="url(#ma2-arr-red)" opacity="0.3" />
          <line x1={140} y1={1095} x2={160} y2={1095} stroke="#e17055" strokeWidth="1" strokeDasharray="5,3" markerEnd="url(#ma2-arr-red)" opacity="0.3" />
        </svg>
      </div>
      <p className="sf-flow-hint">↕ Scroll to see full architecture • Exact representation of forward()</p>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   FAISS Architecture SVG — Full Depth
   Shows: 1540-D composition, polarity router, 3 indexes
   with internal details, k-NN with L2 formula,
   score normalization math, emotion aggregation, output
───────────────────────────────────────────────────────── */
const FAISSDiagram: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  const RNode = ({
    id, x, y, w, h, color, tc, lines, sub = '',
  }: {
    id: string; x: number; y: number; w: number; h: number;
    color: string; tc: string; lines: string[]; sub?: string;
  }) => {
    const isH = hovered === id;
    const yc = y + h / 2;
    const total = sub ? lines.length + 1 : lines.length;
    return (
      <g onMouseEnter={() => setHovered(id)} onMouseLeave={() => setHovered(null)}
        style={{ cursor: 'pointer' }}>
        <rect x={x} y={y} width={w} height={h} fill={color}
          stroke={isH ? '#FFD700' : '#0B1F3B'} strokeWidth={isH ? 3 : 2}
          filter={isH ? 'url(#faiss-glow2)' : undefined} />
        {lines.map((l, li) => (
          <text key={li} x={x + w / 2}
            y={yc + (li - (total - 1) / 2) * 13}
            textAnchor="middle" dominantBaseline="middle"
            fill={tc} fontSize="9" fontWeight="bold"
            fontFamily="'IBM Plex Mono', monospace">{l}</text>
        ))}
        {sub && (
          <text x={x + w / 2}
            y={yc + (lines.length - (total - 1) / 2) * 13}
            textAnchor="middle" dominantBaseline="middle"
            fill={tc} fontSize="8" opacity="0.75"
            fontFamily="'IBM Plex Mono', monospace">{sub}</text>
        )}
      </g>
    );
  };

  const Arr = ({ x1, y1, x2, y2, dashed = false, color = '#0B1F3B' }:
    { x1: number; y1: number; x2: number; y2: number; dashed?: boolean; color?: string }) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2"
      strokeDasharray={dashed ? '5,3' : undefined}
      markerEnd="url(#faiss-arr2)" opacity="0.8" />
  );

  const emotions = [
    { label: 'Mild Joy', score: 0.82, color: '#00b894' },
    { label: 'Excited Pride', score: 0.76, color: '#6c5ce7' },
    { label: 'Elated Relief', score: 0.71, color: '#2EC4B6' },
  ];

  return (
    <div className="sf-faiss-section">
      <div className="sf-faiss-diagram-row">

        {/* ── FAISS SVG (left) ── */}
        <div className="sf-diag-panel sf-faiss-svg-wrap" style={{ border: 'none', boxShadow: 'none' }}>
          <div className="sf-diag-title-bar">
            <span className="sf-diag-icon">🗄️</span>
            FAISS RETRIEVAL ARCHITECTURE — FULL DEPTH
          </div>
          <div className="sf-flow-scroll">
            <svg viewBox="0 0 680 1380" width="100%"
              style={{ minWidth: '380px', maxWidth: '700px', display: 'block' }}
              aria-label="FAISS Complete Retrieval Architecture">
              <defs>
                <marker id="faiss-arr2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#0B1F3B" />
                </marker>
                <marker id="faiss-arr-grn" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#00b894" />
                </marker>
                <marker id="faiss-arr-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#e17055" />
                </marker>
                <filter id="faiss-glow2">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* ══ 1540-D annotated input ══ */}
              <rect x={60} y={16} width={560} height={96} fill="#0B1F3B"
                stroke="#2EC4B6" strokeWidth="2.5" />
              <text x={340} y={38} textAnchor="middle" fill="#2EC4B6" fontSize="10"
                fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">
                1540-D CONTEXT VECTOR (Query Input)
              </text>
              {/* segment bar */}
              <rect x={78} y={48} width={524} height={18} fill="#333" />
              <rect x={78} y={48} width={260} height={18} fill="#6c5ce7" />
              <rect x={338} y={48} width={260} height={18} fill="#2EC4B6" />
              <rect x={598} y={48} width={2} height={18} fill="#FFD700" />
              <rect x={600} y={48} width={2} height={18} fill="#e17055" />
              <text x={208} y={59} textAnchor="middle" fill="#fff" fontSize="8.5"
                fontFamily="'IBM Plex Mono', monospace">CLS  768-D</text>
              <text x={468} y={59} textAnchor="middle" fill="#0B1F3B" fontSize="8.5"
                fontFamily="'IBM Plex Mono', monospace">Mean Pool  768-D</text>

              {/* legend row */}
              <text x={78} y={83} fill="#6c5ce7" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">■ CLS (768)</text>
              <text x={188} y={83} fill="#2EC4B6" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">■ MeanPool (768)</text>
              <text x={330} y={83} fill="#FFD700" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">■ Sent(3)</text>
              <text x={390} y={83} fill="#e17055" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">■ Sarc(1)</text>
              <text x={460} y={83} fill="#888" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">= 1540-D total</text>

              {/* ══ POLARITY PREDICTION ══ */}
              <Arr x1={340} y1={112} x2={340} y2={152} />
              <RNode id="pred-class" x={190} y={152} w={300} h={50} color="#6c5ce7" tc="#fff"
                lines={['Predicted Polarity Class']} sub="argmax(Softmax(Linear(768 → 3)))" />

              {/* ══ POLARITY ROUTER ══ */}
              <Arr x1={340} y1={202} x2={340} y2={248} />
              <RNode id="router" x={190} y={248} w={300} h={54} color="#0B1F3B" tc="#FFD700"
                lines={['🚦 POLARITY ROUTER']} sub="routes 1540-D query to matching index" />

              {/* ══ 3 INDEXES ══ */}
              {/* split arrows */}
              <line x1={260} y1={302} x2={120} y2={376} stroke="#00b894" strokeWidth="2"
                markerEnd="url(#faiss-arr-grn)" opacity="0.85" />
              <Arr x1={340} y1={302} x2={340} y2={376} />
              <line x1={420} y1={302} x2={560} y2={376} stroke="#e17055" strokeWidth="2"
                markerEnd="url(#faiss-arr-red)" opacity="0.85" />

              {/* Positive Index block */}
              <rect x={20} y={376} width={195} height={162} fill="#00b894"
                stroke="#0B1F3B" strokeWidth="2" />
              <text x={117} y={396} textAnchor="middle" fill="#fff" fontSize="9"
                fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">✅ POSITIVE INDEX</text>
              <rect x={34} y={404} width={167} height={118} fill="rgba(0,0,0,0.18)" />
              <text x={117} y={422} textAnchor="middle" fill="#d4f9f1" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">Type: IndexFlatL2</text>
              <text x={117} y={436} textAnchor="middle" fill="#d4f9f1" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">Dimension: 1540</text>
              <text x={117} y={450} textAnchor="middle" fill="#d4f9f1" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">Vectors: N_pos stored</text>
              <text x={117} y={464} textAnchor="middle" fill="#d4f9f1" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">Each vector: 1540-D</text>
              <text x={117} y={478} textAnchor="middle" fill="#d4f9f1" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">Labels: Joy, Pride,</text>
              <text x={117} y={492} textAnchor="middle" fill="#d4f9f1" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">Excitement, Relief...</text>
              <text x={117} y={510} textAnchor="middle" fill="#FFD700" fontSize="8"
                fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">ACTIVE if Pos predicted</text>

              {/* Neutral Index block */}
              <rect x={242} y={376} width={195} height={162} fill="#636e72"
                stroke="#0B1F3B" strokeWidth="2" />
              <text x={340} y={396} textAnchor="middle" fill="#fff" fontSize="9"
                fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">⚪ NEUTRAL INDEX</text>
              <rect x={256} y={404} width={167} height={118} fill="rgba(0,0,0,0.18)" />
              <text x={340} y={422} textAnchor="middle" fill="#dfe6e9" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">Type: IndexFlatL2</text>
              <text x={340} y={436} textAnchor="middle" fill="#dfe6e9" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">Dimension: 1540</text>
              <text x={340} y={450} textAnchor="middle" fill="#dfe6e9" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">Vectors: N_neu stored</text>
              <text x={340} y={464} textAnchor="middle" fill="#dfe6e9" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">Each vector: 1540-D</text>
              <text x={340} y={478} textAnchor="middle" fill="#dfe6e9" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">Labels: Calm, Apathy,</text>
              <text x={340} y={492} textAnchor="middle" fill="#dfe6e9" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">Indifference, Boredom...</text>
              <text x={340} y={510} textAnchor="middle" fill="#FFD700" fontSize="8"
                fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">ACTIVE if Neu predicted</text>

              {/* Negative Index block */}
              <rect x={464} y={376} width={195} height={162} fill="#e17055"
                stroke="#0B1F3B" strokeWidth="2" />
              <text x={562} y={396} textAnchor="middle" fill="#fff" fontSize="9"
                fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">❌ NEGATIVE INDEX</text>
              <rect x={478} y={404} width={167} height={118} fill="rgba(0,0,0,0.18)" />
              <text x={562} y={422} textAnchor="middle" fill="#ffeaa7" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">Type: IndexFlatL2</text>
              <text x={562} y={436} textAnchor="middle" fill="#ffeaa7" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">Dimension: 1540</text>
              <text x={562} y={450} textAnchor="middle" fill="#ffeaa7" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">Vectors: N_neg stored</text>
              <text x={562} y={464} textAnchor="middle" fill="#ffeaa7" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">Each vector: 1540-D</text>
              <text x={562} y={478} textAnchor="middle" fill="#ffeaa7" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">Labels: Anger, Grief,</text>
              <text x={562} y={492} textAnchor="middle" fill="#ffeaa7" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">Disgust, Sarcasm...</text>
              <text x={562} y={510} textAnchor="middle" fill="#FFD700" fontSize="8"
                fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">ACTIVE if Neg predicted</text>

              {/* ══ k-NN SEARCH ══ */}
              <line x1={117} y1={538} x2={250} y2={604} stroke="#0B1F3B" strokeWidth="2"
                markerEnd="url(#faiss-arr2)" opacity="0.7" />
              <Arr x1={340} y1={538} x2={340} y2={604} />
              <line x1={562} y1={538} x2={430} y2={604} stroke="#0B1F3B" strokeWidth="2"
                markerEnd="url(#faiss-arr2)" opacity="0.7" />

              <rect x={80} y={604} width={520} height={130} fill="#0B1F3B"
                stroke="#2EC4B6" strokeWidth="2.5" />
              <text x={340} y={626} textAnchor="middle" fill="#2EC4B6" fontSize="10"
                fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">
                k-Nearest Neighbor Search (IndexFlatL2)
              </text>
              <rect x={100} y={634} width={480} height={86} fill="rgba(46,196,182,0.07)" />
              <text x={120} y={652} fill="#888" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">— brute-force over all N vectors in active index —</text>
              <text x={120} y={668} fill="#2EC4B6" fontSize="9" fontWeight="bold"
                fontFamily="'IBM Plex Mono', monospace">  d_i  =  ‖ q − v_i ‖²   (L2 / Euclidean distance)</text>
              <text x={120} y={684} fill="#aaa" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">  Sort all d_i ascending  →  select top-k smallest</text>
              <text x={120} y={698} fill="#FFD700" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">  Returns: [(v₁,label₁,d₁), (v₂,label₂,d₂), ..., (vₖ,labelₖ,dₖ)]</text>
              <text x={120} y={712} fill="#aaa" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">  Complexity: O(N·D) exact  •  O(log N) with IVF partitioning</text>

              {/* ══ SCORE NORMALIZATION ══ */}
              <Arr x1={340} y1={734} x2={340} y2={784} />
              <rect x={120} y={784} width={440} height={110} fill="#6c5ce7"
                stroke="#0B1F3B" strokeWidth="2" />
              <text x={340} y={806} textAnchor="middle" fill="#fff" fontSize="10"
                fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">Score Normalization</text>
              <rect x={140} y={814} width={400} height={66} fill="rgba(0,0,0,0.25)" />
              <text x={340} y={834} textAnchor="middle" fill="#a29bfe" fontSize="10"
                fontFamily="'IBM Plex Mono', monospace">sim_i  =  1 / (1 + d_i)</text>
              <text x={340} y={852} textAnchor="middle" fill="#dfe6e9" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">d_i = 0  →  sim = 1.00  (perfect match)</text>
              <text x={340} y={866} textAnchor="middle" fill="#dfe6e9" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">d_i = 1  →  sim = 0.50  •  d_i → ∞  →  sim → 0</text>
              <text x={340} y={880} textAnchor="middle" fill="#FFD700" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">Maps unbounded distance to bounded [0, 1] similarity</text>

              {/* ══ EMOTION AGGREGATION ══ */}
              <Arr x1={340} y1={894} x2={340} y2={944} />
              <rect x={80} y={944} width={520} height={106} fill="#2EC4B6"
                stroke="#0B1F3B" strokeWidth="2.5" />
              <text x={340} y={966} textAnchor="middle" fill="#0B1F3B" fontSize="10"
                fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">Emotion Aggregation</text>
              <rect x={100} y={974} width={480} height={62} fill="rgba(0,0,0,0.12)" />
              <text x={120} y={991} fill="#0B1F3B" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">Group all top-k neighbors by their emotion label</text>
              <text x={120} y={1005} fill="#0B1F3B" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">score(label) = mean(sim_i)  for all i sharing that label</text>
              <text x={120} y={1019} fill="#0B1F3B" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">Sort labels by score descending  →  return top-k unique emotions</text>
              <text x={120} y={1033} fill="#0B1F3B" fontSize="8" fontWeight="bold"
                fontFamily="'IBM Plex Mono', monospace">Result: ranked list of (emotion_label, intensity_score) pairs</text>

              {/* ══ FINAL OUTPUT ══ */}
              <Arr x1={340} y1={1050} x2={340} y2={1100} />
              <rect x={60} y={1100} width={560} height={120} fill="#0B1F3B"
                stroke="#FFD700" strokeWidth="2.5" />
              <text x={340} y={1122} textAnchor="middle" fill="#FFD700" fontSize="10"
                fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">
                🎨 FINAL EMOTIONAL PROFILE
              </text>
              {[
                { label: 'Mild Joy', score: '0.82', bw: 360, color: '#00b894', y: 1133 },
                { label: 'Excited Pride', score: '0.76', bw: 332, color: '#6c5ce7', y: 1155 },
                { label: 'Elated Relief', score: '0.71', bw: 308, color: '#2EC4B6', y: 1177 },
              ].map((e) => (
                <g key={e.label}>
                  <text x={80} y={e.y + 12} fill={e.color} fontSize="9"
                    fontFamily="'IBM Plex Mono', monospace" fontWeight="bold">{e.label}</text>
                  <rect x={200} y={e.y} width={e.bw} height={14} fill={e.color} opacity="0.3" />
                  <rect x={200} y={e.y} width={e.bw} height={14} fill="none"
                    stroke={e.color} strokeWidth="1" />
                  <text x={580} y={e.y + 12} fill={e.color} fontSize="9"
                    fontFamily="'IBM Plex Mono', monospace" fontWeight="bold">{e.score}</text>
                </g>
              ))}
              <text x={340} y={1208} textAnchor="middle" fill="#555" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">
                vs. just "Positive" from a standard sentiment model.
              </text>

              {/* ══ KEY ══ */}
              <rect x={60} y={1242} width={560} height={52} fill="#f8f4ec" stroke="#0B1F3B" strokeWidth="1.5" />
              <text x={80} y={1260} fill="#0B1F3B" fontSize="8" fontWeight="bold"
                fontFamily="'IBM Plex Mono', monospace">KEY:</text>
              {[
                { x: 120, c: '#00b894', l: 'Positive index' },
                { x: 238, c: '#636e72', l: 'Neutral index' },
                { x: 356, c: '#e17055', l: 'Negative index' },
                { x: 474, c: '#2EC4B6', l: 'Active path' },
              ].map((k) => (
                <g key={k.l}>
                  <rect x={k.x} y={1252} width={8} height={8} fill={k.c} />
                  <text x={k.x + 12} y={1260} fill="#0B1F3B" fontSize="8"
                    fontFamily="'IBM Plex Mono', monospace">{k.l}</text>
                </g>
              ))}
              <text x={80} y={1283} fill="#666" fontSize="8"
                fontFamily="'IBM Plex Mono', monospace">
                L2 = Euclidean distance  •  IVF = Inverted File Index  •  k = number of neighbors returned
              </text>
            </svg>
          </div>
          <p className="sf-flow-hint">↕ Scroll to see full FAISS diagram • Hover any node</p>
        </div>

        {/* ── Example panel (right) ── */}
        <div className="sf-faiss-explain">
          <div className="sf-faiss-label">LIVE EXAMPLE</div>
          <p className="sf-faiss-input-text">
            Input: <em>"I finally got the promotion after 3 years!"</em>
          </p>
          <div className="sf-faiss-class">
            <span className="sf-faiss-class-badge sf-pos">✅ POSITIVE</span>
            <span className="sf-faiss-class-sarc">Sarcasm: 0.04</span>
          </div>
          <p className="sf-faiss-sub">→ Routes to Positive Index</p>
          <p className="sf-faiss-sub">Top-3 Retrieved Emotions:</p>
          {emotions.map((e) => (
            <div key={e.label} className="sf-emotion-row">
              <span className="sf-emotion-name">{e.label}</span>
              <div className="sf-emotion-bar-bg">
                <div className="sf-emotion-bar-fill"
                  style={{ width: `${e.score * 100}%`, background: e.color }} />
              </div>
              <span className="sf-emotion-score" style={{ color: e.color }}>
                {e.score.toFixed(2)}
              </span>
            </div>
          ))}

          <div className="sf-faiss-vs">
            <div className="sf-faiss-vs-col sf-vs-bad">
              <div className="sf-vs-label">Without FAISS</div>
              <div className="sf-vs-output">Positive ✓</div>
              <div className="sf-vs-note">That's it. Good luck.</div>
            </div>
            <div className="sf-faiss-vs-divider">VS</div>
            <div className="sf-faiss-vs-col sf-vs-good">
              <div className="sf-vs-label">With FAISS</div>
              <div className="sf-vs-output">Joy · Pride · Relief</div>
              <div className="sf-vs-note">Now we're talking.</div>
            </div>
          </div>

          <div className="sf-faiss-formula-box">
            <div className="sf-formula-title">L2 Distance</div>
            <div className="sf-formula">d(q,v) = ‖q − v‖²</div>
            <div className="sf-formula-sub">Euclidean in 1540-D space</div>
            <div className="sf-formula-title" style={{ marginTop: '0.8rem' }}>Similarity</div>
            <div className="sf-formula">sim = 1 / (1 + d)</div>
            <div className="sf-formula-sub">d→0: sim→1 • d→∞: sim→0</div>
            <div className="sf-formula-title" style={{ marginTop: '0.8rem' }}>Aggregation</div>
            <div className="sf-formula">score(L) = mean(sim_i)</div>
            <div className="sf-formula-sub">averaged over neighbors with label L</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   Context Vector Breakdown
───────────────────────────────────────────────────────── */
const ContextVectorViz: React.FC = () => {
  const segments = [
    { label: '[CLS] Embedding', dim: 768, color: '#6c5ce7', pct: 49.8 },
    { label: 'Mean Pool', dim: 768, color: '#2EC4B6', pct: 49.8 },
    { label: 'Sentiment Probs', dim: 3, color: '#FFD700', pct: 0.2 },
    { label: 'Sarcasm Score', dim: 1, color: '#e17055', pct: 0.1 },
  ];

  return (
    <div className="sf-ctx-section">
      <div className="sf-section-label"><span>🧩</span> 1540-D Context Vector Anatomy</div>
      <div className="sf-ctx-bar-wrap">
        {segments.map((s) => (
          <div key={s.label} className="sf-ctx-segment"
            style={{ width: `${s.pct}%`, background: s.color }}
            title={`${s.label}: ${s.dim}-D`} />
        ))}
      </div>
      <div className="sf-ctx-legend">
        {segments.map((s) => (
          <div key={s.label} className="sf-ctx-legend-item">
            <div className="sf-ctx-dot" style={{ background: s.color }} />
            <span className="sf-ctx-legend-label">{s.label}</span>
            <span className="sf-ctx-legend-dim" style={{ color: s.color }}>{s.dim}-D</span>
          </div>
        ))}
      </div>
      <p className="sf-ctx-total">
        Total: 768 + 768 + 3 + 1 = <strong>1540-D</strong> — your sentence's complete emotional fingerprint.
      </p>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   Step card sub-components
───────────────────────────────────────────────────────── */
interface SFNodeCardProps {
  node: SFNode;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const SFNodeCard: React.FC<SFNodeCardProps> = ({ node, index, isActive, onClick }) => (
  <div className={`sf-node-card ${isActive ? 'sf-node-active' : ''}`}
    onClick={onClick}
    style={{ animationDelay: `${index * 0.08}s` }}
    id={`sf-node-${node.id}`}>
    <div className="sf-node-icon">{node.icon}</div>
    <div className="sf-node-body">
      <div className="sf-node-label">{node.label}</div>
      {node.sublabel && <div className="sf-node-sublabel">{node.sublabel}</div>}
      {node.dim && <span className="sf-dim-badge">{node.dim}</span>}
      <div className="sf-node-witty">{node.witty}</div>
      {isActive && <div className="sf-node-detail">{node.detail}</div>}
    </div>
  </div>
);

interface SFStepCardProps {
  step: SFStep;
  isActive: boolean;
  onActivate: () => void;
}

const SFStepCard: React.FC<SFStepCardProps> = ({ step, isActive, onActivate }) => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  return (
    <div className={`sf-step-card ${isActive ? 'sf-step-active' : ''}`} id={`sf-step-${step.stepNum}`}>
      <div className="sf-step-header" onClick={onActivate}>
        <div className="sf-step-num-badge">
          <span className="sf-step-num-text">{String(step.stepNum).padStart(2, '0')}</span>
        </div>
        <div className="sf-step-header-content">
          <div className="sf-step-icon">{step.icon}</div>
          <h3 className="sf-step-title">STEP {step.stepNum}: {step.title.toUpperCase()}</h3>
        </div>
        <div className={`sf-step-chevron ${isActive ? 'sf-chevron-open' : ''}`}>▼</div>
      </div>
      {isActive && (
        <div className="sf-step-body">
          <p className="sf-step-description">{step.description}</p>
          <div className="sf-witty-quote">
            <span className="sf-quote-mark">❝</span>
            {step.wittyQuote}
            <span className="sf-quote-mark">❞</span>
          </div>
          <div className="sf-nodes-grid">
            {step.nodes.map((node, i) => (
              <SFNodeCard key={node.id} node={node} index={i}
                isActive={activeNode === node.id}
                onClick={() => setActiveNode(activeNode === node.id ? null : node.id)} />
            ))}
          </div>
          {step.nodes.length > 1 && (
            <div className="sf-tap-hint">↑ Click any block to inspect it</div>
          )}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   Stats Banner
───────────────────────────────────────────────────────── */
const SFStatsBanner: React.FC = () => {
  const stats = [
    { label: 'Sentiment Acc.', value: '94.4%', icon: '🎯', color: '#2EC4B6' },
    { label: 'Sarcasm Acc.', value: '75.95%', icon: '🎭', color: '#e17055' },
    { label: 'Val Loss', value: '0.2284', icon: '📉', color: '#6c5ce7' },
    { label: 'Overall Score', value: '0.8866', icon: '🏆', color: '#FFD700' },
    { label: 'Context Vec', value: '1540-D', icon: '🧩', color: '#0B1F3B' },
    { label: 'Encoder', value: 'XLM-R', icon: '🌐', color: '#2EC4B6' },
  ];
  return (
    <div className="sf-stats-banner">
      {stats.map((s) => (
        <div className="sf-stat-item" key={s.label} style={{ borderColor: s.color }}>
          <div className="sf-stat-icon">{s.icon}</div>
          <div className="sf-stat-value" style={{ color: s.color }}>{s.value}</div>
          <div className="sf-stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   Sarcasm vs Standard Comparison
───────────────────────────────────────────────────────── */
const SarcasmComparison: React.FC = () => {
  const examples = [
    { text: '"Great! My laptop crashed again."', standard: 'Positive 😬', fusion: 'Negative 😤 (sarcasm: 0.92)' },
    { text: '"Wonderful, another exam tomorrow."', standard: 'Positive 😬', fusion: 'Negative 😤 (sarcasm: 0.88)' },
    { text: '"I love waiting 3 hours for support."', standard: 'Positive 😬', fusion: 'Negative 😤 (sarcasm: 0.96)' },
  ];
  return (
    <div className="sf-sarcasm-compare">
      <div className="sf-section-label"><span>🆚</span> Sarcasm Test: Standard vs Fusion</div>
      <div className="sf-compare-table-wrap">
        <table className="sf-compare-table">
          <thead>
            <tr>
              <th>Input Text</th>
              <th>Standard Model</th>
              <th>Sentiment Fusion</th>
            </tr>
          </thead>
          <tbody>
            {examples.map((ex) => (
              <tr key={ex.text}>
                <td className="sf-ex-text">{ex.text}</td>
                <td className="sf-ex-wrong">{ex.standard}</td>
                <td className="sf-ex-right">{ex.fusion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="sf-compare-note">
        The sarcasm head + gate projection means the classifier literally knows when to flip its interpretation.
        Standard models just see the word "love" and call it a day.
      </p>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   Main Export
───────────────────────────────────────────────────────── */
const SentimentFusionArchitecture: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(1);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('sf-visible'); }),
      { threshold: 0.1 }
    );
    const cards = rootRef.current?.querySelectorAll('.sf-step-card') ?? [];
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sf-root" ref={rootRef}>
      {/* Header */}
      <div className="sf-header">
        <div className="sf-header-badge">🧠 SENTIMENT FUSION ARCHITECTURE</div>
        <h2 className="sf-main-title">
          SARCASM-AWARE<br />
          <span className="sf-title-accent">SENTIMENT SYSTEM</span>
        </h2>
        <p className="sf-header-sub">
          A multi-task architecture that reads between the lines — literally. XLM-RoBERTa backbone,
          a dedicated sarcasm detection head, gate projection gating, and FAISS-powered fine-grained
          emotion retrieval. Because "Positive" is a terrible answer for a rich emotional world.
        </p>
        <div className="sf-header-tags">
          <span className="sf-tag">🌐 XLM-RoBERTa</span>
          <span className="sf-tag">🎭 Sarcasm Detection</span>
          <span className="sf-tag">⚡ Gate Projection</span>
          <span className="sf-tag">⊕ Residual Add</span>
          <span className="sf-tag">🔍 FAISS Retrieval</span>
          <span className="sf-tag">🧩 1540-D Vectors</span>
        </div>
      </div>

      {/* Stats */}
      <SFStatsBanner />

      {/* ── DIAGRAM 1: MODEL ARCHITECTURE ── */}
      <div className="sf-section-label"><span>🧠</span> Model Architecture — Complete Depth</div>
      <ModelArchDiagram />

      {/* Sarcasm comparison */}
      <SarcasmComparison />

      {/* Step breakdown */}
      <div className="sf-section-label"><span>⚙️</span> Deep Dive: Architecture Steps</div>
      <div className="sf-steps-list">
        {SF_STEPS.map((step) => (
          <SFStepCard key={step.stepNum} step={step}
            isActive={activeStep === step.stepNum}
            onActivate={() => setActiveStep(step.stepNum)} />
        ))}
      </div>

      {/* Context vector anatomy */}
      <ContextVectorViz />

      {/* ── DIAGRAM 2: FAISS ARCHITECTURE ── */}
      <div className="sf-section-label"><span>🗄️</span> FAISS Retrieval Architecture — Complete Depth</div>
      <FAISSDiagram />

      {/* E2E summary */}
      <div className="sf-e2e-summary">
        <div className="sf-section-label"><span>🏁</span> End-to-End Flow</div>
        <div className="sf-e2e-flow">
          {[
            { label: 'Raw Text Input', icon: '📨' },
            { label: 'XLM-RoBERTa (12 layers → 768-D)', icon: '🌐' },
            { label: 'Sarcasm Head → p_sarcasm', icon: '🎭' },
            { label: 'Concat [CLS ‖ p_s] → 769-D', icon: '🔗' },
            { label: 'Gate Projection Linear(769→768)', icon: '🚪' },
            { label: '⊕ Residual Add + LayerNorm', icon: '⚡' },
            { label: 'Sentiment Classifier (768→3)', icon: '🎨' },
            { label: 'Build 1540-D Context Vector', icon: '🧩' },
            { label: 'FAISS k-NN Retrieval', icon: '🗄️' },
            { label: '🏆 Fine-Grained Emotional Profile', icon: '🏆' },
          ].map((item, i, arr) => (
            <React.Fragment key={item.label}>
              <div className="sf-e2e-node">
                <div className="sf-e2e-icon">{item.icon}</div>
                <div className="sf-e2e-label">{item.label}</div>
              </div>
              {i < arr.length - 1 && <div className="sf-e2e-arrow">↓</div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SentimentFusionArchitecture;
