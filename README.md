# SIGNIFY — Phone-First AI Sign-Language Communication Assistant
> **iQOO Hackathon 2026 Submission Candidate**  
> Bidirectional translation bridging sign-language users and spoken voice using the **Kaggle ASL 250-Class ML Foundation**.

---

## 1. Executive Summary & Problem Statement
Over **70 million deaf and hard-of-hearing individuals** worldwide rely on sign language as their primary mode of communication, yet fewer than 1% of the hearing population understand sign. In high-stakes environments (emergency intake, hospital triage, roadside assistance, workplace meetings), certified interpreters are rarely immediately available, resulting in dangerous delays and severe isolation.

**Signify** treats the **smartphone as the primary interaction surface**:
- **Forward Flow (Sign → Speech)**: Smartphone camera captures hand gestures → MediaPipe landmarks → Kaggle ASL 250-Class TFLite model → 70% confidence gate & temporal stability filter → Context-Aware Sentence Builder → Spoken audio broadcast.
- **Reverse Flow (Speech → Text)**: Microphone array captures spoken voice → On-device/browser speech recognition → Oversized high-contrast visual display for the deaf user.

---

## 2. Technical Architecture & Kaggle ASL Foundation

```
[FORWARD DIRECTION: GESTURE → VOICE]
CAMERA FEED (iQOO Flagship Vision Ingest)
  ↓
MEDIAPIPE HAND LANDMARK TRACKING
  ↓ (21 keypoints per hand mapped into 543x3 normalized landmark tensor)
KAGGLE ASL 250 ML MODEL (TFLite Signature Runner)
  ↓
CONFIDENCE GATE (≥70.0% Threshold) & TEMPORAL STABILITY (2-frame persistence)
  ↓
CONTEXT-AWARE SENTENCE BUILDER (Grounded Rule & Context Grammar Engine)
  ↓
NATURAL TEXT PHRASE
  ↓
AUDIO SPEECH SYNTHESIS (Dual Speakers) + SILENT HAPTIC CONFIRMATION
```

```
[REVERSE DIRECTION: VOICE → TEXT]
MICROPHONE ARRAY
  ↓
SPEECH RECOGNITION ENGINE
  ↓
OVERSIZED HIGH-CONTRAST TEXT INTERFACE FOR DEAF USER
```

---

## 3. Kaggle ASL Model Specifications (Single Source of Truth)

All vocabulary and class mappings are centrally managed in `src/data/modelVocabulary.ts`:

| Specification | Verified Detail |
| :--- | :--- |
| **Dataset Foundation** | Google / Kaggle Isolated Sign Language Recognition (ISLR) |
| **Total Classes** | **250 Isolated Sign Classes** (`sign_to_prediction_index_map.json`) |
| **Model Format** | TensorFlow Lite (`model.tflite` Signature Runner) |
| **Input Shape** | `(Batch, Frames, 543, 3)` (468 face, 21 pose, 21 left hand, 21 right hand) |
| **Preprocessing** | MediaPipe `HandLandmarker` normalized landmark extraction; rolling 45-frame buffer (min 8 frames) |
| **Confidence Metric** | Scaled softmax probability over output logit distribution |
| **Acceptance Gate** | **70.0% Confidence Threshold** + **2-Frame Temporal Stability** |
| **Sentence Engine** | Deterministic Context-Aware Grammar Builder (Not an ungrounded LLM) |

---

## 4. Honest Technical Positioning (Real vs. Target)

Signify maintains strict technical transparency:

### What Works NOW (Current Prototype)
- **Kaggle ASL 250 Bridge**: Connects via REST API (`/predict_frame`, `/health`, `/signs`) to FastAPI backend running `model.tflite` with ZeroGPU / local acceleration.
- **Live Camera Vision**: Real mirror/environment camera feed with landmark bounding box and scanning laser animation.
- **Confidence Gating & Temporal Filter**: Prevents single-frame glitches and duplicate token spam (`SICK` `SICK` `SICK`).
- **Authentic Scenarios**: Live demo sequences (`SICK` + `OWIE` + `CALL ON PHONE`, `WATER` + `PLEASE` + `THANK YOU`, `POLICE` + `CALL ON PHONE`) strictly use supported Kaggle 250 vocabulary.
- **Two-Way Audio**: Real Web Speech API speech synthesis and microphone transcription.
- **Tactile Haptic Cues**: Silent vibration pulses (`navigator.vibrate`) confirming accepted gestures without breaking eye contact.

### Hardware Roadmap (iQOO 15 Target)
- **Snapdragon Hexagon NPU**: Target architecture maps the INT8-quantized TFLite model directly to Qualcomm Hexagon DSP using **Qualcomm AI Engine Direct (QNN SDK)** for sub-20ms, zero-bandwidth on-device inference.
- **Offline Resilience**: Eliminates all cloud dependencies for 100% private operation in elevators, remote highways, and airplanes.
- **vivo/iQOO Office Kit Bridge**: Bridges the iQOO phone with a laptop to stream sign translations directly into Zoom, Teams, and Google Meet video calls.

---

## 5. Local Setup & Execution

### Prerequisites
- Node.js (v18+)
- Python 3.10+ (for optional local ML bridge)

### 1. Run the Frontend
```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Build for Production
```bash
npm run build
```

### 3. Optional: Run the Kaggle ASL Python Bridge Locally
```bash
# In your Python environment with TensorFlow and MediaPipe installed:
python backend/app.py
# Exposes REST API on http://localhost:7860
```
Set in `.env`:
```env
VITE_ASL_SERVER_URL=http://localhost:7860
```

---

## 6. Recommended 2-Minute Hackathon Demo Flow
1. **0:00 - 0:30 (Problem & Vision)**: Introduce Signify as an on-device accessibility bridge for 70M+ deaf individuals.
2. **0:30 - 1:00 (Live Signing & Confidence Gate)**: Show camera detecting authentic Kaggle sign `SICK` (87.4%) → `OWIE` → `CALL ON PHONE`. Demonstrate that low-confidence gestures (<70%) are held rather than accepted.
3. **1:00 - 1:30 (Context Sentence & Speech)**: Show context-aware sentence builder producing *"I am sick and in pain. Please call someone on the phone."* and speaking it aloud.
4. **1:30 - 1:45 (Reverse Speech Mode)**: Speak into the phone microphone, showing instant high-contrast visual readout for the deaf user.
5. **1:45 - 2:00 (NPU & Office Kit Roadmap)**: Open the **Judge Mode (60s Audit)** modal. Explain the Qualcomm Hexagon NPU execution path and iQOO Office Kit laptop bridge.
