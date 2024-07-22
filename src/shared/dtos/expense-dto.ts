import { ExpenseType } from "./expense-type-dto";

export interface Expense {
    id: number;
    userId: number;
    expenseTypeId: number;
    expenseType?: ExpenseType;
    title: string;
    amount: number;
    description: string;
    expenseDate: Date;
    paidTo: string;
    metadata: Record<string, any>;
  }
  