"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, DollarSign } from "lucide-react";
import toast from "react-hot-toast";

interface ExpenseFormData {
  description: string;
  amount: string;
  category: string;
  user: "K" | "C";
  currency: "PEN" | "USD";
  notes: string;
}

const categories = [
  { value: "comida", label: "Comida", icon: "🍽️" },
  { value: "transporte", label: "Transporte", icon: "🚗" },
  { value: "entretenimiento", label: "Entretenimiento", icon: "🎬" },
  { value: "hogar", label: "Hogar", icon: "🏠" },
  { value: "salud", label: "Salud", icon: "⚕️" },
  { value: "compras", label: "Compras", icon: "🛍️" },
  { value: "servicios", label: "Servicios", icon: "⚡" },
  { value: "otros", label: "Otros", icon: "📦" },
];

interface AddExpenseModalProps {
  onAddExpense?: (expense: ExpenseFormData) => void;
}

export function AddExpenseModal({ onAddExpense }: AddExpenseModalProps) {
  const [open, setOpen] = useState(false);  const [formData, setFormData] = useState<ExpenseFormData>({
    description: "",
    amount: "",
    category: "",
    user: "K",
    currency: "PEN",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.description || !formData.amount || !formData.category) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Por favor ingresa un monto válido");
      return;
    }

    // Simulate adding expense
    onAddExpense?.(formData);
    toast.success("¡Gasto agregado exitosamente!");    // Reset form
    setFormData({
      description: "",
      amount: "",
      category: "",
      user: "K",
      currency: "PEN",
      notes: "",
    });

    setOpen(false);
  };

  const handleInputChange = (field: keyof ExpenseFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-auto p-4 bg-gradient-primary hover:opacity-90 border-0 transform transition-transform hover:scale-105 active:scale-95">
          <div className="flex flex-col items-center space-y-2">
            <Plus className="w-6 h-6" />
            <span className="text-sm font-medium">Agregar Gasto</span>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-gradient-pink-500" />
            <span>Nuevo Gasto</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Selection */}
          <div className="space-y-2">
            <Label>¿Quién hizo el gasto?</Label>            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => handleInputChange("user", "K")}
                className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                  formData.user === "K"
                    ? "border-gradient-pink-400 bg-gradient-pink-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-pink-500 text-white text-sm">K</AvatarFallback>
                </Avatar>
                <span className="font-medium">Kely</span>
              </button>

              <button
                type="button"
                onClick={() => handleInputChange("user", "C")}
                className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                  formData.user === "C"
                    ? "border-gradient-blue-400 bg-gradient-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-blue-500 text-white text-sm">C</AvatarFallback>
                </Avatar>
                <span className="font-medium">Crhistian</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Descripción *</Label>
            <Input
              id="description"
              placeholder="Ej: Cena en restaurante"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              required
            />
          </div>          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Monto *</Label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="pl-10"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  required
                />
              </div>
              <Select value={formData.currency} onValueChange={(value: "PEN" | "USD") => handleInputChange("currency", value)}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PEN">S/</SelectItem>
                  <SelectItem value="USD">$</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Categoría *</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger>
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

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notas (opcional)</Label>
            <Textarea
              id="notes"
              placeholder="Detalles adicionales..."
              rows={3}
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-primary"
            >
              Agregar Gasto
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
