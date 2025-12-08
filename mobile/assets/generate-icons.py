#!/usr/bin/env python3
"""
Generate placeholder icons for the P2M mobile app
These are temporary placeholders - replace with your actual app icons
"""
from PIL import Image, ImageDraw, ImageFont
import os

# Colors
BLUE = (37, 99, 235)  # #2563EB from app.config.ts
WHITE = (255, 255, 255)

def create_icon():
    """Create app icon (1024x1024)"""
    size = (1024, 1024)
    img = Image.new('RGB', size, BLUE)
    draw = ImageDraw.Draw(img)

    # Draw a simple white circle in the center
    margin = 200
    draw.ellipse([margin, margin, 1024-margin, 1024-margin], fill=WHITE)

    # Try to add text
    try:
        # Try to use a large font
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 200)
    except:
        # Fallback to default font
        font = ImageFont.load_default()

    # Draw "P2M" text
    text = "P2M"
    # Get text size
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    # Center text
    x = (1024 - text_width) // 2
    y = (1024 - text_height) // 2

    draw.text((x, y), text, fill=BLUE, font=font)

    img.save('/home/user/P2M/mobile/assets/icon.png', 'PNG')
    print("✓ Created icon.png (1024x1024)")

def create_splash():
    """Create splash screen (1284x2778)"""
    size = (1284, 2778)
    img = Image.new('RGB', size, BLUE)
    draw = ImageDraw.Draw(img)

    # Draw white rectangle in center
    margin_x = 200
    margin_y = 800
    draw.rectangle([margin_x, margin_y, 1284-margin_x, 2778-margin_y], fill=WHITE)

    # Try to add text
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 150)
    except:
        font = ImageFont.load_default()

    # Draw "P2M" text
    text = "P2M"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    x = (1284 - text_width) // 2
    y = (2778 - text_height) // 2

    draw.text((x, y), text, fill=BLUE, font=font)

    img.save('/home/user/P2M/mobile/assets/splash.png', 'PNG')
    print("✓ Created splash.png (1284x2778)")

def create_notification_icon():
    """Create notification icon (96x96)"""
    size = (96, 96)
    # Notification icons should be simple and monochrome
    img = Image.new('RGBA', size, (0, 0, 0, 0))  # Transparent background
    draw = ImageDraw.Draw(img)

    # Draw a simple white bell shape or just "P2M"
    # For simplicity, draw a white circle
    margin = 10
    draw.ellipse([margin, margin, 96-margin, 96-margin], fill=WHITE)

    # Add "P2M" in blue
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 24)
    except:
        font = ImageFont.load_default()

    text = "P2M"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    x = (96 - text_width) // 2
    y = (96 - text_height) // 2

    draw.text((x, y), text, fill=BLUE, font=font)

    img.save('/home/user/P2M/mobile/assets/notification-icon.png', 'PNG')
    print("✓ Created notification-icon.png (96x96)")

if __name__ == '__main__':
    print("\n🎨 Creating placeholder icons for P2M mobile app...")
    print("=" * 50)

    create_icon()
    create_splash()
    create_notification_icon()

    print("=" * 50)
    print("\n✅ All placeholder icons created successfully!")
    print("\n⚠️  IMPORTANT: These are temporary placeholders.")
    print("   Replace them with your actual app icons before releasing.")
    print("\n📁 Files created in: /home/user/P2M/mobile/assets/")
    print("   - icon.png (1024x1024)")
    print("   - splash.png (1284x2778)")
    print("   - notification-icon.png (96x96)")
    print()
