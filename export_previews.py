import os
import win32com.client

ppt_app = win32com.client.Dispatch("PowerPoint.Application")
deck_path = os.path.abspath("Signify_iQOO_Hackathon_2026_Theme_Restyled.pptx")
pres = ppt_app.Presentations.Open(deck_path, ReadOnly=True, Untitled=False, WithWindow=False)

try:
    for s_idx in [1, 3, 5, 6, 11, 12]:
        slide = pres.Slides(s_idx)
        out_img = os.path.abspath(f"slide_{s_idx}_preview.png")
        slide.Export(out_img, "PNG", 1920, 1080)
        print(f"Exported slide {s_idx} to {out_img}")
finally:
    pres.Close()
