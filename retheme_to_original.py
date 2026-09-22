"""
SIGNIFY — iQOO Hackathon 2026 Presentation
Authentic 'Original Backup' Theme Re-styling:
- Dark Obsidian background (#050505)
- Full-bleed 0.45" Cyber Connector Grid (#1E1E1E)
- Section Tag: Consolas 8.5pt #FFD000
- Slide Title: Arial Narrow 34pt #F5F5F0
- Accent Underline Bar: 0.72" x 0.06" #FFD000
- Subtitle: Arial 12.5pt #9B9B96
- Cards: #121212 fill, #464644 border (1pt), #FFD000 corner accent (0.10" x 0.10")
- Typography: Arial Narrow headings, Consolas monospace tags, Arial body/bullet text
- All text preserved 100% identically from Signify_iQOO_Hackathon_2026_Final.pptx
"""

import os
from PIL import Image
import pptx
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE, MSO_CONNECTOR
from pptx.enum.text import PP_ALIGN

# ==============================================================================
# ORIGINAL BACKUP THEME COLOR PALETTE
# ==============================================================================
COLOR_BG          = RGBColor(5, 5, 5)       # #050505 Pure Dark Obsidian
COLOR_GRID        = RGBColor(30, 30, 30)    # #1E1E1E Connector Lines
COLOR_GOLD        = RGBColor(255, 208, 0)   # #FFD000 Signature Cyber Gold
COLOR_TEXT_WHITE  = RGBColor(245, 245, 240) # #F5F5F0 Crisp Off-White
COLOR_TEXT_MUTED  = RGBColor(155, 155, 150) # #9B9B96 Slate Secondary Gray
COLOR_CARD_FILL   = RGBColor(18, 18, 18)    # #121212 Card Surface
COLOR_CARD_LINE   = RGBColor(70, 70, 68)    # #464644 Card Border

# Screenshot Paths
UPLOAD_DIR = r"C:\Users\srive\.gemini\antigravity-ide\brain\c912a83b-32d0-42fd-b801-a5da15a0de8c\.user_uploaded"
IMG_HOME        = os.path.join(UPLOAD_DIR, "media_1790022950557.png")
IMG_CAMERA_SIGN = os.path.join(UPLOAD_DIR, "media_1790023242409.png")
IMG_WAVEFORM    = os.path.join(UPLOAD_DIR, "media_1790023288619.png")
IMG_CHAT        = os.path.join(UPLOAD_DIR, "media_1790023358607.png")
IMG_MIC_TRIGGER = os.path.join(UPLOAD_DIR, "media_1790023432638.png")
IMG_READOUT     = os.path.join(UPLOAD_DIR, "media_1790023565735.png")

def build_presentation():
    prs = pptx.Presentation()
    prs.slide_width = Inches(13.333333333333334)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Helper: Cyber grid matching Original Backup
    def draw_grid(slide):
        # 30 Vertical connector lines
        for i in range(30):
            x = Inches(i * 0.45)
            line = slide.shapes.add_connector(MSO_CONNECTOR.STRAIGHT, x, 0, x, Inches(7.5))
            line.line.color.rgb = COLOR_GRID
            line.line.width = Pt(0.75)
        # 17 Horizontal connector lines
        for j in range(17):
            y = Inches(j * 0.45)
            line = slide.shapes.add_connector(MSO_CONNECTOR.STRAIGHT, 0, y, Inches(13.3333), y)
            line.line.color.rgb = COLOR_GRID
            line.line.width = Pt(0.75)

    # Helper: Base Slide with Original Backup aesthetics
    def create_base_slide(section_tag="", slide_title="", subtitle=""):
        slide = prs.slides.add_slide(blank_layout)

        # 1. Full-bleed Obsidian background (#050505)
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.3333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = COLOR_BG
        bg.line.fill.background()

        # 2. Full-bleed Cyber Grid (#1E1E1E)
        draw_grid(slide)

        # 3. Header Box
        if slide_title:
            # Section Tag: Consolas 8.5pt bold #FFD000
            tb_tag = slide.shapes.add_textbox(Inches(0.65), Inches(0.45), Inches(8.0), Inches(0.22))
            tft = tb_tag.text_frame
            tft.word_wrap = True
            tft.margin_left = tft.margin_top = tft.margin_right = tft.margin_bottom = 0
            p_tag = tft.paragraphs[0]
            p_tag.text = section_tag.upper()
            p_tag.font.name = "Consolas"
            p_tag.font.size = Pt(8.5)
            p_tag.font.bold = True
            p_tag.font.color.rgb = COLOR_GOLD

            # Slide Title: Arial Narrow 33pt bold #F5F5F0
            tb_title = slide.shapes.add_textbox(Inches(0.65), Inches(0.75), Inches(11.8), Inches(1.25))
            tfttl = tb_title.text_frame
            tfttl.word_wrap = True
            tfttl.margin_left = tfttl.margin_top = tfttl.margin_right = tfttl.margin_bottom = 0
            p_ttl = tfttl.paragraphs[0]
            p_ttl.text = slide_title.upper()
            p_ttl.font.name = "Arial Narrow"
            p_ttl.font.size = Pt(33)
            p_ttl.font.bold = True
            p_ttl.font.color.rgb = COLOR_TEXT_WHITE

            # Signature Accent Bar: 0.72" x 0.06" filled with #FFD000
            bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.65), Inches(2.08), Inches(0.72), Inches(0.06))
            bar.fill.solid()
            bar.fill.fore_color.rgb = COLOR_GOLD
            bar.line.fill.background()

            # Subtitle: Arial 12.5pt #9B9B96
            if subtitle:
                tb_sub = slide.shapes.add_textbox(Inches(0.65), Inches(2.26), Inches(11.5), Inches(0.60))
                tfs = tb_sub.text_frame
                tfs.word_wrap = True
                tfs.margin_left = tfs.margin_top = tfs.margin_right = tfs.margin_bottom = 0
                p_sub = tfs.paragraphs[0]
                p_sub.text = subtitle
                p_sub.font.name = "Arial"
                p_sub.font.size = Pt(12.5)
                p_sub.font.color.rgb = COLOR_TEXT_MUTED

        # 4. Footers on every slide
        fl = slide.shapes.add_textbox(Inches(0.45), Inches(7.12), Inches(4.0), Inches(0.18))
        tfl = fl.text_frame
        tfl.word_wrap = True
        tfl.margin_left = tfl.margin_top = tfl.margin_right = tfl.margin_bottom = 0
        pl = tfl.paragraphs[0]
        pl.text = "SIGNIFY"
        pl.font.name = "Consolas"
        pl.font.size = Pt(7.5)
        pl.font.bold = True
        pl.font.color.rgb = COLOR_TEXT_MUTED

        fr = slide.shapes.add_textbox(Inches(9.5), Inches(7.12), Inches(3.38), Inches(0.18))
        tfr = fr.text_frame
        tfr.word_wrap = True
        tfr.margin_left = tfr.margin_top = tfr.margin_right = tfr.margin_bottom = 0
        pr_f = tfr.paragraphs[0]
        pr_f.alignment = PP_ALIGN.RIGHT
        pr_f.text = "iQOO HACKATHON 2026"
        pr_f.font.name = "Consolas"
        pr_f.font.size = Pt(7.5)
        pr_f.font.bold = True
        pr_f.font.color.rgb = COLOR_GOLD

        return slide

    # Helper: Create Original Backup Card (#121212 fill, #464644 border, #FFD000 corner accent)
    def create_card(slide, left, top, width, height, with_corner_accent=True):
        card = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = COLOR_CARD_FILL
        card.line.color.rgb = COLOR_CARD_LINE
        card.line.width = Pt(1.0)

        if with_corner_accent:
            # Gold square 0.10" x 0.10" at top-right
            sq = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left + width - Inches(0.12), top + Inches(0.02), Inches(0.10), Inches(0.10))
            sq.fill.solid()
            sq.fill.fore_color.rgb = COLOR_GOLD
            sq.line.fill.background()

        return card

    # Helper: Place Phone Screenshot Mockup in Original Backup Card Frame
    def place_phone_mockup(slide, img_path, left, top, height=Inches(4.1), tag="iQOO 15 VISION SCREEN"):
        if not os.path.exists(img_path):
            return Inches(2.5)

        with Image.open(img_path) as img:
            w_px, h_px = img.size
            aspect = w_px / h_px

        w = Inches(round(height.inches * aspect, 2))
        pad = Inches(0.06)

        # Outer Chassis Frame
        create_card(slide, left - pad, top - pad, w + (pad * 2), height + (pad * 2), with_corner_accent=True)

        # Image
        slide.shapes.add_picture(img_path, left, top, width=w, height=height)

        # Bottom Caption Badge
        tb = slide.shapes.add_textbox(left - pad, top + height + pad + Inches(0.05), w + (pad * 2), Inches(0.20))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        p.text = f"[ {tag} ]"
        p.font.name = "Consolas"
        p.font.size = Pt(7.5)
        p.font.bold = True
        p.font.color.rgb = COLOR_GOLD

        return w + (pad * 2)

    # =========================================================================
    # SLIDE 1: TITLE & HERO
    # =========================================================================
    s1 = create_base_slide()

    # Section Tag
    tb1_tag = s1.shapes.add_textbox(Inches(0.65), Inches(0.48), Inches(6.0), Inches(0.22))
    t1_tag = tb1_tag.text_frame
    t1_tag.word_wrap = True
    t1_tag.margin_left = t1_tag.margin_top = t1_tag.margin_right = t1_tag.margin_bottom = 0
    p1_tag = t1_tag.paragraphs[0]
    p1_tag.text = "iQOO HACKATHON 2026 // HEALTHTECH & ACCESSIBILITY TRACK"
    p1_tag.font.name = "Consolas"
    p1_tag.font.size = Pt(8.5)
    p1_tag.font.bold = True
    p1_tag.font.color.rgb = COLOR_GOLD

    # Main Title: SIGNIFY
    tb1_m = s1.shapes.add_textbox(Inches(0.65), Inches(0.95), Inches(6.5), Inches(0.85))
    t1_m = tb1_m.text_frame
    t1_m.word_wrap = True
    t1_m.margin_left = t1_m.margin_top = t1_m.margin_right = t1_m.margin_bottom = 0
    p1_m = t1_m.paragraphs[0]
    p1_m.text = "SIGNIFY"
    p1_m.font.name = "Arial Narrow"
    p1_m.font.size = Pt(48)
    p1_m.font.bold = True
    p1_m.font.color.rgb = COLOR_TEXT_WHITE

    # Underline Bar
    bar1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.67), Inches(1.85), Inches(1.15), Inches(0.08))
    bar1.fill.solid()
    bar1.fill.fore_color.rgb = COLOR_GOLD
    bar1.line.fill.background()

    # Tagline
    tb1_tagline = s1.shapes.add_textbox(Inches(0.65), Inches(2.05), Inches(7.5), Inches(1.20))
    t1_tl = tb1_tagline.text_frame
    t1_tl.word_wrap = True
    t1_tl.margin_left = t1_tl.margin_top = t1_tl.margin_right = t1_tl.margin_bottom = 0
    p1_tl = t1_tl.paragraphs[0]
    p1_tl.text = "LET THE SILENCE\nBE HEARD."
    p1_tl.font.name = "Arial Narrow"
    p1_tl.font.size = Pt(34)
    p1_tl.font.bold = True
    p1_tl.font.color.rgb = COLOR_TEXT_WHITE

    # Description
    tb1_desc = s1.shapes.add_textbox(Inches(0.68), Inches(3.40), Inches(7.8), Inches(1.10))
    t1_d = tb1_desc.text_frame
    t1_d.word_wrap = True
    t1_d.margin_left = t1_d.margin_top = t1_d.margin_right = t1_d.margin_bottom = 0
    p1_d = t1_d.paragraphs[0]
    p1_d.text = (
        "A phone-first bidirectional communication assistant bridging sign-language users "
        "and spoken voice using the Qualcomm Snapdragon Hexagon NPU and Kaggle ASL 250 ML foundation."
    )
    p1_d.font.name = "Arial"
    p1_d.font.size = Pt(13)
    p1_d.font.color.rgb = COLOR_TEXT_MUTED

    # 3 Spec Chips
    specs = [
        ("SNAPDRAGON NPU", "< 18ms real-time latency on Hexagon DSP via QNN TFLite delegate"),
        ("TWO-WAY BRIDGE", "Forward Sign → Speech AND Reverse Voice → Accessible Text"),
        ("ZERO HALLUCINATION", "Deterministic context-aware grammar engine grounded in recognized signs")
    ]
    tb1_chips = s1.shapes.add_textbox(Inches(0.68), Inches(4.70), Inches(8.0), Inches(2.10))
    t1_c = tb1_chips.text_frame
    t1_c.word_wrap = True
    t1_c.margin_left = t1_c.margin_top = t1_c.margin_right = t1_c.margin_bottom = 0
    for idx, (tag, desc) in enumerate(specs):
        p_sp = t1_c.paragraphs[0] if idx == 0 else t1_c.add_paragraph()
        p_sp.text = f"▶ {tag}: "
        p_sp.font.name = "Consolas"
        p_sp.font.size = Pt(9.5)
        p_sp.font.bold = True
        p_sp.font.color.rgb = COLOR_GOLD

        run = p_sp.add_run()
        run.text = desc
        run.font.name = "Arial"
        run.font.size = Pt(10)
        run.font.color.rgb = COLOR_TEXT_WHITE
        p_sp.space_after = Pt(8)

    # Phone Mockup
    place_phone_mockup(s1, IMG_HOME, Inches(9.4), Inches(1.35), height=Inches(5.2), tag="SIGNIFY HOME INTERFACE")

    # =========================================================================
    # SLIDE 2: 01 // THE URGENCY
    # =========================================================================
    s2 = create_base_slide(
        section_tag="01 // THE URGENCY",
        slide_title="WHEN COMMUNICATION BREAKS, EVERY SECOND MATTERS",
        subtitle="Critical communication barriers in emergency triage, law enforcement, and daily transit."
    )

    metrics_data = [
        ("70M+", "DEAF INDIVIDUALS WORLDWIDE", [
            "Sign language is their primary native language.",
            "Acute isolation in healthcare and emergency transit.",
            "Handwritten notes are too slow during medical trauma."
        ]),
        ("< 1%", "HEARING WHO UNDERSTAND SIGN", [
            "Over 99% of doctors and responders cannot read sign.",
            "High risk of dangerous misinterpretation in traffic stops.",
            "Patients unable to convey critical symptoms or allergies."
        ]),
        ("2-4 HRS", "INTERPRETER ARRIVAL DELAY", [
            "Certified medical interpreters are rarely on-site.",
            "Costs exceed $100/hr, inaccessible for daily interactions.",
            "Urgent care demands instant, on-device AI assistance."
        ])
    ]

    c_w3 = Inches(3.72)
    gap3 = Inches(0.42)
    top_pos = Inches(2.95)
    card_h = Inches(3.95)

    for i, (stat, title, bullets) in enumerate(metrics_data):
        c_left = Inches(0.65) + i * (c_w3 + gap3)
        create_card(s2, c_left, top_pos, c_w3, card_h)

        tb = s2.shapes.add_textbox(c_left + Inches(0.28), top_pos + Inches(0.25), c_w3 - Inches(0.56), card_h - Inches(0.45))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        p_stat = tf.paragraphs[0]
        p_stat.text = stat
        p_stat.font.name = "Arial Narrow"
        p_stat.font.size = Pt(44)
        p_stat.font.bold = True
        p_stat.font.color.rgb = COLOR_GOLD
        p_stat.space_after = Pt(4)

        p_ttl = tf.add_paragraph()
        p_ttl.text = title
        p_ttl.font.name = "Arial Narrow"
        p_ttl.font.size = Pt(13)
        p_ttl.font.bold = True
        p_ttl.font.color.rgb = COLOR_TEXT_WHITE
        p_ttl.space_after = Pt(14)

        for b in bullets:
            pb = tf.add_paragraph()
            pb.text = f"• {b}"
            pb.font.name = "Arial"
            pb.font.size = Pt(10.5)
            pb.font.color.rgb = COLOR_TEXT_MUTED
            pb.space_after = Pt(8)

    # =========================================================================
    # SLIDE 3: 02 // CORE NOVELTY
    # =========================================================================
    s3 = create_base_slide(
        section_tag="02 // THE CORE NOVELTY",
        slide_title="ISOLATED SIGNS ARE NOT A CONVERSATION",
        subtitle="The fundamental barrier in AI sign language isn't just image classification — it is conversational synthesis."
    )

    c_w_half = Inches(5.80)
    gap_half = Inches(0.42)

    # Left Card: Standard Classifiers
    c_left_x = Inches(0.65)
    create_card(s3, c_left_x, top_pos, c_w_half, card_h)

    tbl = s3.shapes.add_textbox(c_left_x + Inches(0.35), top_pos + Inches(0.25), c_w_half - Inches(0.7), card_h - Inches(0.45))
    tfl = tbl.text_frame
    tfl.word_wrap = True
    tfl.margin_left = tfl.margin_top = tfl.margin_right = tfl.margin_bottom = 0

    pl1 = tfl.paragraphs[0]
    pl1.text = "✕  STANDARD RESEARCH APPROACH"
    pl1.font.name = "Consolas"
    pl1.font.size = Pt(9.5)
    pl1.font.bold = True
    pl1.font.color.rgb = COLOR_TEXT_MUTED
    pl1.space_after = Pt(4)

    pl2 = tfl.add_paragraph()
    pl2.text = "Raw Token Splatting Without Grammar"
    pl2.font.name = "Arial Narrow"
    pl2.font.size = Pt(17)
    pl2.font.bold = True
    pl2.font.color.rgb = COLOR_TEXT_WHITE
    pl2.space_after = Pt(12)

    pl_flow = tfl.add_paragraph()
    pl_flow.text = "FLOW: Camera ──► Image Model ──► Dumps Raw Words"
    pl_flow.font.name = "Consolas"
    pl_flow.font.size = Pt(9)
    pl_flow.font.color.rgb = COLOR_TEXT_MUTED
    pl_flow.space_after = Pt(8)

    pl_box = tfl.add_paragraph()
    pl_box.text = "OUTPUT: \"WATER\" ... \"PLEASE\" ... \"WATER\""
    pl_box.font.name = "Consolas"
    pl_box.font.size = Pt(11)
    pl_box.font.bold = True
    pl_box.font.color.rgb = COLOR_GOLD
    pl_box.space_after = Pt(12)

    drawbacks = [
        "Sounds robotic, grammatically broken, and disjointed.",
        "Confusing and slow for emergency doctors and hearing responders.",
        "Single-frame jitter spams duplicate words endlessly.",
        "Zero awareness of social etiquette or conversational context."
    ]
    for d in drawbacks:
        pd = tfl.add_paragraph()
        pd.text = f"• {d}"
        pd.font.name = "Arial"
        pd.font.size = Pt(10.5)
        pd.font.color.rgb = COLOR_TEXT_MUTED
        pd.space_after = Pt(6)

    # Right Card: Signify Context Engine
    c_right_x = Inches(0.65) + c_w_half + gap_half
    create_card(s3, c_right_x, top_pos, c_w_half, card_h)

    tbr = s3.shapes.add_textbox(c_right_x + Inches(0.35), top_pos + Inches(0.25), c_w_half - Inches(0.7), card_h - Inches(0.45))
    tfr = tbr.text_frame
    tfr.word_wrap = True
    tfr.margin_left = tfr.margin_top = tfr.margin_right = tfr.margin_bottom = 0

    pr1 = tfr.paragraphs[0]
    pr1.text = "✓  SIGNIFY CONTEXT ENGINE (OUR NOVELTY)"
    pr1.font.name = "Consolas"
    pr1.font.size = Pt(9.5)
    pr1.font.bold = True
    pr1.font.color.rgb = COLOR_GOLD
    pr1.space_after = Pt(4)

    pr2 = tfr.add_paragraph()
    pr2.text = "Grounded Natural Sentence Synthesis"
    pr2.font.name = "Arial Narrow"
    pr2.font.size = Pt(17)
    pr2.font.bold = True
    pr2.font.color.rgb = COLOR_TEXT_WHITE
    pr2.space_after = Pt(12)

    pr_flow = tfr.add_paragraph()
    pr_flow.text = "FLOW: Camera ──► Verified Buffer ──► Context Grammar"
    pr_flow.font.name = "Consolas"
    pr_flow.font.size = Pt(9)
    pr_flow.font.color.rgb = COLOR_GOLD
    pr_flow.space_after = Pt(8)

    pr_box = tfr.add_paragraph()
    pr_box.text = "SYNTHESIS: [ WATER ] + [ PLEASE ] → \"Please may I have some water?\""
    pr_box.font.name = "Consolas"
    pr_box.font.size = Pt(11)
    pr_box.font.bold = True
    pr_box.font.color.rgb = COLOR_TEXT_WHITE
    pr_box.space_after = Pt(12)

    advantages = [
        "Medical triage: [ SICK ] + [ OWIE ] → \"I am sick and experiencing severe pain.\"",
        "100% Deterministic & Zero-Hallucination (No made-up words).",
        "Fluent, human-first conversational communication.",
        "Operates in < 2ms without slow, costly cloud LLMs."
    ]
    for a in advantages:
        pa = tfr.add_paragraph()
        pa.text = f"• {a}"
        pa.font.name = "Arial"
        pa.font.size = Pt(10.5)
        pa.font.color.rgb = COLOR_TEXT_MUTED
        pa.space_after = Pt(6)

    # =========================================================================
    # SLIDE 4: 03 // PRODUCT ARCHITECTURE
    # =========================================================================
    s4 = create_base_slide(
        section_tag="03 // PRODUCT ARCHITECTURE",
        slide_title="THE SMARTPHONE AS A TWO-WAY INTERACTION BRIDGE",
        subtitle="Signify completes the communication loop: Forward Sign → Speech and Reverse Voice → Accessible Text."
    )

    c_left_w = Inches(8.6)

    # Forward Direction Card
    c_f_top = Inches(2.95)
    c_f_h = Inches(1.90)
    create_card(s4, Inches(0.65), c_f_top, c_left_w, c_f_h)

    tbf = s4.shapes.add_textbox(Inches(0.95), c_f_top + Inches(0.18), c_left_w - Inches(0.6), c_f_h - Inches(0.30))
    tff = tbf.text_frame
    tff.word_wrap = True
    tff.margin_left = tff.margin_top = tff.margin_right = tff.margin_bottom = 0

    pf1 = tff.paragraphs[0]
    pf1.text = "▶ FORWARD DIRECTION: GESTURE → VOICE (FOR HEARING LISTENER)"
    pf1.font.name = "Consolas"
    pf1.font.size = Pt(9.5)
    pf1.font.bold = True
    pf1.font.color.rgb = COLOR_GOLD
    pf1.space_after = Pt(4)

    pf_pipe = tff.add_paragraph()
    pf_pipe.text = "Camera Ingest (543 Landmarks) ──► TFLite ASL 250 ──► Sentence Engine ──► Audio Broadcast"
    pf_pipe.font.name = "Consolas"
    pf_pipe.font.size = Pt(8.5)
    pf_pipe.font.color.rgb = COLOR_TEXT_WHITE
    pf_pipe.space_after = Pt(6)

    pf_desc = tff.add_paragraph()
    pf_desc.text = "Deaf signer signs in camera reticle → Synthesizes fluent speech out of phone's stereo speakers."
    pf_desc.font.name = "Arial"
    pf_desc.font.size = Pt(10)
    pf_desc.font.color.rgb = COLOR_TEXT_MUTED

    # Reverse Direction Card
    c_r_top = Inches(5.00)
    c_r_h = Inches(1.90)
    create_card(s4, Inches(0.65), c_r_top, c_left_w, c_r_h)

    tbr = s4.shapes.add_textbox(Inches(0.95), c_r_top + Inches(0.18), c_left_w - Inches(0.6), c_r_h - Inches(0.30))
    tfr = tbr.text_frame
    tfr.word_wrap = True
    tfr.margin_left = tfr.margin_top = tfr.margin_right = tfr.margin_bottom = 0

    pr1 = tfr.paragraphs[0]
    pr1.text = "▶ REVERSE DIRECTION: VOICE → ACCESSIBLE TEXT (FOR DEAF SIGNER)"
    pr1.font.name = "Consolas"
    pr1.font.size = Pt(9.5)
    pr1.font.bold = True
    pr1.font.color.rgb = COLOR_GOLD
    pr1.space_after = Pt(4)

    pr_pipe = tfr.add_paragraph()
    pr_pipe.text = "Dual Mic Array ──► Real-Time STT ──► Noise Filter ──► 24pt High-Contrast Subtitles"
    pr_pipe.font.name = "Consolas"
    pr_pipe.font.size = Pt(8.5)
    pr_pipe.font.color.rgb = COLOR_TEXT_WHITE
    pr_pipe.space_after = Pt(6)

    pr_desc = tfr.add_paragraph()
    pr_desc.text = "Hearing doctor/officer speaks → Instant oversized readable text displayed for the deaf user."
    pr_desc.font.name = "Arial"
    pr_desc.font.size = Pt(10)
    pr_desc.font.color.rgb = COLOR_TEXT_MUTED

    # Phone Mockup
    place_phone_mockup(s4, IMG_HOME, Inches(9.8), Inches(2.80), height=Inches(4.1), tag="TWO-WAY BRIDGE HERO")

    # =========================================================================
    # SLIDE 5: 04 // LIVE PROTOTYPE REALITY
    # =========================================================================
    s5 = create_base_slide(
        section_tag="04 // LIVE PROTOTYPE REALITY",
        slide_title="KAGGLE ASL 250 ML VISION FOUNDATION",
        subtitle="Active live camera vision with MediaPipe landmark tracking and TFLite model running right now."
    )

    create_card(s5, Inches(0.65), top_pos, c_left_w, card_h)
    tbp = s5.shapes.add_textbox(Inches(0.95), top_pos + Inches(0.25), c_left_w - Inches(0.6), card_h - Inches(0.45))
    tfp = tbp.text_frame
    tfp.word_wrap = True
    tfp.margin_left = tfp.margin_top = tfp.margin_right = tfp.margin_bottom = 0

    pp1 = tfp.paragraphs[0]
    pp1.text = "VISION EXTRACTION & INFERENCE PIPELINE"
    pp1.font.name = "Arial Narrow"
    pp1.font.size = Pt(17)
    pp1.font.bold = True
    pp1.font.color.rgb = COLOR_TEXT_WHITE
    pp1.space_after = Pt(10)

    psteps = [
        ("1. CAMERA INGEST", "60 FPS mirror vision with custom high-contrast gold reticle."),
        ("2. MEDIAPIPE TRACKING", "543 spatial coordinates (468 face mesh, 21 pose, 42 dual-hand points)."),
        ("3. TFLITE SIGNATURE RUNNER", "Rolling 45-frame buffer fed into 1D-CNN/Transformer encoder."),
        ("4. KAGGLE 250 VOCABULARY", "Predicts authentic classes (e.g. SICK, OWIE, WATER, PLEASE, CALL ON PHONE)."),
        ("5. LIVE CLOUD BRIDGE", "Render FastAPI backend (https://signifyprototype.onrender.com) connected live.")
    ]
    for stitle, sdesc in psteps:
        pst = tfp.add_paragraph()
        pst.text = f"▶ {stitle}"
        pst.font.name = "Consolas"
        pst.font.size = Pt(9.5)
        pst.font.bold = True
        pst.font.color.rgb = COLOR_GOLD

        psd = tfp.add_paragraph()
        psd.text = sdesc
        psd.font.name = "Arial"
        psd.font.size = Pt(9.5)
        psd.font.color.rgb = COLOR_TEXT_MUTED
        psd.space_after = Pt(5)

    place_phone_mockup(s5, IMG_CAMERA_SIGN, Inches(9.8), Inches(2.80), height=Inches(4.1), tag="LIVE VISION TRACKING")

    # =========================================================================
    # SLIDE 6: 05 // TRUST & CLINICAL SAFETY
    # =========================================================================
    s6 = create_base_slide(
        section_tag="05 // TRUST & CLINICAL SAFETY",
        slide_title="DUAL SAFETY GATING: 70% CONFIDENCE & TEMPORAL STABILITY",
        subtitle="Medical and emergency contexts cannot tolerate random AI hallucinations or single-frame jitter."
    )

    # Top Flow Pipeline Bar
    c_bar_w = Inches(12.03)
    create_card(s6, Inches(0.65), top_pos, c_bar_w, Inches(0.65), with_corner_accent=False)
    tbg = s6.shapes.add_textbox(Inches(0.95), top_pos + Inches(0.16), c_bar_w - Inches(0.6), Inches(0.40))
    tfg = tbg.text_frame
    tfg.word_wrap = True
    tfg.margin_left = tfg.margin_top = tfg.margin_right = tfg.margin_bottom = 0

    pg_flow = tfg.paragraphs[0]
    pg_flow.text = "DECISION FLOW: PREDICTION ──► [ GATE 1: ≥ 70.0% SOFTMAX? ] ──► [ GATE 2: 2-FRAME STABILITY? ] ──► ACCEPT"
    pg_flow.font.name = "Consolas"
    pg_flow.font.size = Pt(9.5)
    pg_flow.font.bold = True
    pg_flow.font.color.rgb = COLOR_GOLD

    # Two Cards Below
    gate_top = Inches(3.80)
    gate_h = Inches(3.10)

    # Left: Accepted
    create_card(s6, Inches(0.65), gate_top, c_w_half, gate_h)
    tbg1 = s6.shapes.add_textbox(Inches(0.95), gate_top + Inches(0.20), c_w_half - Inches(0.6), gate_h - Inches(0.35))
    tfg1 = tbg1.text_frame
    tfg1.word_wrap = True
    tfg1.margin_left = tfg1.margin_top = tfg1.margin_right = tfg1.margin_bottom = 0

    pga1 = tfg1.paragraphs[0]
    pga1.text = "✓ ACCEPTED GESTURE (≥ 70.0% CONFIDENCE)"
    pga1.font.name = "Consolas"
    pga1.font.size = Pt(9.5)
    pga1.font.bold = True
    pga1.font.color.rgb = COLOR_GOLD
    pga1.space_after = Pt(4)

    pga2 = tfg1.add_paragraph()
    pga2.text = "Strict Threshold + 2-Frame Temporal Lock"
    pga2.font.name = "Arial Narrow"
    pga2.font.size = Pt(15)
    pga2.font.bold = True
    pga2.font.color.rgb = COLOR_TEXT_WHITE
    pga2.space_after = Pt(10)

    acc_bullets = [
        "Softmax Probability ≥ 70.0% required.",
        "Temporal Filter: Gesture must persist stably for at least 2 consecutive frames.",
        "Haptic Pulse: 1 crisp physical vibration pulse (45ms).",
        "Deduplication: Prevents stuttering spam (e.g. SICK SICK SICK).",
        "Result: Token safely appended to word buffer."
    ]
    for b in acc_bullets:
        pb = tfg1.add_paragraph()
        pb.text = f"• {b}"
        pb.font.name = "Arial"
        pb.font.size = Pt(10)
        pb.font.color.rgb = COLOR_TEXT_MUTED
        pb.space_after = Pt(5)

    # Right: Rejected
    create_card(s6, c_right_x, gate_top, c_w_half, gate_h)
    tbg2 = s6.shapes.add_textbox(c_right_x + Inches(0.30), gate_top + Inches(0.20), c_w_half - Inches(0.6), gate_h - Inches(0.35))
    tfg2 = tbg2.text_frame
    tfg2.word_wrap = True
    tfg2.margin_left = tfg2.margin_top = tfg2.margin_right = tfg2.margin_bottom = 0

    pgb1 = tfg2.paragraphs[0]
    pgb1.text = "✕ REJECTED GESTURE (< 70.0% CONFIDENCE)"
    pgb1.font.name = "Consolas"
    pgb1.font.size = Pt(9.5)
    pgb1.font.bold = True
    pgb1.font.color.rgb = COLOR_TEXT_MUTED
    pgb1.space_after = Pt(4)

    pgb2 = tfg2.add_paragraph()
    pgb2.text = "Safety-Gate Retry & Haptic Cue"
    pgb2.font.name = "Arial Narrow"
    pgb2.font.size = Pt(15)
    pgb2.font.bold = True
    pgb2.font.color.rgb = COLOR_TEXT_WHITE
    pgb2.space_after = Pt(10)

    rej_bullets = [
        "Suppresses ambiguous transitions (e.g. 52% blurred hand motions).",
        "Zero Hallucination: Never passes unverified words to the sentence engine.",
        "Silent Cue: 2 quick vibration pulses prompt user to re-sign.",
        "HUD Status: Flashes amber reticle: 'POSITION HAND IN FRAME'."
    ]
    for b in rej_bullets:
        pb = tfg2.add_paragraph()
        pb.text = f"• {b}"
        pb.font.name = "Arial"
        pb.font.size = Pt(10)
        pb.font.color.rgb = COLOR_TEXT_MUTED
        pb.space_after = Pt(5)

    # =========================================================================
    # SLIDE 7: 06 // MEANINGFUL SENTENCE SYNTHESIS
    # =========================================================================
    s7 = create_base_slide(
        section_tag="06 // MEANINGFUL SENTENCE SYNTHESIS",
        slide_title="GROUNDED CONTEXT-AWARE SENTENCE BUILDER",
        subtitle="Turning recognized gesture tokens into grammatically complete, natural English sentences."
    )

    create_card(s7, Inches(0.65), top_pos, c_left_w, card_h)
    tbc = s7.shapes.add_textbox(Inches(0.95), top_pos + Inches(0.25), c_left_w - Inches(0.6), card_h - Inches(0.45))
    tfc = tbc.text_frame
    tfc.word_wrap = True
    tfc.margin_left = tfc.margin_top = tfc.margin_right = tfc.margin_bottom = 0

    pce1 = tfc.paragraphs[0]
    pce1.text = "DETERMINISTIC GRAMMAR SYNTHESIS"
    pce1.font.name = "Arial Narrow"
    pce1.font.size = Pt(17)
    pce1.font.bold = True
    pce1.font.color.rgb = COLOR_TEXT_WHITE
    pce1.space_after = Pt(12)

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
        pin.font.name = "Consolas"
        pin.font.size = Pt(9.5)
        pin.font.bold = True
        pin.font.color.rgb = COLOR_GOLD

        run = pin.add_run()
        run.text = t_out
        run.font.name = "Arial"
        run.font.size = Pt(10.5)
        run.font.bold = True
        run.font.color.rgb = COLOR_TEXT_WHITE
        pin.space_after = Pt(8)

    p_met = tfc.add_paragraph()
    p_met.space_before = Pt(16)
    p_met.text = "▶ Latency: < 2ms  |  Hallucination: 0%  |  Resilience: 100% Offline"
    p_met.font.name = "Consolas"
    p_met.font.size = Pt(9.5)
    p_met.font.bold = True
    p_met.font.color.rgb = COLOR_GOLD

    place_phone_mockup(s7, IMG_WAVEFORM, Inches(9.8), Inches(2.80), height=Inches(4.1), tag="AUDIO BROADCAST & WAVEFORM")

    # =========================================================================
    # SLIDE 8: 07 // LIVE TWO-WAY DIALOGUE
    # =========================================================================
    s8 = create_base_slide(
        section_tag="07 // LIVE TWO-WAY DIALOGUE",
        slide_title="TWO-WAY LIVE CONVERSATION STREAM",
        subtitle="A unified conversation stream bridging both participants with instant audio playback."
    )

    create_card(s8, Inches(0.65), top_pos, c_left_w, card_h)
    tbch = s8.shapes.add_textbox(Inches(0.95), top_pos + Inches(0.25), c_left_w - Inches(0.6), card_h - Inches(0.45))
    tfch = tbch.text_frame
    tfch.word_wrap = True
    tfch.margin_left = tfch.margin_top = tfch.margin_right = tfch.margin_bottom = 0

    pch1 = tfch.paragraphs[0]
    pch1.text = "FULL TWO-WAY COMMUNICATION BRIDGE"
    pch1.font.name = "Arial Narrow"
    pch1.font.size = Pt(17)
    pch1.font.bold = True
    pch1.font.color.rgb = COLOR_TEXT_WHITE
    pch1.space_after = Pt(12)

    chat_pts = [
        ("DISTINCT SPEAKER ROLES", "Gold badge for SIGN (YOU) vs. Gray card for SPEECH (OTHER PERSON)."),
        ("SIGN TOKEN TRACEABILITY", "Shows underlying Kaggle tokens (e.g. [HELLO HOW YOU], [BYE])."),
        ("ONE-TOUCH AUDIO PLAYBACK", "Play/Stop speech synthesis button on every chat bubble."),
        ("QUICK ACTIONS", "[ 🤟 SIGN ] camera modal & [ 🎤 SPEAK ] voice modal always available."),
        ("CONVERSATION MEMORY", "Maintains full transcript for medical triage or emergency review.")
    ]
    for ctitle, cdesc in chat_pts:
        pc = tfch.add_paragraph()
        pc.text = f"▶ {ctitle}"
        pc.font.name = "Consolas"
        pc.font.size = Pt(9.5)
        pc.font.bold = True
        pc.font.color.rgb = COLOR_GOLD

        pcd = tfch.add_paragraph()
        pcd.text = cdesc
        pcd.font.name = "Arial"
        pcd.font.size = Pt(9.5)
        pcd.font.color.rgb = COLOR_TEXT_MUTED
        pcd.space_after = Pt(6)

    place_phone_mockup(s8, IMG_CHAT, Inches(9.8), Inches(2.80), height=Inches(4.1), tag="CONVERSATION MODE STREAM")

    # =========================================================================
    # SLIDE 9: 08 // REVERSE VOICE INGEST
    # =========================================================================
    s9 = create_base_slide(
        section_tag="08 // REVERSE VOICE INGEST",
        slide_title="VOICE-TO-TEXT: LISTENING TO THE HEARING PARTNER",
        subtitle="Capturing speech in high-noise environments with real-time waveform feedback."
    )

    create_card(s9, Inches(0.65), top_pos, c_left_w, card_h)
    tbm = s9.shapes.add_textbox(Inches(0.95), top_pos + Inches(0.25), c_left_w - Inches(0.6), card_h - Inches(0.45))
    tfm = tbm.text_frame
    tfm.word_wrap = True
    tfm.margin_left = tfm.margin_top = tfm.margin_right = tfm.margin_bottom = 0

    pm1 = tfm.paragraphs[0]
    pm1.text = "VOICE CAPTURE & TRANSCRIPTION FEATURES"
    pm1.font.name = "Arial Narrow"
    pm1.font.size = Pt(17)
    pm1.font.bold = True
    pm1.font.color.rgb = COLOR_TEXT_WHITE
    pm1.space_after = Pt(12)

    mic_pts = [
        ("ONE-TAP VOICE CAPTURE", "Large high-contrast microphone button designed for effortless hand-off."),
        ("REAL-TIME WAVEFORM FEEDBACK", "Visual pulsing waveform confirms active audio capture to the deaf user."),
        ("DIRECTIONAL NOISE SUPPRESSION", "Leverages iQOO dual-microphone array to isolate speech from ambient hospital noise."),
        ("SINGLE-DISPATCH TRANSCRIPTION", "Zero-duplicate dispatch engine prevents echo messages in the chat stream.")
    ]
    for mtitle, mdesc in mic_pts:
        pm = tfm.add_paragraph()
        pm.text = f"▶ {mtitle}"
        pm.font.name = "Consolas"
        pm.font.size = Pt(9.5)
        pm.font.bold = True
        pm.font.color.rgb = COLOR_GOLD

        pmd = tfm.add_paragraph()
        pmd.text = mdesc
        pmd.font.name = "Arial"
        pmd.font.size = Pt(9.5)
        pmd.font.color.rgb = COLOR_TEXT_MUTED
        pmd.space_after = Pt(6)

    place_phone_mockup(s9, IMG_MIC_TRIGGER, Inches(9.8), Inches(2.80), height=Inches(4.1), tag="TAP TO SPEAK INTERFACE")

    # =========================================================================
    # SLIDE 10: 09 // HIGH-CONTRAST ACCESSIBILITY
    # =========================================================================
    s10 = create_base_slide(
        section_tag="09 // HIGH-CONTRAST ACCESSIBILITY",
        slide_title="ACCESSIBLE HIGH-CONTRAST READOUT FOR SIGNERS",
        subtitle="Clear, legible visual output designed for readability across a hospital bed or desk."
    )

    create_card(s10, Inches(0.65), top_pos, c_left_w, card_h)
    tbrd = s10.shapes.add_textbox(Inches(0.95), top_pos + Inches(0.25), c_left_w - Inches(0.6), card_h - Inches(0.45))
    tfrd = tbrd.text_frame
    tfrd.word_wrap = True
    tfrd.margin_left = tfrd.margin_top = tfrd.margin_right = tfrd.margin_bottom = 0

    prd1 = tfrd.paragraphs[0]
    prd1.text = "DEAF-FIRST ERGONOMIC DESIGN"
    prd1.font.name = "Arial Narrow"
    prd1.font.size = Pt(17)
    prd1.font.bold = True
    prd1.font.color.rgb = COLOR_TEXT_WHITE
    prd1.space_after = Pt(12)

    read_pts = [
        ("24pt HIGH-CONTRAST DISPLAY", "Bold white text framed in glowing cyber-gold card on OLED black."),
        ("100% VISIBLE STATUS", "Instant visual confirmation that the speech has been accurately converted."),
        ("AUDIO REPLAY CONTROL", "Replay button allows deaf user to verify what audio was transcribed."),
        ("ONE-CLICK TO CONVERSATION", "Instantly appends transcribed speech to the unified conversation bridge.")
    ]
    for rtitle, rdesc in read_pts:
        pr = tfrd.add_paragraph()
        pr.text = f"▶ {rtitle}"
        pr.font.name = "Consolas"
        pr.font.size = Pt(9.5)
        pr.font.bold = True
        pr.font.color.rgb = COLOR_GOLD

        prd = tfrd.add_paragraph()
        prd.text = rdesc
        prd.font.name = "Arial"
        prd.font.size = Pt(9.5)
        prd.font.color.rgb = COLOR_TEXT_MUTED
        prd.space_after = Pt(6)

    place_phone_mockup(s10, IMG_READOUT, Inches(9.8), Inches(2.80), height=Inches(4.1), tag="HIGH-CONTRAST SPEECH CARD")

    # =========================================================================
    # SLIDE 11: 10 // SNAPDRAGON HEXAGON NPU BENCHMARK
    # =========================================================================
    s11 = create_base_slide(
        section_tag="10 // HARDWARE ACCELERATION BENCHMARK",
        slide_title="QUALCOMM SNAPDRAGON HEXAGON NPU ACCELERATION",
        subtitle="Unlocking sub-18ms on-device inference using Qualcomm AI Engine Direct (QNN SDK)."
    )

    # Top Pipeline Bar
    create_card(s11, Inches(0.65), top_pos, c_bar_w, Inches(0.75), with_corner_accent=False)
    tb_npu = s11.shapes.add_textbox(Inches(0.95), top_pos + Inches(0.12), c_bar_w - Inches(0.6), Inches(0.55))
    tfn = tb_npu.text_frame
    tfn.word_wrap = True
    tfn.margin_left = tfn.margin_top = tfn.margin_right = tfn.margin_bottom = 0

    pn_flow = tfn.paragraphs[0]
    pn_flow.text = "HARDWARE PIPELINE: CAMERA (60 FPS) ──► MEDIAPIPE (543 KEYPOINTS) ──► TFLITE (INT8) ──► QUALCOMM QNN ──► HEXAGON DSP"
    pn_flow.font.name = "Consolas"
    pn_flow.font.size = Pt(9)
    pn_flow.font.bold = True
    pn_flow.font.color.rgb = COLOR_GOLD

    pn_sub = tfn.add_paragraph()
    pn_sub.text = "Direct AHARDWAREBUFFER memory binding offloads matrix math directly to Hexagon NPU with zero CPU memory copies."
    pn_sub.font.name = "Arial"
    pn_sub.font.size = Pt(9.5)
    pn_sub.font.color.rgb = COLOR_TEXT_MUTED

    # 4 Metric Cards Below
    bench_data = [
        ("INFERENCE LATENCY", "< 18 ms", "vs. CPU: 145 ms\nvs. Cloud: 280 ms\nReal-time 60 FPS sub-frame speed."),
        ("POWER EFFICIENCY", "0.42 W", "vs. CPU: 3.8 W\nNo phone overheating.\nAll-day continuous operation."),
        ("BANDWIDTH COST", "0 KB/s", "vs. Cloud: 120 KB/s/frame\n100% offline.\nWorks in elevators & flights."),
        ("DATA PRIVACY", "100% LOCAL", "Zero video leaves device.\nFull HIPAA medical privacy compliance.")
    ]
    c_w4 = Inches(2.78)
    gap4 = Inches(0.30)
    card_top4 = Inches(3.90)
    card_h4 = Inches(3.00)

    for i, (mtitle, mval, mdesc) in enumerate(bench_data):
        c_x = Inches(0.65) + i * (c_w4 + gap4)
        create_card(s11, c_x, card_top4, c_w4, card_h4)

        tb_m = s11.shapes.add_textbox(c_x + Inches(0.25), card_top4 + Inches(0.20), c_w4 - Inches(0.5), card_h4 - Inches(0.35))
        tf_m = tb_m.text_frame
        tf_m.word_wrap = True
        tf_m.margin_left = tf_m.margin_top = tf_m.margin_right = tf_m.margin_bottom = 0

        p1 = tf_m.paragraphs[0]
        p1.text = mtitle
        p1.font.name = "Consolas"
        p1.font.size = Pt(8.5)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_TEXT_MUTED
        p1.space_after = Pt(4)

        p2 = tf_m.add_paragraph()
        p2.text = mval
        p2.font.name = "Arial Narrow"
        p2.font.size = Pt(30)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_GOLD
        p2.space_after = Pt(10)

        for line in mdesc.split("\n"):
            pl = tf_m.add_paragraph()
            pl.text = line
            pl.font.name = "Arial"
            pl.font.size = Pt(9.5)
            pl.font.color.rgb = COLOR_TEXT_WHITE
            pl.space_after = Pt(3)

    # =========================================================================
    # SLIDE 12: 11 // ANDROID IMPLEMENTATION
    # =========================================================================
    s12 = create_base_slide(
        section_tag="11 // ANDROID IMPLEMENTATION",
        slide_title="HOW SIGNIFY RUNS ON AN IQOO ANDROID PHONE",
        subtitle="Two clear pathways: Rapid APK packaging for hackathons and the native Jetpack CameraX production architecture."
    )

    # Path A: Rapid APK
    create_card(s12, Inches(0.65), top_pos, c_w_half, card_h)
    tb_a1 = s12.shapes.add_textbox(Inches(0.95), top_pos + Inches(0.25), c_w_half - Inches(0.6), card_h - Inches(0.45))
    tf_a1 = tb_a1.text_frame
    tf_a1.word_wrap = True
    tf_a1.margin_left = tf_a1.margin_top = tf_a1.margin_right = tf_a1.margin_bottom = 0

    pa1 = tf_a1.paragraphs[0]
    pa1.text = "PATH A: RAPID APK / PWA PACKAGING"
    pa1.font.name = "Consolas"
    pa1.font.size = Pt(9.5)
    pa1.font.bold = True
    pa1.font.color.rgb = COLOR_GOLD
    pa1.space_after = Pt(4)

    pa2 = tf_a1.add_paragraph()
    pa2.text = "Capacitor Mobile Wrapper & WebAPK"
    pa2.font.name = "Arial Narrow"
    pa2.font.size = Pt(17)
    pa2.font.bold = True
    pa2.font.color.rgb = COLOR_TEXT_WHITE
    pa2.space_after = Pt(12)

    apk_steps = [
        "Capacitor CLI: Wraps Vite/React build into native Android Studio project.",
        "Manifest Permissions: Camera, Record Audio, Vibrator.",
        "APK Build: Compiles standalone .apk installable on any Android device.",
        "Instant PWA: Judges opening our Vercel link on Android get an 'Install App' prompt for full-screen standalone execution."
    ]
    for s in apk_steps:
        ps = tf_a1.add_paragraph()
        ps.text = f"• {s}"
        ps.font.name = "Arial"
        ps.font.size = Pt(10)
        ps.font.color.rgb = COLOR_TEXT_MUTED
        ps.space_after = Pt(8)

    # Path B: Native Android Stack
    create_card(s12, c_right_x, top_pos, c_w_half, card_h)
    tb_a2 = s12.shapes.add_textbox(c_right_x + Inches(0.30), top_pos + Inches(0.25), c_w_half - Inches(0.6), card_h - Inches(0.45))
    tf_a2 = tb_a2.text_frame
    tf_a2.word_wrap = True
    tf_a2.margin_left = tf_a2.margin_top = tf_a2.margin_right = tf_a2.margin_bottom = 0

    pb1 = tf_a2.paragraphs[0]
    pb1.text = "PATH B: NATIVE ANDROID STACK (iQOO FLAGSHIP)"
    pb1.font.name = "Consolas"
    pb1.font.size = Pt(9.5)
    pb1.font.bold = True
    pb1.font.color.rgb = COLOR_GOLD
    pb1.space_after = Pt(4)

    pb2 = tf_a2.add_paragraph()
    pb2.text = "Deep Qualcomm QNN & Android OS Pipeline"
    pb2.font.name = "Arial Narrow"
    pb2.font.size = Pt(17)
    pb2.font.bold = True
    pb2.font.color.rgb = COLOR_TEXT_WHITE
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
        ps.font.name = "Arial"
        ps.font.size = Pt(10)
        ps.font.color.rgb = COLOR_TEXT_WHITE
        ps.space_after = Pt(8)

    # =========================================================================
    # SLIDE 13: 12 // PRODUCTION TIMELINE
    # =========================================================================
    s13 = create_base_slide(
        section_tag="12 // PRODUCTION TIMELINE",
        slide_title="FROM PROTOTYPE TO SYSTEM-LEVEL ACCESSIBILITY SERVICE",
        subtitle="A phased engineering roadmap to bring Signify to every iQOO user."
    )

    phases_data = [
        ("PHASE 1", "COMPLETED", "WEB PROTOTYPE & ML BACKEND", [
            "Deployed on Vercel.",
            "FastAPI on Render cloud.",
            "250 Kaggle classes mapped.",
            "70% confidence gating.",
            "Sentence engine active."
        ]),
        ("PHASE 2", "NEXT 60 DAYS", "NATIVE ANDROID & NPU", [
            "Capacitor APK packaging.",
            "CameraX integration.",
            "Qualcomm QNN delegate compilation for Hexagon NPU.",
            "< 0.45W power target."
        ]),
        ("PHASE 3", "6 MONTHS", "CONTINUOUS SIGNING", [
            "Continuous sign language recognition (SLR).",
            "Multi-language support (ISL, BSL, ASL).",
            "Custom medical dictionary."
        ]),
        ("PHASE 4", "1 YEAR", "OriginOS SYSTEM SERVICE", [
            "Triple-press power button trigger.",
            "Floating PiP bubble over video calls.",
            "vivo/iQOO Office Kit bridge for Zoom & Teams."
        ])
    ]

    for i, (pnum, pstat, ptitle, pbullets) in enumerate(phases_data):
        c_x = Inches(0.65) + i * (c_w4 + gap4)
        create_card(s13, c_x, top_pos, c_w4, card_h)

        tb_ph = s13.shapes.add_textbox(c_x + Inches(0.25), top_pos + Inches(0.20), c_w4 - Inches(0.5), card_h - Inches(0.40))
        tf_ph = tb_ph.text_frame
        tf_ph.word_wrap = True
        tf_ph.margin_left = tf_ph.margin_top = tf_ph.margin_right = tf_ph.margin_bottom = 0

        p1 = tf_ph.paragraphs[0]
        p1.text = f"{pnum}  [{pstat}]"
        p1.font.name = "Consolas"
        p1.font.size = Pt(8.5)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_GOLD
        p1.space_after = Pt(4)

        p2 = tf_ph.add_paragraph()
        p2.text = ptitle
        p2.font.name = "Arial Narrow"
        p2.font.size = Pt(13)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_TEXT_WHITE
        p2.space_after = Pt(12)

        for b in pbullets:
            pb = tf_ph.add_paragraph()
            pb.text = f"• {b}"
            pb.font.name = "Arial"
            pb.font.size = Pt(9.5)
            pb.font.color.rgb = COLOR_TEXT_MUTED
            pb.space_after = Pt(6)

    # =========================================================================
    # SLIDE 14: 13 // CLOSING VISION
    # =========================================================================
    s14 = create_base_slide(
        section_tag="13 // CLOSING VISION",
        slide_title="COMMUNICATION IS A HUMAN RIGHT",
        subtitle="Signify proves that accessible on-device AI can bridge worlds without expensive hardware."
    )

    create_card(s14, Inches(0.65), top_pos, c_bar_w, card_h)
    tbc14 = s14.shapes.add_textbox(Inches(1.05), top_pos + Inches(0.25), c_bar_w - Inches(0.8), card_h - Inches(0.45))
    tfc14 = tbc14.text_frame
    tfc14.word_wrap = True
    tfc14.margin_left = tfc14.margin_top = tfc14.margin_right = tfc14.margin_bottom = 0

    pc1 = tfc14.paragraphs[0]
    pc1.text = "LET THE SILENCE BE HEARD."
    pc1.font.name = "Arial Narrow"
    pc1.font.size = Pt(32)
    pc1.font.bold = True
    pc1.font.color.rgb = COLOR_GOLD
    pc1.space_after = Pt(10)

    pc2 = tfc14.add_paragraph()
    pc2.text = (
        "Over 70 million people are waiting for technology to treat their language with dignity.\n"
        "Signify combines Qualcomm Snapdragon NPU performance, 70% confidence safety gating, "
        "and phone-first ergonomics to deliver immediate, two-way conversational freedom."
    )
    pc2.font.name = "Arial"
    pc2.font.size = Pt(12)
    pc2.font.color.rgb = COLOR_TEXT_WHITE
    pc2.space_after = Pt(18)

    links = [
        ("LIVE PROTOTYPE", "Test deployed web application on Vercel."),
        ("ML BACKEND", "Live on Render (https://signifyprototype.onrender.com)."),
        ("CODE REPOSITORY", "https://github.com/WHENKEY2007/signifyprototype"),
        ("HARDWARE TARGET", "Qualcomm Snapdragon Hexagon NPU (iQOO 15 Flagship).")
    ]
    for tag, val in links:
        pl = tfc14.add_paragraph()
        pl.text = f"▶ {tag}: "
        pl.font.name = "Consolas"
        pl.font.size = Pt(9.5)
        pl.font.bold = True
        pl.font.color.rgb = COLOR_GOLD

        run = pl.add_run()
        run.text = val
        run.font.name = "Arial"
        run.font.size = Pt(10)
        run.font.color.rgb = COLOR_TEXT_MUTED
        pl.space_after = Pt(6)

    # Save presentations
    out_restyled = "Signify_iQOO_Hackathon_2026_Theme_Restyled.pptx"
    prs.save(out_restyled)
    print(f"Theme-Restyled Presentation saved successfully: {out_restyled}")

    # Also save to Master
    try:
        prs.save("Signify_iQOO_Hackathon_2026_Master.pptx")
        print("Updated: Signify_iQOO_Hackathon_2026_Master.pptx")
    except Exception as e:
        print(f"Master file notice: {e}")

    # Attempt to save to Final
    try:
        prs.save("Signify_iQOO_Hackathon_2026_Final.pptx")
        print("Updated: Signify_iQOO_Hackathon_2026_Final.pptx")
    except Exception as e:
        print(f"Final file is currently open in PowerPoint ({e}). Saved as {out_restyled}!")

if __name__ == "__main__":
    build_presentation()
