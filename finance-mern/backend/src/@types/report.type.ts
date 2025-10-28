export type ReportType = {
  period: string;
  totalIncome: number;
  totalExpenses: number;
  availableBalance: number;
  savingsRate: number;
  topSpendingCategories: Array<{ name: string; percent: number }>;
  insights: string[];
};
