import time
import shutil

print("Waiting for PowerPoint to close before updating Signify_iQOO_Hackathon_2026_Final.pptx...")
for i in range(30):
    try:
        shutil.copyfile("Signify_iQOO_Hackathon_2026_Theme_Restyled.pptx", "Signify_iQOO_Hackathon_2026_Final.pptx")
        shutil.copyfile("Signify_iQOO_Hackathon_2026_Theme_Restyled.pptx", "Signify_iQOO_Hackathon_2026_Master.pptx")
        print("SUCCESS! Updated Signify_iQOO_Hackathon_2026_Final.pptx and Master.pptx.")
        break
    except PermissionError:
        time.sleep(1)
else:
    print("Files are still open. Signify_iQOO_Hackathon_2026_Theme_Restyled.pptx contains your restyled presentation!")
