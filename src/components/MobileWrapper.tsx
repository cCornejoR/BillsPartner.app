'use client';

import { useEffect, useState } from 'react';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { App } from '@capacitor/app';
import { Keyboard } from '@capacitor/keyboard';
import { Device } from '@capacitor/device';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

interface MobileWrapperProps {
  children: React.ReactNode;
}

export default function MobileWrapper({ children }: MobileWrapperProps) {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const setupiOS = async () => {
      try {
        // Check if running on iOS
        const info = await Device.getInfo();
        const isiOSDevice = info.platform === 'ios';
        setIsIOS(isiOSDevice);

        if (isiOSDevice) {
          // Configure status bar for iOS
          await StatusBar.setStyle({ style: Style.Light });
          await StatusBar.setBackgroundColor({ color: '#ffffff' });
          await StatusBar.show();

          // Hide splash screen after app is ready
          setTimeout(async () => {
            await SplashScreen.hide();
          }, 1500);

          // Handle app state changes
          App.addListener('appStateChange', ({ isActive }) => {
            console.log('App state changed. Is active?', isActive);
            if (isActive) {
              StatusBar.show();
            }
          });

          // Handle app URL open events
          App.addListener('appUrlOpen', (event) => {
            console.log('App opened via URL:', event.url);
          });

          // Handle iOS keyboard events
          Keyboard.addListener('keyboardWillShow', (info) => {
            document.documentElement.style.setProperty('--keyboard-height', `${info.keyboardHeight}px`);
            document.body.classList.add('keyboard-visible');
          });

          Keyboard.addListener('keyboardWillHide', () => {
            document.documentElement.style.setProperty('--keyboard-height', '0px');
            document.body.classList.remove('keyboard-visible');
          });

          // Add haptic feedback for interactions
          document.addEventListener('touchstart', async (e) => {
            const target = e.target as HTMLElement;
            if (target.matches('button, .clickable, [role="button"]')) {
              try {
                await Haptics.impact({ style: ImpactStyle.Light });
              } catch (error) {
                console.log('Haptic feedback not available:', error);
              }
            }
          });
        }
      } catch (error) {
        console.log('Error setting up iOS features:', error);
      }
    };

    setupiOS();

    return () => {
      // Cleanup listeners
      if (isIOS) {
        App.removeAllListeners();
        Keyboard.removeAllListeners();
      }
    };
  }, [isIOS]);

  return (
    <div 
      className={`min-h-screen ${isIOS ? 'ios-app safe-area-support' : ''}`}
      style={{
        paddingTop: isIOS ? `env(safe-area-inset-top)` : '0',
        paddingBottom: isIOS ? `env(safe-area-inset-bottom)` : '0',
        paddingLeft: isIOS ? `env(safe-area-inset-left)` : '0',
        paddingRight: isIOS ? `env(safe-area-inset-right)` : '0',
      }}
    >
      {children}
    </div>
  );
}
