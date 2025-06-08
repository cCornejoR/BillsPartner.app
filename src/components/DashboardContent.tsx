"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  ArrowUpRight,
  Heart,
  Eye,
  EyeOff,
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
  Target
} from "lucide-react";
import { CreditCardComponent } from "@/components/CreditCardComponent";
import { ExpenseTracker } from "@/components/ExpenseTracker";
import { AddExpenseModal } from "@/components/AddExpenseModal";
import { formatCurrency } from "@/lib/utils";
import { useFinancialData } from "@/hooks/useFinancialData";

export function DashboardContent() {
  const { financialData, isLoading } = useFinancialData();
  const [showBalance, setShowBalance] = useState(true);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const vacationProgress = (financialData.savingsGoal.vacations.current / financialData.savingsGoal.vacations.target) * 100;
  const foodProgress = (financialData.savingsGoal.food.current / financialData.savingsGoal.food.target) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex -space-x-2">
            <Avatar className="border-3 border-white transition-transform hover:scale-105 shadow-lg">
              <AvatarFallback className="bg-gradient-to-r from-pink-400 to-pink-600 text-white font-bold">K</AvatarFallback>
            </Avatar>
            <Avatar className="border-3 border-white transition-transform hover:scale-105 shadow-lg">
              <AvatarFallback className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold">C</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">¡Hola Kely & Crhistian!</h1>
            <p className="text-sm text-gray-600">Te amo bebé, vamos por esos sueños juntos 💕</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Heart className="w-6 h-6 text-pink-500 fill-current animate-pulse" />
          <span className="text-xs text-gray-500">Jun 2025</span>
        </div>
      </div>

      {/* Balance Overview */}
      <Card className="glass-card shadow-xl border-0 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wallet className="w-5 h-5 text-gray-600" />
              <CardTitle className="text-sm font-medium text-gray-600">Balance Total</CardTitle>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:bg-white/30"
              onClick={() => setShowBalance(!showBalance)}
            >
              {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {showBalance ? formatCurrency(financialData.balance) : "S/ ••••••"}
              </p>
              <p className="text-sm text-gray-600 mt-1">Disponible para gastar</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-xl bg-green-50 border border-green-100">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <p className="text-lg font-semibold text-green-600">
                    +{formatCurrency(financialData.monthlyIncome)}
                  </p>
                </div>
                <p className="text-xs text-gray-500">Ingresos del mes</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-red-50 border border-red-100">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <TrendingDown className="w-4 h-4 text-red-600" />
                  <p className="text-lg font-semibold text-red-600">
                    -{formatCurrency(financialData.monthlyExpenses)}
                  </p>
                </div>
                <p className="text-xs text-gray-500">Gastos del mes</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button 
          className="h-auto p-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 border-0 transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
          onClick={() => setShowAddExpenseModal(true)}
        >
          <div className="flex flex-col items-center space-y-2">
            <Plus className="w-7 h-7" />
            <span className="text-sm font-medium">Agregar Gasto</span>
          </div>
        </Button>
        <Button 
          variant="outline" 
          className="h-auto p-6 glass-card border-2 border-blue-200 hover:border-blue-300 transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
        >
          <div className="flex flex-col items-center space-y-2">
            <ArrowUpRight className="w-7 h-7 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Agregar Ingreso</span>
          </div>
        </Button>
      </div>

      {/* Monthly Goals Progress */}
      <Card className="glass-card shadow-xl border-0 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm animate-slide-up" style={{animationDelay: '0.1s'}}>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-gray-600" />
            <CardTitle className="text-lg">Objetivos del Mes</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2">
                <PiggyBank className="w-4 h-4 text-pink-500" />
                <span className="text-sm font-medium">Ahorro para Vacaciones</span>
              </div>
              <Badge variant="secondary" className="bg-gradient-to-r from-pink-100 to-pink-200 text-pink-700 border-pink-200">
                {Math.round(vacationProgress)}%
              </Badge>
            </div>
            <Progress value={vacationProgress} className="h-3 mb-2" />
            <p className="text-xs text-gray-500">
              {formatCurrency(financialData.savingsGoal.vacations.current)} de {formatCurrency(financialData.savingsGoal.vacations.target)}
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg">🍽️</span>
                <span className="text-sm font-medium">Presupuesto Comida</span>
              </div>
              <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border-blue-200">
                {Math.round(foodProgress)}%
              </Badge>
            </div>
            <Progress value={foodProgress} className="h-3 mb-2" />
            <p className="text-xs text-gray-500">
              {formatCurrency(financialData.savingsGoal.food.current)} de {formatCurrency(financialData.savingsGoal.food.target)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Credit Card */}
      <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
        <CreditCardComponent />
      </div>

      {/* Recent Activity */}
      <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
        <ExpenseTracker />
      </div>

      {/* Add Expense Modal */}
      <AddExpenseModal 
        open={showAddExpenseModal} 
        onOpenChange={setShowAddExpenseModal} 
      />
    </div>
  );
}
