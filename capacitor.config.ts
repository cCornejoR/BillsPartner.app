import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pareja.app',
  appName: 'App Pareja',
  webDir: 'out',
  server: {
    iosScheme: 'https'
  },
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#ffffff',
    allowsLinkPreview: false,
    limitsNavigationsToAppBoundDomains: false,
    scheme: 'App-Pareja'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#ffffff",
      showSpinner: false,
      iosSpinnerStyle: "small",
      spinnerColor: "#007AFF",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: false,
    },
    StatusBar: {
      style: 'light',
      backgroundColor: '#ffffff',
    },
    Keyboard: {
      resizeOnFullScreen: true,
    },
    App: {
      statusTapScrollsToTop: true,
    },
  },
};

export default config;
