"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";
import {
  Target,
  TrendingUp,
  Calendar,
  PiggyBank,
  Home,
  GraduationCap,
  Baby,
  Heart,
  Plus,
  Award
} from "lucide-react";

interface FinancialGoal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: "short" | "medium" | "long";
  priority: "alta" | "media" | "baja";
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const financialGoals: FinancialGoal[] = [
  {
    id: "1",
    title: "Fondo de Emergencia",
    description: "6 meses de gastos familiares",
    targetAmount: 36000,
    currentAmount: 19000,
    targetDate: "2025-12-31",
    category: "short",
    priority: "alta",
    icon: PiggyBank,
    color: "from-green-400 to-green-600"
  },
  {
    id: "2",
    title: "Enganche Casa Propia",
    description: "20% del valor de la casa",
    targetAmount: 120000,
    currentAmount: 63000,
    targetDate: "2027-06-30",
    category: "long",
    priority: "alta",
    icon: Home,
    color: "from-gradient-blue-400 to-gradient-blue-600"
  },  {
    id: "3",
    title: "Educación Futuros Hijos",
    description: "Universidad privada completa",
    targetAmount: 200000,
    currentAmount: 30000,
    targetDate: "2035-12-31",
    category: "long",
    priority: "media",
    icon: GraduationCap,
    color: "from-purple-400 to-purple-600"
  },
  {
    id: "4",
    title: "Retiro Anticipado",
    description: "Libertad financiera a los 50",
    targetAmount: 800000,
    currentAmount: 75000,
    targetDate: "2040-01-01",
    category: "long",
    priority: "media",
    icon: TrendingUp,
    color: "from-gradient-pink-400 to-gradient-pink-600"
  },  {
    id: "5",
    title: "Luna de Miel Europa",
    description: "3 semanas recorriendo Europa",
    targetAmount: 25000,
    currentAmount: 18000,
    targetDate: "2025-09-15",
    category: "short",
    priority: "alta",
    icon: Heart,
    color: "from-rose-400 to-rose-600"
  }
];

const categoryLabels = {
  short: "Corto Plazo (< 2 años)",
  medium: "Mediano Plazo (2-5 años)",
  long: "Largo Plazo (> 5 años)"
};

const priorityColors = {
  alta: "bg-red-100 text-red-700",
  media: "bg-yellow-100 text-yellow-700",
  baja: "bg-green-100 text-green-700"
};

export function FinancialGoals() {
  const [activeTab, setActiveTab] = useState("all");

  const calculateDaysLeft = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getFilteredGoals = (category?: string) => {
    if (category === "all" || !category) return financialGoals;
    return financialGoals.filter(goal => goal.category === category);
  };

  const totalSaved = financialGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTarget = financialGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const overallProgress = (totalSaved / totalTarget) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Objetivos Financieros</h1>
          <p className="text-gray-600 text-sm">Construyan su futuro juntos</p>
        </div>
        <Button className="bg-gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Objetivo
        </Button>
      </div>

      {/* Overall Progress */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Award className="w-8 h-8 text-gradient-pink-500" />
              <h2 className="text-xl font-bold text-gray-800">Progreso General</h2>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{formatCurrency(totalSaved)}</span>
                <span className="text-gray-600">{formatCurrency(totalTarget)}</span>
              </div>
              <Progress value={overallProgress} className="h-3" />
              <p className="text-sm text-gray-600">
                {overallProgress.toFixed(1)}% de sus objetivos completados
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <p className="text-lg font-bold text-gradient-blue-600">
                  {financialGoals.length}
                </p>
                <p className="text-xs text-gray-500">Objetivos activos</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">
                  {financialGoals.filter(g => (g.currentAmount / g.targetAmount) > 0.7).length}
                </p>
                <p className="text-xs text-gray-500">Cerca de cumplir</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gradient-pink-600">
                  {financialGoals.filter(g => g.priority === "alta").length}
                </p>
                <p className="text-xs text-gray-500">Alta prioridad</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="short">Corto</TabsTrigger>
          <TabsTrigger value="medium">Mediano</TabsTrigger>
          <TabsTrigger value="long">Largo</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {getFilteredGoals("all").map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </TabsContent>

        <TabsContent value="short" className="space-y-4 mt-6">
          {getFilteredGoals("short").map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </TabsContent>

        <TabsContent value="medium" className="space-y-4 mt-6">
          {getFilteredGoals("medium").map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </TabsContent>

        <TabsContent value="long" className="space-y-4 mt-6">
          {getFilteredGoals("long").map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function GoalCard({ goal }: { goal: FinancialGoal }) {
  const Icon = goal.icon;
  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const daysLeft = Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const remaining = goal.targetAmount - goal.currentAmount;

  return (
    <Card className="glass-card">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-full bg-gradient-to-r ${goal.color} text-white`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{goal.title}</h3>
                <p className="text-sm text-gray-600">{goal.description}</p>
              </div>
            </div>
            <div className="text-right space-y-1">
              <Badge className={priorityColors[goal.priority]}>
                {goal.priority}
              </Badge>
              <p className="text-xs text-gray-500">
                {categoryLabels[goal.category]}
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{formatCurrency(goal.currentAmount)}</span>
              <span className="text-gray-600">{formatCurrency(goal.targetAmount)}</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{progress.toFixed(0)}% completado</span>
              <span>{daysLeft > 0 ? `${daysLeft} días restantes` : 'Vencido'}</span>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Falta</p>
              <p className="font-semibold text-red-600">{formatCurrency(remaining)}</p>
            </div>
            <div>
              <p className="text-gray-600">Fecha objetivo</p>
              <p className="font-semibold flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(goal.targetDate).toLocaleDateString('es-MX')}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <Button size="sm" className="flex-1 bg-gradient-primary">
              <PiggyBank className="w-4 h-4 mr-1" />
              Aportar
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              Editar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
