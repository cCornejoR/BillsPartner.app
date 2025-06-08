import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Heart,
  Eye,
  EyeOff
} from "lucide-react";
import { CreditCardComponent } from "@/components/CreditCardComponent";
import { ExpenseTracker } from "@/components/ExpenseTracker";

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex -space-x-2">
            <Avatar className="border-2 border-white transition-transform hover:scale-105">
              <AvatarFallback className="bg-gradient-pink-500 text-white">M</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-white transition-transform hover:scale-105">
              <AvatarFallback className="bg-gradient-blue-500 text-white">J</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">¡Hola Kely & Crhistian!</h1>
            <p className="text-sm text-gray-600">Gestionen juntos su dinero</p>
          </div>
        </div>
        <Heart className="w-6 h-6 text-gradient-pink-500 fill-current animate-bounce-gentle" />
      </div>

      {/* Balance Overview */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-600">Balance Total</CardTitle>
            <Button variant="ghost" size="sm" className="hover:bg-white/30">
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold gradient-text pulse-gentle">$24,850.00</p>
              <p className="text-sm text-gray-600">Disponible para gastar</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-lg font-semibold text-green-600">+$2,340</p>
                <p className="text-xs text-gray-500">Ingresos del mes</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-red-500">-$1,890</p>
                <p className="text-xs text-gray-500">Gastos del mes</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button className="h-auto p-4 bg-gradient-primary hover:opacity-90 border-0 transform transition-transform hover:scale-105 active:scale-95">
          <div className="flex flex-col items-center space-y-2">
            <Plus className="w-6 h-6" />
            <span className="text-sm font-medium">Agregar Gasto</span>
          </div>
        </Button>
        <Button variant="outline" className="h-auto p-4 glass-card border-white/30 transform transition-transform hover:scale-105 active:scale-95">
          <div className="flex flex-col items-center space-y-2">
            <ArrowUpRight className="w-6 h-6 text-gradient-blue-500" />
            <span className="text-sm font-medium text-gray-700">Transferir</span>
          </div>
        </Button>
      </div>

      {/* Credit Card */}
      <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
        <CreditCardComponent />
      </div>

      {/* Monthly Goals Progress */}
      <Card className="glass-card animate-slide-up" style={{animationDelay: '0.2s'}}>
        <CardHeader>
          <CardTitle className="text-lg">Objetivos del Mes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Ahorro para Vacaciones</span>
              <Badge variant="secondary" className="bg-gradient-pink-100 text-gradient-pink-700">
                78%
              </Badge>
            </div>
            <Progress value={78} className="h-2" />
            <p className="text-xs text-gray-500 mt-1">$780 de $1,000</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Presupuesto Comida</span>
              <Badge variant="secondary" className="bg-gradient-blue-100 text-gradient-blue-700">
                45%
              </Badge>
            </div>
            <Progress value={45} className="h-2" />
            <p className="text-xs text-gray-500 mt-1">$225 de $500</p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
        <ExpenseTracker />
      </div>
    </div>
  );
}
