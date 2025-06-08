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
  EyeOff,
  TrendingUp,
  TrendingDown,
  Wallet
} from "lucide-react";
import { CreditCardComponent } from "@/components/CreditCardComponent";
import { ExpenseTracker } from "@/components/ExpenseTracker";
import { formatCurrency } from "@/lib/utils";
import { DashboardContent } from "@/components/DashboardContent";

export default function Dashboard() {
  return <DashboardContent />;
}
