"use client";

import { useState } from "react";
import { MobileNavigation } from "@/components/MobileNavigation";
import { AuthWrapper } from "@/components/AuthWrapper";
import Dashboard from "./page";
import { ExpenseTracker } from "@/components/ExpenseTracker";
import { CreditCardComponent } from "@/components/CreditCardComponent";
import { ShoppingPlans } from "@/components/ShoppingPlans";
import { FinancialGoals } from "@/components/FinancialGoals";

export default function ClientWrapper() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "expenses":
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-2xl font-bold gradient-text">Gastos Detallados</h1>
              <p className="text-gray-600 text-sm">Analicen sus patrones de gasto</p>
            </div>
            <ExpenseTracker />
          </div>
        );
      case "card":
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-2xl font-bold gradient-text">Tarjeta CoupleCard</h1>
              <p className="text-gray-600 text-sm">Gestionen sus límites y gastos</p>
            </div>
            <CreditCardComponent />
          </div>
        );
      case "shopping":
        return (
          <div className="animate-fade-in">
            <ShoppingPlans />
          </div>
        );
      case "goals":
        return (
          <div className="animate-fade-in">
            <FinancialGoals />
          </div>
        );
      default:
        return <Dashboard />;
    }
  };
  return (
    <AuthWrapper>
      <main className="pb-20 pt-6 px-4 max-w-md mx-auto">
        {renderContent()}
      </main>
      <MobileNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </AuthWrapper>
  );
}
