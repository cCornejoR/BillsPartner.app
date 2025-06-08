# App Icon and Splash Screen Guide

To complete your mobile app setup, you'll need to create app icons and splash screens:

## App Icons Required:

### Android:
- Place icons in `android/app/src/main/res/`
- Required sizes:
  - `mipmap-hdpi/ic_launcher.png` (72x72)
  - `mipmap-mdpi/ic_launcher.png` (48x48)
  - `mipmap-xhdpi/ic_launcher.png` (96x96)
  - `mipmap-xxhdpi/ic_launcher.png` (144x144)
  - `mipmap-xxxhdpi/ic_launcher.png` (192x192)

### iOS:
- Place icons in `ios/App/App/Assets.xcassets/AppIcon.appiconset/`
- Required sizes: 20x20, 29x29, 40x40, 58x58, 60x60, 76x76, 80x80, 87x87, 120x120, 152x152, 167x167, 180x180, 1024x1024

## Splash Screens:
- Android: Place in `android/app/src/main/res/drawable/`
- iOS: Configure in `ios/App/App/Assets.xcassets/Splash.imageset/`

## Quick Generation:
You can use online tools like:
- https://appicon.co/
- https://apetools.webprofusion.com/app/#/tools/imagegorilla
- Capacitor Asset Generator: `npm install -g @capacitor/assets`

## Commands to build and run:
```bash
# Build and sync
npm run build:mobile

# Open in Android Studio
npm run cap:open:android

# Open in Xcode (macOS only)
npm run cap:open:ios

# Run on device/emulator
npm run cap:run:android
npm run cap:run:ios
```
