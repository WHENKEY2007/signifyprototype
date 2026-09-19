# SIGNIFY

> **Phone-First AI Sign-Language Communication Assistant**  
> Real-time bidirectional translation bridging sign-language users and spoken voice.

---

## 1. What is Signify?
Signify is an on-device, phone-first communication assistant engineered to bridge natural communication between sign-language users and people who communicate via spoken voice.

The product treats the **smartphone as the primary interaction surface**, utilizing the camera to recognize physical signs, gate predictions through confidence thresholds, compose dynamic context-aware sentences, and vocalize them aloud. In reverse, it captures spoken audio through the phone's microphone array and displays oversized, high-contrast text for the sign-language user.

---

## 2. Problem Statement
- **Communication Chasm**: Over 70 million deaf individuals worldwide use sign language as their primary language, yet fewer than 1% of the hearing population understand sign.
- **Urgent Situations**: In critical environments (emergency triage, hospital intake, roadside help), human interpreters are rarely immediately available, resulting in dangerous delays.
- **Accessibility Needs to Be Phone-First**: Dedicated translation hardware or desktop dashboards are impractical in real life. The user's phone must be the real-time translation bridge.

---

## 3. Solution & Pipeline Architecture

```
[FORWARD DIRECTION: GESTURE → VOICE]
CAMERA FEED (iQOO 15 FLAGSHIP HARDWARE)
  ↓
21-POINT SKELETON & KEYPOINT TRACKING
  ↓
GESTURE RECOGNITION
  ↓
CONFIDENCE GATE (Safety Threshold: 75%)
  ↓
CONTEXT & GRAMMAR BUILDER
  ↓
NATURAL TEXT PHRASE
  ↓
SPEECH SYNTHESIS (Dual Speakers)
```

```
[REVERSE DIRECTION: VOICE → TEXT]
MICROPHONE ARRAY
  ↓
ON-DEVICE SPEECH RECOGNITION
  ↓
OVERSIZED HIGH-CONTRAST VISUAL DISPLAY
```

---

## 4. Current Prototype Capabilities
- **3D Floating Flagship Device Presentation**: Centered flagship smartphone mockup with bespoke proportions, centered punch-hole camera, and sleek aerospace HUD backdrop on desktop, seamlessly transitioning into a full-screen native mobile application on handheld screens (<768px).
- **High-Contrast Dark Aesthetic**: Pure black (`#000000`), vibrant yellow accents (`#FFD000`), technical grid patterns, corner brackets, and condensed typography (`Space Grotesk` / `Bebas Neue`).
- **Deterministic Demo Scenarios**:
  - **Hospital**: `HELP` (96%) → `DOCTOR` (94%) → `PAIN` (91%) → `"I need a doctor. I'm in pain."`
  - **Emergency**: `HELP` (95%) → `AMBULANCE` (93%) → `DANGER` (89%) → `"Please call an ambulance. I need help."`
  - **Daily**: `HELLO` (97%) → `THANK YOU` (95%) → `YES` (98%) → `"Hello, thank you."`
- **Safety Confidence Gating & Uncertainty State**: Intentional handling of low confidence predictions (e.g. `WATER 58%`) with actionable guidance ("Move hand into frame", "Improve lighting", "Hold gesture steady").
- **Live Simulated Hand Tracking**: Realistic 21-point hand skeleton joints, scanning laser animation, bounding boxes, and camera HUD metrics.
- **Dynamic Sentence Assembly**: Real-time contextual phrase generation from collected tokens with clear / add-sign controls.
- **Audible Speech Synthesis**: Web Speech API integration producing real spoken output paired with responsive audio waveform animation.
- **Reverse Speech-to-Text**: Listening microphone visualizer and large-font readout for two-way accessibility.

---

## 5. Honest AI Representation & Current Limitations
- **Simulated Inference**: The current prototype uses **deterministic simulation** via `DemoRecognitionService` for reliable demonstrations. It does **NOT** run live on-device neural network inference yet.
- **No Backend / Database**: All states are managed locally on-device in the frontend prototype.

---

## 6. Planned Real ML Integration
The codebase features a clean service abstraction (`IRecognitionService` in `src/services/recognitionService.ts`). In subsequent development phases, `DemoRecognitionService` will be swapped with `RealRecognitionService`:
- On-device hand landmark detection using MediaPipe / TensorFlow Lite / ONNX Runtime Web.
- Sequence modeling (LSTM / Transformer / TCN) trained on sign-language datasets.
- Hardware NPU acceleration on mobile hardware for sub-20ms latency.

---

## 7. Getting Started Locally

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+)

### Installation
```bash
# Clone or open repository
cd signifyprototype

# Install dependencies
npm install
```

### Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
```
The compiled, optimized production bundle will be generated in `dist/`.

---

## 8. License & Status
SIGNIFY Prototype v0.1. All rights reserved.
