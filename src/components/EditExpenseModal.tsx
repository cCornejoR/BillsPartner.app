"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Expense } from "@/hooks/useFinancialData";

interface EditExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, expenseData: Omit<Expense, "id" | "timestamp">) => void;
  expense: Expense | null;
}

const categories = [
  "Comida",
  "Transporte", 
  "Entretenimiento",
  "Salud",
  "Compras",
  "Servicios",
  "Educación",
  "Hogar",
  "Ingreso",
  "Otros"
];

const paymentMethods = [
  { value: "cash", label: "Efectivo" },
  { value: "card", label: "Tarjeta" },
  { value: "transfer", label: "Transferencia" },
  { value: "yape", label: "Yape" },
  { value: "plin", label: "Plin" }
];

export function EditExpenseModal({ isOpen, onClose, onSave, expense }: EditExpenseModalProps) {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    user: "K" as "K" | "C",
    notes: "",
    paymentMethod: "cash" as "cash" | "card" | "transfer" | "yape" | "plin"
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        description: expense.description,
        amount: Math.abs(expense.amount).toString(),
        category: expense.category,
        user: expense.user,
        notes: expense.notes || "",
        paymentMethod: expense.paymentMethod || "cash"
      });
    }
  }, [expense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!expense) return;

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      alert("Por favor ingresa un monto válido");
      return;
    }

    const expenseData = {
      description: formData.description,
      amount: formData.category === "Ingreso" ? amount : -amount,
      category: formData.category,
      user: formData.user,
      notes: formData.notes,
      paymentMethod: formData.paymentMethod,
      date: expense.date, // Mantener la fecha original
      isRecurring: expense.isRecurring
    };

    onSave(expense.id, expenseData);
    onClose();
  };

  const handleClose = () => {
    onClose();
    // Reset form
    setFormData({
      description: "",
      amount: "",
      category: "",
      user: "K",
      notes: "",
      paymentMethod: "cash"
    });
  };

  if (!expense) return null;

  const isIncome = expense.amount > 0;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Editar {isIncome ? "Ingreso" : "Gasto"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descripción del gasto"
              required
            />
          </div>

          <div>
            <Label htmlFor="amount">Monto (S/)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Categoría</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="user">Usuario</Label>
            <Select
              value={formData.user}
              onValueChange={(value: "K" | "C") => setFormData({ ...formData, user: value })}
              required
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="K">Kely</SelectItem>
                <SelectItem value="C">Crhistian</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="paymentMethod">Método de Pago</Label>
            <Select
              value={formData.paymentMethod}
              onValueChange={(value: any) => setFormData({ ...formData, paymentMethod: value })}
              required
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Notas (opcional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Notas adicionales..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Guardar Cambios
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
