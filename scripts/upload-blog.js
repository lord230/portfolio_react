import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const POST_CONTENT = `# Sarcasm-Aware Sentiment Transformer: Architecture Deep Dive

Ever wondered how to teach a model to detect sarcasm *and* use that awareness to make better sentiment decisions? That's exactly what this architecture does — and the math behind it is surprisingly elegant.

---

## 1. The Problem

Standard sentiment models treat every sentence the same way. But consider:

> "Wow, great phone… dies in two hours."

A naive model might see "great" and predict *Positive*. A sarcasm-aware model understands that this sentence is **negatively sarcastic** — and adjusts accordingly.

---

## 2. The Architecture at a Glance

\`\`\`python
import torch
import torch.nn as nn
from transformers import AutoModel


class SarcasmAwareSentimentTransformer(nn.Module):
    def __init__(
        self,
        model_name="xlm-roberta-base",
        num_sentiment_classes=3,
        dropout=0.3
    ):
        super().__init__()

        self.encoder = AutoModel.from_pretrained(model_name)
        hidden_size = self.encoder.config.hidden_size

        self.dropout = nn.Dropout(dropout)

        # Sarcasm head
        self.sarcasm_head = nn.Linear(hidden_size, 1)

        # gate_proj takes cls + sarcasm_prob and produces a gate to modulate the representation
        self.gate_proj = nn.Sequential(
            nn.Linear(hidden_size + 1, hidden_size),
            nn.Tanh()
        )

        self.gate_norm = nn.LayerNorm(hidden_size)

        # Sentiment head
        self.sentiment_head = nn.Linear(hidden_size, num_sentiment_classes)

        self.sigmoid = nn.Sigmoid()

    def forward(self, input_ids, attention_mask):

        outputs = self.encoder(
            input_ids=input_ids,
            attention_mask=attention_mask
        )

        cls = outputs.last_hidden_state[:, 0]
        cls = self.dropout(cls)

        # Sarcasm prediction
        sarcasm_logits = self.sarcasm_head(cls)
        sarcasm_prob = self.sigmoid(sarcasm_logits)    

        gate_input = torch.cat([cls, sarcasm_prob], dim=-1) 
        gate = self.gate_proj(gate_input)                   

        gated_representation = self.gate_norm(cls + gate)   

        sentiment_logits = self.sentiment_head(gated_representation)

        return sentiment_logits, sarcasm_logits
\`\`\`

---

## 3. Step-by-Step Math

### Step 1: Encoder — Getting Contextual Embeddings

The backbone is **XLM-RoBERTa**, a multilingual transformer encoder. Given tokenized input $\\mathbf{x} \\in \\mathbb{Z}^{T}$ (token IDs of sequence length $T$), the encoder produces:

$$\\mathbf{H} = \\text{XLM-RoBERTa}(\\mathbf{x}) \\in \\mathbb{R}^{T \\times d}$$

where $d$ is the hidden size (768 for base models). We extract the **\\[CLS\\] token** — the first position — as a summary of the entire sequence:

$$\\mathbf{c} = \\mathbf{H}_{[0,:]} \\in \\mathbb{R}^{d}$$

Dropout is then applied for regularization:

$$\\tilde{\\mathbf{c}} = \\text{Dropout}(\\mathbf{c}, p=0.3)$$

---

### Step 2: Sarcasm Head — Binary Detection

A linear layer maps the CLS representation to a sarcasm logit, then sigmoid squashes it to a probability:

$$z_s = \\mathbf{W}_s \\tilde{\\mathbf{c}} + b_s \\in \\mathbb{R}$$

$$p_s = \\sigma(z_s) = \\frac{1}{1 + e^{-z_s}} \\in [0, 1]$$

Here $p_s \\approx 1$ means the model is **highly confident** the text is sarcastic. This single scalar becomes the key signal for the next step.

---

### Step 3: Gate Projection — Sarcasm-Conditioned Gating

This is the creative heart of the model. We **concatenate** the CLS embedding with the sarcasm probability:

$$\\mathbf{g}_{\\text{in}} = [\\tilde{\\mathbf{c}} \\;\\|\\; p_s] \\in \\mathbb{R}^{d+1}$$

Then project through a learned linear layer with Tanh activation:

$$\\mathbf{g} = \\tanh\\!\\left(\\mathbf{W}_g \\, \\mathbf{g}_{\\text{in}} + \\mathbf{b}_g\\right) \\in \\mathbb{R}^{d}$$

The $\\tanh$ bounds the gate values to $(-1, 1)$, making it act like a **soft multiplicative/additive modulator** — similar to a forget gate in an LSTM. When sarcasm probability is high, the gate learns to *flip* or *dampen* specific dimensions of the CLS representation.

---

### Step 4: Gated Residual + LayerNorm

The gate is added back to the original CLS embedding (residual connection), then normalized:

$$\\hat{\\mathbf{c}} = \\text{LayerNorm}\\!\\left(\\tilde{\\mathbf{c}} + \\mathbf{g}\\right)$$

**LayerNorm** is defined as:

$$\\text{LayerNorm}(\\mathbf{x}) = \\frac{\\mathbf{x} - \\mu}{\\sqrt{\\sigma^2 + \\epsilon}} \\cdot \\boldsymbol{\\gamma} + \\boldsymbol{\\beta}$$

where $\\mu, \\sigma^2$ are the mean and variance over the feature dimension, and $\\boldsymbol{\\gamma}, \\boldsymbol{\\beta}$ are learned parameters. This stabilizes training and keeps activations well-scaled.

The residual connection ensures that if the sarcasm signal is uninformative (gate $\\approx 0$), the representation falls back to the original CLS embedding.

---

### Step 5: Sentiment Classification

Finally, the gated, normalized representation is classified:

$$\\mathbf{l}_{\\text{sent}} = \\mathbf{W}_{\\text{sent}} \\hat{\\mathbf{c}} + \\mathbf{b}_{\\text{sent}} \\in \\mathbb{R}^{3}$$

These logits correspond to **Negative / Neutral / Positive** sentiment. During training, cross-entropy loss is applied:

$$\\mathcal{L}_{\\text{sentiment}} = -\\sum_{k=1}^{3} y_k \\log \\frac{e^{l_k}}{\\sum_j e^{l_j}}$$

The sarcasm head is also trained jointly with binary cross-entropy:

$$\\mathcal{L}_{\\text{sarcasm}} = -\\left[ y_s \\log p_s + (1 - y_s) \\log(1 - p_s) \\right]$$

The total loss is:

$$\\mathcal{L} = \\mathcal{L}_{\\text{sentiment}} + \\lambda \\cdot \\mathcal{L}_{\\text{sarcasm}}$$

where $\\lambda$ is a weighting hyperparameter.

---

## 4. Why This Design Works

| Component | Purpose |
|---|---|
| XLM-RoBERTa | Multilingual contextual embeddings |
| Sarcasm Head | Detects irony/sarcasm as auxiliary signal |
| Gate Projection | Conditions representation on sarcasm awareness |
| Residual + LayerNorm | Stable training, graceful fallback |
| Sentiment Head | Final 3-class classification |

The elegance is in the **information flow**: sarcasm detection is not a post-processing step — it actively reshapes the representation *before* sentiment is predicted. This means the sentiment head sees a sarcasm-adjusted view of the text.

---

## 5. Intuition by Example

For the sentence *"Wow, great phone… dies in two hours."*:

- The encoder produces a CLS embedding rich in contextual meaning
- The sarcasm head fires: $p_s \\approx 0.91$ (highly sarcastic)
- The gate modulates the representation — pushing "great" and "wow" dimensions down, amplifying "dies" and "two hours"
- The gated representation now reads as **negative**
- Sentiment logits → Negative wins

---

*This architecture is part of an ongoing research project on multi-task sentiment analysis with sarcasm disambiguation.*
`;

// Upload image
const imagePath = process.argv[2];
if (!imagePath) {
  console.error('Usage: node scripts/upload-blog.js <image-path>');
  process.exit(1);
}

const imageBuffer = fs.readFileSync(imagePath);
const ext = path.extname(imagePath).replace('.', '');
const fileName = `${Math.random()}.${ext}`;

console.log('Uploading image to Supabase Storage...');
const { data: uploadData, error: uploadError } = await supabase.storage
  .from('blog-media')
  .upload(fileName, imageBuffer, { contentType: `image/${ext}` });

if (uploadError) {
  console.error('Image upload error:', uploadError);
  process.exit(1);
}

const { data: { publicUrl } } = supabase.storage.from('blog-media').getPublicUrl(fileName);
console.log('Image uploaded:', publicUrl);

// Insert post
console.log('Inserting blog post into Supabase...');
const { data: post, error: postError } = await supabase
  .from('posts')
  .insert([{
    title: 'Sarcasm-Aware Sentiment Transformer: Code + Math Deep Dive',
    content: POST_CONTENT,
    media_url: publicUrl,
    media_type: 'image',
  }])
  .select()
  .single();

if (postError) {
  console.error('Post insert error:', postError);
  process.exit(1);
}

console.log('Blog post created successfully!');
console.log('Post ID:', post.id);
console.log('View at: http://localhost:5173/blogs/' + post.id);
