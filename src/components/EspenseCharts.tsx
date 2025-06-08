"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import { TrendingUp, DollarSign, Calendar, Users } from "lucide-react";

// Mock data for charts
const categoryData = [
  { name: "Comida", value: 1250, color: "#ec4899", percentage: 35 },
  { name: "Transporte", value: 980, color: "#3b82f6", percentage: 27 },
  { name: "Entretenimiento", value: 650, color: "#8b5cf6", percentage: 18 },
  { name: "Hogar", value: 420, color: "#10b981", percentage: 12 },
  { name: "Otros", value: 290, color: "#f59e0b", percentage: 8 },
];

const monthlyData = [
  { month: "Ene", Maria: 850, Juan: 920, total: 1770 },
  { month: "Feb", Maria: 1200, Juan: 800, total: 2000 },
  { month: "Mar", Maria: 950, Juan: 1100, total: 2050 },
  { month: "Abr", Maria: 1100, Juan: 950, total: 2050 },
  { month: "May", Maria: 1350, Juan: 1200, total: 2550 },
  { month: "Jun", Maria: 1150, Juan: 890, total: 2040 },
];

const weeklyData = [
  { day: "L", amount: 120 },
  { day: "M", amount: 85 },
  { day: "M", amount: 200 },
  { day: "J", amount: 150 },
  { day: "V", amount: 320 },
  { day: "S", amount: 280 },
  { day: "D", amount: 95 },
];

const budgetData = [
  { category: "Comida", budget: 1500, spent: 1250, remaining: 250 },
  { category: "Transporte", budget: 1000, spent: 980, remaining: 20 },
  { category: "Entretenimiento", budget: 800, spent: 650, remaining: 150 },
  { category: "Hogar", budget: 600, spent: 420, remaining: 180 },
];

export function ExpenseCharts() {
  const totalSpent = categoryData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: ${entry.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-8 h-8 text-gradient-pink-500" />
              <div>
                <p className="text-2xl font-bold gradient-text">
                  ${totalSpent.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Gastado este mes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-gradient-blue-500" />
              <div>
                <p className="text-2xl font-bold text-green-600">+12%</p>
                <p className="text-sm text-gray-600">vs mes anterior</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Tabs */}
      <Tabs defaultValue="categories" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="categories">Por Categoría</TabsTrigger>
          <TabsTrigger value="monthly">Mensual</TabsTrigger>
          <TabsTrigger value="weekly">Semanal</TabsTrigger>
          <TabsTrigger value="budget">Presupuesto</TabsTrigger>
        </TabsList>

        {/* Category Pie Chart */}
        <TabsContent value="categories">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Gastos por Categoría</span>
                <Badge variant="secondary">Junio 2025</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2">
                  {categoryData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">${item.value.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{item.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monthly Bar Chart */}
        <TabsContent value="monthly">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Gastos Mensuales por Persona</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="Maria" fill="#ec4899" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex justify-center space-x-4 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-pink-500" />
                  <span className="text-sm">Kely</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-blue-500" />
                  <span className="text-sm">Crhistian</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Weekly Area Chart */}
        <TabsContent value="weekly">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Gastos de la Semana</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#ec4899"
                      fill="url(#colorGradient)"
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Promedio diario: <span className="font-semibold">$178</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Budget Comparison */}
        <TabsContent value="budget">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Presupuesto vs Gasto Real</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budgetData.map((item, index) => {
                  const percentage = (item.spent / item.budget) * 100;
                  const isOverBudget = percentage > 90;

                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item.category}</span>
                        <Badge
                          variant="secondary"
                          className={isOverBudget ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}
                        >
                          {percentage.toFixed(0)}%
                        </Badge>
                      </div>

                      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            isOverBudget ? "bg-red-500" : "bg-gradient-to-r from-gradient-pink-500 to-gradient-blue-500"
                          }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>

                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Gastado: ${item.spent}</span>
                        <span>Presupuesto: ${item.budget}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
