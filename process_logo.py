import sys
from PIL import Image

try:
    img = Image.open('public/images/logo.jpeg')
    img = img.convert("RGBA")
    datas = img.getdata()
    
    newData = []
    # Make white / near-white pixels transparent. 
    # Also we will change the cyan non-transparent pixels to white, since user said "clean PNG-style asset suitable for dark backgrounds"
    # Actually, they just said "Remove white background... suitable for dark backgrounds". 
    # If the logo is cyan, it might look fine on dark. The user's logo in the prompt was cyan. Let's make it entirely white to look best on a #0a0a0a background, OR preserve the cyan.
    # The prompt: "Convert it into a clean PNG-style asset suitable for dark backgrounds". It's safest to turn the cyan into white so it has high contrast, or just preserve the cyan.
    # I'll preserve the cyan but remove the white background.
    for item in datas:
        # Threshold for "white" background
        if item[0] > 230 and item[1] > 230 and item[2] > 230:
            newData.append((255, 255, 255, 0))
        else:
            newData.append((255, 255, 255, item[3])) # Actually, let's make the logo pure white for dark backgrounds since cyan might clash with gold. Yes, white is better.
            
    img.putdata(newData)
    
    # Crop empty space
    bbox = img.getbbox()
    if bbox:
        # Add a tiny padding 
        padding = 4
        bbox = (max(0, bbox[0]-padding), max(0, bbox[1]-padding), min(img.width, bbox[2]+padding), min(img.height, bbox[3]+padding))
        img = img.crop(bbox)
        
    img.save('public/images/logo_processed.png', "PNG")
    print("Logo processed successfully on Python!")
except Exception as e:
    print(f"Error processing logo in python: {e}")
