"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatCurrency } from "@/lib/utils";
import {
  ShoppingCart,
  Coffee,
  Car,
  Home,
  Utensils,
  MoreHorizontal
} from "lucide-react";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  user: "K" | "C";
  currency: "PEN" | "USD";
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const recentExpenses: Expense[] = [
  {
    id: "1",
    description: "Supermercado Metro",
    amount: -125.50,
    category: "Comida",
    date: "Hoy, 2:30 PM",
    user: "K",
    currency: "PEN",
    icon: ShoppingCart,
    color: "text-green-600"
  },
  {
    id: "2",
    description: "Starbucks",
    amount: -45.00,
    category: "Café",
    date: "Hoy, 10:15 AM",
    user: "C",
    currency: "PEN",
    icon: Coffee,
    color: "text-amber-600"
  },
  {
    id: "3",
    description: "Gasolina Primax",
    amount: -80.00,
    category: "Transporte",
    date: "Ayer, 6:45 PM",
    user: "C",
    currency: "PEN",
    icon: Car,
    color: "text-blue-600"
  },
  {
    id: "4",
    description: "Cena Romántica",
    amount: -95.00,
    category: "Restaurante",
    date: "Ayer, 8:30 PM",
    user: "K",
    currency: "USD",
    icon: Utensils,
    color: "text-red-600"
  },
  {
    id: "5",
    description: "Pago Alquiler",
    amount: -1200.00,
    category: "Hogar",
    date: "2 días",
    user: "C",
    currency: "PEN",
    icon: Home,
    color: "text-purple-600"
  }
];

export function ExpenseTracker() {
  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Actividad Reciente</CardTitle>
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentExpenses.map((expense) => {
          const Icon = expense.icon;
          return (
            <div key={expense.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/50 transition-colors">
              {/* Icon */}
              <div className={`p-2 rounded-full bg-gray-100 ${expense.color}`}>
                <Icon className="w-4 h-4" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800 text-sm truncate">
                      {expense.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs px-2 py-0.5">
                        {expense.category}
                      </Badge>
                      <span className="text-xs text-gray-500">{expense.date}</span>
                    </div>
                  </div>                  <div className="text-right ml-2">
                    <p className="font-semibold text-red-600 text-sm">
                      {formatCurrency(expense.amount, expense.currency)}
                    </p>
                    <div className="flex items-center justify-end space-x-1 mt-1">
                      <Avatar className="w-4 h-4">
                        <AvatarFallback className={`text-xs ${
                          expense.user === 'K'
                            ? 'bg-gradient-pink-500 text-white'
                            : 'bg-gradient-blue-500 text-white'
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
        })}        {/* Summary */}
        <div className="border-t border-gray-200 pt-3 mt-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Total gastos (últimos 7 días)</span>
            <span className="font-semibold text-red-600">
              {formatCurrency(recentExpenses.reduce((total, expense) => total + expense.amount, 0))}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
