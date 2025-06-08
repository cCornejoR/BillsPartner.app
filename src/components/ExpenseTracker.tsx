"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useFinancialData, Expense } from "@/hooks/useFinancialData";
import { EditExpenseModal } from "@/components/EditExpenseModal";
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
  Shirt,
  ArrowUpRight,
  ArrowDownRight,
  Edit,
  Trash2
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
  const { getRecentExpenses, isLoading, financialData, updateExpense, deleteExpense } = useFinancialData();
  const recentExpenses = getRecentExpenses();

  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setShowEditModal(true);
  };

  const handleSaveExpense = (id: string, expenseData: Omit<Expense, "id" | "timestamp">) => {
    updateExpense(id, expenseData);
    setShowEditModal(false);
    setEditingExpense(null);
  };

  const handleDeleteExpense = (expenseId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta transacción?")) {
      deleteExpense(expenseId);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card className="glass-card border-0 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-20">
              <div className="w-6 h-6 border-2 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calcular totales basados en las transacciones recientes
  const totalExpenses = recentExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  if (recentExpenses.length === 0) {
    return (
      <div className="space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="glass-card border-0 bg-gradient-to-br from-green-50/90 to-green-100/70 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-full bg-green-100">
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Ingresos</p>
                  <p className="text-sm font-semibold text-green-600">
                    {formatCurrency(financialData.monthlyIncome)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-0 bg-gradient-to-br from-red-50/90 to-red-100/70 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-full bg-red-100">
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Gastos</p>
                  <p className="text-sm font-semibold text-red-500">
                    {formatCurrency(financialData.monthlyExpenses)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Empty State */}
        <Card className="glass-card border-0 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No hay transacciones</h3>
              <p className="text-gray-500 text-sm mb-4">¡Agreguen su primera transacción para comenzar!</p>
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
                <span>Toquen el botón</span>
                <Plus className="w-3 h-3" />
                <span>para agregar</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="glass-card border-0 bg-gradient-to-br from-green-50/90 to-green-100/70 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-green-100">
                <ArrowUpRight className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Ingresos</p>
                <p className="text-sm font-semibold text-green-600">
                  {formatCurrency(financialData.monthlyIncome)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-0 bg-gradient-to-br from-red-50/90 to-red-100/70 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-red-100">
                <ArrowDownRight className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Gastos</p>
                <p className="text-sm font-semibold text-red-500">
                  {formatCurrency(totalExpenses)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="glass-card border-0 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Receipt className="w-5 h-5 text-gray-600" />
              <CardTitle className="text-base">Actividad Reciente</CardTitle>
            </div>
            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
              {recentExpenses.length} transacciones
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 max-h-80 overflow-y-auto">
          {recentExpenses.map((expense) => {
            const IconComponent = categoryIcons[expense.category as keyof typeof categoryIcons] || Receipt;
            const colorClass = categoryColors[expense.category as keyof typeof categoryColors] || "text-gray-600";

            return (
              <div key={expense.id} className="flex items-center space-x-3 p-3 rounded-xl bg-white/50 hover:bg-white/80 transition-all duration-200 border border-white/30">
                <div className={`p-2.5 rounded-full bg-white shadow-sm ${colorClass}`}>
                  <IconComponent className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm truncate">
                        {expense.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge 
                          variant="outline" 
                          className="text-xs px-2 py-0.5 bg-gray-50 text-gray-600 border-gray-200"
                        >
                          {expense.category}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(expense.date).toLocaleDateString("es-PE", { 
                            day: "numeric", 
                            month: "short" 
                          })}
                        </span>
                      </div>
                    </div>
                      <div className="text-right ml-3">
                      <p className={`font-semibold text-sm ${
                        expense.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {expense.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(expense.amount))}
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
                </div>                {/* Edit/Delete Buttons */}
                <div className="flex space-x-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEditExpense(expense)}
                    className="p-2 h-8 w-8 rounded-full"
                  >
                    <Edit className="w-3 h-3 text-gray-700" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDeleteExpense(expense.id)}
                    className="p-2 h-8 w-8 rounded-full text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>      {/* Edit Expense Modal */}
      <EditExpenseModal 
        isOpen={showEditModal}
        expense={editingExpense} 
        onClose={() => {
          setShowEditModal(false);
          setEditingExpense(null);
        }}
        onSave={handleSaveExpense}
      />
    </div>
  );
}
