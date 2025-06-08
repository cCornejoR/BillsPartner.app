"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DollarSign, Check, TrendingUp, TrendingDown, X } from "lucide-react";
import { useFinancialData } from "@/hooks/useFinancialData";

interface AddExpenseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ExpenseFormData {
  description: string;
  amount: string;
  category: string;
  user: "K" | "C";
  isIncome: boolean;
}

const categories = [
  { value: "Comida", label: "Comida", icon: "🍽️" },
  { value: "Transporte", label: "Transporte", icon: "🚗" },
  { value: "Entretenimiento", label: "Entretenimiento", icon: "🎬" },
  { value: "Hogar", label: "Hogar", icon: "🏠" },
  { value: "Salud", label: "Salud", icon: "⚕️" },
  { value: "Ropa", label: "Ropa", icon: "👕" },
  { value: "Café", label: "Café", icon: "☕" },
  { value: "Restaurante", label: "Restaurante", icon: "🍽️" },
  { value: "Otros", label: "Otros", icon: "📦" },
];

export function AddExpenseModal({ open, onOpenChange }: AddExpenseModalProps) {
  const { addExpense, addIncome } = useFinancialData();
  const [formData, setFormData] = useState<ExpenseFormData>({
    description: "",
    amount: "",
    category: "",
    user: "K",
    isIncome: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.description || !formData.amount) {
        alert("Por favor completa todos los campos requeridos");
        return;
      }

      if (!formData.isIncome && !formData.category) {
        alert("Por favor selecciona una categoría para el gasto");
        return;
      }

      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        alert("Por favor ingresa un monto válido");
        return;
      }

      if (formData.isIncome) {
        addIncome(amount, formData.description, formData.user);
      } else {
        addExpense({
          description: formData.description,
          amount: -amount,
          category: formData.category,
          date: new Date().toLocaleString("es-PE", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit"
          }),
          user: formData.user,
        });
      }

      setFormData({
        description: "",
        amount: "",
        category: "",
        user: "K",
        isIncome: false,
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Error al agregar la transacción");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
              {formData.isIncome ? "Agregar Ingreso" : "Agregar Gasto"}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant={!formData.isIncome ? "default" : "outline"}
              className={`h-auto p-4 ${
                !formData.isIncome 
                  ? "bg-gradient-to-r from-red-500 to-red-600" 
                  : "border-red-200 text-red-600"
              }`}
              onClick={() => setFormData({ ...formData, isIncome: false })}
            >
              <div className="flex flex-col items-center space-y-1">
                <TrendingDown className="w-5 h-5" />
                <span className="text-sm">Gasto</span>
              </div>
            </Button>
            <Button
              type="button"
              variant={formData.isIncome ? "default" : "outline"}
              className={`h-auto p-4 ${
                formData.isIncome 
                  ? "bg-gradient-to-r from-green-500 to-green-600" 
                  : "border-green-200 text-green-600"
              }`}
              onClick={() => setFormData({ ...formData, isIncome: true })}
            >
              <div className="flex flex-col items-center space-y-1">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm">Ingreso</span>
              </div>
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Descripción
            </Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={formData.isIncome ? "Ej: Sueldo, freelance..." : "Ej: Supermercado, gasolina..."}
              className="border-gray-200 focus:border-pink-300 focus:ring-pink-200"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
              Monto (Soles)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">S/</span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
                className="pl-10 border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                required
              />
            </div>
          </div>

          {!formData.isIncome && (
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                Categoría
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                required
              >
                <SelectTrigger className="border-gray-200 focus:border-pink-300 focus:ring-pink-200">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center space-x-2">
                        <span>{category.icon}</span>
                        <span>{category.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">¿Quién realizó la transacción?</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant={formData.user === "K" ? "default" : "outline"}
                className={`h-auto p-4 ${
                  formData.user === "K" 
                    ? "bg-gradient-to-r from-pink-500 to-pink-600" 
                    : "border-pink-200 text-pink-600"
                }`}
                onClick={() => setFormData({ ...formData, user: "K" })}
              >
                <div className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-gradient-to-r from-pink-400 to-pink-600 text-white text-xs">
                      K
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">Kely</span>
                </div>
              </Button>
              <Button
                type="button"
                variant={formData.user === "C" ? "default" : "outline"}
                className={`h-auto p-4 ${
                  formData.user === "C" 
                    ? "bg-gradient-to-r from-blue-500 to-blue-600" 
                    : "border-blue-200 text-blue-600"
                }`}
                onClick={() => setFormData({ ...formData, user: "C" })}
              >
                <div className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xs">
                      C
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">Crhistian</span>
                </div>
              </Button>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-gray-200 text-gray-600"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 ${
                formData.isIncome
                  ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  : "bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Guardando...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4" />
                  <span>{formData.isIncome ? "Agregar Ingreso" : "Agregar Gasto"}</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
