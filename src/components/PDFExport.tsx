"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  CreditCard,
  Target,
  Settings,
  Loader2
} from "lucide-react";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ReportOptions {
  period: string;
  includeCharts: boolean;
  includeTransactions: boolean;
  includeGoals: boolean;
  includeBudget: boolean;
  includeCard: boolean;
}

const periodOptions = [
  { value: "current-month", label: "Mes Actual" },
  { value: "last-month", label: "Mes Anterior" },
  { value: "last-3-months", label: "Últimos 3 Meses" },
  { value: "last-6-months", label: "Últimos 6 Meses" },
  { value: "current-year", label: "Año Actual" },
];

export function PDFExport() {
  const [open, setOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportOptions, setReportOptions] = useState<ReportOptions>({
    period: "current-month",
    includeCharts: true,
    includeTransactions: true,
    includeGoals: true,
    includeBudget: true,
    includeCard: true,
  });

  const updateOption = (key: keyof ReportOptions, value: any) => {
    setReportOptions(prev => ({ ...prev, [key]: value }));
  };

  const generatePDF = async () => {
    setIsGenerating(true);

    try {
      // Create a new PDF document
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Add header
      pdf.setFontSize(20);
      pdf.setTextColor(236, 72, 153); // Pink color
      pdf.text('CoupleFinance - Reporte Financiero', 20, 20);

      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Período: ${periodOptions.find(p => p.value === reportOptions.period)?.label}`, 20, 35);
      pdf.text(`Generado: ${new Date().toLocaleDateString('es-MX')}`, 20, 45);

      let yPosition = 60;

      // Summary section
      pdf.setFontSize(16);
      pdf.setTextColor(59, 130, 246); // Blue color
      pdf.text('Resumen Financiero', 20, yPosition);
      yPosition += 15;

      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text('• Balance Total: $24,850.00', 25, yPosition);
      yPosition += 10;
      pdf.text('• Ingresos del Mes: +$2,340.00', 25, yPosition);
      yPosition += 10;
      pdf.text('• Gastos del Mes: -$1,890.00', 25, yPosition);
      yPosition += 15;

      // Card information
      if (reportOptions.includeCard) {
        pdf.setFontSize(16);
        pdf.setTextColor(59, 130, 246);
        pdf.text('Información de Tarjeta', 20, yPosition);
        yPosition += 15;

        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);
        pdf.text('• Límite de Crédito: $5,000.00', 25, yPosition);
        yPosition += 10;
        pdf.text('• Gastado: $3,420.00 (68%)', 25, yPosition);
        yPosition += 10;
        pdf.text('• Disponible: $1,580.00', 25, yPosition);
        yPosition += 15;
      }

      // Transactions
      if (reportOptions.includeTransactions) {
        pdf.setFontSize(16);
        pdf.setTextColor(59, 130, 246);
        pdf.text('Transacciones Recientes', 20, yPosition);
        yPosition += 15;

        const transactions = [
          'Supermercado Soriana - $125.50',
          'Starbucks - $45.00',
          'Gasolina Shell - $780.00',
          'Cena Romántica - $320.00',
          'Pago Renta - $8,500.00'
        ];

        pdf.setFontSize(10);
        transactions.forEach(transaction => {
          pdf.text(`• ${transaction}`, 25, yPosition);
          yPosition += 8;
        });
        yPosition += 10;
      }

      // Goals
      if (reportOptions.includeGoals) {
        pdf.setFontSize(16);
        pdf.setTextColor(59, 130, 246);
        pdf.text('Objetivos Financieros', 20, yPosition);
        yPosition += 15;

        const goals = [
          'Fondo de Emergencia: $95,000 / $180,000 (53%)',
          'Enganche Casa: $420,000 / $800,000 (52%)',
          'Luna de Miel Europa: $85,000 / $120,000 (71%)',
        ];

        pdf.setFontSize(10);
        goals.forEach(goal => {
          pdf.text(`• ${goal}`, 25, yPosition);
          yPosition += 8;
        });
        yPosition += 10;
      }

      // Budget
      if (reportOptions.includeBudget) {
        pdf.setFontSize(16);
        pdf.setTextColor(59, 130, 246);
        pdf.text('Presupuesto vs Gastos', 20, yPosition);
        yPosition += 15;

        const budget = [
          'Comida: $1,250 / $1,500 (83%)',
          'Transporte: $980 / $1,000 (98%)',
          'Entretenimiento: $650 / $800 (81%)',
          'Hogar: $420 / $600 (70%)',
        ];

        pdf.setFontSize(10);
        budget.forEach(item => {
          pdf.text(`• ${item}`, 25, yPosition);
          yPosition += 8;
        });
      }

      // Add footer
      pdf.setFontSize(8);
      pdf.setTextColor(128, 128, 128);
      pdf.text('Generado por CoupleFinance - App de Gestión Financiera para Parejas', 20, 280);

      // Save the PDF
      const fileName = `reporte-financiero-${reportOptions.period}-${Date.now()}.pdf`;
      pdf.save(fileName);

      toast.success('¡Reporte PDF generado exitosamente!');
      setOpen(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Error al generar el reporte PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="glass-card border-white/30">
          <FileText className="w-4 h-4 mr-2" />
          Exportar PDF
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-gradient-blue-500" />
            <span>Generar Reporte PDF</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Period Selection */}
          <div className="space-y-2">
            <Label className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Período del Reporte</span>
            </Label>
            <Select
              value={reportOptions.period}
              onValueChange={(value) => updateOption('period', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {periodOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Report Sections */}
          <div className="space-y-3">
            <Label className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Secciones a Incluir</span>
            </Label>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="charts"
                  checked={reportOptions.includeCharts}
                  onCheckedChange={(checked) => updateOption('includeCharts', checked)}
                />
                <Label htmlFor="charts" className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-gradient-pink-500" />
                  <span>Gráficos y Estadísticas</span>
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="transactions"
                  checked={reportOptions.includeTransactions}
                  onCheckedChange={(checked) => updateOption('includeTransactions', checked)}
                />
                <Label htmlFor="transactions" className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-gradient-blue-500" />
                  <span>Lista de Transacciones</span>
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="goals"
                  checked={reportOptions.includeGoals}
                  onCheckedChange={(checked) => updateOption('includeGoals', checked)}
                />
                <Label htmlFor="goals" className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-green-500" />
                  <span>Objetivos Financieros</span>
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="budget"
                  checked={reportOptions.includeBudget}
                  onCheckedChange={(checked) => updateOption('includeBudget', checked)}
                />
                <Label htmlFor="budget" className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-purple-500" />
                  <span>Análisis de Presupuesto</span>
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="card"
                  checked={reportOptions.includeCard}
                  onCheckedChange={(checked) => updateOption('includeCard', checked)}
                />
                <Label htmlFor="card" className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-orange-500" />
                  <span>Información de Tarjeta</span>
                </Label>
              </div>
            </div>
          </div>

          {/* Preview Card */}
          <Card className="bg-gradient-to-r from-gradient-pink-50 to-gradient-blue-50 border-none">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="w-5 h-5 text-gradient-pink-500" />
                <span className="font-semibold">Vista Previa del Reporte</span>
              </div>
              <p className="text-sm text-gray-600">
                El reporte incluirá {Object.values(reportOptions).filter(Boolean).length - 1} secciones
                para el período seleccionado.
              </p>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="flex-1 bg-gradient-primary"
              onClick={generatePDF}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Generar PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
