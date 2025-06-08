"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import {
  Plus,
  Calendar,
  DollarSign,
  Heart,
  Smartphone,
  Car,
  Home,
  Plane
} from "lucide-react";

interface ShoppingPlan {
  id: string;
  title: string;
  targetAmount: number;
  savedAmount: number;
  targetDate: string;
  priority: "alta" | "media" | "baja";
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const shoppingPlans: ShoppingPlan[] = [
  {
    id: "1",
    title: "iPhone 15 Pro para Kely",
    targetAmount: 4500,
    savedAmount: 3200,
    targetDate: "2025-08-15",
    priority: "alta",
    category: "Tecnología",
    icon: Smartphone,
    color: "from-gradient-pink-400 to-gradient-pink-600"
  },
  {
    id: "2",
    title: "Vacaciones en Cusco",
    targetAmount: 8000,
    savedAmount: 5800,
    targetDate: "2025-12-20",
    priority: "alta",
    category: "Viajes",
    icon: Plane,
    color: "from-gradient-blue-400 to-gradient-blue-600"
  },  {
    id: "3",
    title: "Auto usado",
    targetAmount: 45000,
    savedAmount: 22500,
    targetDate: "2026-06-01",
    priority: "media",
    category: "Transporte",
    icon: Car,
    color: "from-purple-400 to-purple-600"
  },
  {
    id: "4",
    title: "Decoración sala",
    targetAmount: 2800,
    savedAmount: 1500,
    targetDate: "2025-09-30",
    priority: "baja",
    category: "Hogar",
    icon: Home,
    color: "from-green-400 to-green-600"
  }
];

const priorityColors = {
  alta: "bg-red-100 text-red-700",
  media: "bg-yellow-100 text-yellow-700",
  baja: "bg-green-100 text-green-700"
};

export function ShoppingPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const calculateDaysLeft = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Planes de Compras</h1>
          <p className="text-gray-600 text-sm">Ahorren juntos para sus metas</p>
        </div>
        <Button className="bg-gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Plan
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gradient-blue-600">4</p>
              <p className="text-sm text-gray-600">Planes activos</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4">            <div className="text-center">
              <p className="text-2xl font-bold text-gradient-pink-600">
                {formatCurrency(33000)}
              </p>
              <p className="text-sm text-gray-600">Total ahorrado</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shopping Plans List */}
      <div className="space-y-4">
        {shoppingPlans.map((plan) => {
          const Icon = plan.icon;
          const progress = (plan.savedAmount / plan.targetAmount) * 100;
          const daysLeft = calculateDaysLeft(plan.targetDate);
          const remaining = plan.targetAmount - plan.savedAmount;

          return (
            <Card
              key={plan.id}
              className={`glass-card transition-all cursor-pointer ${
                selectedPlan === plan.id ? 'ring-2 ring-gradient-pink-300' : ''
              }`}
              onClick={() => setSelectedPlan(selectedPlan === plan.id ? null : plan.id)}
            >
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${plan.color} text-white`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{plan.title}</h3>
                        <p className="text-sm text-gray-600">{plan.category}</p>
                      </div>
                    </div>
                    <Badge className={priorityColors[plan.priority]}>
                      {plan.priority}
                    </Badge>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{formatCurrency(plan.savedAmount)}</span>
                      <span className="text-gray-600">{formatCurrency(plan.targetAmount)}</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{progress.toFixed(0)}% completado</span>
                      <span>{daysLeft} días restantes</span>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {selectedPlan === plan.id && (
                    <div className="border-t pt-4 space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Falta ahorrar</p>
                          <p className="font-semibold text-red-600">{formatCurrency(remaining)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Fecha objetivo</p>
                          <p className="font-semibold flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(plan.targetDate).toLocaleDateString('es-MX')}
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1 bg-gradient-primary">
                          <DollarSign className="w-4 h-4 mr-1" />
                          Aportar
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Editar
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Motivational Card */}
      <Card className="glass-card bg-gradient-to-r from-gradient-pink-50 to-gradient-blue-50">
        <CardContent className="p-4 text-center">
          <Heart className="w-8 h-8 mx-auto mb-2 text-gradient-pink-500" />
          <h3 className="font-semibold text-gray-800 mb-1">¡Sigan así!</h3>          <p className="text-sm text-gray-600">
            Juntos han ahorrado {formatCurrency(33000)} para sus sueños compartidos
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
