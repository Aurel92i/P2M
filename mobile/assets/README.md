# Assets Directory

This directory contains the application's visual assets.

## Required Files

The following files are referenced in `app.config.ts` and must be created:

### 1. **icon.png**
- Application icon
- Recommended size: 1024x1024 pixels
- Format: PNG with transparency
- Used for: App icon on home screen

### 2. **splash.png**
- Splash screen image displayed during app launch
- Recommended size: 1284x2778 pixels (iPhone 13 Pro Max)
- Format: PNG
- Background color in config: #2563EB (blue)

### 3. **notification-icon.png**
- Icon shown in push notifications
- Recommended size: 96x96 pixels
- Format: PNG with transparency
- Should be simple and monochromatic

## How to Add Icons

### Quick Start (Placeholder Icons)
1. Create simple colored squares for testing:
   - icon.png: 1024x1024 blue square
   - splash.png: 1284x2778 blue square with "P2M" text
   - notification-icon.png: 96x96 white icon on transparent background

### Production Icons
1. Design your icons or hire a designer
2. Use tools like:
   - [Figma](https://figma.com) - Design tool
   - [Icon Kitchen](https://icon.kitchen) - Generate app icons
   - [makeappicon.com](https://makeappicon.com) - Generate all sizes
3. Replace placeholder files with your designs

## Notes
- Icons are loaded by Expo at build time
- Changes to icons require rebuilding the app
- Use high-resolution images for best quality on all devices
