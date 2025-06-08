"use client";

import { useState } from "react";
import {
  Home,
  CreditCard,
  ShoppingBag,
  Target,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const navItems: NavItem[] = [
  { id: "dashboard", icon: Home, label: "Inicio" },
  { id: "expenses", icon: TrendingUp, label: "Gastos" },
  { id: "card", icon: CreditCard, label: "Tarjeta" },
  { id: "shopping", icon: ShoppingBag, label: "Compras" },
  { id: "goals", icon: Target, label: "Objetivos" },
];

interface MobileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function MobileNavigation({ activeTab, onTabChange }: MobileNavigationProps) {
  return (
    <nav className="mobile-nav">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 relative",
                isActive
                  ? "text-gradient-pink-500"
                  : "text-gray-500 hover:text-gradient-pink-400"
              )}
            >
              <Icon
                className={cn(
                  "w-6 h-6 mb-1",
                  isActive && "drop-shadow-sm"
                )}
              />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-primary rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
