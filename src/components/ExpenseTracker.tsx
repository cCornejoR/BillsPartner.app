"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatCurrency } from "@/lib/utils";
import { useFinancialData } from "@/hooks/useFinancialData";
import {
  ShoppingCart,
  Coffee,
  Car,
  Home,
  Utensils,
  MoreHorizontal,
  Plus,
  TrendingUp,
  Receipt,
  Gamepad2,
  Heart,
  Shirt
} from "lucide-react";

const categoryIcons = {
  "Comida": ShoppingCart,
  "Café": Coffee,
  "Transporte": Car,
  "Hogar": Home,
  "Restaurante": Utensils,
  "Ingreso": TrendingUp,
  "Entretenimiento": Gamepad2,
  "Salud": Heart,
  "Ropa": Shirt,
  "Otros": Receipt
};

const categoryColors = {
  "Comida": "text-green-600",
  "Café": "text-amber-600",
  "Transporte": "text-blue-600",
  "Restaurante": "text-red-600",
  "Hogar": "text-purple-600",
  "Ingreso": "text-emerald-600",
  "Entretenimiento": "text-orange-600",
  "Salud": "text-pink-600",
  "Ropa": "text-indigo-600",
  "Otros": "text-gray-600"
};

export function ExpenseTracker() {
  const { getRecentExpenses, isLoading } = useFinancialData();
  const recentExpenses = getRecentExpenses();

  if (isLoading) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-20">
            <div className="w-6 h-6 border-2 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (recentExpenses.length === 0) {
    return (
      <Card className="glass-card shadow-xl border-0 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Receipt className="w-5 h-5 text-gray-600" />
              <CardTitle className="text-lg">Actividad Reciente</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Plus className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No hay transacciones aún</p>
            <p className="text-gray-400 text-xs mt-1">¡Agreguen su primer gasto o ingreso!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card shadow-xl border-0 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Receipt className="w-5 h-5 text-gray-600" />
            <CardTitle className="text-lg">Actividad Reciente</CardTitle>
          </div>
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentExpenses.map((expense) => {
          const Icon = categoryIcons[expense.category as keyof typeof categoryIcons] || Receipt;
          const iconColor = categoryColors[expense.category as keyof typeof categoryColors] || "text-gray-600";
          
          return (
            <div key={expense.id} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/70 transition-all duration-200 border border-white/30">
              <div className={`p-2.5 rounded-full bg-white/80 shadow-sm ${iconColor}`}>
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm truncate">
                      {expense.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge 
                        variant="secondary" 
                        className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 border-gray-200"
                      >
                        {expense.category}
                      </Badge>
                      <span className="text-xs text-gray-500">{expense.date}</span>
                    </div>
                  </div>
                  
                  <div className="text-right ml-3">
                    <p className={`font-semibold text-sm ${
                      expense.amount >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {expense.amount >= 0 ? '+' : ''}{formatCurrency(expense.amount)}
                    </p>
                    <div className="flex items-center justify-end mt-1">
                      <Avatar className="w-5 h-5 border border-white">
                        <AvatarFallback className={`text-xs text-white ${
                          expense.user === 'K' 
                            ? 'bg-gradient-to-r from-pink-400 to-pink-600' 
                            : 'bg-gradient-to-r from-blue-400 to-blue-600'
                        }`}>
                          {expense.user}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
