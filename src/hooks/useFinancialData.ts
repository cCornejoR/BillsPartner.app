"use client";

import { useState, useEffect } from "react";

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  user: "K" | "C"; // Kely o Crhistian
  timestamp: number;
  notes?: string;
  isRecurring?: boolean;
  paymentMethod?: "cash" | "card" | "transfer" | "yape" | "plin";
}

export interface SavingsGoal {
  id: string;
  name: string;
  current: number;
  target: number;
  deadline?: string;
  priority: "high" | "medium" | "low";
  category: string;
}

export interface RecurringTransaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  nextDate: string;
  user: "K" | "C";
  isActive: boolean;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  month: number;
  year: number;
}

export interface FinancialData {
  balance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsGoals: SavingsGoal[];
  recurringTransactions: RecurringTransaction[];
  budgets: Budget[];
  accounts: {
    cash: number;
    savings: number;
    checking: number;
  };
}

const INITIAL_DATA: FinancialData = {
  balance: 5240.50, // Balance inicial en soles
  monthlyIncome: 0,
  monthlyExpenses: 0,
  savingsGoals: [
    {
      id: "1",
      name: "Vacaciones en Cusco",
      current: 2200,
      target: 5000,
      deadline: "2025-12-31",
      priority: "high",
      category: "Viajes"
    },
    {
      id: "2",
      name: "Fondo de Emergencia",
      current: 1500,
      target: 10000,
      deadline: "2026-06-30",
      priority: "high",
      category: "Emergencia"
    }
  ],
  recurringTransactions: [],
  budgets: [
    {
      id: "1",
      category: "Comida",
      limit: 800,
      spent: 0,
      month: new Date().getMonth(),
      year: new Date().getFullYear()
    },
    {
      id: "2",
      category: "Transporte",
      limit: 300,
      spent: 0,
      month: new Date().getMonth(),
      year: new Date().getFullYear()
    },
    {
      id: "3",
      category: "Entretenimiento",
      limit: 400,
      spent: 0,
      month: new Date().getMonth(),
      year: new Date().getFullYear()
    }
  ],
  accounts: {
    cash: 500,
    savings: 4200,
    checking: 540.50
  }
};

const STORAGE_KEYS = {
  EXPENSES: "app-pareja-expenses",
  FINANCIAL_DATA: "app-pareja-financial-data"
};

export function useFinancialData() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [financialData, setFinancialData] = useState<FinancialData>(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar datos del localStorage
  useEffect(() => {
    try {
      const savedExpenses = localStorage.getItem(STORAGE_KEYS.EXPENSES);
      const savedFinancialData = localStorage.getItem(STORAGE_KEYS.FINANCIAL_DATA);

      if (savedExpenses) {
        setExpenses(JSON.parse(savedExpenses));
      }

      if (savedFinancialData) {
        setFinancialData(JSON.parse(savedFinancialData));
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Guardar gastos en localStorage
  const saveExpenses = (newExpenses: Expense[]) => {
    setExpenses(newExpenses);
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(newExpenses));
  };

  // Guardar datos financieros en localStorage
  const saveFinancialData = (newData: FinancialData) => {
    setFinancialData(newData);
    localStorage.setItem(STORAGE_KEYS.FINANCIAL_DATA, JSON.stringify(newData));
  };

  // Agregar nuevo gasto
  const addExpense = (expense: Omit<Expense, "id" | "timestamp">) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
      timestamp: Date.now()
    };

    const updatedExpenses = [newExpense, ...expenses];
    saveExpenses(updatedExpenses);

    // Actualizar balance y gastos mensuales
    const newBalance = financialData.balance + expense.amount; // amount es negativo para gastos
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    // Calcular gastos del mes actual
    const monthlyExpenses = updatedExpenses
      .filter(exp => {
        const expDate = new Date(exp.timestamp);
        return expDate.getMonth() === currentMonth && 
               expDate.getFullYear() === currentYear &&
               exp.amount < 0;
      })
      .reduce((sum, exp) => sum + Math.abs(exp.amount), 0);

    // Calcular ingresos del mes actual
    const monthlyIncome = updatedExpenses
      .filter(exp => {
        const expDate = new Date(exp.timestamp);
        return expDate.getMonth() === currentMonth && 
               expDate.getFullYear() === currentYear &&
               exp.amount > 0;
      })
      .reduce((sum, exp) => sum + exp.amount, 0);

    const updatedFinancialData = {
      ...financialData,
      balance: newBalance,
      monthlyExpenses,
      monthlyIncome
    };

    saveFinancialData(updatedFinancialData);
  };

  // Agregar ingreso
  const addIncome = (amount: number, description: string, user: "K" | "C") => {
    addExpense({
      amount: Math.abs(amount), // Asegurar que sea positivo
      description,
      category: "Ingreso",
      date: new Date().toLocaleString("es-PE"),
      user
    });
  };
  // Agregar objetivo de ahorro
  const addSavingsGoal = (goal: Omit<SavingsGoal, "id" | "current">) => {
    const newGoal: SavingsGoal = {
      ...goal,
      id: Date.now().toString(),
      current: 0
    };

    const updatedFinancialData = {
      ...financialData,
      savingsGoals: [...financialData.savingsGoals, newGoal]
    };
    saveFinancialData(updatedFinancialData);
  };

  // Actualizar objetivo de ahorro
  const updateSavingsGoal = (goalId: string, updates: Partial<SavingsGoal>) => {
    const updatedGoals = financialData.savingsGoals.map(goal =>
      goal.id === goalId ? { ...goal, ...updates } : goal
    );

    const updatedFinancialData = {
      ...financialData,
      savingsGoals: updatedGoals
    };
    saveFinancialData(updatedFinancialData);
  };

  // Eliminar objetivo de ahorro
  const deleteSavingsGoal = (goalId: string) => {
    const updatedGoals = financialData.savingsGoals.filter(goal => goal.id !== goalId);
    const updatedFinancialData = {
      ...financialData,
      savingsGoals: updatedGoals
    };
    saveFinancialData(updatedFinancialData);
  };

  // Agregar transacción recurrente
  const addRecurringTransaction = (transaction: Omit<RecurringTransaction, "id">) => {
    const newTransaction: RecurringTransaction = {
      ...transaction,
      id: Date.now().toString()
    };

    const updatedFinancialData = {
      ...financialData,
      recurringTransactions: [...financialData.recurringTransactions, newTransaction]
    };
    saveFinancialData(updatedFinancialData);
  };

  // Crear/actualizar presupuesto
  const updateBudget = (category: string, limit: number) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const existingBudgetIndex = financialData.budgets.findIndex(
      budget => budget.category === category && 
                budget.month === currentMonth && 
                budget.year === currentYear
    );

    let updatedBudgets;
    if (existingBudgetIndex >= 0) {
      updatedBudgets = [...financialData.budgets];
      updatedBudgets[existingBudgetIndex] = {
        ...updatedBudgets[existingBudgetIndex],
        limit
      };
    } else {
      const newBudget: Budget = {
        id: Date.now().toString(),
        category,
        limit,
        spent: 0,
        month: currentMonth,
        year: currentYear
      };
      updatedBudgets = [...financialData.budgets, newBudget];
    }

    const updatedFinancialData = {
      ...financialData,
      budgets: updatedBudgets
    };
    saveFinancialData(updatedFinancialData);
  };

  // Actualizar cuentas
  const updateAccounts = (updates: Partial<typeof financialData.accounts>) => {
    const updatedFinancialData = {
      ...financialData,
      accounts: { ...financialData.accounts, ...updates }
    };
    saveFinancialData(updatedFinancialData);
  };

  // Actualizar gasto existente
  const updateExpense = (id: string, updatedExpense: Omit<Expense, "id" | "timestamp">) => {
    const expenseIndex = expenses.findIndex(expense => expense.id === id);
    if (expenseIndex === -1) return;

    const originalExpense = expenses[expenseIndex];
    const updatedExpenses = [...expenses];
    updatedExpenses[expenseIndex] = {
      ...originalExpense,
      ...updatedExpense
    };

    saveExpenses(updatedExpenses);

    // Recalcular balance y gastos mensuales
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    // Calcular gastos del mes actual
    const monthlyExpenses = updatedExpenses
      .filter(exp => {
        const expDate = new Date(exp.timestamp);
        return expDate.getMonth() === currentMonth && 
               expDate.getFullYear() === currentYear &&
               exp.amount < 0;
      })
      .reduce((sum, exp) => sum + Math.abs(exp.amount), 0);

    // Calcular ingresos del mes actual
    const monthlyIncome = updatedExpenses
      .filter(exp => {
        const expDate = new Date(exp.timestamp);
        return expDate.getMonth() === currentMonth && 
               expDate.getFullYear() === currentYear &&
               exp.amount > 0;
      })
      .reduce((sum, exp) => sum + exp.amount, 0);

    // Calcular nuevo balance total
    const totalBalance = updatedExpenses.reduce((sum, exp) => sum + exp.amount, INITIAL_DATA.balance);

    const updatedFinancialData = {
      ...financialData,
      balance: totalBalance,
      monthlyExpenses,
      monthlyIncome
    };
    saveFinancialData(updatedFinancialData);
  };

  // Eliminar gasto
  const deleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    saveExpenses(updatedExpenses);

    // Recalcular balance y gastos mensuales
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    // Calcular gastos del mes actual
    const monthlyExpenses = updatedExpenses
      .filter(exp => {
        const expDate = new Date(exp.timestamp);
        return expDate.getMonth() === currentMonth && 
               expDate.getFullYear() === currentYear &&
               exp.amount < 0;
      })
      .reduce((sum, exp) => sum + Math.abs(exp.amount), 0);

    // Calcular ingresos del mes actual
    const monthlyIncome = updatedExpenses
      .filter(exp => {
        const expDate = new Date(exp.timestamp);
        return expDate.getMonth() === currentMonth && 
               expDate.getFullYear() === currentYear &&
               exp.amount > 0;
      })
      .reduce((sum, exp) => sum + exp.amount, 0);

    // Calcular nuevo balance total
    const totalBalance = updatedExpenses.reduce((sum, exp) => sum + exp.amount, INITIAL_DATA.balance);

    const updatedFinancialData = {
      ...financialData,
      balance: totalBalance,
      monthlyExpenses,
      monthlyIncome
    };
    saveFinancialData(updatedFinancialData);
  };

  // Obtener gastos recientes (últimos 5)
  const getRecentExpenses = () => {
    return expenses
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 5);
  };

  // Obtener gastos por categoría del mes actual
  const getMonthlyExpensesByCategory = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyExpenses = expenses.filter(expense => {
      const expDate = new Date(expense.timestamp);
      return expDate.getMonth() === currentMonth && 
             expDate.getFullYear() === currentYear &&
             expense.amount < 0;
    });

    const categoryTotals: { [key: string]: number } = {};
    monthlyExpenses.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + Math.abs(expense.amount);
    });

    return categoryTotals;
  };
  return {
    expenses,
    financialData,
    isLoading,
    addExpense,
    addIncome,
    addSavingsGoal,
    updateSavingsGoal,
    deleteSavingsGoal,
    addRecurringTransaction,
    updateBudget,
    updateAccounts,
    updateExpense,
    deleteExpense,
    getRecentExpenses,
    getMonthlyExpensesByCategory
  };
}
