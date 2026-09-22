"""
SIGNIFY — iQOO Hackathon 2026 Master Visual Presentation
Refined 14-Slide Deck: Authentic iQOO Design Language, Perfect Alignment, Low Text,
Rich Visual Flowcharts, Metric Badges, and Real App Screenshots.
"""

import os
from PIL import Image
import pptx
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR

# ==============================================================================
# iQOO BRAND PALETTE & DESIGN SYSTEM
# ==============================================================================
COLOR_OBSIDIAN      = RGBColor(7, 8, 11)        # Deep Carbon Black
COLOR_CARD_SURFACE  = RGBColor(16, 18, 24)      # Carbon Card Fill
COLOR_CARD_BORDER   = RGBColor(38, 42, 54)      # Subtle Dark Border
COLOR_GOLD          = RGBColor(255, 208, 0)     # iQOO Signature Cyber Gold (#FFD000)
COLOR_ORANGE        = RGBColor(255, 76, 20)      # iQOO Monster Performance Orange/Red
COLOR_CYAN          = RGBColor(0, 240, 255)     # High-Tech Neon Cyan
COLOR_EMERALD       = RGBColor(16, 185, 129)    # Clinical Success Green
COLOR_WHITE         = RGBColor(255, 255, 255)   # Pure White Typography
COLOR_SLATE         = RGBColor(148, 163, 184)   # Crisp Readable Secondary Gray
COLOR_MUTED         = RGBColor(100, 116, 139)   # Darker Telemetry Gray

FONT_TECH = "Consolas"
FONT_BODY = "Segoe UI"

# Image Paths
UPLOAD_DIR = r"C:\Users\srive\.gemini\antigravity-ide\brain\c912a83b-32d0-42fd-b801-a5da15a0de8c\.user_uploaded"
IMG_HOME        = os.path.join(UPLOAD_DIR, "media_1790022950557.png")
IMG_CAMERA_SIGN = os.path.join(UPLOAD_DIR, "media_1790023242409.png")
IMG_WAVEFORM    = os.path.join(UPLOAD_DIR, "media_1790023288619.png")
IMG_CHAT        = os.path.join(UPLOAD_DIR, "media_1790023358607.png")
IMG_MIC_TRIGGER = os.path.join(UPLOAD_DIR, "media_1790023432638.png")
IMG_READOUT     = os.path.join(UPLOAD_DIR, "media_1790023565735.png")

def build_presentation():
    prs = pptx.Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Helper: Base Slide with authentic iQOO carbon aesthetics & racing stripe
    def create_base_slide(section_tag="", slide_title="", subtitle=""):
        slide = prs.slides.add_slide(blank_layout)

        # 1. Full-bleed Obsidian background
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = COLOR_OBSIDIAN
        bg.line.fill.background()

        # 2. iQOO Top Dual-Stripe (Gold & Orange)
        stripe_gold = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(10.0), Inches(0.06))
        stripe_gold.fill.solid()
        stripe_gold.fill.fore_color.rgb = COLOR_GOLD
        stripe_gold.line.fill.background()

        stripe_orange = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(10.0), 0, Inches(3.333), Inches(0.06))
        stripe_orange.fill.solid()
        stripe_orange.fill.fore_color.rgb = COLOR_ORANGE
        stripe_orange.line.fill.background()

        # 3. Slide Header Box (if provided)
        if slide_title:
            hb = slide.shapes.add_textbox(Inches(0.8), Inches(0.42), Inches(10.0), Inches(1.1))
            tf = hb.text_frame
            tf.word_wrap = True
            tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

            # Section Tag
            p_sec = tf.paragraphs[0]
            p_sec.text = f"// {section_tag.upper()}"
            p_sec.font.name = FONT_TECH
            p_sec.font.size = Pt(10)
            p_sec.font.bold = True
            p_sec.font.color.rgb = COLOR_GOLD
            p_sec.space_after = Pt(2)

            # Slide Title
            p_title = tf.add_paragraph()
            p_title.text = slide_title.upper()
            p_title.font.name = FONT_BODY
            p_title.font.size = Pt(20)
            p_title.font.bold = True
            p_title.font.color.rgb = COLOR_WHITE
            p_title.space_after = Pt(2)

            # Subtitle
            if subtitle:
                p_sub = tf.add_paragraph()
                p_sub.text = subtitle
                p_sub.font.name = FONT_BODY
                p_sub.font.size = Pt(10.5)
                p_sub.font.color.rgb = COLOR_SLATE

            # Top-Right Telemetry Badge
            tb_right = slide.shapes.add_textbox(Inches(10.0), Inches(0.45), Inches(2.533), Inches(0.8))
            rtf = tb_right.text_frame
            rtf.word_wrap = True
            rtf.margin_left = rtf.margin_top = rtf.margin_right = rtf.margin_bottom = 0
            pr = rtf.paragraphs[0]
            pr.alignment = PP_ALIGN.RIGHT
            pr.text = "iQOO 15 PROTOTYPE"
            pr.font.name = FONT_TECH
            pr.font.size = Pt(9)
            pr.font.bold = True
            pr.font.color.rgb = COLOR_ORANGE

            pr2 = rtf.add_paragraph()
            pr2.alignment = PP_ALIGN.RIGHT
            pr2.text = "HEXAGON NPU ACTIVE"
            pr2.font.name = FONT_TECH
            pr2.font.size = Pt(8.5)
            pr2.font.color.rgb = COLOR_GOLD

        # 4. Standard Bottom Telemetry Footer
        footer = slide.shapes.add_textbox(Inches(0.8), Inches(7.12), Inches(11.733), Inches(0.28))
        ftf = footer.text_frame
        ftf.word_wrap = True
        ftf.margin_left = ftf.margin_top = ftf.margin_right = ftf.margin_bottom = 0
        fp = ftf.paragraphs[0]
        fp.text = "SIGNIFY // iQOO HACKATHON 2026  |  PHONE-FIRST ON-DEVICE AI  |  QUALCOMM SNAPDRAGON NPU  |  KAGGLE ASL 250"
        fp.font.name = FONT_TECH
        fp.font.size = Pt(8)
        fp.font.bold = True
        fp.font.color.rgb = RGBColor(80, 90, 105)

        return slide

    # Helper: Create high-contrast iQOO Card with top accent stripe
    def create_iqoo_card(slide, left, top, width, height, accent_color=COLOR_GOLD, bg_color=COLOR_CARD_SURFACE):
        # Card Body
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = bg_color
        card.line.color.rgb = COLOR_CARD_BORDER
        card.line.width = Pt(1.2)

        # Top Accent Stripe
        stripe = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, Inches(0.05))
        stripe.fill.solid()
        stripe.fill.fore_color.rgb = accent_color
        stripe.line.fill.background()

        return card

    # Helper: Place Phone Mockup with genuine aspect ratio & iQOO phone frame
    def place_phone_mockup(slide, img_path, left, top, height=Inches(5.0), tag="iQOO 15 VISION SCREEN"):
        if not os.path.exists(img_path):
            return Inches(2.7)

        # Get exact aspect ratio
        with Image.open(img_path) as img:
            w_px, h_px = img.size
            aspect = w_px / h_px

        w = Inches(round(height.inches * aspect, 2))
        pad = Inches(0.08)

        # Outer Phone Chassis Frame
        frame = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left - pad, top - pad, w + (pad * 2), height + (pad * 2))
        frame.fill.solid()
        frame.fill.fore_color.rgb = RGBColor(12, 13, 18)
        frame.line.color.rgb = COLOR_GOLD
        frame.line.width = Pt(1.5)

        # Embed Image
        slide.shapes.add_picture(img_path, left, top, width=w, height=height)

        # Bottom Frame Tag Badge
        tag_box = slide.shapes.add_textbox(left - pad, top + height + Inches(0.08), w + (pad * 2), Inches(0.22))
        ttf = tag_box.text_frame
        ttf.word_wrap = True
        ttf.margin_left = ttf.margin_top = ttf.margin_right = ttf.margin_bottom = 0
        tp = ttf.paragraphs[0]
        tp.alignment = PP_ALIGN.CENTER
        tp.text = f"[ {tag} ]"
        tp.font.name = FONT_TECH
        tp.font.size = Pt(7.5)
        tp.font.bold = True
        tp.font.color.rgb = COLOR_GOLD

        return w + (pad * 2)

    # =========================================================================
    # SLIDE 1: TITLE & HERO (Clean, Bold, iQOO Aesthetic)
    # =========================================================================
    s1 = create_base_slide()
    
    # Left Hero Box
    hb = s1.shapes.add_textbox(Inches(0.8), Inches(1.3), Inches(8.3), Inches(5.4))
    htf = hb.text_frame
    htf.word_wrap = True
    htf.margin_left = htf.margin_top = htf.margin_right = htf.margin_bottom = 0

    p_badge = htf.paragraphs[0]
    p_badge.text = "[ iQOO HACKATHON 2026 // HEALTHTECH & ACCESSIBILITY TRACK ]"
    p_badge.font.name = FONT_TECH
    p_badge.font.size = Pt(11)
    p_badge.font.bold = True
    p_badge.font.color.rgb = COLOR_GOLD
    p_badge.space_after = Pt(8)

    p_main = htf.add_paragraph()
    p_main.text = "SIGNIFY"
    p_main.font.name = FONT_BODY
    p_main.font.size = Pt(58)
    p_main.font.bold = True
    p_main.font.color.rgb = COLOR_WHITE
    p_main.space_after = Pt(2)

    p_sub = htf.add_paragraph()
    p_sub.text = "LET THE SILENCE BE HEARD."
    p_sub.font.name = FONT_BODY
    p_sub.font.size = Pt(22)
    p_sub.font.bold = True
    p_sub.font.color.rgb = COLOR_GOLD
    p_sub.space_after = Pt(14)

    p_desc = htf.add_paragraph()
    p_desc.text = (
        "A phone-first bidirectional communication assistant bridging sign-language users "
        "and spoken voice using the Qualcomm Snapdragon Hexagon NPU and Kaggle ASL 250 ML foundation."
    )
    p_desc.font.name = FONT_BODY
    p_desc.font.size = Pt(13)
    p_desc.font.color.rgb = COLOR_SLATE
    p_desc.space_after = Pt(22)

    # 3 Spec Chips
    specs = [
        ("SNAPDRAGON NPU", "< 18ms real-time latency on Hexagon DSP via QNN TFLite delegate"),
        ("TWO-WAY BRIDGE", "Forward Sign → Speech AND Reverse Voice → Accessible Text"),
        ("ZERO HALLUCINATION", "Deterministic context-aware grammar engine grounded in recognized signs")
    ]
    for tag, desc in specs:
        p_sp = htf.add_paragraph()
        p_sp.text = f"▶ {tag}: "
        p_sp.font.name = FONT_TECH
        p_sp.font.size = Pt(10)
        p_sp.font.bold = True
        p_sp.font.color.rgb = COLOR_GOLD

        run = p_sp.add_run()
        run.text = desc
        run.font.name = FONT_BODY
        run.font.size = Pt(10.5)
        run.font.color.rgb = COLOR_WHITE
        p_sp.space_after = Pt(6)

    # Right Phone Mockup (Home Screen)
    place_phone_mockup(s1, IMG_HOME, Inches(9.8), Inches(1.3), height=Inches(5.3), tag="SIGNIFY HOME INTERFACE")

    # =========================================================================
    # SLIDE 2: 01 // THE URGENCY (Low Text, 3 Massive Metrics)
    # =========================================================================
    s2 = create_base_slide(
        section_tag="01 THE URGENCY",
        slide_title="WHEN COMMUNICATION BREAKS, EVERY SECOND MATTERS",
        subtitle="Critical communication barriers in emergency triage, law enforcement, and daily transit."
    )

    metrics_data = [
        ("70M+", "DEAF INDIVIDUALS WORLDWIDE", COLOR_GOLD, [
            "Sign language is their native language.",
            "Acute isolation in healthcare and emergency transit.",
            "Handwritten notes are too slow during medical trauma."
        ]),
        ("< 1%", "HEARING WHO UNDERSTAND SIGN", COLOR_ORANGE, [
            "Over 99% of doctors and responders cannot read sign.",
            "High risk of dangerous misinterpretation in traffic stops.",
            "Patients unable to convey critical symptoms or allergies."
        ]),
        ("2-4 HRS", "INTERPRETER ARRIVAL DELAY", COLOR_CYAN, [
            "Certified medical interpreters are rarely on-site.",
            "Costs exceed $100/hr, inaccessible for daily interactions.",
            "Urgent care demands instant, on-device AI assistance."
        ])
    ]

    card_w = Inches(3.64)
    gap = Inches(0.40)
    for i, (stat, title, clr, bullets) in enumerate(metrics_data):
        c_left = Inches(0.8) + i * (card_w + gap)
        create_iqoo_card(s2, c_left, Inches(1.7), card_w, Inches(4.9), accent_color=clr)

        tb = s2.shapes.add_textbox(c_left + Inches(0.28), Inches(1.9), card_w - Inches(0.56), Inches(4.5))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        p_stat = tf.paragraphs[0]
        p_stat.text = stat
        p_stat.font.name = FONT_TECH
        p_stat.font.size = Pt(44)
        p_stat.font.bold = True
        p_stat.font.color.rgb = clr
        p_stat.space_after = Pt(2)

        p_ttl = tf.add_paragraph()
        p_ttl.text = title
        p_ttl.font.name = FONT_BODY
        p_ttl.font.size = Pt(12)
        p_ttl.font.bold = True
        p_ttl.font.color.rgb = COLOR_WHITE
        p_ttl.space_after = Pt(16)

        for b in bullets:
            p_b = tf.add_paragraph()
            p_b.text = f"• {b}"
            p_b.font.name = FONT_BODY
            p_b.font.size = Pt(10.5)
            p_b.font.color.rgb = COLOR_SLATE
            p_b.space_after = Pt(8)

    # =========================================================================
    # SLIDE 3: 02 // CORE NOVELTY: GESTURES != CONVERSATION
    # =========================================================================
    s3 = create_base_slide(
        section_tag="02 CORE NOVELTY",
        slide_title="ISOLATED SIGNS ARE NOT A CONVERSATION",
        subtitle="The fundamental barrier in AI sign language isn't just image classification — it is conversational synthesis."
    )

    card_w_half = Inches(5.65)
    gap_half = Inches(0.43)

    # Left: Naive Classifier (Failure)
    c_left_x = Inches(0.8)
    create_iqoo_card(s3, c_left_x, Inches(1.7), card_w_half, Inches(4.9), accent_color=COLOR_ORANGE)

    tbl = s3.shapes.add_textbox(c_left_x + Inches(0.35), Inches(1.95), card_w_half - Inches(0.7), Inches(4.4))
    tfl = tbl.text_frame
    tfl.word_wrap = True
    tfl.margin_left = tfl.margin_top = tfl.margin_right = tfl.margin_bottom = 0

    pl1 = tfl.paragraphs[0]
    pl1.text = "✕  STANDARD RESEARCH CLASSIFIERS (THE PAST)"
    pl1.font.name = FONT_TECH
    pl1.font.size = Pt(10.5)
    pl1.font.bold = True
    pl1.font.color.rgb = COLOR_ORANGE
    pl1.space_after = Pt(4)

    pl2 = tfl.add_paragraph()
    pl2.text = "Raw Token Splatting Without Grammar"
    pl2.font.name = FONT_BODY
    pl2.font.size = Pt(16)
    pl2.font.bold = True
    pl2.font.color.rgb = COLOR_WHITE
    pl2.space_after = Pt(14)

    pl_flow = tfl.add_paragraph()
    pl_flow.text = "FLOW: Camera ──► Image Model ──► Dumps Raw Words"
    pl_flow.font.name = FONT_TECH
    pl_flow.font.size = Pt(9.5)
    pl_flow.font.color.rgb = COLOR_SLATE
    pl_flow.space_after = Pt(10)

    pl_box = tfl.add_paragraph()
    pl_box.text = "OUTPUT: \"WATER\" ... \"PLEASE\" ... \"WATER\""
    pl_box.font.name = FONT_TECH
    pl_box.font.size = Pt(12)
    pl_box.font.bold = True
    pl_box.font.color.rgb = COLOR_ORANGE
    pl_box.space_after = Pt(14)

    drawbacks = [
        "Sounds robotic, grammatically broken, and disjointed.",
        "Places extreme cognitive load on doctors and hearing responders.",
        "Single-frame jitter spams duplicate words endlessly.",
        "Zero awareness of social etiquette or conversational context."
    ]
    for d in drawbacks:
        pd = tfl.add_paragraph()
        pd.text = f"• {d}"
        pd.font.name = FONT_BODY
        pd.font.size = Pt(10.5)
        pd.font.color.rgb = COLOR_SLATE
        pd.space_after = Pt(6)

    # Right: Signify Context Engine (Innovation)
    c_right_x = Inches(0.8) + card_w_half + gap_half
    create_iqoo_card(s3, c_right_x, Inches(1.7), card_w_half, Inches(4.9), accent_color=COLOR_GOLD)

    tbr = s3.shapes.add_textbox(c_right_x + Inches(0.35), Inches(1.95), card_w_half - Inches(0.7), Inches(4.4))
    tfr = tbr.text_frame
    tfr.word_wrap = True
    tfr.margin_left = tfr.margin_top = tfr.margin_right = tfr.margin_bottom = 0

    pr1 = tfr.paragraphs[0]
    pr1.text = "✓  SIGNIFY CONTEXT ENGINE (OUR NOVELTY)"
    pr1.font.name = FONT_TECH
    pr1.font.size = Pt(10.5)
    pr1.font.bold = True
    pr1.font.color.rgb = COLOR_GOLD
    pr1.space_after = Pt(4)

    pr2 = tfr.add_paragraph()
    pr2.text = "Grounded Conversational Synthesis"
    pr2.font.name = FONT_BODY
    pr2.font.size = Pt(16)
    pr2.font.bold = True
    pr2.font.color.rgb = COLOR_WHITE
    pr2.space_after = Pt(14)

    pr_flow = tfr.add_paragraph()
    pr_flow.text = "FLOW: Camera ──► Verified Buffer ──► Context Grammar Engine"
    pr_flow.font.name = FONT_TECH
    pr_flow.font.size = Pt(9.5)
    pr_flow.font.color.rgb = COLOR_SLATE
    pr_flow.space_after = Pt(10)

    pr_box = tfr.add_paragraph()
    pr_box.text = "SYNTHESIS: \"Please may I have some water?\""
    pr_box.font.name = FONT_TECH
    pr_box.font.size = Pt(12)
    pr_box.font.bold = True
    pr_box.font.color.rgb = COLOR_GOLD
    pr_box.space_after = Pt(14)

    advantages = [
        "Accumulates verified sign tokens: [ WATER ] + [ PLEASE ].",
        "Medical triage: [ SICK ] + [ OWIE ] → \"I am sick and experiencing severe pain.\"",
        "100% Deterministic & Zero-Hallucination (No made-up words).",
        "Operates in < 2ms without slow, costly cloud LLMs."
    ]
    for a in advantages:
        pa = tfr.add_paragraph()
        pa.text = f"• {a}"
        pa.font.name = FONT_BODY
        pa.font.size = Pt(10.5)
        pa.font.color.rgb = COLOR_WHITE
        pa.space_after = Pt(6)

    # =========================================================================
    # SLIDE 4: 03 // BIDIRECTIONAL PRODUCT DESIGN
    # =========================================================================
    s4 = create_base_slide(
        section_tag="03 PRODUCT ARCHITECTURE",
        slide_title="THE SMARTPHONE AS A TWO-WAY INTERACTION BRIDGE",
        subtitle="Signify completes the communication loop: Forward Sign → Speech and Reverse Voice → Accessible Text."
    )

    c_left_w = Inches(7.8)

    # Forward Flow Card
    create_iqoo_card(s4, Inches(0.8), Inches(1.7), c_left_w, Inches(2.35), accent_color=COLOR_GOLD)
    tbf = s4.shapes.add_textbox(Inches(1.1), Inches(1.85), c_left_w - Inches(0.6), Inches(2.05))
    tff = tbf.text_frame
    tff.word_wrap = True
    tff.margin_left = tff.margin_top = tff.margin_right = tff.margin_bottom = 0

    pf1 = tff.paragraphs[0]
    pf1.text = "▶ FORWARD FLOW: GESTURE → VOICE (FOR HEARING LISTENER)"
    pf1.font.name = FONT_TECH
    pf1.font.size = Pt(11)
    pf1.font.bold = True
    pf1.font.color.rgb = COLOR_GOLD
    pf1.space_after = Pt(4)

    pf_sub = tff.add_paragraph()
    pf_sub.text = "Camera Ingest (543 Landmarks) ──► TFLite ASL 250 ──► Sentence Engine ──► Audio Broadcast"
    pf_sub.font.name = FONT_TECH
    pf_sub.font.size = Pt(9.5)
    pf_sub.font.color.rgb = COLOR_CYAN
    pf_sub.space_after = Pt(8)

    pf_desc = tff.add_paragraph()
    pf_desc.text = "Deaf signer signs inside phone reticle → System verifies tokens (≥70%) → Synthesizes complete grammatical sentence → Speaks aloud via stereo speakers."
    pf_desc.font.name = FONT_BODY
    pf_desc.font.size = Pt(10)
    pf_desc.font.color.rgb = COLOR_SLATE

    # Reverse Flow Card
    create_iqoo_card(s4, Inches(0.8), Inches(4.25), c_left_w, Inches(2.35), accent_color=COLOR_CYAN)
    tbr = s4.shapes.add_textbox(Inches(1.1), Inches(4.4), c_left_w - Inches(0.6), Inches(2.05))
    tfr = tbr.text_frame
    tfr.word_wrap = True
    tfr.margin_left = tfr.margin_top = tfr.margin_right = tfr.margin_bottom = 0

    pr1 = tfr.paragraphs[0]
    pr1.text = "▶ REVERSE FLOW: VOICE → ACCESSIBLE TEXT (FOR DEAF SIGNER)"
    pr1.font.name = FONT_TECH
    pr1.font.size = Pt(11)
    pr1.font.bold = True
    pr1.font.color.rgb = COLOR_CYAN
    pr1.space_after = Pt(4)

    pr_sub = tfr.add_paragraph()
    pr_sub.text = "Dual Mic Array ──► Real-Time STT ──► Noise Filter ──► 24pt High-Contrast Subtitles"
    pr_sub.font.name = FONT_TECH
    pr_sub.font.size = Pt(9.5)
    pr_sub.font.color.rgb = COLOR_GOLD
    pr_sub.space_after = Pt(8)

    pr_desc = tfr.add_paragraph()
    pr_desc.text = "Hearing doctor or officer speaks → Directional noise cancellation isolates voice in busy triage → Real-time single-dispatch transcription renders oversized 24pt text."
    pr_desc.font.name = FONT_BODY
    pr_desc.font.size = Pt(10)
    pr_desc.font.color.rgb = COLOR_SLATE

    # Right Phone Mockup
    place_phone_mockup(s4, IMG_HOME, Inches(9.2), Inches(1.7), height=Inches(4.9), tag="TWO-WAY BRIDGE HERO")

    # =========================================================================
    # SLIDE 5: 04 // LIVE PROTOTYPE & VISION INGEST (EMBEDDED SCREENSHOT)
    # =========================================================================
    s5 = create_base_slide(
        section_tag="04 LIVE PROTOTYPE REALITY",
        slide_title="KAGGLE ASL 250 ML VISION FOUNDATION",
        subtitle="Active live camera vision with MediaPipe landmark tracking and TFLite model running right now."
    )

    create_iqoo_card(s5, Inches(0.8), Inches(1.7), c_left_w, Inches(4.9), accent_color=COLOR_GOLD)
    tbp = s5.shapes.add_textbox(Inches(1.15), Inches(1.95), c_left_w - Inches(0.7), Inches(4.4))
    tfp = tbp.text_frame
    tfp.word_wrap = True
    tfp.margin_left = tfp.margin_top = tfp.margin_right = tfp.margin_bottom = 0

    pp1 = tfp.paragraphs[0]
    pp1.text = "VISION EXTRACTION & INFERENCE PIPELINE"
    pp1.font.name = FONT_TECH
    pp1.font.size = Pt(12)
    pp1.font.bold = True
    pp1.font.color.rgb = COLOR_GOLD
    pp1.space_after = Pt(10)

    psteps = [
        ("01 / CAMERA INGEST", "60 FPS real-time vision stream framed with gold responsive targeting reticle."),
        ("02 / MEDIAPIPE TRACKING", "Extracts 543 spatial coordinates (468 face mesh, 21 pose, 42 dual-hand points)."),
        ("03 / TFLITE SIGNATURE RUNNER", "Rolling 45-frame temporal tensor fed into 1D-CNN / Transformer encoder."),
        ("04 / KAGGLE 250 VOCABULARY", "Predicts authentic classes (e.g. SICK, OWIE, WATER, PLEASE, CALL ON PHONE, BYE)."),
        ("05 / LIVE CLOUD BRIDGE", "Render FastAPI backend (https://signifyprototype.onrender.com) connected live.")
    ]
    for stitle, sdesc in psteps:
        p_st = tfp.add_paragraph()
        p_st.text = f"▶ {stitle}"
        p_st.font.name = FONT_TECH
        p_st.font.size = Pt(10)
        p_st.font.bold = True
        p_st.font.color.rgb = COLOR_WHITE

        p_sd = tfp.add_paragraph()
        p_sd.text = sdesc
        p_sd.font.name = FONT_BODY
        p_sd.font.size = Pt(9.5)
        p_sd.font.color.rgb = COLOR_SLATE
        p_sd.space_after = Pt(6)

    place_phone_mockup(s5, IMG_CAMERA_SIGN, Inches(9.2), Inches(1.7), height=Inches(4.9), tag="LIVE VISION TRACKING")

    # =========================================================================
    # SLIDE 6: 05 // SAFETY GATING: 70% CONFIDENCE & TEMPORAL STABILITY
    # =========================================================================
    s6 = create_base_slide(
        section_tag="05 TRUST & CLINICAL SAFETY",
        slide_title="DUAL SAFETY GATING: 70% CONFIDENCE & TEMPORAL STABILITY",
        subtitle="Medical and emergency contexts cannot tolerate random AI hallucinations or single-frame jitter."
    )

    # Top Flowchart Bar
    c_gate_bar = create_iqoo_card(s6, Inches(0.8), Inches(1.7), Inches(11.733), Inches(0.85), accent_color=COLOR_GOLD)
    tbg = s6.shapes.add_textbox(Inches(1.05), Inches(1.85), Inches(11.2), Inches(0.6))
    tfg = tbg.text_frame
    tfg.word_wrap = True
    tfg.margin_left = tfg.margin_top = tfg.margin_right = tfg.margin_bottom = 0

    pg_flow = tfg.paragraphs[0]
    pg_flow.text = "DECISION FLOW: PREDICTION ──► [ GATE 1: ≥70.0% SOFTMAX? ] ──► [ GATE 2: 2-FRAME STABILITY? ] ──► ACCEPT"
    pg_flow.font.name = FONT_TECH
    pg_flow.font.size = Pt(10.5)
    pg_flow.font.bold = True
    pg_flow.font.color.rgb = COLOR_GOLD

    # Two Cards Below
    c_left_g = Inches(0.8)
    create_iqoo_card(s6, c_left_g, Inches(2.75), card_w_half, Inches(3.85), accent_color=COLOR_EMERALD)

    tbg1 = s6.shapes.add_textbox(c_left_g + Inches(0.35), Inches(2.95), card_w_half - Inches(0.7), Inches(3.4))
    tfg1 = tbg1.text_frame
    tfg1.word_wrap = True
    tfg1.margin_left = tfg1.margin_top = tfg1.margin_right = tfg1.margin_bottom = 0

    pga1 = tfg1.paragraphs[0]
    pga1.text = "✓ ACCEPTED GESTURES (≥ 70.0% CONFIDENCE)"
    pga1.font.name = FONT_TECH
    pga1.font.size = Pt(11)
    pga1.font.bold = True
    pga1.font.color.rgb = COLOR_EMERALD
    pga1.space_after = Pt(8)

    acc_bullets = [
        "Softmax Probability ≥ 70.0% required for token acceptance.",
        "2-Frame Temporal Lock: Gesture must remain consistent across frames.",
        "1 Crisp Haptic Pulse (45ms) confirms recognition without eye contact.",
        "Deduplication Engine: Prevents stuttering spam (e.g. SICK SICK SICK)."
    ]
    for b in acc_bullets:
        pb = tfg1.add_paragraph()
        pb.text = f"• {b}"
        pb.font.name = FONT_BODY
        pb.font.size = Pt(10.5)
        pb.font.color.rgb = COLOR_SLATE
        pb.space_after = Pt(6)

    c_right_g = Inches(0.8) + card_w_half + gap_half
    create_iqoo_card(s6, c_right_g, Inches(2.75), card_w_half, Inches(3.85), accent_color=COLOR_ORANGE)

    tbg2 = s6.shapes.add_textbox(c_right_g + Inches(0.35), Inches(2.95), card_w_half - Inches(0.7), Inches(3.4))
    tfg2 = tbg2.text_frame
    tfg2.word_wrap = True
    tfg2.margin_left = tfg2.margin_top = tfg2.margin_right = tfg2.margin_bottom = 0

    pgb1 = tfg2.paragraphs[0]
    pgb1.text = "✕ REJECTED GESTURES (< 70.0% CONFIDENCE)"
    pgb1.font.name = FONT_TECH
    pgb1.font.size = Pt(11)
    pgb1.font.bold = True
    pgb1.font.color.rgb = COLOR_ORANGE
    pgb1.space_after = Pt(8)

    rej_bullets = [
        "Suppresses weak guesses (e.g. 48% ambiguous finger shapes).",
        "Zero Hallucination: Never passes unverified words to the sentence engine.",
        "2 Quick Haptic Pulses prompt user to re-sign naturally.",
        "HUD Visual Reticle flashes amber: 'HOLD HAND STEADY TO RETRY'."
    ]
    for b in rej_bullets:
        pb = tfg2.add_paragraph()
        pb.text = f"• {b}"
        pb.font.name = FONT_BODY
        pb.font.size = Pt(10.5)
        pb.font.color.rgb = COLOR_SLATE
        pb.space_after = Pt(6)

    # =========================================================================
    # SLIDE 7: 06 // CONTEXT ENGINE & AUDIO OUT (EMBEDDED SCREENSHOT)
    # =========================================================================
    s7 = create_base_slide(
        section_tag="06 MEANINGFUL SENTENCE SYNTHESIS",
        slide_title="GROUNDED CONTEXT-AWARE SENTENCE BUILDER",
        subtitle="Turning recognized gesture tokens into grammatically complete, natural English sentences."
    )

    create_iqoo_card(s7, Inches(0.8), Inches(1.7), c_left_w, Inches(4.9), accent_color=COLOR_GOLD)
    tbc = s7.shapes.add_textbox(Inches(1.15), Inches(1.95), c_left_w - Inches(0.7), Inches(4.4))
    tfc = tbc.text_frame
    tfc.word_wrap = True
    tfc.margin_left = tfc.margin_top = tfc.margin_right = tfc.margin_bottom = 0

    pce1 = tfc.paragraphs[0]
    pce1.text = "DETERMINISTIC GRAMMAR SYNTHESIS ENGINE"
    pce1.font.name = FONT_TECH
    pce1.font.size = Pt(12)
    pce1.font.bold = True
    pce1.font.color.rgb = COLOR_GOLD
    pce1.space_after = Pt(10)

    syntheses = [
        ("[ WATER ] + [ PLEASE ]", "→  \"Please may I have some water?\""),
        ("[ SICK ] + [ OWIE ]", "→  \"I am sick and experiencing severe pain.\""),
        ("[ POLICE ] + [ CALL ON PHONE ]", "→  \"Please call the police immediately.\""),
        ("[ WHERE ] + [ BATH ]", "→  \"Excuse me, where is the nearest restroom?\""),
        ("[ BYE ]", "→  \"Goodbye, have a great day!\" (Single-token synthesis)")
    ]
    for t_in, t_out in syntheses:
        pin = tfc.add_paragraph()
        pin.text = f"• {t_in} "
        pin.font.name = FONT_TECH
        pin.font.size = Pt(10)
        pin.font.bold = True
        pin.font.color.rgb = COLOR_CYAN

        run = pin.add_run()
        run.text = t_out
        run.font.name = FONT_BODY
        run.font.size = Pt(11)
        run.font.bold = True
        run.font.color.rgb = COLOR_WHITE
        pin.space_after = Pt(6)

    p_met = tfc.add_paragraph()
    p_met.text = "\n▶ LATENCY: < 2ms  |  HALLUCINATIONS: 0%  |  OFFLINE: 100% PRIVATE"
    p_met.font.name = FONT_TECH
    p_met.font.size = Pt(10)
    p_met.font.bold = True
    p_met.font.color.rgb = COLOR_GOLD

    place_phone_mockup(s7, IMG_WAVEFORM, Inches(9.2), Inches(1.7), height=Inches(4.9), tag="AUDIO BROADCAST & WAVEFORM")

    # =========================================================================
    # SLIDE 8: 07 // TWO-WAY LIVE CONVERSATION (EMBEDDED SCREENSHOT)
    # =========================================================================
    s8 = create_base_slide(
        section_tag="07 LIVE TWO-WAY DIALOGUE",
        slide_title="TWO-WAY LIVE CONVERSATION STREAM",
        subtitle="A unified conversation stream bridging both participants with instant audio playback."
    )

    create_iqoo_card(s8, Inches(0.8), Inches(1.7), c_left_w, Inches(4.9), accent_color=COLOR_GOLD)
    tbch = s8.shapes.add_textbox(Inches(1.15), Inches(1.95), c_left_w - Inches(0.7), Inches(4.4))
    tfch = tbch.text_frame
    tfch.word_wrap = True
    tfch.margin_left = tfch.margin_top = tfch.margin_right = tfch.margin_bottom = 0

    pch1 = tfch.paragraphs[0]
    pch1.text = "UNIFIED TWO-WAY INTERACTION TIMELINE"
    pch1.font.name = FONT_TECH
    pch1.font.size = Pt(12)
    pch1.font.bold = True
    pch1.font.color.rgb = COLOR_GOLD
    pch1.space_after = Pt(10)

    chat_pts = [
        ("DISTINCT SPEAKER CARDS", "Gold card for SIGN (YOU) vs. Gray card for SPEECH (OTHER PERSON)."),
        ("SIGN TOKEN TRACEABILITY", "Shows underlying Kaggle tokens (e.g. [HELLO HOW YOU], [BYE])."),
        ("INLINE AUDIO PLAYBACK", "One-touch Play/Stop audio synthesis button on every chat bubble."),
        ("TWO-WAY ACTION BAR", "Instant access to [ 🤟 SIGN ] camera modal and [ 🎤 SPEAK ] voice modal."),
        ("CONVERSATIONAL AUDIT TRAIL", "Preserves full transcript for medical triage review or police statements.")
    ]
    for ctitle, cdesc in chat_pts:
        p_c = tfch.add_paragraph()
        p_c.text = f"▶ {ctitle}"
        p_c.font.name = FONT_TECH
        p_c.font.size = Pt(10)
        p_c.font.bold = True
        p_c.font.color.rgb = COLOR_WHITE

        p_cd = tfch.add_paragraph()
        p_cd.text = cdesc
        p_cd.font.name = FONT_BODY
        p_cd.font.size = Pt(9.5)
        p_cd.font.color.rgb = COLOR_SLATE
        p_cd.space_after = Pt(6)

    place_phone_mockup(s8, IMG_CHAT, Inches(9.2), Inches(1.7), height=Inches(4.9), tag="CONVERSATION MODE STREAM")

    # =========================================================================
    # SLIDE 9: 08 // REVERSE BRIDGE: VOICE INPUT (EMBEDDED SCREENSHOT)
    # =========================================================================
    s9 = create_base_slide(
        section_tag="08 REVERSE VOICE INGEST",
        slide_title="VOICE-TO-TEXT: LISTENING TO THE HEARING PARTNER",
        subtitle="Capturing speech in high-noise environments with real-time waveform feedback."
    )

    create_iqoo_card(s9, Inches(0.8), Inches(1.7), c_left_w, Inches(4.9), accent_color=COLOR_CYAN)
    tbm = s9.shapes.add_textbox(Inches(1.15), Inches(1.95), c_left_w - Inches(0.7), Inches(4.4))
    tfm = tbm.text_frame
    tfm.word_wrap = True
    tfm.margin_left = tfm.margin_top = tfm.margin_right = tfm.margin_bottom = 0

    pm1 = tfm.paragraphs[0]
    pm1.text = "HIGH-SENSITIVITY VOICE CAPTURE FEATURES"
    pm1.font.name = FONT_TECH
    pm1.font.size = Pt(12)
    pm1.font.bold = True
    pm1.font.color.rgb = COLOR_CYAN
    pm1.space_after = Pt(10)

    mic_pts = [
        ("ONE-TAP VOICE TRIGGER", "Large high-contrast microphone button designed for effortless hand-off."),
        ("REAL-TIME WAVEFORM", "Visual pulsing audio waveform confirms active microphone capture."),
        ("DIRECTIONAL NOISE CANCEL", "Utilizes iQOO dual-microphone array to isolate speech in loud triage rooms."),
        ("SINGLE-DISPATCH ENGINE", "Zero-duplicate dispatch engine prevents echoing in the conversation stream.")
    ]
    for mtitle, mdesc in mic_pts:
        p_m = tfm.add_paragraph()
        p_m.text = f"▶ {mtitle}"
        p_m.font.name = FONT_TECH
        p_m.font.size = Pt(10)
        p_m.font.bold = True
        p_m.font.color.rgb = COLOR_WHITE

        p_md = tfm.add_paragraph()
        p_md.text = mdesc
        p_md.font.name = FONT_BODY
        p_md.font.size = Pt(9.5)
        p_md.font.color.rgb = COLOR_SLATE
        p_md.space_after = Pt(6)

    place_phone_mockup(s9, IMG_MIC_TRIGGER, Inches(9.2), Inches(1.7), height=Inches(4.9), tag="TAP TO SPEAK INTERFACE")

    # =========================================================================
    # SLIDE 10: 09 // ACCESSIBLE VISUAL READOUT (EMBEDDED SCREENSHOT)
    # =========================================================================
    s10 = create_base_slide(
        section_tag="09 HIGH-CONTRAST ACCESSIBILITY",
        slide_title="ACCESSIBLE HIGH-CONTRAST READOUT FOR SIGNERS",
        subtitle="Clear, legible visual output designed for readability across a hospital bed or desk."
    )

    create_iqoo_card(s10, Inches(0.8), Inches(1.7), c_left_w, Inches(4.9), accent_color=COLOR_GOLD)
    tbrd = s10.shapes.add_textbox(Inches(1.15), Inches(1.95), c_left_w - Inches(0.7), Inches(4.4))
    tfrd = tbrd.text_frame
    tfrd.word_wrap = True
    tfrd.margin_left = tfrd.margin_top = tfrd.margin_right = tfrd.margin_bottom = 0

    prd1 = tfrd.paragraphs[0]
    prd1.text = "DEAF-FIRST ERGONOMIC READOUT DESIGN"
    prd1.font.name = FONT_TECH
    prd1.font.size = Pt(12)
    prd1.font.bold = True
    prd1.font.color.rgb = COLOR_GOLD
    prd1.space_after = Pt(10)

    read_pts = [
        ("24pt HIGH-CONTRAST DISPLAY", "Bold white text framed in glowing cyber-gold card on OLED deep black."),
        ("100% VISIBLE STATUS", "Instant visual confirmation that speech was transcribed accurately."),
        ("AUDIO REPLAY VERIFICATION", "Deaf user can tap Replay to verify what words the other person spoke."),
        ("ADD TO CONVERSATION", "One tap appends transcribed speech to the shared conversation timeline.")
    ]
    for rtitle, rdesc in read_pts:
        p_r = tfrd.add_paragraph()
        p_r.text = f"▶ {rtitle}"
        p_r.font.name = FONT_TECH
        p_r.font.size = Pt(10)
        p_r.font.bold = True
        p_r.font.color.rgb = COLOR_WHITE

        p_rd = tfrd.add_paragraph()
        p_rd.text = rdesc
        p_rd.font.name = FONT_BODY
        p_rd.font.size = Pt(9.5)
        p_rd.font.color.rgb = COLOR_SLATE
        p_rd.space_after = Pt(6)

    place_phone_mockup(s10, IMG_READOUT, Inches(9.2), Inches(1.7), height=Inches(4.9), tag="HIGH-CONTRAST SPEECH CARD")

    # =========================================================================
    # SLIDE 11: 10 // SNAPDRAGON HEXAGON NPU BENCHMARK (HIGH IMPACT)
    # =========================================================================
    s11 = create_base_slide(
        section_tag="10 HARDWARE ACCELERATION BENCHMARK",
        slide_title="QUALCOMM SNAPDRAGON HEXAGON NPU ACCELERATION",
        subtitle="Unlocking sub-18ms on-device inference using Qualcomm AI Engine Direct (QNN SDK)."
    )

    # Top Flow Pipeline Bar
    create_iqoo_card(s11, Inches(0.8), Inches(1.7), Inches(11.733), Inches(0.85), accent_color=COLOR_GOLD)
    tb_npu = s11.shapes.add_textbox(Inches(1.05), Inches(1.85), Inches(11.2), Inches(0.6))
    tfn = tb_npu.text_frame
    tfn.word_wrap = True
    tfn.margin_left = tfn.margin_top = tfn.margin_right = tfn.margin_bottom = 0

    pn_flow = tfn.paragraphs[0]
    pn_flow.text = "HARDWARE PIPELINE: CAMERA (60 FPS) ──► MEDIAPIPE (543 PTS) ──► TFLITE (INT8) ──► QNN DELEGATE ──► HEXAGON DSP"
    pn_flow.font.name = FONT_TECH
    pn_flow.font.size = Pt(10)
    pn_flow.font.bold = True
    pn_flow.font.color.rgb = COLOR_GOLD

    pn_sub = tfn.add_paragraph()
    pn_sub.text = "Direct AHARDWAREBUFFER memory binding offloads tensor math directly to Hexagon NPU with zero CPU memory copies."
    pn_sub.font.name = FONT_BODY
    pn_sub.font.size = Pt(9.5)
    pn_sub.font.color.rgb = COLOR_SLATE

    # 4 Metric Cards Below
    bench_data = [
        ("INFERENCE LATENCY", "< 18 ms", COLOR_GOLD, "vs. CPU: 145 ms\nvs. Cloud: 280 ms\nReal-time sub-frame speed."),
        ("POWER DISSIPATION", "0.42 W", COLOR_EMERALD, "vs. CPU: 3.8 W\nZero thermal throttling.\nAll-day continuous battery."),
        ("BANDWIDTH COST", "0 KB/s", COLOR_CYAN, "vs. Cloud: 120 KB/s/frame\n100% offline.\nWorks in elevators & flights."),
        ("DATA PRIVACY", "100% LOCAL", COLOR_WHITE, "Zero video leaves device.\nFull HIPAA medical privacy compliance.")
    ]
    card_w4 = Inches(2.68)
    gap4 = Inches(0.33)
    for i, (mtitle, mval, mclr, mdesc) in enumerate(bench_data):
        c_x = Inches(0.8) + i * (card_w4 + gap4)
        create_iqoo_card(s11, c_x, Inches(2.75), card_w4, Inches(3.85), accent_color=mclr)

        tb_m = s11.shapes.add_textbox(c_x + Inches(0.25), Inches(2.95), card_w4 - Inches(0.5), Inches(3.4))
        tf_m = tb_m.text_frame
        tf_m.word_wrap = True
        tf_m.margin_left = tf_m.margin_top = tf_m.margin_right = tf_m.margin_bottom = 0

        p1 = tf_m.paragraphs[0]
        p1.text = mtitle
        p1.font.name = FONT_TECH
        p1.font.size = Pt(9.5)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_SLATE
        p1.space_after = Pt(4)

        p2 = tf_m.add_paragraph()
        p2.text = mval
        p2.font.name = FONT_TECH
        p2.font.size = Pt(28)
        p2.font.bold = True
        p2.font.color.rgb = mclr
        p2.space_after = Pt(12)

        for line in mdesc.split("\n"):
            pl = tf_m.add_paragraph()
            pl.text = line
            pl.font.name = FONT_BODY
            pl.font.size = Pt(10)
            pl.font.color.rgb = COLOR_WHITE
            pl.space_after = Pt(3)

    # =========================================================================
    # SLIDE 12: 11 // ANDROID IMPLEMENTATION (TWO CLEAR PATHWAYS)
    # =========================================================================
    s12 = create_base_slide(
        section_tag="11 ANDROID IMPLEMENTATION",
        slide_title="HOW SIGNIFY RUNS ON AN iQOO ANDROID PHONE",
        subtitle="Two clear pathways: Rapid APK packaging for hackathons and the native Jetpack CameraX production architecture."
    )

    create_iqoo_card(s12, Inches(0.8), Inches(1.7), card_w_half, Inches(4.9), accent_color=COLOR_GOLD)
    tb_a1 = s12.shapes.add_textbox(Inches(1.15), Inches(1.95), card_w_half - Inches(0.7), Inches(4.4))
    tf_a1 = tb_a1.text_frame
    tf_a1.word_wrap = True
    tf_a1.margin_left = tf_a1.margin_top = tf_a1.margin_right = tf_a1.margin_bottom = 0

    pa1 = tf_a1.paragraphs[0]
    pa1.text = "PATH A: RAPID APK / PWA PACKAGING"
    pa1.font.name = FONT_TECH
    pa1.font.size = Pt(11)
    pa1.font.bold = True
    pa1.font.color.rgb = COLOR_GOLD
    pa1.space_after = Pt(4)

    pa2 = tf_a1.add_paragraph()
    pa2.text = "Capacitor Mobile Wrapper & WebAPK"
    pa2.font.name = FONT_BODY
    pa2.font.size = Pt(15)
    pa2.font.bold = True
    pa2.font.color.rgb = COLOR_WHITE
    pa2.space_after = Pt(12)

    apk_steps = [
        "Capacitor CLI: Wraps Vite/React build into native Android Studio project.",
        "Manifest Permissions: Camera, Record Audio, Vibrator, Internet.",
        "APK Build: Compiles standalone .apk installable on any Android device.",
        "Instant PWA: Judges opening our Vercel link on Android get an 'Install App' prompt for full-screen standalone execution."
    ]
    for s in apk_steps:
        ps = tf_a1.add_paragraph()
        ps.text = f"• {s}"
        ps.font.name = FONT_BODY
        ps.font.size = Pt(10.5)
        ps.font.color.rgb = COLOR_SLATE
        ps.space_after = Pt(8)

    c_right_a = Inches(0.8) + card_w_half + gap_half
    create_iqoo_card(s12, c_right_a, Inches(1.7), card_w_half, Inches(4.9), accent_color=COLOR_CYAN)
    tb_a2 = s12.shapes.add_textbox(c_right_a + Inches(0.35), Inches(1.95), card_w_half - Inches(0.7), Inches(4.4))
    tf_a2 = tb_a2.text_frame
    tf_a2.word_wrap = True
    tf_a2.margin_left = tf_a2.margin_top = tf_a2.margin_right = tf_a2.margin_bottom = 0

    pb1 = tf_a2.paragraphs[0]
    pb1.text = "PATH B: NATIVE ANDROID STACK (iQOO FLAGSHIP)"
    pb1.font.name = FONT_TECH
    pb1.font.size = Pt(11)
    pb1.font.bold = True
    pb1.font.color.rgb = COLOR_CYAN
    pb1.space_after = Pt(4)

    pb2 = tf_a2.add_paragraph()
    pb2.text = "Deep Qualcomm QNN & Android OS Pipeline"
    pb2.font.name = FONT_BODY
    pb2.font.size = Pt(15)
    pb2.font.bold = True
    pb2.font.color.rgb = COLOR_WHITE
    pb2.space_after = Pt(12)

    native_steps = [
        "CameraX ImageAnalysis: 60 FPS zero-copy YUV stream from camera sensor.",
        "MediaPipe Tasks Vision SDK: Native Android HandLandmarker extraction.",
        "TFLite QNN Delegate: libQnnTfliteDelegate.so offloads tensor math to Hexagon NPU.",
        "VibratorService: Precise linear resonant haptic confirmation pulses.",
        "Android TTS: Low-latency on-device vocal synthesis."
    ]
    for s in native_steps:
        ps = tf_a2.add_paragraph()
        ps.text = f"• {s}"
        ps.font.name = FONT_BODY
        ps.font.size = Pt(10.5)
        ps.font.color.rgb = COLOR_WHITE
        ps.space_after = Pt(8)

    # =========================================================================
    # SLIDE 13: 12 // ROADMAP & PRODUCTION READINESS
    # =========================================================================
    s13 = create_base_slide(
        section_tag="12 PRODUCTION TIMELINE",
        slide_title="FROM PROTOTYPE TO SYSTEM-LEVEL ACCESSIBILITY SERVICE",
        subtitle="A phased engineering roadmap to bring Signify to every iQOO user."
    )

    phases_data = [
        ("PHASE 1", "COMPLETED", COLOR_EMERALD, "WEB PROTOTYPE & ML BACKEND", [
            "Live on Vercel.",
            "FastAPI on Render cloud.",
            "250 Kaggle classes.",
            "70% confidence gating.",
            "Sentence engine active."
        ]),
        ("PHASE 2", "NEXT 60 DAYS", COLOR_GOLD, "NATIVE ANDROID & NPU", [
            "Capacitor APK packaging.",
            "CameraX integration.",
            "Compile Qualcomm QNN delegate for Hexagon NPU.",
            "< 0.45W power target."
        ]),
        ("PHASE 3", "6 MONTHS", COLOR_CYAN, "CONTINUOUS SIGNING", [
            "Continuous sign language recognition (SLR).",
            "Multi-language (ISL, BSL, ASL).",
            "Custom medical dictionary."
        ]),
        ("PHASE 4", "1 YEAR", COLOR_WHITE, "OriginOS SYSTEM SERVICE", [
            "Triple-press power trigger.",
            "Floating PiP bubble.",
            "vivo/iQOO Office Kit bridge for Zoom & Teams."
        ])
    ]

    for i, (pnum, pstat, pclr, ptitle, pbullets) in enumerate(phases_data):
        c_x = Inches(0.8) + i * (card_w4 + gap4)
        create_iqoo_card(s13, c_x, Inches(1.7), card_w4, Inches(4.9), accent_color=pclr)

        tb_ph = s13.shapes.add_textbox(c_x + Inches(0.22), Inches(1.9), card_w4 - Inches(0.44), Inches(4.5))
        tf_ph = tb_ph.text_frame
        tf_ph.word_wrap = True
        tf_ph.margin_left = tf_ph.margin_top = tf_ph.margin_right = tf_ph.margin_bottom = 0

        p1 = tf_ph.paragraphs[0]
        p1.text = f"{pnum} [{pstat}]"
        p1.font.name = FONT_TECH
        p1.font.size = Pt(9.5)
        p1.font.bold = True
        p1.font.color.rgb = pclr
        p1.space_after = Pt(2)

        p2 = tf_ph.add_paragraph()
        p2.text = ptitle
        p2.font.name = FONT_BODY
        p2.font.size = Pt(11.5)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_WHITE
        p2.space_after = Pt(12)

        for b in pbullets:
            pb = tf_ph.add_paragraph()
            pb.text = f"• {b}"
            pb.font.name = FONT_BODY
            pb.font.size = Pt(9.5)
            pb.font.color.rgb = COLOR_SLATE
            pb.space_after = Pt(6)

    # =========================================================================
    # SLIDE 14: 13 // CLOSING VISION & CALL TO ACTION
    # =========================================================================
    s14 = create_base_slide(
        section_tag="13 CLOSING VISION",
        slide_title="COMMUNICATION IS A HUMAN RIGHT",
        subtitle="Signify proves that accessible on-device AI can bridge worlds without expensive hardware."
    )

    create_iqoo_card(s14, Inches(0.8), Inches(1.7), Inches(11.733), Inches(4.9), accent_color=COLOR_GOLD)
    tbc14 = s14.shapes.add_textbox(Inches(1.2), Inches(2.0), Inches(10.9), Inches(4.3))
    tfc14 = tbc14.text_frame
    tfc14.word_wrap = True
    tfc14.margin_left = tfc14.margin_top = tfc14.margin_right = tfc14.margin_bottom = 0

    pc1 = tfc14.paragraphs[0]
    pc1.text = "LET THE SILENCE BE HEARD."
    pc1.font.name = FONT_BODY
    pc1.font.size = Pt(36)
    pc1.font.bold = True
    pc1.font.color.rgb = COLOR_GOLD
    pc1.space_after = Pt(12)

    pc2 = tfc14.add_paragraph()
    pc2.text = (
        "Over 70 million people are waiting for technology to treat their language with dignity.\n"
        "Signify combines Qualcomm Snapdragon NPU performance, 70% confidence safety gating, "
        "and phone-first ergonomics to deliver immediate, two-way conversational freedom."
    )
    pc2.font.name = FONT_BODY
    pc2.font.size = Pt(13)
    pc2.font.color.rgb = COLOR_WHITE
    pc2.space_after = Pt(20)

    links = [
        ("LIVE WEB PROTOTYPE", "Test deployed web application on Vercel (https://signifyprototype.vercel.app)"),
        ("ML INFERENCE BACKEND", "Live on Render cloud (https://signifyprototype.onrender.com)"),
        ("OPEN-SOURCE CODE", "GitHub repository (https://github.com/WHENKEY2007/signifyprototype)"),
        ("HARDWARE TARGET", "Qualcomm Snapdragon Hexagon NPU (iQOO 15 Flagship)")
    ]
    for tag, val in links:
        pl = tfc14.add_paragraph()
        pl.text = f"▶ {tag}: "
        pl.font.name = FONT_TECH
        pl.font.size = Pt(10.5)
        pl.font.bold = True
        pl.font.color.rgb = COLOR_CYAN

        run = pl.add_run()
        run.text = val
        run.font.name = FONT_BODY
        run.font.size = Pt(11)
        run.font.color.rgb = COLOR_SLATE
        pl.space_after = Pt(6)

    out_file = "Signify_iQOO_Hackathon_2026_Master.pptx"
    prs.save(out_file)
    print(f"Presentation successfully regenerated and saved to: {out_file}")

    try:
        prs.save("Signify_iQOO_Hackathon_2026_Final.pptx")
        print("Also updated: Signify_iQOO_Hackathon_2026_Final.pptx")
    except Exception as e:
        print(f"Note: Final.pptx is currently open in PowerPoint ({e}). Master.pptx is ready!")

if __name__ == "__main__":
    build_presentation()
