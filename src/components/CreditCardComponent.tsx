"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Wifi } from "lucide-react";

export function CreditCardComponent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const cardData = {
    balance: 3420,
    limit: 5000,
    number: "**** **** **** 2847",
    holder: "KELY & CRHISTIAN",
    expiry: "12/28",
  };

  const spendingPercentage = (cardData.balance / cardData.limit) * 100;
  const remainingLimit = cardData.limit - cardData.balance;

  const formatCurrency = (amount: number) => {
    return `${amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  return (
    <div className="space-y-4">
      {/* Credit Card */}
      <div className="relative">
        <Card className="bg-gradient-primary border-0 text-white overflow-hidden">
          <CardContent className="p-6">
            {/* Card Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-white/80 text-sm">Tarjeta de Pareja</p>
                <p className="text-lg font-bold">CoupleCard</p>
              </div>
              <div className="flex items-center space-x-2">
                <Wifi className="w-6 h-6 text-white/60" />
                <CreditCard className="w-8 h-8 text-white/80" />
              </div>
            </div>

            {/* Card Number */}
            <div className="mb-6">
              <p className="text-xl font-mono tracking-wider">
                {cardData.number}
              </p>
            </div>

            {/* Card Footer */}
            <div className="flex justify-between items-end">
              <div>
                <p className="text-white/60 text-xs uppercase">Titular</p>
                <p className="font-semibold">{cardData.holder}</p>
              </div>
              <div>
                <p className="text-white/60 text-xs uppercase">Expira</p>
                <p className="font-semibold">{cardData.expiry}</p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full blur-lg" />
          </CardContent>
        </Card>
      </div>

      {/* Spending Limits Card */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">Límite de Gasto</h3>
            <Badge
              variant="secondary"
              className={`${
                spendingPercentage > 80
                  ? 'bg-red-100 text-red-700'
                  : spendingPercentage > 60
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {spendingPercentage.toFixed(0)}% usado
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Gastado</span>
              <span className="font-medium">$3,420</span>
            </div>

            <Progress
              value={spendingPercentage}
              className="h-3"
            />

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Disponible</span>
              <span className="font-medium text-green-600">
                $1,580
              </span>
            </div>
          </div>

          {/* Warning message */}
          {spendingPercentage > 80 && (
            <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs text-red-700">
                ⚠️ ¡Cuidado! Están cerca del límite mensual
              </p>
            </div>
          )}

          {spendingPercentage > 60 && spendingPercentage <= 80 && (
            <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-700">
                💡 Consideren revisar los gastos pendientes
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
