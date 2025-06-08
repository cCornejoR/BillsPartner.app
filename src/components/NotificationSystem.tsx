"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  CreditCard,
  Target,
  X,
  Bell,
  TrendingUp
} from "lucide-react";
import toast from "react-hot-toast";

interface Notification {
  id: string;
  type: "warning" | "info" | "success" | "error";
  title: string;
  message: string;
  icon: React.ComponentType<{ className?: string }>;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "warning",
    title: "Límite de Tarjeta",
    message: "Han gastado 68% del límite mensual de su tarjeta CoupleCard",
    icon: CreditCard,
    timestamp: new Date(),
    read: false,
    action: {
      label: "Ver Detalles",
      onClick: () => toast.info("Redirigiendo a detalles de tarjeta...")
    }
  },
  {
    id: "2",
    type: "info",
    title: "Objetivo Vacaciones",
    message: "¡Faltan solo $220 para completar su objetivo de vacaciones!",
    icon: Target,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    action: {
      label: "Aportar",
      onClick: () => toast.success("Abriendo formulario de aportación...")
    }
  },
  {
    id: "3",
    type: "success",
    title: "Meta Cumplida",
    message: "¡Felicidades! Completaron su presupuesto de comida del mes",
    icon: TrendingUp,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
  }
];

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [showAll, setShowAll] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  const visibleNotifications = showAll ? notifications : notifications.slice(0, 3);

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      // Check spending limits every 30 seconds
      checkSpendingLimits();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const checkSpendingLimits = () => {
    const currentSpending = 3420; // Current credit card balance
    const spendingLimit = 5000;
    const spendingPercentage = (currentSpending / spendingLimit) * 100;

    if (spendingPercentage > 80) {
      const existingWarning = notifications.find(n =>
        n.type === "warning" && n.title.includes("Límite")
      );

      if (!existingWarning) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: "error",
          title: "⚠️ Límite Crítico",
          message: `¡Atención! Han superado el 80% del límite mensual (${spendingPercentage.toFixed(0)}%)`,
          icon: AlertTriangle,
          timestamp: new Date(),
          read: false,
          action: {
            label: "Revisar",
            onClick: () => toast.info("Mostrando detalles de gastos...")
          }
        };

        setNotifications(prev => [newNotification, ...prev]);
        toast.error("⚠️ Límite de gasto alcanzado!");
      }
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getTypeStyles = (type: Notification["type"]) => {
    switch (type) {
      case "warning":
        return "border-yellow-200 bg-yellow-50";
      case "error":
        return "border-red-200 bg-red-50";
      case "success":
        return "border-green-200 bg-green-50";
      case "info":
      default:
        return "border-blue-200 bg-blue-50";
    }
  };

  const getIconColor = (type: Notification["type"]) => {
    switch (type) {
      case "warning":
        return "text-yellow-600";
      case "error":
        return "text-red-600";
      case "success":
        return "text-green-600";
      case "info":
      default:
        return "text-blue-600";
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Hace unos minutos";
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    return `Hace ${Math.floor(diffInHours / 24)} días`;
  };

  if (notifications.length === 0) return null;

  return (
    <Card className="glass-card">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-gradient-pink-500" />
            <h3 className="font-semibold text-gray-800">Notificaciones</h3>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-gradient-pink-100 text-gradient-pink-700">
                {unreadCount}
              </Badge>
            )}
          </div>
          {notifications.length > 3 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAll(!showAll)}
              className="text-xs"
            >
              {showAll ? "Ver menos" : "Ver todas"}
            </Button>
          )}
        </div>

        <div className="space-y-3">
          {visibleNotifications.map((notification) => {
            const Icon = notification.icon;

            return (
              <div
                key={notification.id}
                className={`relative p-3 rounded-lg border transition-all ${getTypeStyles(notification.type)} ${
                  notification.read ? "opacity-75" : ""
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Icon className={`w-5 h-5 mt-0.5 ${getIconColor(notification.type)}`} />

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-medium text-gray-800">
                        {notification.title}
                      </h4>
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="text-gray-400 hover:text-gray-600 ml-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">
                      {notification.message}
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(notification.timestamp)}
                      </span>

                      <div className="flex space-x-2">
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs h-6 px-2"
                          >
                            Marcar leída
                          </Button>
                        )}
                        {notification.action && (
                          <Button
                            size="sm"
                            className="text-xs h-6 px-2 bg-gradient-primary"
                            onClick={notification.action.onClick}
                          >
                            {notification.action.label}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {notifications.filter(n => !n.read).length === 0 && (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500">
              ¡Todas las notificaciones están al día! 🎉
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
