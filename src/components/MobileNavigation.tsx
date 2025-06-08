"use client";

import {
  Home,
  CreditCard,
  ShoppingBag,
  Target,
  TrendingUp,
  Wallet
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface NavItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  shortLabel?: string; // For smaller screens
}

const navItems: NavItem[] = [
  { id: "dashboard", icon: Home, label: "Inicio", shortLabel: "Inicio" },
  { id: "budget", icon: Wallet, label: "Presupuesto", shortLabel: "Presup." },
  { id: "accounts", icon: CreditCard, label: "Cuentas", shortLabel: "Cuentas" },
  { id: "shopping", icon: ShoppingBag, label: "Compras", shortLabel: "Compras" },
  { id: "goals", icon: Target, label: "Metas", shortLabel: "Metas" },
];

interface MobileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function MobileNavigation({ activeTab, onTabChange }: MobileNavigationProps) {
  const [screenWidth, setScreenWidth] = useState(0);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const updateScreenInfo = () => {
      setScreenWidth(window.innerWidth);
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    // Initial setup
    updateScreenInfo();

    // Listen for resize and orientation changes
    window.addEventListener('resize', updateScreenInfo);
    window.addEventListener('orientationchange', () => {
      setTimeout(updateScreenInfo, 100); // Delay to ensure dimensions are updated
    });

    return () => {
      window.removeEventListener('resize', updateScreenInfo);
      window.removeEventListener('orientationchange', updateScreenInfo);
    };
  }, []);

  // Add haptic feedback for tab changes
  const handleTabChange = async (tab: string) => {
    // Try to trigger haptic feedback if available
    try {
      if ('vibrate' in navigator) {
        navigator.vibrate(10); // Short vibration
      }
    } catch (error) {
      // Silently fail if vibration is not supported
    }
    
    onTabChange(tab);
  };

  // Determine if we should show compact layout
  const isCompact = screenWidth > 0 && screenWidth < 375; // iPhone SE and smaller
  const isVerySmall = screenWidth > 0 && screenWidth < 320; // Very small screens
  const shouldShowLabels = !isLandscape || screenWidth >= 768; // Hide labels in landscape on phones

  return (
    <nav className={cn(
      "mobile-nav",
      "fixed bottom-0 left-0 right-0 z-50",
      "bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl",
      "transition-all duration-300 ease-in-out",
      isLandscape && screenWidth < 768 ? "py-1" : "py-2", // Compact in landscape
    )}>
      <div className={cn(
        "flex items-center justify-around",
        isCompact ? "px-1" : "px-2",
        isLandscape && screenWidth < 768 ? "py-1" : "py-2"
      )}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const displayLabel = isCompact && item.shortLabel ? item.shortLabel : item.label;

          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={cn(
                "nav-button flex flex-col items-center justify-center",
                "rounded-xl transition-all duration-300 ease-out relative",
                "touch-manipulation select-none",
                // Responsive sizing
                isVerySmall ? "p-1 min-w-[40px]" : isCompact ? "p-1.5 min-w-[50px]" : "p-2 min-w-[60px]",
                isLandscape && screenWidth < 768 ? "min-h-[40px]" : "min-h-[48px]",                // Active/inactive states
                isActive
                  ? "nav-button-active text-pink-500 scale-105"
                  : "nav-button-inactive text-gray-500 hover:text-pink-400 hover:bg-gray-50/30 active:scale-95",
                // Enhanced responsiveness
                "transform-gpu", // Use GPU for animations
                "will-change-transform", // Optimize for animations
              )}
              aria-label={item.label}
              role="tab"
              aria-selected={isActive}
            >
              {/* Active indicator dot */}
              {isActive && (
                <div className={cn(
                  "nav-indicator absolute rounded-full bg-pink-500",
                  isLandscape && screenWidth < 768 ? "w-1 h-1 -top-0.5" : "w-1 h-1 -top-1",
                  "left-1/2 transform -translate-x-1/2"
                )} />
              )}
                {/* Icon with responsive sizing */}
              <Icon
                className={cn(
                  "transition-all duration-300",
                  isVerySmall ? "w-4 h-4" : isCompact ? "w-4 h-4" : "w-5 h-5",
                  shouldShowLabels ? "mb-1" : "mb-0",
                  isActive && "drop-shadow-sm scale-105"
                )}
              />
              
              {/* Responsive label */}
              {shouldShowLabels && (
                <span 
                  className={cn(
                    "transition-all duration-300 text-center leading-tight",
                    isVerySmall ? "text-[10px]" : isCompact ? "text-[11px]" : "text-xs",
                    "font-medium",
                    isActive ? "font-semibold" : "font-normal",
                    "max-w-full truncate"
                  )}
                >
                  {displayLabel}
                </span>
              )}
                {/* Background highlight for active state - subtle */}
              {isActive && (
                <div className="absolute inset-0 bg-pink-500/5 rounded-xl -z-10" />
              )}
            </button>
          );
        })}
      </div>
      
      {/* Home indicator line for iOS-like appearance - responsive */}
      <div className={cn(
        "flex justify-center",
        isLandscape && screenWidth < 768 ? "pb-0.5" : "pb-1"
      )}>
        <div className={cn(
          "bg-gray-300 rounded-full opacity-40",
          isLandscape && screenWidth < 768 ? "w-20 h-0.5" : "w-32 h-1"
        )} />
      </div>
    </nav>
  );
}
